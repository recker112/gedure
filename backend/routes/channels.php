<?php

use Illuminate\Support\Facades\Broadcast;

// Autorización: POST /api/broadcasting/auth con `Authorization: Bearer <token>`
// definitivo (middleware `auth.full`, ver withBroadcasting en bootstrap/app.php).
// El token temporal del 2FA recibe 403 y sin token 401.

// Canal privado personal: `private-App.Models.User.{id}`.
Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
