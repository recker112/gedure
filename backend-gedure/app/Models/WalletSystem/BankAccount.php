<?php

namespace App\Models\WalletSystem;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankAccount extends Model
{
  use HasFactory;
	
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'n_account',
		'rif',
		'name',
		'email',
		'type',
		'code',
	];
	
	/**
	 * The attributes hiddeable.
	 *
	 * @var array
	 */
	protected $hidden = [
		'updated_at', 'created_at',
	];
	
	public function bank_transactions()
	{
		return $this->hasMany('App\Models\WalletSystem\BankTransaction');
	}
	
	public function transactions()
	{
		return $this->morphMany('App\Models\WalletSystem\Transaction', 'transable');
	}
}
