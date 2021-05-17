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
		'user_id',
	];
	
	/**
	 * The attributes hiddeable.
	 *
	 * @var array
	 */
	protected $hidden = [
		'created_at', 'updated_at', 'user_id', 'bank_account_id',
	];
	
	public function bank_account()
	{
		return $this->belongsTo('App\Models\WalletSystem\BankAccount');
	}
	
	public function transaction()
	{
		return $this->morphOne('App\Models\WalletSystem\Transaction', 'transable');
	}
	
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}
}
