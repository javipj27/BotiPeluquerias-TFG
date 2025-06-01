FROM php:8.2-fpm

# dependencias 
RUN apt-get update && apt-get install -y \
    git unzip libicu-dev libpq-dev libzip-dev libpng-dev libonig-dev wget \
    && docker-php-ext-install intl pdo pdo_mysql zip

#  symfony-cli
RUN wget https://get.symfony.com/cli/installer -O - | bash \
    && mv /root/.symfony5/bin/symfony /usr/local/bin/symfony

# Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN COMPOSER_ALLOW_SUPERUSER=1 composer install --no-interaction --prefer-dist --optimize-autoloader

EXPOSE 8000

CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]