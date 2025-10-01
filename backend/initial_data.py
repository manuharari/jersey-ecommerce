"""
Script to populate the database with initial data.
"""
from django.contrib.auth.models import User
from shop.models import Product

def create_initial_data():
    # Create superuser
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='admin123'
        )
        print("Superuser 'admin' created with password 'admin123'")

    # Create demo products if none exist
    if not Product.objects.exists():
        products_data = [
            {
                'name': 'Mexico Home Jersey 2026',
                'description': 'Official Mexico national team home jersey for the 2026 FIFA World Cup. Features authentic design and breathable fabric.',
                'price': 129.99,
                'stock': 50,
                'image_url': 'https://placehold.co/300x300/1E40AF/FFFFFF?text=MEX+Home',
                'category': 'Home'
            },
            {
                'name': 'Brazil Home Jersey 2026',
                'description': 'Official Brazil national team home jersey for the 2026 FIFA World Cup. Classic yellow design with modern technology.',
                'price': 139.99,
                'stock': 35,
                'image_url': 'https://placehold.co/300x300/F59E0B/FFFFFF?text=BRA+Home',
                'category': 'Home'
            },
            {
                'name': 'Argentina Away Jersey 2026',
                'description': 'Official Argentina national team away jersey for the 2026 FIFA World Cup. Modern design with blue and white stripes.',
                'price': 134.99,
                'stock': 40,
                'image_url': 'https://placehold.co/300x300/60A5FA/FFFFFF?text=ARG+Away',
                'category': 'Away'
            },
            {
                'name': 'USA Home Jersey 2026',
                'description': 'Official USA national team home jersey for the 2026 FIFA World Cup. Red, white and blue design with modern fit.',
                'price': 124.99,
                'stock': 45,
                'image_url': 'https://placehold.co/300x300/DC2626/FFFFFF?text=USA+Home',
                'category': 'Home'
            },
            {
                'name': 'Spain Home Jersey 2026',
                'description': 'Official Spain national team home jersey for the 2026 FIFA World Cup. Classic red design with modern performance fabric.',
                'price': 139.99,
                'stock': 30,
                'image_url': 'https://placehold.co/300x300/DC2626/FFFFFF?text=ESP+Home',
                'category': 'Home'
            }
        ]
        
        for product_data in products_data: # Fixed: was 'products_' previously
            Product.objects.create(**product_data)
        
        print(f"Created {len(products_data)} demo products")

if __name__ == '__main__':
    import os
    import django
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    django.setup()
    
    create_initial_data()