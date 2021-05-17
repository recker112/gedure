<?php

namespace App\Models\WalletSystem;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Wallet extends Model
{
  use HasFactory, SoftDeletes;
	
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'user_id',
		'balance',
	];
	
	/**
	 * The attributes hiddeable.
	 *
	 * @var array
	 */
	protected $hidden = [
		'created_at', 'updated_at', 'deleted_at'
	];
	
	/**
	 * The attributes casteable.
	 *
	 * @var array
	 */
	protected $casts = [
		'balance' => 'float'
	];
	
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}
}
