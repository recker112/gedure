<?php

namespace App\Models\WalletSystem;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// Carbon
use Carbon\Carbon;

class ExchangeRate extends Model
{
  use HasFactory;

	protected $fillable = [
		'type',
		'amount',
		'created_at',
	];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = [
		'created_at',
		'updated_at',
	];

	/**
	 * The attributes casteable.
	 *
	 * @var array
	 */
	protected $casts = [
		'amount' => 'float'
	];
	

	public $timestamps = ["created_at"];
	const UPDATED_AT = null;

	public function debt_lote()
	{
		return $this->hasOne('App\Models\WalletSystem\DebtLote');
	}

	/*
	TIMEZONES
	*/
	public function getCreatedAtAttribute($value) {
		return Carbon::parse($value)
			->timezone(config('app.timezone_parse'))
			->format('Y-m-d h:i A');
	}
}
