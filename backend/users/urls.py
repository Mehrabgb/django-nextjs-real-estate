from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register',register),
    path('login/',MyLoginView.as_view()),
    path("logout/",logout),
    path("whoami/",whoami),
    path("favorites/",favorites),
    path("addprofileimage/",addprofileimage),
    path("notifications/",getnotifications),
    path("favoritesid",getfavoritesid),
    path("notifications/count",getnotificationsnumber),
    path("create/seller",createsellerprofile),
    path("seller/info/<int:seller_id>",getsellerinfo),
    path("token/refresh/", TokenRefreshView.as_view()),

    ]