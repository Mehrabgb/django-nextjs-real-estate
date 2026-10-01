from pathlib import Path

from django.core.files import File
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.db import connection
from django.core.management.color import no_style

from users.models import Seller, Client, Notification
from properties.models import Property, PropertyImage, Favorites


class Command(BaseCommand):
    help = "Create demo data for the real estate project."

    def handle(self, *args, **options):

        base_dir = Path(__file__).resolve().parents[3]
        images_dir = base_dir / "seed_data" / "images"

        self.stdout.write("Creating demo data...")

        # ---------------------------------------------------------
        # USERS
        # ---------------------------------------------------------

        users = {}

        demo_users = [
            {
                "id": 1,
                "username": "seller1",
                "password": "Demo12345!",
            },
            {
                "id": 2,
                "username": "seller2",
                "password": "Demo12345!",
            },
            {
                "id": 3,
                "username": "client1",
                "password": "Demo12345!",
            },
            {
                "id": 4,
                "username": "client2",
                "password": "Demo12345!",
            },
        ]

        for data in demo_users:

            user, created = User.objects.get_or_create(
                id=data["id"],
                defaults={
                    "username": data["username"],
                },
            )

            user.username = data["username"]

            if created:
                user.set_password(data["password"])

            user.save()

            users[data["username"]] = user

        # ---------------------------------------------------------
        # SELLERS
        # ---------------------------------------------------------

        seller1, _ = Seller.objects.get_or_create(
            id=1,
            defaults={
                "user": users["seller1"],
                "bio": (
                    "Experienced real estate agent specializing "
                    "in residential properties."
                ),
                "number": "09120000001",
            },
        )

        seller1.user = users["seller1"]
        seller1.bio = (
            "Experienced real estate agent specializing "
            "in residential properties."
        )
        seller1.number = "09120000001"

        self.attach_image(
            seller1,
            "image",
            images_dir / "seller1.jpg",
        )

        seller1.save()

        seller2, _ = Seller.objects.get_or_create(
            id=2,
            defaults={
                "user": users["seller2"],
                "bio": (
                    "Real estate consultant focused on villas, "
                    "land, and luxury properties."
                ),
                "number": "09120000002",
            },
        )

        seller2.user = users["seller2"]
        seller2.bio = (
            "Real estate consultant focused on villas, "
            "land, and luxury properties."
        )
        seller2.number = "09120000002"

        self.attach_image(
            seller2,
            "image",
            images_dir / "seller2.jpg",
        )

        seller2.save()

        # ---------------------------------------------------------
        # CLIENTS
        # ---------------------------------------------------------

        client1, _ = Client.objects.get_or_create(
            id=1,
            defaults={
                "user": users["client1"],
            },
        )

        client1.user = users["client1"]
        client1.save()

        client2, _ = Client.objects.get_or_create(
            id=2,
            defaults={
                "user": users["client2"],
            },
        )

        client2.user = users["client2"]
        client2.save()

        # ---------------------------------------------------------
        # PROPERTIES
        # ---------------------------------------------------------

        properties_data = [
            {
                "id": 1,
                "seller": seller1,
                "title": "Modern Apartment in Tehran",
                "category": "apartment",
                "city": 1,
                "description": (
                    "A modern apartment with a beautiful city view, "
                    "large windows, modern furniture and excellent "
                    "natural light."
                ),
                "address": "Tehran, Saadat Abad",
                "size": 145,
                "building_age": 3,
                "room_numbers": 3,
                "has_parking": True,
                "rating": 4.70,
                "rating_times": 12,
                "main_image": "property1-main.jpg",
                "gallery": [
                    "property1-1.jpg",
                    "property1-2.jpg",
                ],
            },
            {
                "id": 2,
                "seller": seller2,
                "title": "Luxury Villa with Swimming Pool",
                "category": "villa",
                "city": 20,
                "description": (
                    "A spacious luxury villa with a private swimming "
                    "pool, large garden and modern interior."
                ),
                "address": "Sari, Darya Kenar",
                "size": 420,
                "building_age": 2,
                "room_numbers": 5,
                "has_parking": True,
                "rating": 4.90,
                "rating_times": 18,
                "main_image": "property2-main.jpg",
                "gallery": [
                    "property2-1.jpg",
                    "property2-2.jpg",
                ],
            },
            {
                "id": 3,
                "seller": seller1,
                "title": "Family House in Shiraz",
                "category": "house",
                "city": 4,
                "description": (
                    "A comfortable family house in a quiet neighborhood "
                    "with a landscaped garden."
                ),
                "address": "Shiraz, Maali Abad",
                "size": 230,
                "building_age": 7,
                "room_numbers": 4,
                "has_parking": True,
                "rating": 4.40,
                "rating_times": 9,
                "main_image": "property3-main.jpg",
                "gallery": [
                    "property3-1.jpg",
                    "property3-2.jpg",
                ],
            },
            {
                "id": 4,
                "seller": seller2,
                "title": "Modern Office in Tehran",
                "category": "office",
                "city": 1,
                "description": (
                    "A modern office space with large windows, "
                    "meeting room and professional interior."
                ),
                "address": "Tehran, Vanak",
                "size": 180,
                "building_age": 4,
                "room_numbers": 4,
                "has_parking": True,
                "rating": 4.20,
                "rating_times": 7,
                "main_image": "property4-main.jpg",
                "gallery": [
                    "property4-1.jpg",
                    "property4-2.jpg",
                ],
            },
            {
                "id": 5,
                "seller": seller2,
                "title": "Large Land Near the Mountains",
                "category": "land",
                "city": 15,
                "description": (
                    "A large piece of land in a peaceful area with "
                    "mountain views and easy road access."
                ),
                "address": "Kerman, outskirts",
                "size": 1200,
                "building_age": 0,
                "room_numbers": 0,
                "has_parking": False,
                "rating": 4.10,
                "rating_times": 5,
                "main_image": "property5-main.jpg",
                "gallery": [
                    "property5-1.jpg",
                    "property5-2.jpg",
                ],
            },
        ]

        created_properties = {}

        for data in properties_data:

            property_obj, _ = Property.objects.get_or_create(
                id=data["id"],
                defaults={
                    "seller": data["seller"],
                    "title": data["title"],
                    "category": data["category"],
                    "city": data["city"],
                    "description": data["description"],
                    "address": data["address"],
                    "size": data["size"],
                    "building_age": data["building_age"],
                    "room_numbers": data["room_numbers"],
                    "has_parking": data["has_parking"],
                    "rating": data["rating"],
                    "rating_times": data["rating_times"],
                },
            )

            property_obj.seller = data["seller"]
            property_obj.title = data["title"]
            property_obj.category = data["category"]
            property_obj.city = data["city"]
            property_obj.description = data["description"]
            property_obj.address = data["address"]
            property_obj.size = data["size"]
            property_obj.building_age = data["building_age"]
            property_obj.room_numbers = data["room_numbers"]
            property_obj.has_parking = data["has_parking"]
            property_obj.rating = data["rating"]
            property_obj.rating_times = data["rating_times"]

            # Main image
            main_image = images_dir / data["main_image"]

            if main_image.exists() and not property_obj.main_image:

                with main_image.open("rb") as image_file:

                    property_obj.main_image.save(
                        main_image.name,
                        File(image_file),
                        save=False,
                    )

            elif not main_image.exists():

                self.stdout.write(
                    self.style.WARNING(
                        f"Image not found: {main_image}"
                    )
                )

            property_obj.save()

            created_properties[data["id"]] = property_obj

            # Recreate gallery images
            PropertyImage.objects.filter(
                property=property_obj
            ).delete()

            for image_name in data["gallery"]:

                image_path = images_dir / image_name

                if not image_path.exists():

                    self.stdout.write(
                        self.style.WARNING(
                            f"Image not found: {image_path}"
                        )
                    )

                    continue

                with image_path.open("rb") as image_file:

                    PropertyImage.objects.create(
                        property=property_obj,
                        ai_generated=False,
                        image=File(
                            image_file,
                            name=image_path.name,
                        ),
                    )

        # ---------------------------------------------------------
        # FAVORITES
        # ---------------------------------------------------------

        Favorites.objects.get_or_create(
            client=client1,
            property=created_properties[1],
        )

        Favorites.objects.get_or_create(
            client=client1,
            property=created_properties[2],
        )

        Favorites.objects.get_or_create(
            client=client2,
            property=created_properties[3],
        )

        # ---------------------------------------------------------
        # NOTIFICATIONS
        # ---------------------------------------------------------

        Notification.objects.get_or_create(
            user=users["seller1"],
            message="Your property received a new rating.",
            defaults={
                "is_read": False,
            },
        )

        Notification.objects.get_or_create(
            user=users["seller1"],
            message="A client added your property to their favorites.",
            defaults={
                "is_read": False,
            },
        )

        Notification.objects.get_or_create(
            user=users["client1"],
            message="Your favorite property has been updated.",
            defaults={
                "is_read": False,
            },
        )

        Notification.objects.get_or_create(
            user=users["client2"],
            message="Welcome to the Real Estate platform.",
            defaults={
                "is_read": True,
            },
        )

        # ---------------------------------------------------------
        # FIX POSTGRESQL SEQUENCES
        # ---------------------------------------------------------

        # Demo users/properties use fixed IDs.
        # PostgreSQL's auto-increment sequences must be
        # updated so future registrations get a free ID.

        models_to_reset = [
            User,
            Seller,
            Client,
            Property,
            PropertyImage,
            Favorites,
            Notification,
        ]

        sql = connection.ops.sequence_reset_sql(
            no_style(),
            models_to_reset,
        )

        with connection.cursor() as cursor:

            for query in sql:
                cursor.execute(query)

        # ---------------------------------------------------------
        # DONE
        # ---------------------------------------------------------

        self.stdout.write(
            self.style.SUCCESS(
                "Demo data created successfully."
            )
        )

    @staticmethod
    def attach_image(instance, field_name, image_path):

        if not image_path.exists():

            print(
                f"Warning: image not found: {image_path}"
            )

            return

        field = getattr(instance, field_name)

        if field:
            return

        with image_path.open("rb") as image_file:

            field.save(
                image_path.name,
                File(image_file),
                save=False,
            )