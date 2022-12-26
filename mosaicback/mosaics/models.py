from django.db import models
import uuid

#DBのMosaicテーブルを作成
class Mosaic(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  title = models.CharField('画像名',max_length=100)
  image = models.ImageField(null=True, blank=True, upload_to='images/')
  result = models.ImageField(null=True, blank=True, upload_to='results/')

  def __str__(self): #画像のタイトルを返す
    return self.title

# Create your models here.
