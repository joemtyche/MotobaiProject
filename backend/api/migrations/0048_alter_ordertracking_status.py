# Generated by Django 5.0.6 on 2024-10-26 07:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0047_remove_orderdetails_product_orderdetails_inventory_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ordertracking',
            name='status',
            field=models.CharField(default='unvalidated', max_length=32),
        ),
    ]
