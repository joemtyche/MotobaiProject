# Generated by Django 5.0.6 on 2024-11-05 07:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_order_barangay_order_city_order_phone_number_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='order_type',
            field=models.CharField(blank=True, default='', max_length=64, null=True),
        ),
    ]
