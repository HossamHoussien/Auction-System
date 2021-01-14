<?php
namespace App\Services;


use App\Models\BidingHistory;
class BidingHistoryService
{

    public function recordHistory(array $data)
    {
        $data = $this->formatData($data);

        BidingHistory::create($data);
    }

    public function formatData(array $data): array
    {
        $data['auto_biding'] = $data['auto_biding_allowed'];

        unset($data['auto_biding_allowed']);

        return $data;
    }

}