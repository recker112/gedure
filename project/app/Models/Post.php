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
	
	protected $casts = [
		'created_at' => 'date: Y-d-m h:i A',
		'updated_at' => 'date: Y-d-m h:i A',
	];
	
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
	
	public function getFechaHumanoAttribute()
	{
		$dateNow = now();
		$dateCreate = Carbon::parse($this->attributes['created_at']);
		
		if ($dateCreate->diffInDays($dateNow) <= 3) {
			$show = $dateCreate->diffForHumans();
		}else {
			$show = 'el '.$dateCreate->format('Y-d-m h:i A');
		}
		
		return $show;
	}
	
	public function getFechaHumanoModifyAttribute()
	{
		$dateNow = now();
		$dateCreate = Carbon::parse($this->attributes['updated_at']);
		
		if ($dateCreate->diffInDays($dateNow) <= 3) {
			$show = $dateCreate->diffForHumans();
		}else {
			$show = 'el '.$dateCreate->format('Y-d-m h:i A');
		}
		
		return $show;
	}
}
