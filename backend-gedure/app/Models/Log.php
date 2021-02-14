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
		if ($this->user) {
			return $this->user->privilegio.$this->user->username;	
		}else {
			return 'Cuenta eliminada';
		}
	}
	
	public function getNameAttribute()
	{
		if ($this->user) {
			return $this->user->name;
		}else {
			return 'Cuenta eliminada';
		}
	}
	
	public function getPayloadAttribute($value) {
		return json_decode($value);
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
