<?php
namespace App\Services;


use DB;
use App\Models\Bid;
use App\Models\Item;
use App\Models\User;
use App\Services\BidingHistoryService;


class UserService
{
    protected $bidService;
    protected $itemService;
    protected $bidingHistoryService;

    public function __construct() {
        $this->bidService = new BidService;
        $this->itemService = new ItemService;
        $this->bidingHistoryService = new BidingHistoryService;
    }

    public function canBid(User $user, Item $item)
    {

        $highestBid = $this->bidService->getHighestBid($item);

        return $highestBid ? $highestBid->user_id !== $user->id : true;
        
    }


    public function submitBid(Item $item, $user_id, array $bidInfo, $autobiding = false)
    {
        $data = $this->bidService->transformBidData($user_id, $bidInfo);
        
        DB::transaction(function () use($user_id, $item, $data, $autobiding){

            $user = User::whereId($user_id)->lockForUpdate()->firstOrFail();
            
            $bid = $user->bids()->whereItemId($data['item_id'])->lockForUpdate()->first();
            
            $highestBid = $this->bidService->getHighestBid($item);

            $isAutoBiding = $autobiding && !is_null($highestBid);

            $data['amount'] =  $isAutoBiding ? $highestBid->amount + 1 : $data['amount'];

            $increment =  $isAutoBiding ? ($highestBid->amount + 1) -  $bid->amount : 0;

            $this->itemService->validateItemCloseDate($item);

            $this->bidService->validateAutoBiding($user, $increment, $autobiding);

            $this->bidService->validateSubmittedBid($user, $highestBid, $data);

            $this->bidService->updateOrCreate($data, $bid);
            
            $this->incrementTotalAutoBids($user, $increment);

            $this->bidingHistoryService->recordHistory($data, $autobiding);


        }, 3);

        return true;
    }
    
    public function incrementTotalAutoBids(User $user, int $increment)
    {
        return $user->increment('total_auto_bids', $increment);;
    }

}