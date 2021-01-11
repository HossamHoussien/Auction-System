<?php
namespace App\Services;

use App\Models\Item;
use App\Services\BidService;
use App\Services\UserService;
use App\Exceptions\InvalidSubmissionDateExeption;


class ItemService
{
    protected $bidService;
    protected $userService;

    public function __construct() {
        $this->bidService = new BidService;
        $this->userService = new UserService;
    }

    public function loadItemData(Item $item)
    {
        $item->min_bid = $this->bidService->minAllowedBid($item);
        
        $item->can_bid = $this->userService->canBid($user, $item);

        $item->load('history.user');   

        return $item;
    }

    public function validateItemCloseDate(Item $item){

        if($item->close_at->isPast())
            throw new InvalidSubmissionDateExeption;
        
        return true;
    }


}