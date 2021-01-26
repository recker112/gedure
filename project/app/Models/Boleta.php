<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Boleta extends Model
{
  use HasFactory, SoftDeletes;
	
	protected $fillable = [
		'curso_id',
		'user_id',
		'boleta',
		'lapso',
	];
	
	protected $hidden = [
		'curso_id', 'user_id', 'deleted_at'
	];
	
	/*
		RELACIONES
	*/
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}
	
	public function curso()
	{
		return $this->belongsTo('App\Models\Curso');
	}
}
