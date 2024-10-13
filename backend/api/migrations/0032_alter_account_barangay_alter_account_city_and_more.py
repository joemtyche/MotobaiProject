# Generated by Django 5.0.6 on 2024-10-13 02:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0031_alter_inventory_stock_alter_product_brand_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='barangay',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='account',
            name='city',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='account',
            name='email',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='account',
            name='phone_number',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='account',
            name='representative_name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='account',
            name='representative_position',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='account',
            name='street',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='inventory',
            name='stock',
            field=models.PositiveIntegerField(blank=True, default=0, null=True),
        ),
    ]
