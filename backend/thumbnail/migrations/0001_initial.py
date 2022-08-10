# Generated by Django 4.1 on 2022-08-09 04:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Image",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("image_url", models.URLField()),
                ("is_valid", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(blank=True, null=True)),
            ],
            options={"db_table": "images",},
        ),
    ]
