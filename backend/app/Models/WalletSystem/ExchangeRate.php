<?php

namespace App\Models\WalletSystem;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExchangeRate extends Model
{
  use HasFactory;
	
	protected $primaryKey = 'type';
	
	public $incrementing = false;
	
	protected $keyType = 'string';
}
