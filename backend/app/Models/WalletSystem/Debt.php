<?php

namespace App\Models\WalletSystem;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

// Carbon
use Carbon\Carbon;

class Debt extends Model
{
  use HasFactory, SoftDeletes;
	
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'user_id',
		'debt_lote_id',
		'status',
	];
	
	/**
	 * The attributes hiddeable.
	 *
	 * @var array
	 */
	protected $hidden = [
		'deleted_at', 'id', 'user_id', 'debt_lote_id'
	];
	
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}
	
	public function debt_lote()
	{
		return $this->belongsTo('App\Models\WalletSystem\DebtLote');
	}
	
	public function transaction()
	{
		return $this->morphOne('App\Models\WalletSystem\Transaction', 'transable');
	}
	
	/*
	TIMEZONES
	*/
	public function getCreatedAtAttribute($value) {
		return Carbon::parse($value)
			->timezone(config('app.timezone_parse'))
			->format('Y-m-d h:i A');
	}
	
	public function getUpdatedAtAttribute($value) {
		return Carbon::parse($value)
			->timezone(config('app.timezone_parse'))
			->format('Y-m-d h:i A');
	}
}
