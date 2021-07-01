from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from shoeapp.models import Shoe
from shoeapp.serializers import ShoeSerializer

@api_view(['GET', 'POST'])
def shoe_list(request, format=None):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        shoes = Shoe.objects.all()
        serializer = ShoeSerializer(shoes, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ShoeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
def shoe_detail(request, pk, format=None):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        shoe = Shoe.objects.get(pk=pk)
    except Shoe.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = ShoeSerializer(shoe)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = ShoeSerializer(shoe, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        shoe.delete()
        return HttpResponse(status=204)