from django.db import models
import uuid

#DBのMosaicテーブルを作成
class Mosaic(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  mosaic_type = models.CharField(null=True, blank=False, max_length=100)
  strength = models.CharField(null=True, blank=False, max_length=100)
  image = models.ImageField(null=True, blank=False, upload_to='images/')
  result = models.ImageField(null=True, blank=True, upload_to='results/')

  def __str__(self): #画像のタイトルを返す
    return str(self.image)

# Create your models here.
