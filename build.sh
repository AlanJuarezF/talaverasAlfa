#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

mkdir dist
mkdir dist/static

python manage.py collectstatic 
python manage.py migrate

# Crea el superusuario
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin@gmail.com', '123456')" | python manage.py shell