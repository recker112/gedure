<?php

namespace App\Models\WalletSystem;

use Illuminate\Database\Eloquent\Casts\Attribute;
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
		'exchange_rate_id',
		'exchange_amount',
		'available_on',
		'created_at',
		'important',
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
		'exchange_amount' => 'float',
		'available_on' => 'date',
	];
	
	public function debts()
	{
		return $this->hasMany('App\Models\WalletSystem\Debt');
	}

	public function exchange_rate()
	{
		return $this->belongsTo('App\Models\WalletSystem\ExchangeRate');
	}

	/*
	 Attributos
	*/
	protected function availableOn(): Attribute
	{
		return Attribute::make(
			get: fn ($value) => Carbon::parse($value),
		);
	}

	protected function createdAt(): Attribute
	{
		return Attribute::make(
			get: fn ($value) => Carbon::parse($value)
			->timezone(config('app.timezone_parse'))
			->format('Y-m-d h:i A'),
		);
	}

	protected function updatedAt(): Attribute
	{
		return Attribute::make(
			get: fn ($value) => Carbon::parse($value)
			->timezone(config('app.timezone_parse'))
			->format('Y-m-d h:i A'),
		);
	}
}
