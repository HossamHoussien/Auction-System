# Installation Guide

## Important Note

    Due to some weird bug in `php artisan serve` command it was causing the server to hangs while generating the access token using "Guzzle Http". So to fix that issue there was two options:

    1. Either to create a virtual host and use the last commit (the one before this commit) as it is (this was how my dev environment was setup) **OR**,

    2. To pull the latest commit in which I have modified the login procedure to make it work with `php artisan serve` command (i.e. Getting rid of Guzzle HTTP in login).

    *** I have modified the login procedure to save the time needed to configure the virtual host.***

### Configure Client App

1. Go to `client` directory and install required packages => `cd client && npm install`
2. Change `.env` file to match `server` URL

### Configure Server App

1. `cd server && composer install`
2. This app is using `MySQL` database, so you will need to create a database first.
3. Copy the `.env.example` file and rename it to `.env` then change `DB` credentials and `URL`
4. Run `php artisan migrate --seed`. This will generate (5) dummy users as follows [user1@user.com, user2@user.com, ...etc]. All users password is `12345678`. Also, will generate 30 dummy items.
5. Run `php artisan passport:install`

## Auto-bidding Feature

I have assumed that the max amount set by the user as an auto-bidding configuration will be **ONLY** used with auto-bidding. i.e. if the user sets the max-auto biding amount to `50$` this will mean that the maximum amount he will use for auto-bdding is `50$` **plus** whatever was the initial bidding value that was entered by the user manually when he first submit his/her bid.
