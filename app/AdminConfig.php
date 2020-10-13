<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdminConfig extends Model
{
  protected $primaryKey = 'cedula';
	
	protected $keyType = 'string';
	
	protected $hidden = [
			'created_at', 'updated_at', 'id', 'cedula'
	];
}
