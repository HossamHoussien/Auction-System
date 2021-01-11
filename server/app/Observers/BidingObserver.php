<?php

namespace App\Observers;

use App\Models\Bid;
use App\Jobs\ProcessAutoBiding;

class BidingObserver
{
    /**
     * Handle the Bid "saved" event.
     *
     * @param  \App\Models\Bid  $bid
     * @return void
     */
    public function saved(Bid $bid)
    {
        
        $item = $bid->item;
        
        $autoBidders = $item->getAutobidders();
        
        $bidInfo = [
            "item_id" =>  $item->id,
            "bid_amount" =>  $bid->amount + 1,
            "auto_biding" =>  true
        ];
        
        foreach ($autoBidders as $autobidder) {
            
            if($autobidder->id === $bid->user_id) continue;
            
            ProcessAutoBiding::dispatch($item, $autobidder->id, $bidInfo);            
        }
        
    }

}