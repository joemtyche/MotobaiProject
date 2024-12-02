# Generated by Django 5.0.6 on 2024-12-02 09:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0027_rename_discounted_amount_payment_deductions_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inboundstock',
            name='reference_number',
            field=models.CharField(default=1, max_length=64, unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='order',
            name='reference_number',
            field=models.CharField(default=2, max_length=64, unique=True),
            preserve_default=False,
        ),
    ]
