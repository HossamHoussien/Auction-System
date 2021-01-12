# Installation Guide

### Configure Server App
1. `cd server && composer install`
2. This app is using `MySQL` database, so you will need to create a database first.
3. Copy the `.env.example` file and rename it to `.env` then change `DB` credentials and `URL`
4. Run `php artisan migrate --seed`. This will generate (5) dummy users as follows [user1@user.com, user2@user.com, ...etc]. All users password is `12345678`. Also, will generate 30 dummy items.
5. Run `php artisan passport:install`
6. Run `php artisan serve`
7. Run `php artisan queue:work` [THIS IS CRUCIAL TO ENABLE AUTO_BIDDING FEATURE, SEE NOTES BELOW]



### Configure Client App
1. Go to `client` directory and install required packages =>  `cd client && npm install`
2. Change `.env` file to match `server` URL
3. Run `npm start` 
4. Open the browser and visit the given URL (usually "localhost/3000")


## IMPORTANT NOTES
1. To help mitigate the concurrency problem with auto-bidding I have used the `Pessimistic Locking` approach in conjunction with db `transactions` to ensure data consistency and isolation.
2. Why did I use `Queues`? Well, in order to enable auto-bidding feature I have to run this in the background to be able to control when to dispatch queue jobs and hence not to overload the server.
3. In order to enable auto-bidding feature you MUST start Laravel queue. You can do this by running `php artisan queue:work`
