# Generated by Django 5.0.6 on 2024-07-21 09:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_rename_name_company_company_name_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='orderdetails',
            old_name='order_details',
            new_name='order',
        ),
    ]
