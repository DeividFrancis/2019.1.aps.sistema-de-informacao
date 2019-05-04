<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Database\Eloquent\Model;

/**
 * @property mixed unidade_id
 * @property mixed id
 */
class Pessoa extends Model implements AuthenticatableContract, CanResetPasswordContract
{
    use Authenticatable, CanResetPassword;

//    protected $fillable = [
//        'unidade_id',
//        'nomerazao',
//        'cpfCnpj',
//        'email1',
//        'email2',
//        'telefone1',
//        'telefone2'
//        ];
    protected $guarded = ['id'];

    public function scopeUnidade($query, $uni_id)
    {
        return $query->where("unidade_id", "=", $uni_id);
    }
}
