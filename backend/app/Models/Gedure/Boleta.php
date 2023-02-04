<?php

namespace App\Models\Gedure;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

// Carbon
use Carbon\Carbon;

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
		'curso_id', 'user_id', 'deleted_at', 'boleta', 'created_at', 'updated_at'
	];
	
	protected $appends = [
		'fecha',
		'fecha_modify',
		'fecha_humano',
		'fecha_humano_modify',
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
		return $this->belongsTo('App\Models\Gedure\Curso');
	}
	
	/*
	 Attributos
	*/
	protected function fecha(): Attribute
	{
		return Attribute::make(
			get: fn () => Carbon::parse($this->attributes['created_at'])
			->timezone(config('app.timezone_parse'))
			->format('Y-m-d h:i A'),
		);
	}

	protected function fechaModify(): Attribute
	{
		return Attribute::make(
			get: fn () => Carbon::parse($this->attributes['updated_at'])
			->timezone(config('app.timezone_parse'))
			->format('Y-m-d h:i A'),
		);
	}

	protected function fechaHumano(): Attribute
	{
		return Attribute::make(
			get: function () {
				$time = Carbon::parse($this->attributes['created_at'])
					->timezone(config('app.timezone_parse'));
				
				return $time->diffInDays(now()) <= 3 ? $time->diffForHumans() : null;
			},
		);
	}

	protected function fechaHumanoModify(): Attribute
	{
		return Attribute::make(
			get: function () {
				$time = Carbon::parse($this->attributes['updated_at'])
					->timezone(config('app.timezone_parse'));
					
				return $time->diffInDays(now()) <= 3 ? $time->diffForHumans() : null;
			},
		);
	}
}
