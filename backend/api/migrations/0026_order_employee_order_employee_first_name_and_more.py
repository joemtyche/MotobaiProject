# Generated by Django 5.0.6 on 2024-10-09 14:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0025_rename_customer_walk_in_name_order_account_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='employee',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.employee'),
        ),
        migrations.AddField(
            model_name='order',
            name='employee_first_name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='employee_last_name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='employee_middle_name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
