<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $casts = [
        'close_at' => 'datetime',
    ];

    public function bids()
    {
        return $this->hasMany(Bid::class);
    }
}