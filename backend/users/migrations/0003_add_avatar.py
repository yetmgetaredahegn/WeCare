from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0002_add_days"),
    ]

    operations = [
        migrations.AddField(
            model_name="customuser",
            name="avatar",
            field=models.ImageField(upload_to="avatars/", null=True, blank=True),
        ),
    ]
