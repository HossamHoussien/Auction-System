<?php

namespace App\Exceptions;

use Illuminate\Http\Request;
use Exception;

class DuplicateBidException extends Exception
{
    /**
     * Report the exception.
     *
     * @return void
     */
    public function report()
    {
        //
    }

    /**
     * Render the exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function render(Request $request)
    {
        if ($request->expectsJson()){
            return response()->json([
                'status' => false,
                'message' => 'You are already the highest bidder. There is no need to over-biding yourself.'
            ], 200);
        }
        return response()->with([
            'status' => false,
            'message' => 'You are already the highest bidder. There is no need to over-biding yourself.'
        ]);
    }
}