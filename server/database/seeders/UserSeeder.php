<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	DB::table('users')->insert([
    	    'name' => 'User 1',
    	    'email' => 'user1@user.com',
    	    'max_bid_amount' => \random_int(100, 1000),
    	    'password' => bcrypt('12345678'),
    	    'remember_token' => Str::random(10),
    	]);

    	DB::table('users')->insert([
    	    'name' => 'User 2',
			'email' => 'user2@user.com',
			'max_bid_amount' => \random_int(100, 1000),
    	    'password' => bcrypt('12345678'),
    	    'remember_token' => Str::random(10),
    	]);
    }
}