# ecommerce-platform/backend/shop/views.py
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny # Ensure AllowAny is imported
from rest_framework_simplejwt.views import TokenObtainPairView
from django.http import JsonResponse
import requests
import json
from .models import Product, Order # Import OrderItem if you have it
from .serializers import ProductSerializer, OrderSerializer


# --- Separate Views for Listing (GET) and Creating (POST) ---
class ProductListView(generics.ListAPIView):
    """
    API endpoint for listing products.
    GET: Allow anyone (for browsing)
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny] # Explicitly allow anyone


class ProductCreateView(generics.CreateAPIView):
    """
    API endpoint for creating products.
    POST: Requires authentication (for adding products)
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated] # Only authenticated users


# Keep DetailView for completeness (GET, PUT, PATCH, DELETE for single product)
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint for retrieving, updating, or deleting a product.
    GET: Allow anyone (for viewing product details)
    PUT/PATCH/DELETE: Requires authentication (for modifying/deleting)
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.request.method == 'GET':
            # Anyone can retrieve a product
            permission_classes = [AllowAny]
        else:
            # Authenticated users only for update/delete (PUT, PATCH, DELETE)
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


class OrderCreateView(generics.CreateAPIView):
    """
    API endpoint for creating orders.
    Requires authentication (users must be logged in to place an order).
    """
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated] # Orders require a logged-in user


class OrderDetailView(generics.RetrieveAPIView):
    """
    API endpoint for retrieving an order.
    Requires authentication (users can only see their own orders).
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated] # Orders require a logged-in user

    def get_queryset(self):
        """
        Ensure a user can only retrieve their own orders.
        """
        user = self.request.user
        return Order.objects.filter(user=user)


@api_view(['POST'])
@permission_classes([IsAuthenticated]) # AI description generation requires auth
def generate_ai_description(request):
    """
    API endpoint to generate AI product descriptions using Ollama API.
    Requires authentication (likely for admin/management use).
    """
    try:
        # Get product details from request
        product_name = request.data.get('name', '')
        product_category = request.data.get('category', '')

        # Prepare prompt for Ollama
        prompt = f"""
        Generate a compelling product description for a {product_category} product named {product_name}.
        The description should be professional, engaging, and highlight key features.
        Keep it concise but informative.
        """

        # Prepare data for Ollama API
        ollama_data = {
            'model': 'llama2',  # Default model, can be changed
            'prompt': prompt,
            'stream': False
        }

        # Make request to Ollama API
        response = requests.post(
            'http://localhost:11434/api/generate',
            json=ollama_data,
            headers={'Content-Type': 'application/json'}
        )

        if response.status_code == 200:
            result = response.json()
            ai_description = result.get('response', 'No description generated')
            return Response({'description': ai_description})
        else:
            return Response(
                {'error': 'Failed to generate description'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


# Custom token obtain view to handle JWT authentication
class CustomTokenObtainPairView(TokenObtainPairView):
    pass
