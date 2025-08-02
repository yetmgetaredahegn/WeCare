from django.core.management.base import BaseCommand
from django.db import connection
from pathlib import Path
import os


class Command(BaseCommand):
    help = 'Populates the User and the Profiles'

    def handle(self, *args, **options):
        print('Populating the databases...')
        current_dir= os.path.dirname(__file__)
        file_path=os.path.join(current_dir, 'seed.sql' )
        sql_content = Path(file_path).read_text()

        statements = [stmt.strip() for stmt in sql_content.split(';') if stmt.strip()]

        with connection.cursor() as cursor:
            for stmt in statements:
                cursor.execute(stmt)

        print('✅ Database populated successfully!')