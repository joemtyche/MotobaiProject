from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError
from rest_framework import status
from rest_framework.response import Response
from .models import (
        Product, Inventory, Account, Order, OrderDetails,
        OrderTracking, Customer, Employee, Supplier, 
        InboundStock, InboundStockItem, Payment
    )
from decimal import Decimal


# USER
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user

# PRODUCT
class ProductSerializer(serializers.ModelSerializer):
    stock_minimum_threshold = serializers.IntegerField(write_only=True, required=False, default=0)
    product_price = serializers.DecimalField(decimal_places=2, max_digits=10, required=False)

    class Meta:
        model = Product
        fields = '__all__'

    def create(self, validated_data):
        stock_minimum_threshold = validated_data.pop('stock_minimum_threshold', 0)
        
        # Create the product
        product = super().create(validated_data)

        # Add the product to the inventory with default values
        Inventory.objects.create(product=product, stock=0, stock_minimum_threshold=stock_minimum_threshold)

        return product
    
    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)

        stock_minimum_threshold = validated_data.get('stock_minimum_threshold', None)
        
        if stock_minimum_threshold is not None:
            inventory_instance = instance.inventory_set.first()  
            
            if inventory_instance:
                inventory_instance.stock_minimum_threshold = stock_minimum_threshold
                inventory_instance.save()

        return instance

# CUSTOMER
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

# EMPLOYEE
class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'


# STOCKIN
class InboundStockItemSerializer(serializers.ModelSerializer):
    inventory = serializers.PrimaryKeyRelatedField(queryset=Inventory.objects.all())
    product = ProductSerializer(source='inventory.product', read_only=True)

    class Meta:
        model = InboundStockItem
        fields = '__all__'
        depth = 1
    
class InboundStockSerializer(serializers.ModelSerializer):
    inboundStockItems = InboundStockItemSerializer(many=True)

    supplier = serializers.PrimaryKeyRelatedField(queryset=Supplier.objects.all())
    employee = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all())
    supplier_name = serializers.ReadOnlyField(source='supplier.supplier_name')
    employee_fname = serializers.ReadOnlyField(source='employee.first_name')
    employee_mname = serializers.ReadOnlyField(source='employee.middle_name')
    employee_lname = serializers.ReadOnlyField(source='employee.last_name')

    class Meta:
        model = InboundStock
        fields = '__all__'

    def create(self, validated_data):
        inbound_stock_items_data = validated_data.pop('inboundStockItems')

        # Create the InboundStock object
        inbound_stock = InboundStock.objects.create(**validated_data)

        # Create related InboundStockItem objects
        for item_data in inbound_stock_items_data:
            inventory = item_data['inventory']
            quantity = item_data['quantity']

            # Create the item and link it to the stock
            InboundStockItem.objects.create(
                inbound_stock=inbound_stock,
                inventory=inventory,
                quantity=quantity
            )

            # Update inventory stock
            inventory.stock += quantity
            inventory.save()

        return inbound_stock

# INVENTORY
class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'
        depth = 1

# ORDER MANAGEMENT
class PaymentSerializer(serializers.ModelSerializer):
    order = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all(), required=False)

    class Meta:
        model = Payment
        fields = '__all__'

class OrderTrackingSerializer(serializers.ModelSerializer):
    order = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all(), required=False)

    class Meta:
        model = OrderTracking
        fields = '__all__'

class OrderDetailsSerializer(serializers.ModelSerializer):
    order = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all(), required=False)
    inventory = serializers.PrimaryKeyRelatedField(queryset=Inventory.objects.all())
    product_price = serializers.DecimalField(decimal_places=2, max_digits=10, required=False)
    quantity = serializers.IntegerField(required=True)  
    
    class Meta:
        model = OrderDetails
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    account = serializers.PrimaryKeyRelatedField(queryset=Account.objects.all(), required=False)
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all(), required=False)
    employee = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), required=True)
    order_details = OrderDetailsSerializer(many=True)
    order_tracking = OrderTrackingSerializer(read_only=True)
    payment = PaymentSerializer(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):
        order_details_data = validated_data.pop('order_details')

        for order_detail_data in order_details_data:
            inventory_item = order_detail_data['inventory']
            quantity = order_detail_data['quantity']

            if quantity <= 0:
                raise ValidationError("Quantity must be greater than 0.")

            if inventory_item.stock < quantity:
                raise ValidationError(f"Not enough stock for {inventory_item.product.product_name}. Available: {inventory_item.stock}, Requested: {quantity}")
        
        order = Order.objects.create(**validated_data)
        total_balance = 0

        for order_detail_data in order_details_data:
            inventory_item = order_detail_data['inventory']
            quantity = order_detail_data['quantity']
            product_price = order_detail_data.get('product_price')

            total_balance += product_price * quantity

            # Create the order details
            OrderDetails.objects.create(order=order, **order_detail_data)
        
        OrderTracking.objects.create(order=order, status="unvalidated")
        Payment.objects.create(order=order, total_balance=total_balance)

        return order

# @api_view(['POST'])
# def create_order(request):
#     try:
#         serializer = OrderSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             order = serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#     except ValidationError as e:
#         # Capture the validation error and send the detailed error message
#         return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
#     except Exception as e:
#         # Handle unexpected errors
#         return Response({'detail': 'An unexpected error occurred. Please try again.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# MISC
class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'

