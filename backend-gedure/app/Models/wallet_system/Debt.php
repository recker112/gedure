<?php

namespace App\Models\wallet_system;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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
		'updated_at', 'deleted_at'
	];
	
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}
	
	public function transaction()
	{
		return $this->hasOne('App\Models\wallet_system\Transaction');
	}
	
	public function debt_lote()
	{
		return $this->belongsTo('App\Models\wallet_system\DebtLote');
	}
}
