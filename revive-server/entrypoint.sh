#!/bin/bash
set -e

# Wait for DB if DB_HOST is set
if [ -n "$DB_HOST" ]; then
  echo "Waiting for database at $DB_HOST..."
  until php -r "new mysqli(getenv('DB_HOST'), getenv('DB_USER'), getenv('DB_PASS'));" 2>/dev/null; do
    echo "Database not ready, retrying in 3 seconds..."
    sleep 3
  done
fi

# Fix permissions
chown -R www-data:www-data /var/www/html || true

# Start Apache
exec apache2-foreground
