<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class GedureConfig extends Model
{
    use HasFactory;

    protected $fillable = [
		'name',
		'value',
	];
	
	protected $hidden = [
		'id', 'created_at', 'updated_at',
	];

    /**
	 * The attributes casteable.
	 *
	 * @var array
	 */
	protected $casts = [
		'value' => 'object',
	];
}
