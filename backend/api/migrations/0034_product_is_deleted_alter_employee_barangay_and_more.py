# Generated by Django 5.0.6 on 2024-10-13 03:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0033_employee_is_deleted_alter_account_account'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='is_deleted',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='employee',
            name='barangay',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='employee',
            name='city',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='employee',
            name='email',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='employee',
            name='first_name',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='employee',
            name='last_name',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='employee',
            name='middle_name',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='employee',
            name='phone_number',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='employee',
            name='street',
            field=models.CharField(default='', max_length=100),
        ),
    ]
