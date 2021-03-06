# Generated by Django 3.2.7 on 2021-09-23 21:20

import apps.core.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Animal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('breed', models.CharField(max_length=150)),
                ('age', models.IntegerField()),
                ('sex', models.CharField(max_length=1)),
                ('adopted', models.BooleanField(default=False)),
                ('blocked', models.BooleanField(default=False)),
                ('create_at', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='AnimalType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='State',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='VaccineBook',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vaccine_name', models.CharField(max_length=150)),
                ('date', models.DateField(auto_now_add=True)),
                ('animal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vaccines', to='core.animal')),
            ],
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to=apps.core.models.upload_image_formater)),
                ('contact', models.CharField(max_length=20)),
                ('latitude', models.CharField(default='', max_length=250)),
                ('longitude', models.CharField(default='', max_length=250)),
                ('is_moderator', models.BooleanField(default=False)),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='residents', to='core.city')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='person', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='city',
            name='state',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cities', to='core.state'),
        ),
        migrations.CreateModel(
            name='BlockedReason',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_at', models.DateField(auto_now_add=True)),
                ('reason', models.TextField(max_length=500)),
                ('blocked_animal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blocks_received', to='core.animal')),
                ('person_requester', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blocks_sent', to='core.person')),
            ],
        ),
        migrations.CreateModel(
            name='AnimalPhoto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.ImageField(blank=True, null=True, upload_to=apps.core.models.upload_image_formater)),
                ('animal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='core.animal')),
            ],
        ),
        migrations.AddField(
            model_name='animal',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='animals', to='core.person'),
        ),
        migrations.AddField(
            model_name='animal',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='linked_animals', to='core.animaltype'),
        ),
        migrations.CreateModel(
            name='AdoptionRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_at', models.DateField(auto_now_add=True)),
                ('is_acepted', models.BooleanField(blank=True, null=True)),
                ('animal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='adoption_requests', to='core.animal')),
                ('requester', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.person')),
            ],
        ),
    ]
