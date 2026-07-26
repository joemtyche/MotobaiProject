from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status, serializers
from rest_framework.response import Response
from .serializers import (
        UserSerializer, ProductSerializer, InventorySerializer, 
        AccountSerializer, OrderDetailsSerializer, OrderSerializer, 
        OrderTrackingSerializer, CustomerSerializer, EmployeeSerializer, 
        SupplierSerializer, InboundStockSerializer, PaymentSerializer, OutboundStockSerializer
    )
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import (
        Product, Inventory, Account, 
        Order, OrderDetails, OrderTracking, 
        Customer, Employee, Supplier, 
        InboundStock, Payment, OutboundStock
    )

from django.core.exceptions import ValidationError as DjangoValidationError


# USER
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# PRODUCT
class ProductCreate(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    # def post(self, request):
    #     product_name = request.data.get("product_name")
    #     price = request.data.get("price")
    #     product_type = request.data.get("product_type")
    #     description = request.data.get("description")
    #     brand = request.data.get("brand")
    #     vehicle_type = request.data.get("vehicle_type")
    #     stock_minimum_threshold = request.data.get("stock_minimum_threshold")

    #     errors = []  # List to store validation errors

    #     # Validate stock_minimum_threshold
    #     if stock_minimum_threshold is None or stock_minimum_threshold == '':
    #         errors.append("Please provide a valid stock minimum threshold.")
    #     else:
    #         try:
    #             stock_minimum_threshold = int(stock_minimum_threshold)
    #             if stock_minimum_threshold <= 0:
    #                 errors.append("Stock minimum threshold must be greater than 0.")
    #         except ValueError:
    #             errors.append("Invalid stock minimum threshold. Please provide a valid number.")

    #     # If there are any errors, return them
    #     if errors:
    #         return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)

        
    #     product = Product(
    #         product_name=product_name,
    #         price=price,
    #         product_type=product_type,
    #         description=description,
    #         brand=brand,
    #         vehicle_type=vehicle_type,
    #     )
        
    #     try:
    #         product.full_clean()
    #         product.save()
    #         return Response({"message": "Product created successfully!"}, status=status.HTTP_201_CREATED)
    #     except DjangoValidationError as e:
    #         return Response({"errors": e.message_dict}, status=status.HTTP_400_BAD_REQUEST)

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated] 

class ProductUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

class ProductDeleteView(generics.DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

# Account
class AccountAdd(generics.CreateAPIView):
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Extract data from request
        account = request.data.get("account")
        phone_number = request.data.get("phone_number")
        representative_name = request.data.get("representative_name")
        representative_position = request.data.get("representative_position")
        city = request.data.get("city")
        barangay = request.data.get("barangay")
        street = request.data.get("street")
        email = request.data.get("email")
        
        # Create a new customer instance
        account = Account(
            account=account,
            phone_number=phone_number, 
            representative_name=representative_name, 
            representative_position=representative_position, 
            city=city, 
            barangay=barangay, 
            street=street, 
            email=email,
            )
        
        try:
            account.full_clean()  # Calls clean() and validates the model
            account.save()  # Save if validation passes
            return Response({"message": "Account created successfully!"}, status=status.HTTP_201_CREATED)
        except DjangoValidationError as e:
            # Handle validation errors and return to frontend
            return Response({"errors": e.message_dict}, status=status.HTTP_400_BAD_REQUEST)

class AccountListView(generics.ListAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

class AccountUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

class AccountDeleteView(generics.DestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

class AccountSoftDeleteView(generics.UpdateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        # Get the instance of the account
        instance = self.get_object()

        # Set the 'is_deleted' field to True
        instance.is_deleted = True
        instance.save()

        # You can optionally return the updated instance
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

# Customer
class CustomerAdd(generics.CreateAPIView):
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Extract data from request
        customer_name = request.data.get("customer_name")
        phone_number = request.data.get("phone_number")
        
        # Create a new customer instance
        customer = Customer(customer_name=customer_name, phone_number=phone_number)

        try:
            customer.full_clean()  # Calls clean() and validates the model
            customer.save()  # Save if validation passes
            return Response({"message": "Customer created successfully!"}, status=status.HTTP_201_CREATED)
        except DjangoValidationError as e:
            # Handle validation errors and return to frontend
            return Response({"errors": e.message_dict}, status=status.HTTP_400_BAD_REQUEST)


class CustomerListView(generics.ListAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

class CustomerUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        try:
            instance = serializer.save()  # Save the updated instance
            instance.full_clean()  # Perform model-level validation
        except DjangoValidationError as e:
            # Raise DRF ValidationError with model validation errors
            raise serializers.ValidationError(e.message_dict)

class CustomerDeleteView(generics.DestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

class CustomerSoftDeleteView(generics.UpdateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        # Get the instance of the account
        instance = self.get_object()

        # Set the 'is_deleted' field to True
        instance.is_deleted = True
        instance.save()

        # You can optionally return the updated instance
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

# ORDER
class OrderDetailView(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer 
    permission_classes = [IsAuthenticated]

class OrderAdd(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

class OrderListView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

class OrderDetailsAdd(generics.CreateAPIView):
    serializer_class = OrderDetailsSerializer
    permission_classes = [IsAuthenticated]

class OrderDetailsListView(generics.ListAPIView):
    queryset = OrderDetails.objects.all()
    serializer_class = OrderDetailsSerializer
    permission_classes = [IsAuthenticated]

class OrderDetailDetailView(generics.RetrieveAPIView):
    queryset = OrderDetails.objects.all()
    serializer_class = OrderDetailsSerializer 
    permission_classes = [IsAuthenticated]

class OrderDetailUpdateView(generics.RetrieveUpdateAPIView):
    queryset = OrderDetails.objects.all()
    serializer_class = OrderDetailsSerializer
    permission_classes = [IsAuthenticated]

class OrderTrackingCreate(generics.CreateAPIView):
    serializer_class = OrderTrackingSerializer
    permission_classes = [IsAuthenticated]

class OrderTrackingListView(generics.ListAPIView):
    queryset = OrderTracking.objects.all()
    serializer_class = OrderTrackingSerializer
    permission_classes = [IsAuthenticated]

class OrderTrackingUpdateView(generics.RetrieveUpdateAPIView):
    queryset = OrderTracking.objects.all()
    serializer_class = OrderTrackingSerializer
    permission_classes = [IsAuthenticated]

class PaymentCreate(generics.CreateAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

class PaymentListView(generics.ListAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

# INVENTORY
class InventoryListView(generics.ListAPIView):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer
    permission_classes = [IsAuthenticated] 

class InventoryAdd(generics.CreateAPIView):
    serializer_class = InventorySerializer
    permission_classes = [IsAuthenticated] 

class InventoryUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer
    permission_classes = [IsAuthenticated]

class InventoryDetailView(generics.RetrieveAPIView):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer
    permission_classes = [IsAuthenticated]

class InventorySoftDeleteView(generics.UpdateAPIView):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        # Get the instance of the account
        instance = self.get_object()

        # Set the 'is_deleted' field to True
        instance.is_deleted = True
        instance.save()

        # You can optionally return the updated instance
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

# Employee
class EmployeeAdd(generics.CreateAPIView):
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        first_name = request.data.get("first_name")
        middle_name = request.data.get("middle_name")
        last_name = request.data.get("last_name")
        city = request.data.get("city")
        barangay = request.data.get("barangay")
        street = request.data.get("street")
        phone_number = request.data.get("phone_number")
        email = request.data.get("email")
        
        new_employee = Employee(
            first_name=first_name,
            middle_name=middle_name,
            last_name=last_name,
            city=city,
            barangay=barangay,
            street=street,
            phone_number=phone_number,
            email=email,
        )
        
        try:
            new_employee.full_clean()  
            new_employee.save()
            
            return Response({"message": "Employee created successfully!"}, status=status.HTTP_201_CREATED)
        
        except DjangoValidationError as e:
            return Response({"errors": e.message_dict}, status=status.HTTP_400_BAD_REQUEST)




class EmployeeListView(generics.ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated]

class EmployeeUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated]

class EmployeeDeleteView(generics.DestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated]

class EmployeeSoftDeleteView(generics.UpdateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        # Get the instance of the account
        instance = self.get_object()

        # Set the 'is_deleted' field to True
        instance.is_deleted = True
        instance.save()

        # You can optionally return the updated instance
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
# Supplier
class SupplierAdd(generics.CreateAPIView):
    serializer_class = SupplierSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Extract data from request
        supplier_name = request.data.get("supplier_name")
        phone_number = request.data.get("phone_number")
        description = request.data.get("description")
        
        # Create a new customer instance
        supplier = Supplier(
            supplier_name=supplier_name,
            phone_number=phone_number, 
            description=description, 
            )
        
        try:
            supplier.full_clean()  # Calls clean() and validates the model
            supplier.save()  # Save if validation passes
            return Response({"message": "Supplier created successfully!"}, status=status.HTTP_201_CREATED)
        except DjangoValidationError as e:
            # Handle validation errors and return to frontend
            return Response({"errors": e.message_dict}, status=status.HTTP_400_BAD_REQUEST)

class SupplierListView(generics.ListAPIView):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    permission_classes = [IsAuthenticated]

class SupplierUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    permission_classes = [IsAuthenticated]

class SupplierDeleteView(generics.DestroyAPIView):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    permission_classes = [IsAuthenticated]

class SupplierSoftDeleteView(generics.UpdateAPIView):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        # Get the instance of the account
        instance = self.get_object()

        # Set the 'is_deleted' field to True
        instance.is_deleted = True
        instance.save()

        # You can optionally return the updated instance
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
# InboundStock
class InboundStockCreateView(generics.CreateAPIView):
    queryset = InboundStock.objects.all()
    serializer_class = InboundStockSerializer
    permission_classes = [IsAuthenticated]

class InboundStockListView(generics.ListAPIView):
    queryset = InboundStock.objects.all()
    serializer_class = InboundStockSerializer
    permission_classes = [IsAuthenticated]

class OutboundStockCreateView(generics.CreateAPIView):
    queryset = OutboundStock.objects.all()
    serializer_class = OutboundStockSerializer
    permission_classes = [IsAuthenticated]

class OutboundStockListView(generics.ListAPIView):
    queryset = OutboundStock.objects.all()
    serializer_class = OutboundStockSerializer
    permission_classes = [IsAuthenticated]

