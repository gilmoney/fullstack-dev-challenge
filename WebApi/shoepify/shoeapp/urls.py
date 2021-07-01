from django.urls import path
from django.urls.conf import re_path
from rest_framework.urlpatterns import format_suffix_patterns
from shoeapp import views, views_orders, views_upload

urlpatterns = [
    path('shoes/', views.shoe_list),
    path('shoes/<int:pk>/', views.shoe_detail),
    path('orders/', views_orders.order_list),
    path('orders/<int:pk>/', views_orders.order_detail),
    path('upload/', views_upload.image_upload),
    re_path(r'^upload/(?P<filename>[^/]+)$', views_upload.image_upload)
]

urlpatterns = format_suffix_patterns(urlpatterns)