<?php

namespace App\Jobs;

use App\Models\Item;
use App\Services\UserService;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Queue\Middleware\WithoutOverlapping;

class ProcessAutoBiding implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $userService;
    protected $item;
    protected $user_id;
    protected $bidInfo;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Item $item, $user_id, array $bidInfo)
    {
        $this->item         = $item;
        $this->user_id      = $user_id;
        $this->bidInfo      = $bidInfo;
        $this->userService  = new UserService;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->userService->submitBid($this->item, $this->user_id, $this->bidInfo, true);
    }
}