from django.db import models

BRANDS = (
        ("Adidas", "Adidas"),
        ("Converse", "Converse"),
        ("Nike", "Nike"),
        ("Puma", "Puma"),
    )

class Shoe(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(default='No Name', max_length=100)
    price = models.DecimalField(decimal_places=2, default=100.00, max_digits=10)
    brand = models.CharField(choices=BRANDS, default='Nike', max_length=100)
    sizes = models.CharField(default='8,9,10,11,12', max_length=100)
    poster = models.CharField(default='', max_length=100)

    class Meta:
        ordering = ['created']

class Order(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    customer = models.CharField(default='No Name', max_length=100)
    address = models.CharField(default='No Address', max_length=100)
    items = models.CharField(default='Empty', max_length=5000)
    total = models.CharField(default='0', max_length=100)

    class Meta:
        ordering = ['created']


