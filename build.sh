#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate

# Crea el superusuario
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin@gmail.com', '123456')" | python manage.py shell