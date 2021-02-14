<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
	use HasFactory;
	
	protected $fillable = [
		'user_id',
		'invitation_key',
	];
	
	protected $hidden = [
		'created_at', 'updated_at'
	];
	
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}
}