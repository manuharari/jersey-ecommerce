# ecommerce-platform/backend/shop/urls.py
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

urlpatterns = [
    # Product URLs - Separate LIST and CREATE
    path('products/', views.ProductListView.as_view(), name='product-list'), # GET for listing
    path('products/create/', views.ProductCreateView.as_view(), name='product-create'), # POST for creating
    path('products/<int:pk>/', views.ProductDetailView.as_view(), name='product-detail'), # GET, PUT, PATCH, DELETE for single product
    
    # Order URLs
    path('orders/', views.OrderCreateView.as_view(), name='order-create'),
    path('orders/<int:pk>/', views.OrderDetailView.as_view(), name='order-detail'),
    
    # AI description endpoint
    path('ai/describe/', views.generate_ai_description, name='ai-describe'),
    
    # Authentication URLs
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
