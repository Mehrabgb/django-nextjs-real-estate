from django.urls import path
from .views import *

urlpatterns = [
    path('',GetProperties),
    path('myproperty',getmyproperty),
    path('create/property',CreateProperty),
    path('add/images/<int:property_id>',CreatePropertyImage),
    path('detail/<int:property_id>',GetPropertyDetail),
    path('delete/<int:property_id>',deleteproperty),
    path('rate/<int:property_id>/<int:rate>',RateProperty)
    ]