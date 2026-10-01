from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from users.models import Seller, Client
from properties.models import Property


class PropertyAPITests(APITestCase):

    def setUp(self):
        # Seller
        self.seller_user = User.objects.create_user(
            username="seller",
            password="testpass123"
        )
        self.seller_user_2 = User.objects.create_user(
                    username="seller2",
                    password="testpass123"
                )

        self.seller = Seller.objects.create(
            user=self.seller_user
        )

        self.seller_2 = Seller.objects.create(
            user=self.seller_user_2
        )

        # Client
        self.client_user = User.objects.create_user(
            username="client",
            password="testpass123"
        )

        self.client_profile = Client.objects.create(
            user=self.client_user
        )

        self.property_data = {
            "title": "Test Property",
            "category": "apartment",
            "description": "A test property",
            "address": "Test address",
            "size": 100,
            "building_age": 5,
            "room_numbers": 2,
            "has_parking": True,
            "city": 1,
        }
        self.property = Property.objects.create(
            seller=self.seller_2,
            **self.property_data
        )

    def authenticate(self, user):
        refresh = RefreshToken.for_user(user)

        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}"
        )

    def test_unauthenticated_user_cannot_create_property(self):
        response = self.client.post(
            "/properties/create/property",
            self.property_data,
            format="json"
        )

        self.assertEqual(response.status_code, 401)

    def test_client_cannot_create_property(self):
        self.authenticate(self.client_user)

        response = self.client.post(
            "/properties/create/property",
            self.property_data,
            format="json"
        )

        self.assertEqual(response.status_code, 403)

    def test_seller_can_create_property(self):
        self.authenticate(self.seller_user)

        response = self.client.post(
            "/properties/create/property",
            self.property_data,
            format="json"
        )

        self.assertEqual(response.status_code, 201)

        self.assertEqual(
            Property.objects.filter(seller=self.seller).count(),
            1
        )

    def test_seller_cannot_delete_another_sellers_property(self):
        other_seller_user = User.objects.create_user(
            username="other_seller",
            password="testpass123"
        )

        other_seller = Seller.objects.create(
            user=other_seller_user
        )

        property = Property.objects.create(
            seller=other_seller,
            **self.property_data
        )

        self.authenticate(self.seller_user)

        response = self.client.delete(
            f"/properties/delete/{property.id}"
        )

        self.assertEqual(response.status_code, 403)

        self.assertTrue(
            Property.objects.filter(id=property.id).exists()
        )


    def test_seller_can_delete_own_property(self):
        property = Property.objects.create(
            seller=self.seller,
            **self.property_data
        )

        self.authenticate(self.seller_user)

        response = self.client.delete(
            f"/properties/delete/{property.id}"
        )

        self.assertEqual(response.status_code, 204)

        self.assertFalse(
            Property.objects.filter(id=property.id).exists()
        )

    def test_rating_must_be_between_1_and_5(self):
        self.authenticate(self.client_user)

        response = self.client.post(
            f"/properties/rate/{self.property.id}/6"
        )

        self.assertEqual(response.status_code, 400)

        self.assertEqual(
            response.data["message"],
            "rating must be between 1 and 5"
        )


    def test_valid_rating_updates_property(self):
        self.authenticate(self.client_user)

        response = self.client.post(
            f"/properties/rate/{self.property.id}/5"
        )

        self.assertEqual(response.status_code, 200)

        self.property.refresh_from_db()

        self.assertEqual(self.property.rating_times, 1)
        self.assertEqual(float(self.property.rating), 5.0)