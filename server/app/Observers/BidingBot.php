<?php

namespace App\Observers;

use App\Models\Bid;
use App\Services\BidService;
use App\Services\UserService;
use App\Jobs\ProcessAutoBiding;

class BidingBot
{
    /**
     * Handle the Bid "saved" event.
     *
     * @param  \App\Models\Bid  $bid
     * @return void
     */
    public function saved(Bid $bid)
    {
        $userService = new UserService;

        $bidService = new BidService;
        
        $autoBidders = $bidService->getAutobidders($bid->item_id);

        $item = $bid->item;
        
        $bidInfo = [
            "item_id" =>  $item->id,
            "bid_amount" =>  $bid->amount + 1,
            "auto_biding" =>  true
        ];
        
        foreach ($autoBidders as $autobidder) {
            
            if($autobidder->id === $bid->user_id) continue;
            
            ProcessAutoBiding::dispatch($item, $autobidder->id, $bidInfo, true);            
        }
        
    }

}