from rest_framework import serializers
from .models import Property,PropertyImage
from users.models import Seller

class PropertyImageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=PropertyImage
        fields="__all__"
        read_only_fields = ["property"]

class SellerSerializer(serializers.ModelSerializer):
    username=serializers.CharField(source='user.username',read_only=True)
    class Meta:
        model = Seller
        fields='__all__'
        read_only_fields = ['user']


class PropertySerializer(serializers.ModelSerializer):
    images=PropertyImageSerializer(many=True,read_only=True)
    seller=SellerSerializer(read_only=True)
    class Meta:
        model=Property
        fields="__all__"
        read_only_fields = ["rating","rating_times","created_at"]
        

class PropertyDetailSerializer(serializers.ModelSerializer):
    images=PropertyImageSerializer(many=True,read_only=True)
    seller=SellerSerializer(read_only=True)
    class Meta:
        model=Property
        fields="__all__"