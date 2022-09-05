<?php

namespace App\Models\Gedure;

use Illuminate\Database\Eloquent\Casts\Attribute;
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
	
	public function sluggable(): array
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
	 Attributos
	*/
	protected function urlPortada(): Attribute
	{
		return Attribute::make(
			get: fn () => json_decode($this->attributes['portada']) ? Storage::disk('public')->url(json_decode($this->attributes['portada'])) : null,
		);
	}

	protected function urlImgs(): Attribute
	{
		return Attribute::make(
			get: function () {
				$galery = json_decode($this->attributes['galery']) ? json_decode($this->attributes['galery']) : [];
				$urls = array();
				$i = 0;
				foreach($galery as $img) {
					$urls[$i] = Storage::disk('public')
						->url($img);
					$i++;
				}
				return $i > 0 ? $urls : null;
			},
		);
	}

	protected function createdAt(): Attribute
	{
		return Attribute::make(
			get: fn ($value) => Carbon::parse($value)
			->timezone(config('app.timezone_parse'))
			->format('Y-m-d h:i A'),
		);
	}

	protected function updatedAt(): Attribute
	{
		return Attribute::make(
			get: fn ($value) => Carbon::parse($value)
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
