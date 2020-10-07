<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of LoginController
 *
 * @author Damian Mosquera
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;
Use Illuminate\Support\Facades\Storage;
Use Illuminate\Support\Facades\Response;

class GeneralController extends Controller{
    //put your code here
    public function Inicio(){
        return view('Inicio'); 
    }
    public function Eventos(){
        return view('event'); 
    }
    public function Construccion(){
        return view('event_construccion'); 
    }
	public function Emprendimiento(){
        return view('event_emprendimiento'); 
    }
	public function GaleriaTecnologica(){
        return view('galeria_tecnologica'); 
    }
	public function GaleriaTecnologicaItem($info){

        switch ($info) {
            case 1:
                $d=['logo'=> $info,'HV'=> $info,'video'=> $info,'brochure'=> $info];
                break;
            case 2:
                $d=['logo'=> $info,'HV'=> $info,'video'=> $info,'brochure'=> $info];
                break;
            case 3:
                $d=['logo'=> $info,'HV'=> $info,'video'=> $info,'brochure'=> $info];
                break;
            case 4:
                $d=['logo'=> $info,'HV'=> $info,'video'=> $info,'brochure'=> $info];
                break;
            case 5:
                $d=['logo'=> $info,'HV'=> $info,'video'=> $info,'brochure'=> $info];
                break;
            case 6:
                $d=['logo'=> $info,'HV'=> $info,'video'=> $info,'brochure'=> $info];
                break;
            case 7:
                $d=['logo'=> $info,'HV'=> $info,'video'=> $info,'brochure'=> $info];
                break;
            case 8:
                $d=['logo'=> $info,'HV'=> $info,'video'=> $info,'brochure'=> $info];
                break;
            case 9:
                $d=['logo'=> $info,'HV'=> $info,'video'=> $info,'brochure'=> $info];
                break;
            case 10:
                $d=['logo'=> $info,'HV'=> $info,'video'=> $info,'brochure'=> $info];
                break;
            case 11:
                $d=['logo'=> $info,'HV'=> $info,'video'=> $info,'brochure'=> $info];
                break;
            case 12:
                $d=['logo'=> $info,'HV'=> $info,'video'=> $info,'brochure'=> $info];
                break;
            
        }

        return view('galeria_tecnologica_item_teplate',$d);
    }
    /*
    public function Ingreso(){
        $Mensaje = DB::SELECT("SELECT ValorText "
                . "FROM config "
                . "WHERE Campo = 'MENSAJE_LOGIN' "
                . "ORDER by id asc");
        $ErroM = "";
        
        if ( session('Time') > date("Y-m-d H:i:s") ){
            return view('Bienvenida');
        }else{
            if( session('Time') == '' ){
                $ErroM = "";
            }else{
                $ErroM = "Su sesión a terminado y sus cambios han sido guardados.";
            }
            $datos = [
            'Mensaje'=>($Mensaje[0]->ValorText),
            'Error'=>$ErroM
                    ];
            return view('inicio')->with('datos',$datos);
        }
    }
    
    public function CerrarSesion(){
        session()->forget('Time');
        return redirect()->route('loginAdmin');
    }
    
    public function validaringreso(){
        $Credentials = $this->validate(request(),[
           'User' => 'required|string',
           'inputPassword' => 'required|string'
        ]);
        
        
        $UserValidate = DB::SELECT("SELECT id, user, nombre "
                . "from users "
                . "where user = '". addslashes($Credentials['User'])."' and estado = 1 "
                . "and "
                . "pwd = '". md5("HolaCaremonda!!".($Credentials['inputPassword']))."';"
                );
        if( $UserValidate ){
            if( !empty($UserValidate[0]->nombre)){
            
                session()->flush();
                session(['user' => $UserValidate[0]->user]);
                session(['keyUser' => $UserValidate[0]->id]);
                
                return redirect()->route('ConsoleAdmin');
            }else{
                return redirect()->route('LoginAdmin');
            }
        }else{
            return redirect()->route('LoginAdmin');
        }
    }
    
    public function ListTipoComprador(){
        $sql = DB::SELECT("SELECT id, nombre from tipocomprador ");
        return response()->json([
            'info'=>$sql
            ]);
    }
    
    public function ValidaCodigo(){
        $sql = DB::SELECT("SELECT id,codigo, porcentaje "
                . "from codigos_descuento "
                . "where codigo = '".request()->get('codigo')."'");
        if( count($sql) == 0 ){
            return response()->json([
            'info'=>0
            ]);
        }else{
            return response()->json([
            'info'=>1,
            'por'=>$sql[0]->porcentaje,
            'id'=>$sql[0]->id
            ]);
        }
    }*/
    
   
}
