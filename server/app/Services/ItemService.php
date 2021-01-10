<?php
namespace App\Services;

use App\Models\Item;
use App\Exceptions\InvalidSubmissionDateExeption;


class ItemService
{

    public function validateItemCloseDate(Item $item){

        if($item->close_at->isPast())
            throw new InvalidSubmissionDateExeption;
        
        return true;
    }


}