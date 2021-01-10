<?php
namespace App\Services;


use DB;
use App\Models\Bid;
use App\Models\User;
use App\Models\Item;
use App\Exceptions\DuplicateBidException;
use App\Exceptions\InvalidBidAmountException;

class UserService
{
    protected $bidService;

    public function __construct() {
        $this->bidService = new BidService;
    }

    public function canBid(Item $item)
    {
        // 1. If Highest bid doesn't belong to the current user
        //? 2. Auto-biding?

        $highestBid = $this->bidService->highestBid($item);

        $currentUserId = auth()->id();

        return $highestBid ? $highestBid->user_id !== $currentUserId : true;
        
        
    }
    

    public function submitBid(Item $item, array $bidInfo)
    {
        $user = auth()->user();

        $data = $this->transformBidData($user, $bidInfo);

        DB::transaction(function () use($user, $item, $data){
            
            // Get Bid on $item made by $user, if exists
            $bid = $user->bids()->whereItemId($data['item_id'])->lockForUpdate()->first();

            // Get the Highest bid on this item
            $highestBid = Bid::where('item_id', $item->id)->orderBy('amount', 'DESC')->lockForUpdate()->first();


            $this->validateSubmittedBid($user, $highestBid, $data);
            
            // 3. bid_amount > highest bid && highest bidder != current user
            //   3.1 If user has NOT submit a bid on this item before
            if(is_null($bid) ){
                Bid::create($data);
            }
            //   3.2 User has a previous bid on this item
            else{
                $bid->update($data);
            }

        }, 3);
    }

    protected function validateSubmittedBid(User $user, $highestBid, array $data)
    {
        // No bids on this item submitted yet
        if(is_null($highestBid)) return true;

        // 1. Check if bid_amount <= highest bid ?=> throw error
        if($data['amount'] <= $highestBid->amount){
            throw new InvalidBidAmountException;
        }
        
        if($highestBid->user_id === $user->id){
            // 2. If highest bidder === current user ?=> throw error
            throw new DuplicateBidException;
        }

        return true;
    }


    protected function transformBidData(User $user, array $bidInfo){
        return [
            'amount'                => $bidInfo['bid_amount'],
            'user_id'               => $user->id,
            'item_id'               => $bidInfo['item_id'],
            'auto_biding_allowed'   => $bidInfo['auto_biding'],
        ];
    }
}