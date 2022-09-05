<?php

namespace App\Models\Gedure;

use Illuminate\Database\Eloquent\Casts\Attribute;
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
		'date_format',
	];
	
	/**
	 * The attributes casteable.
	 *
	 * @var array
	 */
	protected $casts = [
		'payload' => 'object',
	];
	
	public $timestamps = ["created_at"];
	const UPDATED_AT = null;
	
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}
	
	public function getPayloadAttribute($value) {
		return json_decode($value);
	}
	
	/*
	 Attributos
	*/
	protected function createdAt(): Attribute
	{
		return Attribute::make(
			get: fn ($value) => Carbon::parse($value)
			->timezone(config('app.timezone_parse'))
			->format('Y-m-d h:i A'),
		);
	}

	protected function dateFormat(): Attribute
	{
		return Attribute::make(
			get: fn ($value) => Carbon::parse($this->attributes['created_at'])
			->timezone(config('app.timezone_parse'))
			->toDateTimeString(),
		);
	}
}
