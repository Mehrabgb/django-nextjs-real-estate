from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Seller(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    image=models.ImageField(upload_to='users/sellers/',blank=True,null=True)
    bio=models.TextField(blank=True,null=True)
    created_at=models.DateField(auto_now_add=True)
    number=models.CharField(max_length=20,blank=True,null=True)
    def __str__(self):
        return self.user.username
 
class Client(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    image=models.ImageField(upload_to='users/clients/',blank=True,null=True)
    created_at=models.DateField(auto_now_add=True)
    def __str__(self):
        return self.user.username


class Notification(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="notifications")
    message = models.CharField(max_length=255)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
            return self.user.username
