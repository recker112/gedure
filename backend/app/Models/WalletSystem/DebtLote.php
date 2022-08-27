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
		'exchange_rate_id',
		'exchange_amount',
		'available_on',
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
		'available_on' => 'date',
	];

	/**
	 * The accessors to append to the model's array form.
	 *
	 * @var array
	 */
	protected $appends = ['fecha_creado'];
	
	public function debts()
	{
		return $this->hasMany('App\Models\WalletSystem\Debt');
	}

	public function exchange_rate()
	{
		return $this->belongsTo('App\Models\WalletSystem\ExchangeRate');
	}
	
	/*
	TIMEZONES CUSTOM
	*/
	public function getAvailableOnAttribute($value) {
		return Carbon::parse($value);
	}

	public function getFechaCreadoAttribute() {
		$created_at = $this->attributes['created_at'];
		return Carbon::parse($created_at)
			->timezone(config('app.timezone_parse'))
			->format('Y-m-d h:i A');
	}
}
