import boto3
from django.http import JsonResponse

from my_settings import aws_storage_bucket_name, aws_secret_access_key, aws_access_key_id

class S3:
    def __init__(self, aws_access_key_id, aws_secret_access_key, aws_storage_bucket_name):
        s3_client = boto3.client(
            's3',
            config=boto3.session.Config(region_name='ap-northeast-2', signature_version='s3v4'),
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key
        )
        self.s3_client = s3_client
        self.bucket = aws_storage_bucket_name

    def upload(self, file):
        try:
            self.s3_client.upload_fileobj(
                file,
                aws_storage_bucket_name,
                file.name,
            )
            return f'https://gyeongju.s3.ap-northeast-2.amazonaws.com/{file.name}'
        except:
            return None
            
    def presigned(self, file_name):
        try:
            presigned_url = s3_client.s3_client.generate_presigned_post(
                aws_storage_bucket_name,
                file_name,
                ExpiresIn=3600)
            return presigned_url
        except:
            return JsonResponse({"message": "ERROR"})

    def delete(self, file_name):
        return self.s3_client.delete_object(Bucket=self.bucket, Key=file_name)
    
s3_client = S3(aws_access_key_id, aws_secret_access_key, aws_storage_bucket_name)
