from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import NotificationSerializer,FavoritesSerializer,SellerSerializer,SellerInfoSerializer,ClientSerializer,MyTokenObtainPairSerializer,RegisterSerializer
from .models import Seller,Client,Notification
from properties.models import Favorites
from properties.tasks import send_notification_email


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def whoami(request):
    seller=Seller.objects.filter(user=request.user).first()
    client=Client.objects.filter(user=request.user).first()
    if seller is not None :
        serializer=SellerSerializer(seller)
        statuscode=status.HTTP_200_OK
    elif client is not None :
        serializer=ClientSerializer(client)
        statuscode=status.HTTP_200_OK
    else:
        statuscode=status.HTTP_404_NOT_FOUND
        return Response(status=statuscode)
    return Response(serializer.data,status=statuscode)


@api_view(["POST"])
def register(request):


    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(

        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):

    try:
        refresh_token = request.data['refresh']
        token = RefreshToken(refresh_token)
        token.blacklist()

        return Response({'message': 'Logged out successfully'})

    except Exception:
        return Response(
            {'error': 'Invalid token'},
            status=status.HTTP_400_BAD_REQUEST
        )

class MyLoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def createsellerprofile(request):
    seller,created= Seller.objects.get_or_create(user=request.user)
    if created :
        Client.objects.filter(user=request.user).delete()
    serializer=SellerSerializer(seller,data=request.data,partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_200_OK)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getsellerinfo(request,seller_id):
    seller= get_object_or_404(Seller.objects.prefetch_related("properties__images"), id=seller_id)
    serializer=SellerInfoSerializer(seller)
    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(['POST','GET','DELETE'])
@permission_classes([IsAuthenticated])
def favorites(request):
    client=Client.objects.filter(user=request.user).first()
    if client is None:
        return Response({"message":"you are not a client"},status=status.HTTP_403_FORBIDDEN)
    if request.method=='GET':
        favorites=Favorites.objects.select_related("property").filter(client=client).order_by("-property__created_at")
        serializer=FavoritesSerializer(favorites,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    else:
        serializer=FavoritesSerializer(data=request.data)
        if serializer.is_valid():
            property=serializer.validated_data["property"]
            seller_user=property.seller.user
            favorite=Favorites.objects.filter(client=client,property=property).first()
            if request.method=='DELETE':
                if favorite is None:
                    return Response(
                        {"message": "property is not in your favorites"},status=status.HTTP_404_NOT_FOUND)
                Notification.objects.create(user=seller_user,
                    message=f"{request.user.username} removed your property from their favorites")
                favorite.delete()
                send_notification_email.delay(
                    seller_user.email,
                    request.user.username,
                    "Your property was removed from favorites",
                    (
                        f"{request.user.username} removed "
                        f"your property '{property.title}' from their favorites."
                    )
                )
                return Response(status=status.HTTP_204_NO_CONTENT)
            elif request.method=='POST':
                if favorite is not None:
                    return Response(
                        {"message": "property is already in your favorites"},status=status.HTTP_400_BAD_REQUEST)
                serializer.save(client=client)
                Notification.objects.create(user=seller_user,
                    message=f"{request.user.username} favorited your property")
                send_notification_email.delay(
                    seller_user.email,
                    request.user.username,
                    "Someone favorited your property",
                    (
                        f"{request.user.username} favorited "
                        f"your property '{property.title}'."
                    )
                )
                return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        

    
@api_view(['GET','PATCH'])
@permission_classes([IsAuthenticated])
def getnotifications(request):
    if request.method == 'GET':
        notifications=Notification.objects.filter(user=request.user)
        serializer=NotificationSerializer(notifications,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    if request.method == 'PATCH':
        notifid = request.query_params.get('id')
        notification=get_object_or_404(Notification,user=request.user,id=notifid)
        serializer=NotificationSerializer(notification,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def addprofileimage(request):
    seller=Seller.objects.filter(user=request.user).first()
    client=Client.objects.filter(user=request.user).first()
    if seller is not None :
        serializer=SellerSerializer(seller,data=request.data,partial=True)
    elif client is not None :
        serializer=ClientSerializer(client,data=request.data,partial=True)
    else:
        statuscode=status.HTTP_404_NOT_FOUND
        return Response(status=statuscode)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_200_OK)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getnotificationsnumber(request):
    notifications=Notification.objects.filter(user=request.user,is_read=False).count()
    return Response(notifications,status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getfavoritesid(request):
   client=Client.objects.filter(user=request.user).first()

   if client is None:
       return Response(status=status.HTTP_400_BAD_REQUEST)
   favorite_ids = Favorites.objects.filter(client=client).values_list(
    "property_id",
    flat=True
    )

   return Response(list(favorite_ids))