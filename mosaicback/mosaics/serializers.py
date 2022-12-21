from rest_framework import serializers
from .models import Mosaic

#Mosaicモデルをシリアライズ
class MosaicSerializer(serializers.Serializer):
  class Meta:
    model = Mosaic #モデルの指定
    fields = ('title','image','result') #fieldの指定