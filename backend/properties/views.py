from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import PropertySerializer,PropertyImageSerializer,PropertyDetailSerializer
from .models import Property,PropertyImage
from users.models import Seller,Notification
from django.core.cache import cache
from .cache import get_property_cache_version,invalidate_property_cache,invalidate_property_detail
from .tasks import send_notification_email
# @api_view(["POST"])
# @permission_classes([IsAuthenticated])


@api_view(["GET"])
def GetProperties(request):
 properties=Property.objects.prefetch_related("images").select_related("seller").select_related("seller__user").order_by("-created_at")
 filter_fields = [
    "category",
    "city",
    "has_parking",
    "room_numbers",
    "building_age",
    "rating"]
 sort_options = {
    "rating": "-rating",
    "rating_low": "rating",
    "newest": "building_age",
    "oldest": "-building_age",
    "size": "size",
    "size_large": "-size",}
 params = request.query_params.copy()
 version = get_property_cache_version()

 cache_key = f"properties:{version}" + "&".join(
    f"{key}={params[key]}"
    for key in sorted(params))
 cached_data = cache.get(cache_key)

 if cached_data is not None:
    return Response(
        cached_data,
        status=status.HTTP_200_OK
    )
 value = request.query_params.get('order')
 if value in sort_options:
    properties = properties.order_by(sort_options[value])

 for field in filter_fields:
    value = request.query_params.get(field)

    if value:
        if field=='rating':
           try:
                value = float(value)
           except ValueError:
                return Response(
                    {"rating": "rating must be a number"},
                    status=status.HTTP_400_BAD_REQUEST
                )

           if not 1 <= value <= 5:
                return Response(
                    {"rating": "rating must be between 1 and 5"},
                    status=status.HTTP_400_BAD_REQUEST
                )
           properties = properties.filter(rating__gte=value)
        elif field=='room_numbers':
           try:
                value = int(value)
           except ValueError:
                return Response(
                    {"rating": "rating must be a number"},
                    status=status.HTTP_400_BAD_REQUEST
                )
           if value < 1:
                return Response(
                    {"rating": "rating must be 1 or more"},
                    status=status.HTTP_400_BAD_REQUEST
                )
           properties = properties.filter(room_numbers__gte=value)
        else:
            properties = properties.filter(**{field: value})

 serializer=PropertySerializer(properties,many=True)
 cache.set(cache_key,serializer.data,timeout=300)
 return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getmyproperty(request):
  seller=get_object_or_404(Seller,user=request.user)
  properties=Property.objects.filter(seller=seller).prefetch_related("images").select_related("seller").select_related("seller__user").order_by("-created_at")
  serializer=PropertySerializer(properties,many=True)
  return Response(serializer.data,status=status.HTTP_200_OK) 

@api_view(["GET"])
def GetPropertyDetail(request,property_id):
 cache_key = f"property:{property_id}"
 cached_data = cache.get(cache_key)
 if cached_data is not None:
    return Response(cached_data,status=status.HTTP_200_OK)
 property =get_object_or_404(Property.objects.select_related("seller").prefetch_related("images"),id=property_id)
 serializer=PropertyDetailSerializer(property)
 cache.set(cache_key,serializer.data,timeout=300)
 return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def CreateProperty(request):
 seller=Seller.objects.filter(user=request.user).first()
 if seller is None:
    return Response({"message":"only sellers can create property"},status=status.HTTP_403_FORBIDDEN)
 serializer=PropertySerializer(data=request.data)
 if serializer.is_valid():
   serializer.save(seller=seller)
   invalidate_property_cache()
   return Response(serializer.data,status=status.HTTP_201_CREATED)
 return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def CreatePropertyImage(request, property_id):
    property = get_object_or_404(Property, id=property_id)
    
    if property.seller.user!=request.user:
      return Response("its not your property",status=status.HTTP_403_FORBIDDEN)
    
    images = request.FILES.getlist("images")

    if not images:
        return Response(
            {"message": "At least one image is required"},status=status.HTTP_400_BAD_REQUEST)
    
    for image in images:
        PropertyImage.objects.create(
            property=property,
            image=image
        )
    invalidate_property_cache()
    invalidate_property_detail(property_id)
    return Response(PropertySerializer(property).data,status=status.HTTP_201_CREATED)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def RateProperty(request, property_id,rate):
    if not 1<=rate<=5:
        return Response({"message":"rating must be between 1 and 5"},status=status.HTTP_400_BAD_REQUEST)
    property = get_object_or_404(Property, id=property_id)
    property.rating=((property.rating * property.rating_times)+ rate)/(property.rating_times + 1)
    property.rating_times+=1
    property.save()
    Notification.objects.create(user=property.seller.user,
        message=f"{request.user.username} rated your property {rate}/5")
    invalidate_property_cache()
    invalidate_property_detail(property_id)
    send_notification_email.delay(
    property.seller.user.email,
    request.user.username,
    "Your property received a new rating",
    (
        f"{request.user.username} rated your property "
        f"'{property.title}' {rate}/5."
    ))
    return Response({"rating": property.rating,"rating_times": property.rating_times})

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteproperty(request,property_id):
  property = get_object_or_404(Property, id=property_id)
  if property.seller.user!=request.user:
    return Response(status=status.HTTP_403_FORBIDDEN)
  property.delete()
  invalidate_property_cache()
  invalidate_property_detail(property_id)
  return Response(status=status.HTTP_204_NO_CONTENT)