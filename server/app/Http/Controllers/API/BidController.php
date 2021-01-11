<?php

namespace App\Http\Controllers\API;

use App\Models\Item;
use App\Models\User;
use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Controllers\Controller;
use App\Http\Requests\BidSubmitRequest;

class BidController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService) {
        $this->userService = $userService;
    }


    public function bid(BidSubmitRequest $request){
        $data = $request->validated();

        $user = auth()->user();        

        $item = Item::findOrFail($data['item_id']);

        $status = $this->userService->submitBid($item, $user->id, $data);

        $item = $item->loadItemData($user);

        return response()->json([
            'status' => $status,
            'item'   => $item
        ]);

    }

    public function autobiding(Request $request)
    {
        $data = $request->validate([
            'auto_biding_amount' => 'required|numeric|min:1'
        ]);

        $auto_biding_amount = $request->auto_biding_amount;

        $user = auth()->user();
        
        $previous_amount = $user->max_bid_amount;
        
        $user->max_bid_amount = $auto_biding_amount;

        $user->save();

        return response()->json([
            'status' => true,
            'previous_amount' => $previous_amount,
            'auto_biding_amount' => $user->max_bid_amount,
            'message' => 'Your changes has been saved.'
        ]);
    }

}