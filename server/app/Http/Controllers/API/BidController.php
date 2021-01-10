<?php

namespace App\Http\Controllers\API;

use App\Models\Item;
use App\Models\User;
use App\Services\UserService;
use App\Http\Controllers\Controller;
use App\Http\Requests\BidSubmitRequest;

class BidController extends Controller
{
    protected $userService;

    public function __construct() {
        $this->userService = new UserService;
    }

    public function bid(BidSubmitRequest $request)
    {
        $data = $request->validated();

        $user_id = auth()->id();        

        $item = Item::findOrFail($data['item_id']);

        $status = $this->userService->submitBid($item, $user_id, $data);

        return response()->json([
            'status' => $status,
        ]);

    }


}