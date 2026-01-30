from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0003_add_avatar"),
    ]

    operations = [
        migrations.AddField(
            model_name="patientprofile",
            name="full_name",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
    ]
