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
		'url_imgs'
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
	
	public function getUrlImgsAttribute()
	{
		$imgs = json_decode($this->attributes['imgs']);
		if($imgs) {
			$urls = array();
			$i = 0;
			foreach($imgs as $img) {
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
		return Carbon::parse($this->attributes['created_at'])->diffForHumans();
	}
	
	public function getFechaHumanoModifyAttribute()
	{
		return Carbon::parse($this->attributes['updated_at'])->diffForHumans();
	}
}
