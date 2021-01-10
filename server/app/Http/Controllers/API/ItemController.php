<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Services\ItemService;
use App\Services\UserService;

class ItemController extends Controller
{
    protected $itemService;
    protected $userService;

    public function __construct() {
        $this->itemService = new ItemService;
        $this->userService = new UserService;
    }

    public function index()
    {
        return Item::paginate(10);
    }

    public function show(Item $item)
    {
        $item->min_bid = $this->itemService->minAllowedBid($item);
        
        $item->can_bid = $this->userService->canBid($item);
        
        return $item;
    }
}