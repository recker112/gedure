<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
//Carbon
use Carbon\Carbon;

class Post extends Model
{
  use HasFactory;
	
	protected $casts = [
		'created_at' => 'date: d-m-Y h:i A',
		'updated_at' => 'date: d-m-Y h:i A',
	];
	
	protected $appends = ['fecha_humano', 'fecha_humano_modify'];
	
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}
	
	/*
		ATTRIBUTES
	*/
	public function getFechaHumanoAttribute()
	{
		return Carbon::parse($this->attributes['created_at'])->diffForHumans();
	}
	
	public function getFechaHumanoModifyAttribute()
	{
		return Carbon::parse($this->attributes['updated_at'])->diffForHumans();
	}
}
