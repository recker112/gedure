<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// Carbon
use Carbon\Carbon;

class Log extends Model
{
	use HasFactory;
	
	protected $fillable = [
		'action',
		'type',
		'payload',
		'user_id'
	];
	
	protected $hidden = [
		'id', 'user_id',
	];
	
	protected $casts = [
		'created_at' => 'date: Y-d-m h:i A',
	];
	
	protected $appends = [
		'username',
		'name',
		'date_format',
	];
	
	public $timestamps = ["created_at"];
	const UPDATED_AT = null;
	
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}
	
	public function getUsernameAttribute()
	{
		return $this->user->privilegio.$this->user->username;
	}
	
	public function getNameAttribute()
	{
		return $this->user->name;
	}
	
	public function getDateFormatAttribute()
	{
		return Carbon::parse($this->attributes['created_at'])->toDateTimeString();
	}
}
