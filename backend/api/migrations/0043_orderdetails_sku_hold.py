# Generated by Django 5.0.6 on 2024-12-02 12:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0042_alter_product_sku'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderdetails',
            name='sku_hold',
            field=models.CharField(default=1, max_length=64),
            preserve_default=False,
        ),
    ]
