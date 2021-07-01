from rest_framework.fields import FileField
from shoeapp.models import Shoe, Order, BRANDS
from rest_framework import serializers

class ShoeSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True, allow_blank=False, max_length=100)
    price = serializers.DecimalField(required=True, max_digits=10, decimal_places=2)
    brand = serializers.ChoiceField(required=True, choices=BRANDS)
    sizes = serializers.CharField(required=True, allow_blank=False, max_length=100)
    poster = serializers.CharField(required=True, allow_blank=False, max_length=100)

    def create(self, validated_data):
        """
        Create and return a new `Shoe` instance, given the validated data.
        """
        return Shoe.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Shoe` instance, given the validated data.
        """
        instance.name = validated_data.get('name', instance.name)
        instance.price = validated_data.get('price', instance.price)
        instance.brand = validated_data.get('brand', instance.brand)
        instance.sizes = validated_data.get('sizes', instance.sizes)
        instance.poster = validated_data.get('poster', instance.poster)
        instance.save()
        return instance

class OrderSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    customer = serializers.CharField(required=True, allow_blank=False, max_length=100)
    address = serializers.CharField(required=True, allow_blank=False, max_length=100)
    items = serializers.CharField(required=True, allow_blank=False, max_length=5000)
    total = serializers.CharField(required=True, allow_blank=False, max_length=100)

    def create(self, validated_data):
        """
        Create and return a new `Shoe` instance, given the validated data.
        """
        return Order.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Shoe` instance, given the validated data.
        """
        instance.customer = validated_data.get('customer', instance.customer)
        instance.address = validated_data.get('address', instance.address)
        instance.items = validated_data.get('items', instance.items)
        instance.total = validated_data.get('total', instance.total)
        instance.save()
        return instance
