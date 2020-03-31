<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EstudiantesData extends Model
{
  /**
	*
	* @var string
	*/
  protected $primaryKey = 'estudiante_id';
	
	/**
	* The attributes that should be cast to native types.
	*
	* @var string
	*/
	protected $keyType = 'string';
	
	/**
	 * The attributes that should be cast to native types.
	 *
	 * @var boolean
	 */
	public $timestamps = false;
}
