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
	
	/*
	TIMEZONES
	*/
	public function getCreatedAtAttribute($value) {
		return Carbon::parse($value)
			->timezone(config('app.timezone_parse'))
			->format('Y-d-m h:i A');
	}
	
	public function getDateFormatAttribute()
	{
		return Carbon::parse($this->attributes['created_at'])
			->timezone(config('app.timezone_parse'))
			->toDateTimeString();
	}
}
