# -*- coding: utf-8 -*-
# Generated by Django 1.9.12 on 2017-01-16 18:35
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_auto_20170116_0656'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='PlaylistItem',
            new_name='Track',
        ),
        migrations.AlterModelOptions(
            name='track',
            options={'verbose_name': 'Track / Playlist item', 'verbose_name_plural': 'Tracks / Playlists items'},
        ),
    ]
