from django.shortcuts import render
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Mosaic
from .serializers import MosaicSerializer
import cv2

@api_view(["GET","POST"])
def mosaic_upload(request):
  if request.method == "GET":
    mosaic = Mosaic.objects.latest('id')
    serializer = MosaicSerializer(mosaic)
    return Response(serializer.data)
  elif request.method == "POST":
    serializer = MosaicSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save() #postデータをDBに登録
      mosaic = Mosaic.objects.get(id=serializer.data["id"])
      org_path = mosaic.image.url
      gray_path = str(settings.BASE_DIR) + "/media/results/result.jpg"
      gray(org_path,gray_path)
      mosaic.result = "results/result.jpg"
      mosaic.save()
      serializer = MosaicSerializer(mosaic)
      return Response(serializer.data, status.HTTP_201_CREATED)
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def mosaic_download(request): #uploadされたデータを処理して送信するメソッド
  if request.method == "GET":
    mosaic = Mosaic.objects.get(id=1)
    org_path = mosaic.image.url
    gray_path = str(settings.BASE_DIR) + "/media/results/result.jpg"
    gray(org_path,gray_path)
    mosaic.result = "results/result.jpg"
    mosaic.save()
    serializer = MosaicSerializer(mosaic)
    return Response(serializer.data)

def gray(img_path,output_path):
  org_path = str(settings.BASE_DIR) + img_path
  org_img = cv2.imread(org_path)
  gray_img = cv2.cvtColor(org_img,cv2.COLOR_BGR2GRAY)
  cv2.imwrite(output_path,gray_img)

# Create your views here.
