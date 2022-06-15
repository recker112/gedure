<?php

namespace App\Models\WalletSystem;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExchangeRate extends Model
{
  use HasFactory;

	protected $fillable = [
		'type',
		'amount',
		'created_at',
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
}
