# Generated by Django 5.0.6 on 2024-11-17 06:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_remove_inboundstock_inboundstockitems_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='inboundstock',
            name='reference_number',
            field=models.CharField(blank=True, max_length=64, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='inventory',
            name='sku',
            field=models.CharField(blank=True, max_length=64, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='order',
            name='reference_number',
            field=models.CharField(blank=True, max_length=64, null=True, unique=True),
        ),
    ]