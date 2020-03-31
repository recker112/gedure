<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdminsData extends Model
{
  protected $primaryKey = 'admin_id';
	
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
