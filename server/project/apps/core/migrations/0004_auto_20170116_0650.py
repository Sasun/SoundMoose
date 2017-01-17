# -*- coding: utf-8 -*-
# Generated by Django 1.9.12 on 2017-01-16 06:50
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_auto_20170116_0647'),
    ]

    operations = [
        migrations.CreateModel(
            name='PlaylistSoundmooseItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('track_id', models.CharField(max_length=50)),
                ('title', models.CharField(max_length=250)),
                ('artist', models.CharField(max_length=250)),
                ('img_url', models.CharField(max_length=250)),
                ('stream_url', models.CharField(max_length=250)),
                ('duration', models.IntegerField()),
                ('platform', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name': 'Playlist item',
                'verbose_name_plural': 'Playlists items',
            },
        ),
        migrations.RemoveField(
            model_name='playlistitem',
            name='playlist',
        ),
        migrations.AlterModelOptions(
            name='favorite',
            options={'verbose_name': 'Favorite', 'verbose_name_plural': 'Favorites'},
        ),
        migrations.DeleteModel(
            name='PlaylistItem',
        ),
    ]
