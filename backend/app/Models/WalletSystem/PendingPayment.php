<?php

namespace App\Models\WalletSystem;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// Carbon
use Carbon\Carbon;

class PendingPayment extends Model
{
  use HasFactory;
	
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'bank_account_id',
		'user_id',
		'date',
		'reference',
		'amount',
		'code',
		'status',
	];
	
	/**
	 * The attributes hiddeable.
	 *
	 * @var array
	 */
	protected $hidden = [
		'deleted_at', 'user_id', 'bank_account_id'
	];
	
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}
	
	public function bank_account()
	{
		return $this->belongsTo('App\Models\WalletSystem\BankAccount');
	}
	
	/*
	 Attributos
	*/
	protected function createdAt(): Attribute
	{
		return Attribute::make(
			get: fn ($value) => Carbon::parse($value)
			->timezone(config('app.timezone_parse'))
			->format('Y-m-d h:i A'),
		);
	}
}
