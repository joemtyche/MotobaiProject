# Generated by Django 5.0.6 on 2024-09-19 06:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_customer_alter_product_price'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customer',
            name='email',
        ),
    ]
