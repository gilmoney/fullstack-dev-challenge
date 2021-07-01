from shoeapp.globals import S3BUCKET
from botocore.exceptions import NoCredentialsError
from django.http import HttpResponse, JsonResponse, response
from rest_framework.decorators import api_view, parser_classes
from datetime import datetime
from rest_framework.parsers import FileUploadParser, JSONParser
from shoeapp.models import Shoe

import boto3
import os
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings

@api_view(['POST'])
@parser_classes([FileUploadParser])
def image_upload(request, filename, format=None):
    """
    A view that can accept POST requests with JSON content.
    """
    file_obj = request.data['file']
    #filename = request.data['filename']
    #filename = request.FILES['filename'].name

    timestamp = datetime.now()
    extension = filename[-4:]
    newfilename = timestamp.strftime("%Y%m%d%H%M%S") + extension
    savedir = 'img/' + newfilename
    contentType = filename[-3:]
    
    path = default_storage.save(savedir, ContentFile(file_obj.read()))
    success = True
    error = ""

    try:
        s3 = boto3.client('s3')
        #s3.upload_file(path, 'demo-poppag-s3-bucket-2020', savedir, ExtraArgs={'ContentType': "image/" + contentType, 'ACL': "public-read"})
        s3.upload_file(path, S3BUCKET, savedir, ExtraArgs={'ContentType': "image/" + contentType, 'ACL': "public-read"})

        print("Upload Successful")
        success = True
    except FileNotFoundError:
        print("The file was not found")
        error = "This file was not found"
        success = False
    except NoCredentialsError:
        error = "Credentials not available"
        success = False

    #path = default_storage.save('tmp/somename.png', ContentFile(request.FILES["filename"]))
    #tmp_file = os.path.join(settings.MEDIA_ROOT, path)

    uploaded = "https://demo-poppag-s3-bucket-2020.s3.us-west-1.amazonaws.com/" + savedir

    return JsonResponse({ "filename" : uploaded, "success" : success, error : error})