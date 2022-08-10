import base64
from datetime import datetime
from pytz import timezone
import uuid, base64
from django.core.files.base import ContentFile
from django.http import JsonResponse
from rest_framework.views import APIView
from thumbnail.models import Image
from .serializers import ImageSerializer

from core.s3_uploader import s3_client


class ThumbAll(APIView):
    def get(self, request):
        try:
            thumb_list = Image.objects.all()
            serializer = ImageSerializer(thumb_list, many=True)

            return JsonResponse({'message': 'success', 'thumb_list': serializer.data}, status=200)
    
        except Image.DoesNotExist:
            return JsonResponse({'message': 'Thumbnail Not Found'}, status=401)


class ThumbList(APIView):
    def get(self, request):
        try:
            thumb_all = Image.objects.filter(is_valid=True).order_by('-created_at')
            # thumb_all  = Image.objects.all().order_by('-created_at')
            thumb_list = []
            today_thumb_list = []

            for thumb in thumb_all:
                thumb_list.append(thumb.image_url)
                if str(thumb.created_at)[:10] == str(datetime.now(timezone('Asia/Seoul')))[:10]:
                    today_thumb_list.append(thumb.image_url)

            return JsonResponse({'message': 'success', 'thumb_list': thumb_list, 'today_thumb_list': today_thumb_list}, status=200)
    
        except Image.DoesNotExist:
            return JsonResponse({'message': 'Thumbnail Not Found'}, status=401)

    def post(self, request):
        data = request.data
        image = data['encoded_image']
        is_valid = data['is_valid']

        encoded_image = str(image).split(',')[-1]
        decoded_image = base64.urlsafe_b64decode(encoded_image)
        fileName = 'thumbnail/' + uuid.uuid4().hex[:10]+'.'+'jpg'
        image_url = s3_client.upload(ContentFile(decoded_image, fileName))

        image = Image.objects.create(
            image_url = image_url,
            is_valid  = is_valid,
            created_at = str(datetime.now(timezone('Asia/Seoul'))),
        )

        return JsonResponse({'message': 'success', 'image_url': image_url})

    def delete(self, request, id):
        thumb = Image.objects.get(id=id)

        deleted_image = (Image.objects.get(id=id).image_url).split('/')[-1]
        s3_client.delete('thumbnail/'+ deleted_image)

        thumb.delete()

        return JsonResponse({'message': 'DELETE_SUCCESS'}, status=204)
            