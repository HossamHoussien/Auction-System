<?php
namespace App\Services;

use App\Models\Bid;
use App\Models\BidingHistory;
use App\Models\Item;
use App\Models\User;
use App\Repositories\BidRepository;
use App\Exceptions\AutoBiddingViolation;
use App\Exceptions\DuplicateBidException;
use App\Exceptions\InvalidBidAmountException;

class BidingHistoryService
{

    public function recordHistory(array $data, bool $autobidding = false)
    {
        $data = $this->formatData($data, $autobidding);

        BidingHistory::create($data);
    }

    public function formatData(array $data, bool $autobidding): array
    {
        $data['auto_biding'] = $autobidding;

        unset($data['auto_biding_allowed']);

        return $data;
    }

}