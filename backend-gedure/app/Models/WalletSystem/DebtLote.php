<?php

namespace App\Models\WalletSystem;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// Carbon
use Carbon\Carbon;

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
	];
	
	/**
	 * The attributes hiddeable.
	 *
	 * @var array
	 */
	protected $hidden = [
		'updated_at',
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
			->format('Y-d-m h:i A');
	}
	
	public function getUpdatedAtAttribute($value) {
		return Carbon::parse($value)
			->timezone(config('app.timezone_parse'))
			->format('Y-d-m h:i A');
	}
}