<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
	use HasFactory;
	
	protected $fillable = [
		'action',
		'type',
		'user_id'
	];
	
	protected $hidden = [
		'id'
	];
	
	protected $casts = [
		'created_at' => 'date: Y-m-d H:i:s',
		'updated_at' => 'date: Y-m-d H:i:s',
	];
	
	public $timestamps = ["created_at"];
	const UPDATED_AT = null;
	
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}
}
