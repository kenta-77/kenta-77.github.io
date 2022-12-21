from django.urls import path
from . import views

urlpatterns = [
  path('', views.mosaic_upload, name="mosaic_upload"), #mosaic/にアクセスした時mosaic_upload実行
  path('download/', views.mosaic_download, name="mosaic_download"), #mosaic/download/にアクセスした時mosaic_download実行
]