# ecommerce-platform/backend/shop/serializers.py
from rest_framework import serializers
from .models import Product, Order # Make sure to import the models correctly


class ProductSerializer(serializers.ModelSerializer):
    """
    Serializer for Product model.
    """
    class Meta:
        model = Product
        fields = '__all__' # Or specify fields explicitly if needed


# If you have an OrderItem model and want to nest items in orders:
# class OrderItemSerializer(serializers.ModelSerializer):
#     """
#     Serializer for OrderItem model.
#     """
#     product = ProductSerializer(read_only=True)
#     product_id = serializers.PrimaryKeyRelatedField(
#         queryset=Product.objects.all(),
#         source='product',
#         write_only=True
#     )
#
#     class Meta:
#         model = OrderItem
#         fields = ['id', 'product', 'product_id', 'quantity', 'price']


class OrderSerializer(serializers.ModelSerializer):
    """
    Serializer for Order model with nested items.
    """
    # If you have OrderItemSerializer:
    # items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'total_price', 'status', 'created_at'] # Add 'items' if you have nested items
        read_only_fields = ['user'] # User is set automatically in the view

    def create(self, validated_data):
        # Handle nested item creation if you have OrderItemSerializer
        # items_data = validated_data.pop('items', [])
        order = Order.objects.create(**validated_data)

        # if items_data:
        #     for item_data in items_data:
        #         OrderItem.objects.create(order=order, **item_data)

        return order
