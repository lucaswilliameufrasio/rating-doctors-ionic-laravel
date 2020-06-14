<?php

namespace App\Http\Controllers\Doctor;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    function registerDoctor(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'age' => 'required|string',
            'jobplace' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $doctor = Doctor::create([
            'name' => $request->name,
            'age' => $request->age,
            'jobplace' => $request->jobplace,
        ]);
        return response()->json(
            [
                'data' => $doctor,
            ],
            200,
            ['Content-type' => 'application/json; charset=utf-8'],
            JSON_UNESCAPED_UNICODE
        );
    }

    function getAllDoctors()
    {
        $doctors = Doctor::All();

        return response()->json(
            [
                'data' => $doctors,
            ],
            200,
            ['Content-type' => 'application/json; charset=utf-8'],
            JSON_UNESCAPED_UNICODE
        );
    }
}
