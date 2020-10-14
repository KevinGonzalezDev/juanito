@extends('layout.general2')

@section('content')
<style>
        body{
            background-image:"";
        }

    </style>
    <script>
        $(document).ready(function () {


        })
    </script>

<div class="header">

    <div class="info-header-container">
        <div class="regresar-container">
            <span class="fas fa-chevron-left"></span>
            <a href="#">Regresar</a>
        </div>

        <div class="info-header">
            <h2>GALERÍA TECNOLÓGICA</h2>
            <span></span>
            <p>Galería de imágenes compartidas en nuestros eventos.</p>
        </div>
    </div>

</div>

    <div>
      <h2 class="alone-title">Presentaciones para el primer dìa</h2>
    </div>
    <div class="dia_container1">

        <div class="dia_video">
            <video src='image/videos/galeria_tecnologica/Dia1/1-Software_Propiedad_Horizontal.mp4' controls></video>
            <h2>Software adminitrativo para propiedad horizontal</h2>
        </div>
        <div class="dia_video">
            <video src='image/videos/galeria_tecnologica/Dia1/2-Analisis_repotenciación_estructural.mp4' controls></video>
            <h2>Analisis repotenciación estructural</h2>
        </div>
        <div class="dia_video">
            <video src='image/videos/galeria_tecnologica/Dia1/3-Vivienda_Bioclimatica.mp4' controls></video>
            <h2>Aproximación a la vivienda bioclimática  </h2>
        </div>
        <div class="dia_video">
            <video src='image/videos/galeria_tecnologica/Dia1/4-sostenibilidad_en_casa.mp4' controls></video>
            <h2>Sostenibilidad en casa</h2>
        </div>
    </div>
    <div >
    <h2 class="alone-title">Presentaciones para el segundo dìa</h2>
    </div>
    <div class="dia_container2">
        <div class="dia_video">
            <video src='image/videos/galeria_tecnologica/Dia2/1-Z-FARMING_CULTIVO 4.0.mp4' controls></video>
            <h2>Sistema cerrado para la producción vegetal “Z-farming” </h2>
        </div>
        <div class="dia_video">
            <video src='image/videos/galeria_tecnologica/Dia2/2-agua_lluvia_vivienda_rural.mp4' controls></video>
            <h2>Prototipo de aprovechamiento de aguas lluvias y afluentes hídricas a través de un sistema de bombeo </h2>
        </div>
        <div class="dia_video">
            <video src='image/videos/galeria_tecnologica/Dia2/3-Mat_reciclado_baldosas_plást.mp4' controls></video>
            <h2>Transformación de material reciclado para la elaboración de baldosas plásticas </h2>
        </div>
    </div>
    <br>
    <br>
    <br>

    <div >
        <h2 class="alone-title">Presentaciones para el tercer dìa</h2>
    </div>

    <div class="dia_container2">

        <div class="dia_video">
            <video src='image/videos/galeria_tecnologica/Dia3/1_Bloques_tierra_comprimida.mp4' controls></video>
            <h2>Bloques de tierra comprimida con adición de fibras vegetales como alternativa en la arquitectura de bajo impacto ambiental  </h2>
        </div>
        <div class="dia_video">
            <video src='image/videos/galeria_tecnologica/Dia3/2-Láminas_Cascarilla_arroz.mp4' controls></video>
            <h2>Diseño y construcción de láminas compactadas rectangulares con cascarilla de arroz </h2>
        </div>
        <div class="dia_video">
            <video src='image/videos/galeria_tecnologica/Dia3/3-MODELAMIENTOS_ESPACIO_INTERIOR.mp4' controls></video>
            <h2>Modelamientos de espacio interior para selección de acabados centrado en la percepción estética visual del usuario </h2>
        </div>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>


@endsection
