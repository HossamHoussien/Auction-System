<?php
namespace App\Services;

use App\Models\Item;
use App\Models\Bid;

use Illuminate\Validation\ValidationException;

class BidService
{
    public function minAllowedBid(Item $item)
    {   $bids = $item->bids;

        if(!count($bids))
            return (int) $item->starting_price;
            
        return (int) $item->bids->max('amount') + 1;
    }

    public function highestBid(Item $item)
    {
        return Bid::where('item_id', $item->id)->orderBy('amount', 'DESC')->first();
    }

}