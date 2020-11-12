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
		'created_at' => 'date: d-m-Y h:i A',
		'updated_at' => 'date: d-m-Y h:i A',
	];
	
	protected $appends = [
		'fecha_humano', 
		'fecha_humano_modify', 
		'extracto',
		'url_imgs'
	];
	
	protected $hidden = [
		'imgs',
	];
	
	public function sluggable()
	{
		return [
			'slug' => [
					'source' => 'title'
			]
		];
	}
	
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}
	
	/*
		ATTRIBUTES
	*/
	public function getExtractoAttribute()
	{
		$extracto = str_split($this->attributes['content'], 150);
		return $extracto[0];
	}
	
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
