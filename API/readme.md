
Coloca as tuas credenciais do banco de dados no .env
Comandos:

composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
