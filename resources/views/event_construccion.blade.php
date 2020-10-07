@extends('layout.general2')

@section('content')
    <style>
        body{
            background-image:"";
        }
    </style>
    <script>
        $(document).ready(function () {
            $(".ContentItemSlide .Slide").hide();
            
            for(var i = 1; i < 5;i++){
                $(".Slide"+i).show();
            }
            
        })
    </script>
    <div class = 'ContentInicioGen'></div>
    <br>
    <div class = 'SlideImg'>
        <div class = 'ContentItemSlide'>
            <table width ='100%'>

                <div class="titulo-invitados-container">
                    <h2>Ponencias</h2>
                    <p>Nuestros invitados</p>
                </div>

                <tr>
                    <td class = 'DescL' onclick = 'EventChangeSlide(0)'><</td>


                    <td style = 'text-align:Center;' class = 'Slide Slide1'>
                    
                        <div class="img-speaker-mask">
                            <img src ='image/ponencias/ASM.png' class = 'Tutor'/>
                        </div>
                        
                        <span class = 'NombreTutor'><p>Alejandro Serna</p></span>
                        <a href="https://eventmovil.com/entradas/event-products-register.php?id=237" class="ingresar">Ingrese Aquí</a>
                    </td>
                    <td style = 'text-align:Center;' class = 'Slide Slide2'>
                        <div class="img-speaker-mask">
                            <img src ='image/ponencias/Daniela.jpg' class = 'Tutor'/>
                        </div>
                        <span class = 'NombreTutor'><p>Daniela Torres</p></span>
                        <a href="https://eventmovil.com/entradas/event-products-register.php?id=237" class="ingresar">Ingrese Aquí</a>
                    </td>
                    <td style = 'text-align:Center;' class = 'Slide Slide3'>
                        <div class="img-speaker-mask">
                        <img src ='image/ponencias/juan.jpg' class = 'Tutor'/>
                        </div>
                        <span class = 'NombreTutor'><p>Juan Sebastián Porras</p></span>
                        <a href="https://eventmovil.com/entradas/event-products-register.php?id=237" class="ingresar">Ingrese Aquí</a>
                    </td>
                    <td style = 'text-align:Center;' class = 'Slide Slide4'>
                        <div class="img-speaker-mask">
                        <img src ='image/ponencias/edgar.jpg' class = 'Tutor'/>
                        </div>
                        <span class = 'NombreTutor'><p>Edgar Mendoza</p></span>
                        <a href="https://eventmovil.com/entradas/event-products-register.php?id=237" class="ingresar">Ingrese Aquí</a>
                    </td>
                    <td style = 'text-align:Center;' class = 'Slide Slide5'>
                        <div class="img-speaker-mask">
                        <img src ='image/ponencias/Edmundo.jpg' class = 'Tutor'/>
                        </div>
                        <span class = 'NombreTutor'><p>Edmundo Herrera</p></span>
                        <a href="https://eventmovil.com/entradas/event-products-register.php?id=237" class="ingresar">Ingrese Aquí</a>
                    </td>
                    <td style = 'text-align:Center;' class = 'Slide Slide6'>
                        <div class="img-speaker-mask">
                        <img src ='image/ponencias/felix.jpg' class = 'Tutor'/>
                        </div>
                        <span class = 'NombreTutor'><p>Felix Salgado</p></span>
                        <a href="https://eventmovil.com/entradas/event-products-register.php?id=237" class="ingresar">Ingrese Aquí</a>
                    </td>

                    <td style = 'text-align:Center;' class = 'Slide Slide6'>
                        <div class="img-speaker-mask">
                        <img src ='image/ponencias/felix.jpg' class = 'Tutor'/>
                        </div>
                        <span class = 'NombreTutor'><p>Felix Salgado</p></span>
                        <a href="https://eventmovil.com/entradas/event-products-register.php?id=237" class="ingresar">Ingrese Aquí</a>
                    </td>

                    <td style = 'text-align:Center;' class = 'Slide Slide6'>
                        <div class="img-speaker-mask">
                        <img src ='image/ponencias/juan_diego.jpg' class = 'Tutor'/>
                        </div>          
                        <span class = 'NombreTutor'><p>Juan Diego Pareja</p></span>
                        <a href="https://eventmovil.com/entradas/event-products-register.php?id=237" class="ingresar">Ingrese Aquí</a>
                    </td>

                    <td style = 'text-align:Center;' class = 'Slide Slide6'>
                        <div class="img-speaker-mask">  
                        <img src ='image/ponencias/juan_guillermo.jpg' class = 'Tutor'/>
                        </div>
                        <span class = 'NombreTutor'><p>Juan Guillermo Morales</p></span>
                        <a href="https://eventmovil.com/entradas/event-products-register.php?id=237" class="ingresar">Ingrese Aquí</a>
                    </td>

                    <td style = 'text-align:Center;' class = 'Slide Slide6'>
                        <div class="img-speaker-mask">
                        <img src ='image/ponencias/juan_guillermo.jpg' class = 'Tutor'/>
                        </div>
                        <span class = 'NombreTutor'><p>Juan Guillermo Morales</p></span>
                        <a href="https://eventmovil.com/entradas/event-products-register.php?id=237" class="ingresar">Ingrese Aquí</a>
                    </td>

                    <td style = 'text-align:Center;' class = 'Slide Slide6'>
                        <div class="img-speaker-mask">
                        <img src ='image/ponencias/leonardo.jpg' class = 'Tutor'/>
                        </div>
                        <span class = 'NombreTutor'><p>Leonardo Lamprea Parra</p></span>
                        <a href="https://eventmovil.com/entradas/event-products-register.php?id=237" class="ingresar">Ingrese Aquí</a>
                    </td>

                    <td style = 'text-align:Center;' class = 'Slide Slide6'>
                        <div class="img-speaker-mask">
                        <img src ='image/ponencias/stefan.jpg' class = 'Tutor'/>
                        </div>
                        <span class = 'NombreTutor'><p>Stefan Junestrand</p></span>
                        <a href="https://eventmovil.com/entradas/event-products-register.php?id=237" class="ingresar">Ingrese Aquí</a>
                    </td>
                    
                    <td class = 'DescL' onclick = 'EventChangeSlide(1)'>></td>
                </tr>
            </table>
        </div>
    </div>
    <br>

    <div class="descarga-container">
        <a href="#">Descarga tus certificados</a>
    </div>

    <br>

    <div class = 'GestionTecno'>
        <table width ='100%'>
            <tr>
                <td style = 'text-align: center;' rowspan="2">
                    <img src ='image/EVENTO_VIRTUAL.png' class = 'GenImg'/>
                </td>
                <td style = 'text-align:CenteR;'>
                    <span style = 'color:#8CC63F;font-size:20px;padding-left:10px;'>Galería Tecnológica</span>
                </td>
            </tr>
            <tr>
                <td style = 'text-align:justify;padding-left:10px;width:50%;'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ornare commodo est, vitae venenatis purus euismod in. In varius cursus ante luctus laoreet. Suspendisse laoreet elementum magna, eu pellentesque purus scelerisque sed. In hac habitasse platea dictumst. Aliquam cursus est sit amet risus cursus ultricies Integer vitae mauris.
                    <p></p>
                    <a href='{{route("GaleriaTecnologica")}}'>
                    <span class = 'BtnIngreso' style = 'font-size:14px'>Visitar</span>
                    </a>
                </td>
            </tr>
        </table>
    </div>
    <br>
    <div class = 'Empr'>
        <table width ='100%'>
            <tr>
                <td colspan = '3' style = 'text-align:center;'>
                    <span style = 'color:#8CC63F;font-size:40px;'>Emprendimiento</span>
                </td>
            </tr>
            <tr>
                <td width = '33%' style = 'padding:10px;'>
                <video src='image/videos/01.mp4' controls></video>
                    <p></p>
                    <a href='{{route("Emprendimiento")}}'><span style = 'color:#8CC63F;'>Sobre la medicina y los negocios empresariales</span></a>
                    <p></p>
                    <p style = 'text-align:justify;color:#4D4D4D;'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ornare commodo est, vitae venenatis purus euismod in.</p>
                </td>
                <td width = '33%' style = 'padding:10px;'>
                <video src='image/videos/02.mp4' controls></video>
                    <p></p>
                    <a href='{{route("Emprendimiento")}}'><span style = 'color:#8CC63F;'>Sobre la medicina y los negocios empresariales</span></a>
                    <p></p>
                    <p style = 'text-align:justify;color:#4D4D4D;'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ornare commodo est, vitae venenatis purus euismod in.</p>
                </td>
                <td width = '33%' style = 'padding:10px;'>
                <video src='image/videos/03.mp4' controls></video>
                    <p></p>
                    <a href='{{route("Emprendimiento")}}'><span style = 'color:#8CC63F;'>Sobre la medicina y los negocios empresariales</span></a>
                    <p></p>
                    <p style = 'text-align:justify;color:#4D4D4D;'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ornare commodo est, vitae venenatis purus euismod in.</p>
                </td>
            </tr>
        </table>
    </div>
@endsection
