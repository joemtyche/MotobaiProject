# Generated by Django 5.0.6 on 2024-11-05 07:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_order_order_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='order_type',
            field=models.CharField(default='Delivery', max_length=64),
        ),
    ]