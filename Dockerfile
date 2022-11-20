FROM php:8.1.12-zts-alpine3.16

# Install dependencies system
RUN apk add --no-cache libzip-dev gd libpng-dev jpeg-dev freetype-dev

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
RUN php -r "if (hash_file('sha384', 'composer-setup.php') === '55ce33d7678c5a611085589f1f3ddf8b3c52d662cd01d4ba75c0ee0459970c2200a51f492d557530c71c15d8dba01eae') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php composer-setup.php 
RUN php -r "unlink('composer-setup.php');"

## Move composer to global use
RUN mv ./composer.phar /usr/local/bin/composer

## Add cron
RUN echo "*       *       *       *       *       cd /app && /usr/local/bin/php artisan schedule:run >> /dev/null 2>&1" >> /etc/crontabs/root