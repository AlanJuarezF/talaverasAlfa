#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate

# Crea el superusuario
echo "from django.contrib.auth.models import User; User.objects.create_superuser('admin@example.com', '12345678')" | python manage.py shell