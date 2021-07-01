from shoeapp.globals import S3BUCKET
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from shoeapp.models import Order
from shoeapp.serializers import OrderSerializer

import boto3
import json

@api_view(['GET', 'POST'])
def order_list(request, format=None):
    if request.method == 'GET':
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':

        data = JSONParser().parse(request)
        serializer = OrderSerializer(data=data)
        if serializer.is_valid():
            
            serializer.save()
            
            invoice_id = str(serializer.data["id"])

            print("Invoice ID=" + str(invoice_id))
            with open(invoice_id, 'w+') as outfile:
                json.dump(serializer.data, outfile)
            
            s3 = boto3.resource('s3')
            
            with open(invoice_id, 'rb') as upload:
                s3.Bucket(S3BUCKET).put_object(Key=invoice_id, Body=upload)

            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
def order_detail(request, pk, format=None):
    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = OrderSerializer(order)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = OrderSerializer(order, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        order.delete()
        return HttpResponse(status=204)