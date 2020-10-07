@extends('layout.general')

@section('content')
    <style>
        body{
            background-image:"";
        }
    </style>
    <div class = 'ContentInicioEventos'>
        <table width ='100%' height = '650px' style = ''>
            <tr>
                <td style = 'height:35%;width:33%;'></td>
                <td style = 'height:35%;width:33%;'></td>
                <td style = 'height:35%;width:33%;'></td>
            </tr>
            <tr>
                <td style = 'height:40%;width:33%;'></td>
                <td style = 'height:40%;width:33%;'>
                    <a href ='{{route("Construccion")}}' >
                        <div class = 'Construccion'></div>     
                    </a>
                </td>
                <td style = 'height:40%;width:33%;'>a</td>
            </tr>
        </table>
        
    </div>
    <script>
        $(document).ready(function () {

            var slideIndex = 0;

        })
    </script>
@endsection
