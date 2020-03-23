<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\AdminsData;

class NewsData extends Model
{
    protected $primaryKey = 'new_id';

    protected $hidden = [
        'new_create_at'
    ];

    const CREATED_AT = 'new_create_at';

    public function getNews($limit, $offset)
    {
        $dataNews = NewsData::select(
            'new_id as id',
            'new_title as title',
            'new_content as content',
            'new_img as img',
            'user_cedula as cedula',
            'user_privilegio as privilegio',
            'admin_name as nameA',
            'admin_avatar as avatarA',
            'creador_name as nameC',
            'creador_avatar as avatarC'
        )
            ->orderBy('new_create_at', 'desc')
            ->limit($limit)
            ->offset($offset)
            ->join('users', 'users.user_cedula', '=', 'news_data.new_owner')
            ->leftJoin('admins_data', 'admins_data.admin_cedula', '=', 'news_data.new_owner')
            ->leftJoin('creadores_data', 'creadores_data.creador_cedula', '=', 'news_data.new_owner')
            ->get();

        return $dataNews;
    }
}
