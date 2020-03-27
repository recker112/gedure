<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AnunciosData extends Model
{
    protected $primaryKey = 'anuncio_id';
	
		const CREATED_AT = 'anuncio_create_at';
	
		public function getAnuncios($limit, $offset)
    {
        $dataAnuncios = AnunciosData::select(
            'anuncio_id as id',
            'anuncio_title as title',
            'anuncio_content as content',
						'anuncio_create_at as fecha',
            'user_privilegio as privilegio',
            'admin_name as nameA',
            'creador_name as nameC'
        )
            ->orderBy('anuncio_create_at', 'desc')
            ->limit($limit)
            ->offset($offset)
            ->join('users', 'users.user_cedula', '=', 'anuncios_data.anuncio_owner')
            ->leftJoin('admins_data', 'admins_data.admin_cedula', '=', 'anuncios_data.anuncio_owner')
            ->leftJoin('creadores_data', 'creadores_data.creador_cedula', '=', 'anuncios_data.anuncio_owner')
            ->get();

        return $dataAnuncios;
    }
}
