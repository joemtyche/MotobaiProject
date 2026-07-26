from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import (
        Product, Inventory, Account, Order, OrderDetails,
        OrderTracking, Customer, Employee, Supplier, 
        InboundStock, InboundStockItem, Payment, OutboundStock, OutboundStockItem
    )


# USER
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {
            "username": {
                "error_messages": {
                    "blank": "Please enter a username.",
                    "required": "Please enter a username.",
                    "unique": "Username already exists.",
                }
            },
            "password": {
                "write_only": True,
                "error_messages": {
                    "blank": "Please enter a password.",
                    "required": "Please enter a password.",
                },
            },
        }

    def validate_username(self, value):
        username = value.strip()

        if User.objects.filter(username__iexact=username).exists():
            raise serializers.ValidationError("Username already exists.")

        return username

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class LocalTokenObtainPairSerializer(TokenObtainPairSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields[self.username_field].error_messages.update({
            "blank": "Please enter a username.",
            "required": "Please enter a username.",
        })
        self.fields["password"].error_messages.update({
            "blank": "Please enter a password.",
            "required": "Please enter a password.",
        })

    def validate(self, attrs):
        username = attrs.get(self.username_field, "").strip()
        password = attrs.get("password", "")

        if not username:
            raise serializers.ValidationError({"username": "Please enter a username."})

        if not password:
            raise serializers.ValidationError({"password": "Please enter a password."})

        try:
            user = User.objects.get(username__iexact=username)
        except User.DoesNotExist:
            raise serializers.ValidationError({"username": "Username does not exist."})

        if not user.check_password(password):
            raise serializers.ValidationError({"password": "Incorrect password."})

        if not user.is_active:
            raise serializers.ValidationError({"detail": "This account is disabled."})

        attrs[self.username_field] = user.get_username()
        return super().validate(attrs)

# PRODUCT
class ProductSerializer(serializers.ModelSerializer):
    stock_minimum_threshold = serializers.IntegerField(write_only=True, required=True)
    product_price = serializers.DecimalField(decimal_places=2, max_digits=10, required=False)

    class Meta:
        model = Product
        fields = '__all__'

    def create(self, validated_data):
        stock_minimum_threshold = validated_data.pop('stock_minimum_threshold', None)

        if stock_minimum_threshold is None or stock_minimum_threshold <= 0:
            raise ValidationError("Please input a valid minimum stock threshold")
        
        # Create the product
        product = super().create(validated_data)

        # Add the product to the inventory with default values
        Inventory.objects.create(product=product, stock=0, stock_minimum_threshold=stock_minimum_threshold)

        return product
    
    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)

        stock_minimum_threshold = validated_data.get('stock_minimum_threshold', None)

        if stock_minimum_threshold is None or stock_minimum_threshold <= 0:
            raise ValidationError("Please input a valid minimum stock threshold")
        
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

        for item_data in inbound_stock_items_data:
            quantity = item_data['quantity']

            if quantity is None or quantity <= 0 or quantity is "":
                raise ValidationError("Please input a valid quantity")

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

# STOCKOUT
class OutboundStockItemSerializer(serializers.ModelSerializer):
    inventory = serializers.PrimaryKeyRelatedField(queryset=Inventory.objects.all())
    product = ProductSerializer(source='inventory.product', read_only=True)

    class Meta:
        model = OutboundStockItem
        fields = '__all__'
        depth = 1

class OutboundStockSerializer(serializers.ModelSerializer):
    outboundStockItems = OutboundStockItemSerializer(many=True)
    employee = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all())
    employee_fname = serializers.ReadOnlyField(source='employee.first_name')
    employee_mname = serializers.ReadOnlyField(source='employee.middle_name')
    employee_lname = serializers.ReadOnlyField(source='employee.last_name')

    class Meta:
        model = OutboundStock
        fields = '__all__'

    def create(self, validated_data):
        outbound_stock_items_data = validated_data.pop('outboundStockItems')

        for item_data in outbound_stock_items_data:
            print(item_data)
            quantity = item_data['quantity']
            inventory = item_data['inventory']  # Might already be an Inventory object
            if isinstance(inventory, Inventory):
                inventory_id = inventory.id
            else:
                inventory_id = inventory

            try:
            # Fetch the Inventory object
                inventory = Inventory.objects.get(id=inventory_id)
            except Inventory.DoesNotExist:
                raise ValidationError(f"Inventory with ID {inventory_id} does not exist.")

            # Validate quantity
            if quantity is None or quantity <= 0:
                raise ValidationError("Please input a valid quantity.")

            if inventory.stock < quantity:
                raise ValidationError(
                    f"Insufficient stock in inventory for item '{inventory.product.product_name}'. "
                    f"Available stock: {inventory.stock}, requested quantity: {quantity}."
                )

        # Create the OutboundStock object
        outbound_stock = OutboundStock.objects.create(**validated_data)

        # Create related Outbound objects
        for item_data in outbound_stock_items_data:
            inventory = item_data['inventory']
            quantity = item_data['quantity']

            # Create the item and link it to the stock
            OutboundStockItem.objects.create(
                outbound_stock=outbound_stock,
                inventory=inventory,
                quantity=quantity
            )

            # Update inventory stock
            inventory.stock -= quantity
            inventory.save()

        return outbound_stock

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

    def update(self, instance, validated_data):
        # Update the quantity
        instance.quantity = validated_data.get('quantity', instance.quantity)
        print(instance.quantity)

        # Ensure product_price exists and is updated in the order details
        if 'product_price' in validated_data:
            instance.product_price = validated_data.get('product_price', instance.product_price)
        
        # Recalculate the balance after the update
        order = instance.order
        order_details = OrderDetails.objects.filter(order=order)

        # Recalculate initial_balance, including updated prices and quantities
        initial_balance = sum(
            detail.product_price * (detail.quantity if detail.id != instance.id else instance.quantity)
            for detail in order_details
        )

        print("initial Balance: ", initial_balance)

        # Check for any deductions that need to be applied
        deductions = order.payment.deductions
        if deductions >= initial_balance:
            raise ValidationError("Deductions must be less than the total price.")

        # Calculate the new total balance
        total_balance = initial_balance - deductions if deductions > 0 else initial_balance
        print("Total Balance: ", total_balance)

        # Update the order's payment balance fields
        order.payment.initial_balance = initial_balance
        order.payment.total_balance = total_balance
        order.payment.save()

        # Save the updated order detail
        instance.save()
        order.save()  # Ensure the order is saved after the changes

        if hasattr(order, 'order_tracking'):
            order.order_tracking.save()

        return instance


class OrderSerializer(serializers.ModelSerializer):
    account = serializers.PrimaryKeyRelatedField(queryset=Account.objects.all(), required=False)
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all(), required=False)
    employee = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), required=True)
    customer = CustomerSerializer(read_only=True)
    order_details = OrderDetailsSerializer(many=True)
    order_tracking = OrderTrackingSerializer(read_only=True)
    payment = PaymentSerializer(read_only=True)
    deductions = serializers.DecimalField(max_digits=10, decimal_places=2, required=False)


    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):
        order_details_data = validated_data.pop('order_details')

        if validated_data.get('order_type') == "Walkin":
            customer_name = validated_data.get('customer_name')
            phone_number = validated_data.get('phone_number')
            if customer_name is None or customer_name is "":
                raise ValidationError("Please input customer name.") 
            
            if len(phone_number) != 11 and len(phone_number) > 0:
                raise ValidationError("Phone number must be exactly 11 digits.")

            
            Customer.objects.create(customer_name = customer_name, phone_number=phone_number)
         
        for order_detail_data in order_details_data:
            inventory_item = order_detail_data['inventory']
            quantity = order_detail_data['quantity']

            if quantity <= 0:
                raise ValidationError("Quantity must be greater than 0.")

            if inventory_item.stock < quantity:
                raise ValidationError(f"Not enough stock for {inventory_item.product.product_name}. Available: {inventory_item.stock}, Requested: {quantity}")
            
        deductions = validated_data.get('deductions', 0)  

        print(deductions)

        initial_balance = 0
        total_balance = 0
        for order_detail_data in order_details_data:
            inventory_item = order_detail_data['inventory']
            quantity = order_detail_data['quantity']
            product_price = order_detail_data.get('product_price')

            initial_balance += product_price * quantity

        if deductions >= initial_balance:
            raise ValidationError("Deductions must be less than the total price.")

        total_balance = initial_balance - deductions if deductions > 0 else initial_balance

        order = Order.objects.create(**validated_data)
        for order_detail_data in order_details_data:
            OrderDetails.objects.create(order=order, **order_detail_data)

        
        OrderTracking.objects.create(order=order, status="unvalidated")
        Payment.objects.create(order=order, total_balance=total_balance, initial_balance=initial_balance, deductions=deductions)

        return order

# MISC
class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'
