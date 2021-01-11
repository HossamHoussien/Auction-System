<?php

namespace App\Http\Controllers\API;

use App\Models\Item;
use App\Http\Controllers\Controller;

class ItemController extends Controller
{
    
    public function index(){
        return Item::paginate(10);
    }

    
    public function show(Item $item){
        $user = auth()->user();

        $item = $item->loadItemData($user);
        
        return response()->json($item);
    }
}