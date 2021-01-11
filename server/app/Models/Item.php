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

    
    public function bids(){
        return $this->hasMany(Bid::class);
    }


    public function history(){
        return $this->hasMany(BidingHistory::class);
    }


    public function getHighestBid(){
        return $this->bids()->where('item_id', $this->id)->orderBy('amount', 'DESC')->lockForUpdate()->first();
    }


    public function getAutobidders(){
        return Bid::autoBiddersForItem($this->id)
                ->with(['user'])
                ->get()
                ->pluck('user')
                ->unique();
    }


    public function minAllowedBid(){
        $bids = $this->bids;
        return count($bids) ? (int) $bids->max('amount') + 1 : (int) $this->starting_price;;
    }


    public function validateItemCloseDate(){
        if($this->close_at->isPast())
            throw new InvalidSubmissionDateExeption;

        return true;
    }

    public function loadItemData(User $user)
    {
        $this->min_bid = $this->minAllowedBid();

        $this->can_bid = $user->canBid($this);

        $this->load('history.user');

        return $this;
    }
}