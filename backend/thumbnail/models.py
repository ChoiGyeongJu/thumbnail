from django.db import models

class Image(models.Model):
    image_url  = models.URLField()
    is_valid   = models.BooleanField(default=True)
    created_at = models.CharField(null=True, blank=True, max_length=100)

    class Meta:
        db_table = 'images'
