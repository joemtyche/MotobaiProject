# Generated by Django 5.0.6 on 2024-10-26 07:58

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0051_alter_order_order_tracking'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='order_tracking',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.ordertracking'),
        ),
    ]
