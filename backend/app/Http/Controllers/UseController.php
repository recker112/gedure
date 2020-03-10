<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UseController extends Controller
{
    //
    public function get() {
        $user = \DB::table('users')->WHERE('id',1)->first();

        return $user->name;
    }
}
