@extends('layout.general')

@section('content')
    <style>
        body{
            background-image:"";
        }
    </style>
    
    <div class = 'ContentInicio'>
        <table width ='100%' >
            <tr>
                <td style = 'text-align:center;'>
                    <a href='{{route("Eventos")}}'>
                        <span class = 'BtnIngreso '>Ingresar al evento</span>
                    </a>
                </td>
            </tr>
        </table>
    </div>

    <script>
        $(document).ready(function () {

            var slideIndex = 0;

        })
    </script>
@endsection
