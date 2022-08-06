<?php

namespace App\Http\Controllers\Api\Gedure;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

// Request
use App\Http\Requests\GetDataRequest;

class NotificationController extends Controller
{
    public function index(GetDataRequest $request)
    {
        $user = $request->user();
        $offset = $request->offset ?: 0;
		$limit = $request->limit ?: 10;

        // NOTA(RECKER): Obtener todas las notificaciones
        $notifys = $user->notifications()
            ->offset($offset)
            ->limit($limit)
            ->get()
            ->makeHidden([
                'notifiable_id',
                'notifiable_type',
                'updated_at',
            ]);
    
    
        // NOTA(RECKER): Marcar notificaciones vistas
        $unreads = $user->notifications()
            ->offset($offset)
            ->limit($limit)->get();
        foreach($unreads as $unread) {
            if ($unread->read_at === null) {
                $unread->read_at = now();
                $unread->save();
            }
        }

        // NOTA(RECKER): Obtener total de registros
        $countTotal = $user->notifications->count();
        $actual = $offset + $notifys->count();

        // NOTA(RECKER): Verificar si se recorrieron todos los registros
		$finish = false;
        if ($actual >= $countTotal) {
            $finish = true;
        }

        return response()->json([
            'data' => $notifys->toArray(),
			'finish' => $finish,
            'unreads' => $user->unreadNotifications->count(),
        ], 200);
    }
}
