<?php
namespace App\Services;

use App\Models\Bid;
use App\Models\Item;
use App\Models\User;
use App\Repositories\BidRepository;
use App\Exceptions\AutoBiddingViolation;
use App\Exceptions\DuplicateBidException;
use App\Exceptions\InvalidBidAmountException;

class BidService
{
    protected $repository;

    public function __construct() {
        $this->repository = new BidRepository;;
    }


    public function getHighestBid(Item $item)
    {
        return Bid::where('item_id', $item->id)->orderBy('amount', 'DESC')->lockForUpdate()->first();
    }


    public function minAllowedBid(Item $item)
    {   
        $bids = $item->bids;

        return count($bids) ? (int) $item->bids->max('amount') + 1 : (int) $item->starting_price;;
    }


    public function getAutobidders($item_id)
    {
        return Bid::autoBiddersForItem($item_id)
                ->with(['user'])
                ->get()
                ->pluck('user')
                ->unique();
    }


    public function updateOrCreate(array $data, Bid $bid = null)
    {
        return $this->repository->updateOrCreate($data, $bid);
    }


    public function validateAutoBiding(User $user, $increment, $autobiding)
    {
        if(!$autobiding) return true;

        if(($user->total_auto_bids + $increment) >= $user->max_bid_amount)
            throw new AutoBiddingViolation;
            
        return true;
    }


    public function validateSubmittedBid(User $user, $highestBid, array $data)
    {
        if(is_null($highestBid)) return true;
        
        if($highestBid->user_id === $user->id)
            throw new DuplicateBidException;
        
        if($data['amount'] <= $highestBid->amount)
            throw new InvalidBidAmountException;
        
        return true;
    }

    
    public function transformBidData($user_id, array $bidInfo){
        return [
            'amount'                => $bidInfo['bid_amount'],
            'user_id'               => $user_id,
            'item_id'               => $bidInfo['item_id'],
            'auto_biding_allowed'   => $bidInfo['auto_biding'],
        ];
    }

}