# Generated by Django 5.0.6 on 2024-12-03 17:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0049_remove_payment_date_due_remove_payment_date_paid_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='deductions',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='payment',
            name='deductions',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=10, null=True),
        ),
    ]
