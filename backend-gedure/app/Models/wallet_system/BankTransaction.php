<?php

namespace App\Models\wallet_system;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankTransaction extends Model
{
  use HasFactory;
	
	public function transaction()
	{
		return $this->morphOne('App\Models\wallet_system\Transaction', 'transable');
	}
}
