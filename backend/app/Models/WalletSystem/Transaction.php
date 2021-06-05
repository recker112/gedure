<?php

namespace App\Models\WalletSystem;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

// Carbon
use Carbon\Carbon;

class Transaction extends Model
{
  use HasFactory, SoftDeletes;
	
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'user_id',
		'exonerante_id',
		'transable_id',
		'transable_type',
		'type',
		'payload',
		'amount',
		'previous_balance',
		'payment_method',
		'exonerado',
	];
	
	/**
	 * The attributes hiddeable.
	 *
	 * @var array
	 */
	protected $hidden = [
		'updated_at', 
		'deleted_at',
		'user_id', 
		'transable_id',
		'transable_type',
		'exonerante_id'
	];
	
	/**
	 * The attributes casteable.
	 *
	 * @var array
	 */
	protected $casts = [
		'amount' => 'float',
		'previous_balance' => 'float',
		'exonerado' => 'integer',
		'payload' => 'object',
	];
	
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}
	
	public function exonerante()
	{
		return $this->belongsTo('App\Models\User', 'exonerante_id');
	}
	
	public function transable()
	{
		return $this->morphTo()->withTrashed();
	}
	
	public function getCreatedAtAttribute($value) {
		return Carbon::parse($value)
			->timezone(config('app.timezone_parse'))
			->format('Y-m-d h:i A');
	}
}