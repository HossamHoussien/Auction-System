<?php

namespace App\Http\Controllers\API;

use App\Models\Item;
use App\Services\ItemService;
use App\Http\Controllers\Controller;

class ItemController extends Controller
{
    protected $itemService;

    public function __construct() {
        $this->itemService = new ItemService;
    }

    public function index()
    {
        return Item::paginate(10);
    }

    public function show(Item $item)
    {
        $user = auth()->user();

        // $item = $this->itemService->loadItemData($item);
        
        // return response()->json($item);
    }
}