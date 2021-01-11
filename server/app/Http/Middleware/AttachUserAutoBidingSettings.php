<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AttachUserAutoBidingSettings
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        $content = json_decode($response->content(), true);

        if (json_last_error() == JSON_ERROR_NONE) {
            $user = auth()->user();

            $data = array_merge($content, [
                'max_bid_amount' => $user->max_bid_amount,
                'total_auto_bids' => $user->total_auto_bids,
            ]);

            $encodedData = json_encode($data);
            
            $response->setContent($encodedData);

        }

        return $response;
    }
}