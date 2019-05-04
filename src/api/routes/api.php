<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
header('Access-Control-Allow-Origin:  *');
header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization');

$api = app('Dingo\Api\Routing\Router');
$api->version('v1', function ($api) {

    $api->get('test', function () {
        return 'It is ok';
    });

});
Route::group(['prefix' => 'v1'], function () {
    Route::get('/', function () {
        return response()->json(['message' => 'API Laravel', 'status' => 'Conectado']);
    });
    Route::post('auth/login', 'AuthController@authenticate');
    Route::group(['middleware' => ['jwt.auth']], function () {
        Route::resource('unidade', 'UnidadesController');
        Route::resource('pessoa', 'PessoasController');
        Route::resource('idaron', 'IdaronsController');
        Route::prefix('animal')->group(function () {
            Route::get('/', 'AnimaisController@index');
            Route::post('/', 'AnimaisController@store');
            Route::get('/idade', 'AnimaisController@grupoIdade');
            Route::get('/{id}', 'AnimaisController@show');
            Route::put('/{id}', 'AnimaisController@update');

        });
        Route::prefix('vacina')->group(function () {
            Route::post("/", "VacinasController@store");
            Route::get("/", "VacinasController@index");
            Route::get("historico/{animal_id}", "VacinasController@historic");
            Route::get('tipo', "VacinasController@vacinaTipo")->name("vacina.tipo");

            //            Route::get("/teste", "VacinasController@historic");
        });
    });
});



