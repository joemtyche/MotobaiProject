# Generated by Django 5.0.6 on 2024-11-23 10:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_alter_order_account'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='account',
            field=models.CharField(error_messages={'blank': 'Account name cannot be empty.', 'unique': 'This account already exists.'}, max_length=64, unique=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='account',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.account'),
        ),
    ]