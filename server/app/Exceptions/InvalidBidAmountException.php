<?php

namespace App\Exceptions;

use Illuminate\Http\Request;
use Exception;

class InvalidBidAmountException extends Exception
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
                'message' => 'The provided bid amount is invalid. Maybe another user has beat you and submit a higher amount.'
            ], 200);
        }
        return response()->with([
            'status' => false,
            'message' => 'The provided bid amount is invalid. Maybe another user has beat you and submit a higher amount.'
        ]);
    }
}