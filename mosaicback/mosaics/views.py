from django.shortcuts import render
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Mosaic
from .serializers import MosaicSerializer
import os
import glob
from .process_image.detect_face import DetectFace

@api_view(["GET","POST"]) #GETとPOSTメソッドを受け付ける
def mosaic_upload(request):
  if request.method == "GET":
    mosaic = Mosaic.objects.latest('id')
    serializer = MosaicSerializer(mosaic)
    return Response(serializer.data)
  elif request.method == "POST":
    serializer = MosaicSerializer(data=request.data)
    if serializer.is_valid():
      if len(Mosaic.objects.all()) < 1:
        serializer.save() #postデータをDBに登録
      else:
        Mosaic.objects.all().delete()
        for p in glob.glob('./media/images/*',recursive=True):
          if os.path.isfile(p):
            os.remove(p)
        for i in glob.glob('./media/results/*',recursive=True):
          if os.path.isfile(i):
            os.remove(i)
        serializer.save() #postデータをDBに登録
      #----モザイク化----#
      mosaic = Mosaic.objects.get(id=serializer.data["id"]) #送信された画像を取得
      org_path = mosaic.image.url #送信された画像のurlを取得
      result_path = mosaic.id #送信された画像のidを取得
      detect_test = DetectFace(str(settings.BASE_DIR), org_path, result_path, float(mosaic.strength)) #モザイククラスのインスタンス作成
      detect_test.detect_face() #顔検知メソッドを実行
      detect_write = detect_test.write_rectangle() #検知した顔の領域を表示するメソッドを実行
      detect_write = detect_test.write_rect_and_number() #検知した顔の領域を表示するメソッドを実行
      if int(mosaic.mosaic_type) == 1:
        detect_stamp = detect_test.mosaic_face() #検知した顔にモザイクを表示するメソッドを実行
      elif int(mosaic.mosaic_type) == 2:
        detect_stamp = detect_test.stamp_smile_face() #検知した顔にスタンプを表示するメソッドを実行
      mosaic.result = "results/" + str(result_path) + "result.jpg" #結果画像のurlをDBに登録
      mosaic.save() #変更内容を登録
      serializer = MosaicSerializer(mosaic) #データをシリアライズ
      return Response(serializer.data, status.HTTP_201_CREATED)
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

# @api_view(["GET"])
# def mosaic_download(request): #uploadされたデータを処理して送信するメソッド
#   if request.method == "GET":
#     mosaic = Mosaic.objects.get(id=1)
#     org_path = mosaic.image.url
#     gray_path = str(settings.BASE_DIR) + "/media/results/result.jpg"
#     mosaic.result = "results/result.jpg"
#     mosaic.save()
#     serializer = MosaicSerializer(mosaic)
#     return Response(serializer.data)

# Create your views here.
