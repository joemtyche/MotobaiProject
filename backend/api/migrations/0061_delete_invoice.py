# Generated by Django 4.2.13 on 2024-10-29 09:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0060_order_gross_price'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Invoice',
        ),
    ]
