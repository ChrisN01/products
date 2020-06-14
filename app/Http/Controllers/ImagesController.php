<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImagesController extends Controller
{
	
//En esta funcion se hace el almacenamiento de las imagenes
    public function upload(Request $request)
    {

        if (count($request->images)) {
            foreach ($request->images as $image) {
                $image->store('images');
            }
        }
       	//return $request->all();
        return response()->json([
            "message" => "Done"
        ]);

        $products = $request->images;
        return $products;
    }
}
