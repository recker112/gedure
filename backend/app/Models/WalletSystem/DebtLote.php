<?php

namespace App\Models\WalletSystem;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// Carbon
use Carbon\Carbon;

// Exchange
use App\Models\WalletSystem\ExchangeRate;

class DebtLote extends Model
{
  use HasFactory;
	
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'reason',
		'amount_to_pay',
		'exchange_rate_type'
	];
	
	/**
	 * The attributes hiddeable.
	 *
	 * @var array
	 */
	protected $hidden = [
		'updated_at',
	];
	
	/**
	 * The attributes casteable.
	 *
	 * @var array
	 */
	protected $casts = [
		'amount_to_pay' => 'float',
	];
	
	/**
	 * The accessors to append to the model's array form.
	 *
	 * @var array
	 */
	protected $appends = [
		'amount_to_pay_exchange'
	];
	
	public function debts()
	{
		return $this->hasMany('App\Models\WalletSystem\Debt');
	}
	
	/*
	TIMEZONES
	*/
	public function getCreatedAtAttribute($value) {
		return Carbon::parse($value)
			->timezone(config('app.timezone_parse'))
			->format('Y-m-d h:i A');
	}
	
	public function getAmountToPayExchangeAttribute() {
		if ($this->exchange_rate_type !== 'Bs.S') {
			$exchange_rate =  ExchangeRate::find($this->exchange_rate_type);
			$exchange_rate = $exchange_rate ? $exchange_rate->amount : null;
			
			$new_amount = $this->amount_to_pay * $exchange_rate;
			
			return $new_amount;
		}
		
		return null;
	}
	
	public function getUpdatedAtAttribute($value) {
		return Carbon::parse($value)
			->timezone(config('app.timezone_parse'))
			->format('Y-m-d h:i A');
	}
}
