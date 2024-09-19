# Generated by Django 5.0.6 on 2024-09-19 06:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_employee'),
    ]

    operations = [
        migrations.CreateModel(
            name='Supplier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('supplier_name', models.CharField(default='', max_length=100)),
                ('phone_number', models.CharField(default='', max_length=100)),
                ('description', models.CharField(default='', max_length=100)),
            ],
        ),
        migrations.RemoveField(
            model_name='employee',
            name='employee_name',
        ),
        migrations.AddField(
            model_name='employee',
            name='first_name',
            field=models.CharField(default=100, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='employee',
            name='last_name',
            field=models.CharField(default=100, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='employee',
            name='middle_name',
            field=models.CharField(default=100, max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='employee',
            name='phone_number',
            field=models.CharField(max_length=100),
        ),
    ]
