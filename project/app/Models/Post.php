<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
// Carbon
use Carbon\Carbon;
// Slug
use Cviebrock\EloquentSluggable\Sluggable;

class Post extends Model
{
  use HasFactory, Sluggable;
	
	protected $appends = [
		'fecha_humano', 
		'fecha_humano_modify',
		'url_imgs',
		'url_portada'
	];
	
	protected $hidden = [
		'imgs',
		'user_id',
	];
	
	public function sluggable()
	{
		return [
			'slug' => [
				'source' => 'title'
			]
		];
	}
	
	/*
		RELACIONES
	*/
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}
	
	/*
		ATRIBUTOS
	*/
	public function getUrlPortadaAttribute()
	{
		$portada = json_decode($this->attributes['portada']);
		if($portada) {
			$url = Storage::disk('public')->url($portada);
		}else {
			$url = null;
		}
		return $url;
	}
	
	public function getUrlImgsAttribute()
	{
		$galery = json_decode($this->attributes['galery']);
		if($galery) {
			$urls = array();
			$i = 0;
			foreach($galery as $img) {
				$urls[$i] = Storage::disk('public')
					->url($img);
				$i++;
			}
		}else {
			$urls = null;
		}
		return $urls;
	}
	
	/*
	TIMEZONES
	*/
	public function getCreatedAtAttribute($value) {
		return Carbon::parse($value)
			->timezone(config('app.timezone_parse'))
			->format('Y-d-m h:i A');
	}
	
	public function getUpdatedAtAttribute($value) {
		return Carbon::parse($value)
			->timezone(config('app.timezone_parse'))
			->format('Y-d-m h:i A');
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
			$show = 'el '.$date_created->format('Y-d-m h:i A');
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
			$show = 'el '.$date_updated->format('Y-d-m h:i A');
		}
		
		return $show;
	}
}
