# Generated by Django 5.0.6 on 2024-10-13 03:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0032_alter_account_barangay_alter_account_city_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='is_deleted',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='account',
            name='account',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
