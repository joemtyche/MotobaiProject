# Generated by Django 5.0.6 on 2024-12-02 09:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0026_rename_initial_price_order_initial_balance'),
    ]

    operations = [
        migrations.RenameField(
            model_name='payment',
            old_name='discounted_amount',
            new_name='deductions',
        ),
        migrations.RemoveField(
            model_name='order',
            name='deduction',
        ),
        migrations.RemoveField(
            model_name='order',
            name='initial_balance',
        ),
        migrations.AddField(
            model_name='payment',
            name='initial_balance',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
    ]
