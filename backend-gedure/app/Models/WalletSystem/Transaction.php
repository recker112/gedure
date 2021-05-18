<?php

namespace App\Models\WalletSystem;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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
		'updated_at', 'deleted_at', 'user_id', 'transable_id', 'transable_type'
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
}