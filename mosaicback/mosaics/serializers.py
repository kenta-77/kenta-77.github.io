from rest_framework import serializers
from .models import Mosaic
from django.conf import settings
import cv2

#Mosaicモデルをシリアライズ
class MosaicSerializer(serializers.ModelSerializer):
  class Meta:
    model = Mosaic #モデルの指定
    fields = '__all__' #fieldの指定