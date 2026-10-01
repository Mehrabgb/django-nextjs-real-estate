from django.db import transaction
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from .models import Seller,Client,Notification
from properties.serializers import PropertySerializer
from properties.models import Favorites
from properties.models import Property

class SellerSerializer(serializers.ModelSerializer):
    role = serializers.CharField(default="seller", read_only=True)
    username=serializers.CharField(source='user.username',read_only=True )
    email=serializers.EmailField(source='user.email',read_only=True )
    class Meta:
        model = Seller
        fields='__all__'
        read_only_fields = ["role",'user']

class ClientSerializer(serializers.ModelSerializer):
    role = serializers.CharField(default="client", read_only=True)
    username=serializers.CharField(source='user.username',read_only=True )
    email=serializers.EmailField(source='user.email',read_only=True )
    class Meta:
        model = Client
        fields='__all__'
        read_only_fields = ["role",'user']

class SellerInfoSerializer(serializers.ModelSerializer):
    properties = serializers.SerializerMethodField()
    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    class Meta:
        model = Seller
        fields = "__all__"
        read_only_fields = ["properties",'user']

    def get_properties(self, seller):
        properties = seller.properties.all().order_by("-created_at")
        return PropertySerializer(properties, many=True).data

class FavoritesSerializer(serializers.ModelSerializer):
    property=PropertySerializer(read_only=True)
    property_id = serializers.PrimaryKeyRelatedField(
        source="property",
        queryset=Property.objects.all(),
        write_only=True
    )
    class Meta:
        model=Favorites
        fields='__all__'
        read_only_fields = ['client']


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Notification
        fields='__all__'
        read_only_fields = ["user", "message", "created_at"]





class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        if Seller.objects.filter(user=self.user).exists():
            data["user_type"] = "seller"
        elif Client.objects.filter(user=self.user).exists():
            data["user_type"] = "client"
        else:
            data["user_type"] = None

        return data

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password]
    )
    email = serializers.EmailField(
        required=True,
        validators=[
        UniqueValidator(queryset=User.objects.all())]
    )

    class Meta:
        model = User

        fields = [
            "username",
            "email",
            "password",
        ]

    def create(self, validated_data):
        with transaction.atomic():
            user = User.objects.create_user(
                username=validated_data["username"],
                email=validated_data["email"],
                password=validated_data["password"]
            )
            Client.objects.create(user=user) 

        return user

