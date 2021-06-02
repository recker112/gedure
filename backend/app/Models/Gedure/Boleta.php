<?php

namespace App\Models\Gedure;

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
		'curso_id', 'user_id', 'deleted_at', 'boleta'
	];
	
	protected $appends = [
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
	TIMEZONES
	*/
	public function getCreatedAtAttribute($value) {
		return Carbon::parse($value)
			->timezone(config('app.timezone_parse'))
			->format('Y-m-d h:i A');
	}
	
	public function getUpdatedAtAttribute($value) {
		return Carbon::parse($value)
			->timezone(config('app.timezone_parse'))
			->format('Y-m-d h:i A');
	}
	
	public function getFechaHumanoAttribute()
	{
		$dateNow = now()
			->timezone(config('app.timezone_parse'));
		$date_created = Carbon::parse($this->attributes['created_at'])
			->timezone(config('app.timezone_parse'));
		
		if ($date_created->diffInDays($dateNow) <= 3) {
			$show = $date_created->diffForHumans();
		}else {
			$show = 'el '.$date_created->format('Y-m-d h:i A');
		}
		
		return $show;
	}
	
	public function getFechaHumanoModifyAttribute()
	{
		$dateNow = now();
		$date_updated = Carbon::parse($this->attributes['updated_at']);
		
		if ($date_updated->diffInDays($dateNow) <= 3) {
			$show = $date_updated->diffForHumans();
		}else {
			$show = 'el '.$date_updated->format('Y-m-d h:i A');
		}
		
		return $show;
	}
}
