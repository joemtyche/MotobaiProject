# Generated by Django 5.0.6 on 2024-07-21 09:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_ordertracking_date_cancelled_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='company',
            old_name='name',
            new_name='company_name',
        ),
        migrations.RenameField(
            model_name='company',
            old_name='rep_name',
            new_name='representative_name',
        ),
        migrations.RenameField(
            model_name='company',
            old_name='rep_position',
            new_name='representative_position',
        ),
        migrations.RenameField(
            model_name='orderdetails',
            old_name='order',
            new_name='order_details',
        ),
        migrations.RenameField(
            model_name='product',
            old_name='name',
            new_name='product_name',
        ),
    ]
