## Requirements

 - ImageMagick
 - GhostScript
 - SQLite or other DB
## Installation
Prepare empty SQLite file: `database/database.sqlite`

In root directory

    composer install
    npm install
    php artisan migrate
    php artisan storage:link
    npm run prod (optional, bundle is included)
    php artisan serve
