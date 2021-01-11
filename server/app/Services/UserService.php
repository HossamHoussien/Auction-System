<?php
namespace App\Services;

use App\Models\Item;
use App\Models\User;
use App\Services\BidingHistoryService;
use DB;

class UserService
{
    protected $bidService;
    protected $bidingHistoryService;

    public function __construct() {
        $this->bidService = new BidService;

        $this->bidingHistoryService = new BidingHistoryService;;
    }

    
    public function submitBid(Item $item, $user_id, array $bidInfo, $autobiding = false)
    {
        $data = $this->transformBidData($user_id, $bidInfo);

        DB::transaction(function () use($user_id, $item, $data, $autobiding){

            $user = User::whereId($user_id)->lockForUpdate()->firstOrFail();

            $bid = $user->bids()->whereItemId($data['item_id'])->lockForUpdate()->first();

            $highestBid = $item->getHighestBid();

            $isAutoBiding = $autobiding && !is_null($highestBid);

            $data['amount'] =  $isAutoBiding ? $highestBid->amount + 1 : $data['amount'];

            $increment =  $isAutoBiding ? ($highestBid->amount + 1) -  $bid->amount : 0;

            $item->validateItemCloseDate();

            $this->bidService->validateAutoBiding($user, $increment, $autobiding);

            $this->bidService->validateSubmittedBid($user, $highestBid, $data);

            $this->bidService->updateOrCreate($data, $bid);

            $user->incrementTotalAutoBids($increment);

            $this->bidingHistoryService->recordHistory($data, $autobiding);


        }, 3);

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