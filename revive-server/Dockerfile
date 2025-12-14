FROM php:8.1-apache

# Install system deps + libicu for intl
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libicu-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd mysqli zip intl \
    && rm -rf /var/lib/apt/lists/*

# Enable Apache rewrite module
RUN a2enmod rewrite

# Download Revive 6.0.4 and extract into document root
RUN wget -O /tmp/revive-6.0.4.zip "https://download.revive-adserver.com/revive-adserver-6.0.4.zip" \
    && unzip /tmp/revive-6.0.4.zip -d /var/www/html \
    && rm /tmp/revive-6.0.4.zip \
    && chown -R www-data:www-data /var/www/html

# Copy entrypoint if you have one (optional)
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

# If you have a DB wait script in entrypoint, use it; otherwise start apache directly
ENTRYPOINT ["/entrypoint.sh"]
# fallback (if no entrypoint.sh): use the apache foreground
# ENTRYPOINT ["apache2-foreground"]
