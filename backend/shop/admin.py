# ecommerce-platform/backend/shop/admin.py
from django.contrib import admin
from .models import Product, Order # Import OrderItem if you have it

# Register your models here.
# Django admin will automatically create CRUD interfaces for these models

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock', 'category')
    list_filter = ('category',)
    search_fields = ('name', 'description')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total_price', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    date_hierarchy = 'created_at'
    # readonly_fields = ('created_at', 'updated_at') # Often useful for timestamps

# If you have an OrderItem model defined in models.py, uncomment and use this:
# @admin.register(OrderItem)
# class OrderItemAdmin(admin.ModelAdmin):
#     list_display = ('order', 'product', 'quantity', 'price')
#     list_filter = ('order', 'product')