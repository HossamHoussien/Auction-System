<?php
namespace App\Repositories;

use App\Models\Bid;

class BidRepository{

    public function updateOrCreate(array $data, Bid $bid = null)
    {
        return is_null($bid) ? $this->create($data) : $this->update($data, $bid);
    }

    public function create(array $data)
    {
        $bid = new Bid;
        $bid->amount = $data['amount'];
        $bid->user_id = $data['user_id'];
        $bid->item_id = $data['item_id'];
        $bid->auto_biding_allowed = $data['auto_biding_allowed'];
        $bid->save();
        return $bid;
    }

    public function update(array $data, Bid $bid)
    {
        return $bid->update($data);
    }
}