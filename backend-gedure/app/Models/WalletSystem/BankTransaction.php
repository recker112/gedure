<?php

namespace App\Models\WalletSystem;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankTransaction extends Model
{
  use HasFactory;
	
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'bank_account_id',
		'reference',
		'concepto',
		'amount',
		'code',
		'taked',
	];
	
	/**
	 * The attributes hiddeable.
	 *
	 * @var array
	 */
	protected $hidden = [
		'created_at', 'updated_at',
	];
	
	public function transaction()
	{
		return $this->morphOne('App\Models\WalletSystem\Transaction', 'transable');
	}
}
