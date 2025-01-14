<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\Room;
use Illuminate\Http\Request;

class HotelController extends Controller
{
    public function index()
    {
        return Hotel::with('rooms')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'address' => 'required',
            'city' => 'required',
            'nit' => 'required',
            'max_rooms' => 'required|integer',
        ]);

        // Verificar unicidad de nombre y dirección
        $existingHotel = Hotel::where('name', $validated['name'])
            ->where('address', $validated['address'])
            ->first();

        if ($existingHotel) {
            return response()->json([
                'error' => 'Ya existe un hotel con el mismo nombre y dirección'
            ], 422);
        }

        // Crear hotel si no existe duplicado     
        $hotel = Hotel::create($validated);
        return response()->json(['message' => 'Hotel creado exitosamente.', 'data' => $hotel], 201);

    }


    public function assignRooms(Request $request, $hotelId)
    {
        if (!$hotelId) {
            return response()->json(['error' => 'El ID del hotel es requerido'], 400);
        }

        $hotel = Hotel::findOrFail($hotelId);

        $validated = $request->validate([
            'rooms.*.type' => 'required|in:Estándar,Junior,Suite',
            'rooms.*.accommodation' => 'required|string',
            'rooms.*.quantity' => 'required|integer|min:1',
        ]);

        $newRooms = collect($validated['rooms']);

        // Validar que no existan habitaciones duplicadas          
        $duplicate = $newRooms->contains(function ($room) use ($hotel) {
            return $hotel->rooms()
                ->where('type', $room['type'])
                ->where('accommodation', $room['accommodation'])
                ->exists();
        });

        if ($duplicate) {
            return response()->json(['error' => 'Ya existe una habitación con este tipo y acomodación'], 422);
        }

        // Validar que la cantidad total de habitaciones no exceda el máximo permitido  
        $totalRooms = $hotel->rooms->sum('quantity') + $newRooms->sum('quantity');
        if ($totalRooms > $hotel->max_rooms) {
            return response()->json(['error' => 'El total de habitaciones excede el máximo permitido.'], 422);
        }

        // Crear las habitaciones   
        foreach ($newRooms as $room) {
            $hotel->rooms()->create($room);
        }

        return $hotel->load('rooms');
    }


    public function destroy($id)
    {
        $hotel = Hotel::findOrFail($id);
        $hotel->delete();
        return response()->json(['message' => 'Hotel eliminado correctamente']);
    } 
}