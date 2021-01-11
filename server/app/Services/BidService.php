<?php
namespace App\Services;

use App\Models\Bid;
use App\Models\BidingHistory;
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




}