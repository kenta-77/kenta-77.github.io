from django.shortcuts import render
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Mosaic
from .serializers import MosaicSerializer
import cv2

@api_view(["GET","POST"])
def mosaic_upload(request): #受け取ったデータをDBに登録するメソッド
  if request.method == "GET": #GETメソッドの場合、DBの全データを返す(テスト用なので消す予定)
    mosaic = Mosaic.objects.all() #DBのデータを取り出し
    serializer = MosaicSerializer(data=mosaic, many=True) #データをシリアライズ(JSONに変換)
    return Response(serializer.data) #JSONデータを送信
  
  elif request.method == "POST": #POSTメソッドの場合、データをDBに登録(登録しなくてもできそうなので後々変更予定)
    serializer = MosaicSerializer(data=request.data) #データをデシリアライズ(DBに登録できる形に変換)
    if serializer.is_valid(): #受け取ったデータを検証(登録していいデータか検証)
      serializer.save() #DBにデータ登録
      return Response(serializer.data, status.HTTP_201_CREATED) #データと作成成功のレスポンスを返す
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST) #エラーと作成失敗のレスポンスを返す

@api_view(["POST"])
def mosaic_download(request): #uploadされたデータを処理して送信するメソッド
  if request.method == "POST": #POSTメソッドの場合、画像処理結果を送信
    mosaic = Mosaic.objects.get(id=1) #DBに登録されているid=1の画像の取り出し(今後pkにあうように修正)
    org_path = mosaic.image.url #データのimage fieldのurlを取得
    result_path = str(settings.BASE_DIR) + "media/results/result.png" #処理結果を格納するpath
    gray(org_path,result_path) #画像処理関数の実行
    mosaic.result = "results/result.png" #処理結果のurlを変更
    mosaic.save() #DBの変更結果を登録
    serializer = MosaicSerializer(mosaic) #処理データをシリアライズ
    return Response(serializer.data, status.HTTP_201_CREATED) #データと作成成功のレスポンスを作成

def gray(original, result): #画像処理のテスト用にgray imageを作成する関数を利用(モザイク用に今後修正)
  org_path = str(settings.BASE_DIR) + original
  org_img = cv2.imread(org_path)
  gray_img = cv2.cvtColor(org_img,cv2.COLOR_BGR2GRAY)
  cv2.imwrite(result,gray_img) #返り値はなく、DBにurlを登録する(DBを使わないなら修正)

# Create your views here.
