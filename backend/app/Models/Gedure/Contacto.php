<?php

namespace App\Models\Gedure;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// Carbon
use Carbon\Carbon;

class Contacto extends Model
{
  use HasFactory;
	
	protected $fillable = [
		'nombre',
		'email',
		'telefono',
		'asunto',
		'content'
	];
	
	protected $hidden = [
		'updated_at'
	];
	
	public $timestamps = ["created_at"];
	const UPDATED_AT = null;
	
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
}
