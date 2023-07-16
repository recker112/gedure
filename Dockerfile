FROM php:8.2-rc-fpm-alpine

# Install dependencies system
RUN apk add --no-cache libzip-dev gd libpng-dev jpeg-dev freetype-dev mysql-client

# ## Install dependencies PHP
RUN docker-php-ext-configure gd --enable-gd --with-jpeg \
  && docker-php-ext-install -j$(nproc) gd \
  bcmath \
  mysqli \
  pdo_mysql \ 
  zip

WORKDIR /app

## Install composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php -r "if (hash_file('sha384', 'composer-setup.php') === 'e21205b207c3ff031906575712edab6f13eb0b361f2085f1f1237b7126d785e826a450292b6cfd1d64d92e6563bbde02') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php composer-setup.php 
RUN php -r "unlink('composer-setup.php');"

## Move composer to global use
RUN mv ./composer.phar /usr/local/bin/composer

## Add cron
RUN echo "*       *       *       *       *       cd /app && /usr/local/bin/php artisan schedule:run >> /dev/null 2>&1" >> /etc/crontabs/root