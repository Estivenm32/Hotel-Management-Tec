<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HotelController;

Route::get('/hotels', [HotelController::class, 'index']);
Route::post('/hotels', [HotelController::class, 'store']);
Route::post('/hotels/{hotel}/rooms', [HotelController::class, 'assignRooms']);
Route::delete('/hotels/{hotel}', [HotelController::class, 'destroy']);
  
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
