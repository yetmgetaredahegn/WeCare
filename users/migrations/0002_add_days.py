from django.db import migrations

def add_days(apps, schema_editor):
    Day = apps.get_model("users", "Day")
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    for d in days:
        Day.objects.get_or_create(name=d)

class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(add_days),
    ]