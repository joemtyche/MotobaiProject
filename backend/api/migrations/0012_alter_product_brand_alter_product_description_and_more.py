# Generated by Django 5.0.6 on 2024-09-19 05:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_rename_type_product_product_type_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='brand',
            field=models.CharField(default='', max_length=32),
        ),
        migrations.AlterField(
            model_name='product',
            name='description',
            field=models.TextField(default='', max_length=32),
        ),
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.DecimalField(decimal_places=2, default='', max_digits=10),
        ),
        migrations.AlterField(
            model_name='product',
            name='product_type',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='product',
            name='vehicle_type',
            field=models.CharField(default='', max_length=32),
        ),
    ]
