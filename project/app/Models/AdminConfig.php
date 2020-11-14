<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AdminConfig extends Model
{
  use HasFactory, SoftDeletes;
	
	protected $fillable = [
		'user_id',
	];
	
	protected $hidden = [
		'created_at', 'updated_at', 'user_id', 'id', 'deleted_at'
	];
	
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}
}
