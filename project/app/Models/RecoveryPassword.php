<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecoveryPassword extends Model
{
  use HasFactory;
	
	protected $fillable = [
		'code',
		'user_id',
		'confirm'
	];
	
	protected $hidden = [
		'id'
	];
	
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}
}
