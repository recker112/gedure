<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
	use HasFactory, Notifiable, HasApiTokens, SoftDeletes, HasRoles;

	/**
	 * Esta parte arregla cambia el guard name default del usuario
	 * para que no de problemas al utilizar procesos en segundo
	 * plano que den permisos a usuarios.
	 */
	protected $guard_name = 'api';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'username',
		'name',
		'email',
		'password',
		'avatar',
		'privilegio',
		'actived_at',
	];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = [
		'created_at',
		'updated_at',
		'password',
		'deleted_at',
		'personal_data_id',
		'personal_data_type',
		'is_solvente'
	];

	protected $appends = ['is_solvente'];
	
	/*
		RELACIONES
	*/
	
	public function personal_data()
	{
		return $this->morphTo()->withTrashed();
	}
	
	public function blocks()
	{
		return $this->hasOne('App\Models\Auth\Block');
	}
	
	public function recoveryPassword()
	{
		return $this->hasOne('App\Models\Auth\RecoveryPassword');
	}
	
	public function alumno()
	{
		return $this->hasOne('App\Models\Gedure\Alumno');
	}
	
	public function boletas()
	{
		return $this->hasMany('App\Models\Gedure\Boleta')->withTrashed();
	}
	
	public function logs()
	{
		return $this->hasMany('App\Models\Gedure\Log');
	}
	
	public function posts()
	{
		return $this->hasMany('App\Models\Gedure\Post');
	}
	
	public function invitation()
	{
		return $this->hasOne('App\Models\Auth\Invitation');
	}
	
	public function debts()
	{
		return $this->hasMany('App\Models\WalletSystem\Debt')->withTrashed();
	}
	
	public function wallet()
	{
		return $this->hasOne('App\Models\WalletSystem\Wallet')->withTrashed();
	}
	
	public function transactions()
	{
		return $this->hasMany('App\Models\WalletSystem\Transaction')->withTrashed();
	}
	
	public function transactions_taked()
	{
		return $this->hasMany('App\Models\WalletSystem\BankTransaction')->withTrashed();
	}
	
	public function pending_payments()
	{
		return $this->hasMany('App\Models\WalletSystem\PendingPayment');
	}
	
	/*
		ATRIBUTOS
	*/
	protected function name(): Attribute
	{
		return Attribute::make(
			get: fn ($value) => mb_convert_case($value, MB_CASE_TITLE, "UTF-8"),
			set: fn ($value) => mb_convert_case(trim($value), MB_CASE_LOWER, "UTF-8"),
		);
	}

	protected function email(): Attribute
	{
		return Attribute::make(
			set: fn ($value) => $value ? mb_convert_case(trim($value), MB_CASE_LOWER, "UTF-8") : null,
		);
	}

	protected function password(): Attribute
	{
		return Attribute::make(
			set: fn ($value) => bcrypt($value),
		);
	}

	protected function avatarOriginal(): Attribute
	{
		return Attribute::make(
			get: fn () => $this->attributes['avatar'],
		);
	}

	protected function avatar(): Attribute
	{
		return Attribute::make(
			get: fn ($value) => $value ? Storage::disk('public')->url($value) : null,
		);
	}

	protected function isSolvente(): Attribute
	{
		return Attribute::make(
			get: function () {
				$date =  now();
				$solvente = $this->debts()->where('status', 'no pagada')
					->whereHas('debt_lote', function ($query) use ($date) {
							$query->where('available_on', '<=', $date)
								->where('created_at', '<=', $date);
					})
					->count();

				return !boolval($solvente);
			},
		);
	}

	public function verifySolvente($date = null)
	{
		$date = $date ? $date : now();
		$solvente = $this->debts()->where('status', 'no pagada')
			->whereHas('debt_lote', function ($query) use ($date) {
					$query->where('available_on', '<=', $date);
			})
			->count();

		return !boolval($solvente);
	}
	
	/*
		BOOT FUNCTION
		
		NOTA (RECKER): Esta funcion ayuda a eliminar todas las relaciones de la base de datos usando soft delete, hay que poner manualmente las relaciones que se deben de eliminar y las que se deben de restaurar.
	*/
	public static function boot() {
		parent::boot();

		static::deleting(function($user) {
			if ($user->isForceDeleting()){
				// Borrar de forma definitiva
				$user->personal_data()->forceDelete();
				
				// Destruir boletas
				foreach($user->boletas as $boleta) {
					$boleta->forceDelete();
				}

				// Destruir transacciones
				foreach($user->transactions as $transaction) {
					$transaction->forceDelete();
				}

				// Destruir deudas
				foreach($user->debts as $debts) {
					$debts->forceDelete();
				}
			}else {
				// Soft delete
				$user->personal_data()->delete();
			
				if($user->privilegio === 'V-') {
					$user->alumno()->delete();

					// Soft boletas
					foreach($user->boletas as $boleta) {
						$boleta->delete();
					}

					// Soft transacciones
					foreach($user->transactions as $transaction) {
						$transaction->delete();
					}

					// Soft deudas
					foreach($user->debts as $debts) {
						$debts->delete();
					}
				}
			}
		});
		
		static::restoring(function($user) {
			$user->personal_data()->restore();
			
			if ($user->privilegio === 'V-') {
				// Restaurar boletas
				foreach($user->boletas as $boleta) {
					$boleta->restore();
				}

				// Restaurar transacciones
				foreach($user->transactions as $transaction) {
					$transaction->restore();
				}

				// Restaurar deudas
				foreach($user->debts as $debts) {
					$debts->restore();
				}
			}
		});
	}
}