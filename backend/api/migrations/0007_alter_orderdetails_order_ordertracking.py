# Generated by Django 5.0.6 on 2024-06-26 09:58

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_order_orderdetails_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderdetails',
            name='order',
            field=models.ForeignKey(default='0', on_delete=django.db.models.deletion.CASCADE, to='api.order'),
        ),
        migrations.CreateModel(
            name='OrderTracking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('unvalidated', 'Unvalidated'), ('validated', 'Validated'), ('packed', 'Packed'), ('shipped', 'Shipped'), ('completed', 'Completed'), ('cancelled', 'Cancelled'), ('returned', 'Returned')], default='unvalidated', max_length=32)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_validated', models.DateTimeField()),
                ('date_packed', models.DateTimeField()),
                ('date_completed', models.DateTimeField()),
                ('date_cancelled', models.DateTimeField()),
                ('order', models.ForeignKey(default='0', on_delete=django.db.models.deletion.CASCADE, to='api.order')),
            ],
        ),
    ]
