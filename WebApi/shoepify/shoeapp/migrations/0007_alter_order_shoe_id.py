# Generated by Django 3.2.4 on 2021-06-27 19:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shoeapp', '0006_auto_20210627_1244'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='shoe_id',
            field=models.IntegerField(),
        ),
    ]