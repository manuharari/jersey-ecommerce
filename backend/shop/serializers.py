from rest_framework import serializers
from .models import Product, Order # Import OrderItem if you have it


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
        
        # Associate order with user if authenticated
        user = self.context['request'].user
        if user.is_authenticated:
            order.user = user
            order.save()
        # else: Anonymous order, user remains None
        
        # if items_
        #     for item_data in items_
        #         OrderItem.objects.create(order=order, **item_data)

        return order
