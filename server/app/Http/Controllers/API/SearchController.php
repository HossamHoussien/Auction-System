<?php

namespace App\Http\Controllers\API;

use App\Models\Item;
use App\Http\Controllers\Controller;
use App\Http\Requests\SearchRequest;

class SearchController extends Controller
{
    
    public function __invoke(SearchRequest $request)
    {
        return Item::where('name', 'like', "%{$request->keyword}%")
                ->orWhere('description', 'like', "%{$request->keyword}%")
                ->paginate(10);
    }

    
}