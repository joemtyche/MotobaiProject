# Generated by Django 4.2.13 on 2024-11-17 08:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_payment_delete_invoice'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='payment_method',
            field=models.CharField(default='Cash', max_length=64),
        ),
    ]
