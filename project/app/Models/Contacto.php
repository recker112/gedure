<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
	
	protected $casts = [
		'created_at' => 'date: d-m-Y h:i A',
		'updated_at' => 'date: d-m-Y h:i A',
	];
	
	public $timestamps = ["created_at"];
	const UPDATED_AT = null;
}
