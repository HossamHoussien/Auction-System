# Installation Guide

### Configure Client App
1. Go to `client` directory and install required packages =>  `cd client && npm install`
2. Change `.env` file to match `server` URL


### Configure Server App
1. `cd server && composer install`
2. This app is using `MySQL` database, so you will need to create a database first.
3. Copy the `.env.example` file and rename it to `.env` then change `DB` credentials and `URL`
4. Run `php artisan migrate --seed`. This will generate (5) dummy users as follows [user1@user.com, user2@user.com, ...etc]. All users password is `12345678`. Also, will generate 30 dummy items.
5. Run `php artisan passport:install`
