from django.urls import path
from . import views

urlpatterns = [
  path('', views.mosaic_upload, name="mosaic_upload"), #mosaic/にアクセスした時mosaic_upload実行
]