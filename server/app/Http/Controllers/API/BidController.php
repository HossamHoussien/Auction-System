<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Bid;
use App\Services\UserService;

class BidController extends Controller
{
    protected $userService;

    public function __construct() {
        $this->userService = new UserService;
    }

    public function bid(Request $request)
    {
        $data = $request->validate([
            'item_id' => 'required|numeric',
            'bid_amount' => 'required|numeric',
            'auto_biding' => 'required|boolean',
        ]);

        $user = auth()->user();

        $item = Item::findOrFail($data['item_id']);

        $bid = $this->userService->submitBid($item, $data);

        return response()->json($bid);

    }


}