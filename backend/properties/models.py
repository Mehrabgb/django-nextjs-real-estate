from django.db import models
from users.models import Seller,Client
# Create your models here.
class Property(models.Model):
    city = [
        (1, "Tehran"),
        (2, "Mashhad"),
        (3, "Isfahan"),
        (4, "Shiraz"),
        (5, "Tabriz"),
        (6, "Karaj"),
        (7, "Qom"),
        (8, "Ahvaz"),
        (9, "Kermanshah"),
        (10, "Rasht"),
        (11, "Urmia"),
        (12, "Yazd"),
        (13, "Arak"),
        (14, "Hamadan"),
        (15, "Kerman"),
        (16, "Qazvin"),
        (17, "Zahedan"),
        (18, "Sanandaj"),
        (19, "Bandar Abbas"),
        (20, "Sari"),
    ]
    category=[
        ("apartment", "Apartment"),
        ("house", "House"),
        ("villa", "Villa"),
        ("office", "Office"),
        ("land", "Land")]
    seller=models.ForeignKey(Seller,on_delete=models.CASCADE,related_name='properties')
    title=models.CharField(max_length=200)
    main_image=models.ImageField(upload_to='properties/main/',blank=True,null=True)
    category=models.CharField(max_length=50,choices=category)
    created_at=models.DateTimeField(auto_now_add=True)
    rating_times=models.PositiveIntegerField(default=0)
    rating = models.DecimalField(max_digits=3,decimal_places=2,default=0)
    description=models.TextField()
    address=models.TextField()
    size=models.PositiveIntegerField(default=0)
    building_age=models.PositiveIntegerField(default=0)
    room_numbers=models.PositiveIntegerField(default=0)
    has_parking=models.BooleanField(default=False)
    city=models.IntegerField(choices=city)
    def __str__(self):
            return self.title

class PropertyImage(models.Model):
    property=models.ForeignKey(Property,on_delete=models.CASCADE,related_name='images')
    ai_generated=models.BooleanField(default=False)
    image=models.ImageField(upload_to='properties/')
    def __str__(self):
            return self.property.title

class Favorites(models.Model):
     client=models.ForeignKey(Client,on_delete=models.CASCADE,related_name='favorites')
     property=models.ForeignKey(Property,on_delete=models.CASCADE)
     class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["client", "property"],name="unique_client_property_favorite")]