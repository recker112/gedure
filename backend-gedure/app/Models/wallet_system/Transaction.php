<?php

namespace App\Models\wallet_system;

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
		'bank_account_id',
		'debt_id',
		'reason',
		'amount',
		'remaining',
		'payment_method',
		'exonerante_server',
	];
	
	/**
	 * The attributes hiddeable.
	 *
	 * @var array
	 */
	protected $hidden = [
		'updated_at', 'deleted_at'
	];
	
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}
	
	public function exonerante()
	{
		return $this->belongsTo('App\Models\User', 'exonerante_id');
	}
	
	public function bank_account()
	{
		return $this->belongsTo('App\Models\wallet_system\BankAccount');
	}
	
	public function debt()
	{
		return $this->belongsTo('App\Models\wallet_system\Debt');
	}
}
