from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Seller, Client
from properties.models import Property, Favorites


class FavoritesAPITests(APITestCase):

    def setUp(self):
        self.seller_user = User.objects.create_user(
            username="seller",
            password="testpass123"
        )

        self.seller = Seller.objects.create(
            user=self.seller_user
        )

        self.client_user = User.objects.create_user(
            username="client",
            password="testpass123"
        )

        self.client_profile = Client.objects.create(
            user=self.client_user
        )

        self.property = Property.objects.create(
            seller=self.seller,
            title="Test Property",
            category="apartment",
            description="A test property",
            address="Test address",
            size=100,
            building_age=5,
            room_numbers=2,
            has_parking=True,
            city=1,
        )

    def authenticate(self):
        refresh = RefreshToken.for_user(self.client_user)

        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}"
        )

    def test_client_can_favorite_property(self):
        self.authenticate()

        response = self.client.post(
            "/users/favorites/",
            {"property": self.property.id},
            format="json"
        )

        self.assertEqual(response.status_code, 201)

        self.assertTrue(
            Favorites.objects.filter(
                client=self.client_profile,
                property=self.property
            ).exists()
        )

    def test_client_cannot_favorite_same_property_twice(self):
        self.authenticate()

        Favorites.objects.create(
            client=self.client_profile,
            property=self.property
        )

        response = self.client.post(
            "/users/favorites/",
            {"property": self.property.id},
            format="json"
        )

        self.assertEqual(response.status_code, 400)

    def test_client_can_delete_favorite(self):
        self.authenticate()

        Favorites.objects.create(
            client=self.client_profile,
            property=self.property
        )

        response = self.client.delete(
            "/users/favorites/",
            {"property": self.property.id},
            format="json"
        )

        self.assertEqual(response.status_code, 204)

        self.assertFalse(
            Favorites.objects.filter(
                client=self.client_profile,
                property=self.property
            ).exists()
        )

    def test_delete_nonexistent_favorite_returns_404(self):
        self.authenticate()

        response = self.client.delete(
            "/users/favorites/",
            {"property": self.property.id},
            format="json"
        )

        self.assertEqual(response.status_code, 404)