@extends('layout.general2')

@section('content')

<script>
        $(document).ready(function () {
            $(".ContentItemSlide .Slide").hide();
            
            for(var i = 1; i < 5;i++){
                $(".Slide"+i).show();
            }
            
        })
    </script>


<div class="header">

    <div class="info-header-container">
        <div class="regresar-container">
            <span class="fas fa-chevron-left"></span>
            <a href="#" onclick='window.history.back()'>Regresar</a>
        </div>

        <div class="info-header">
            <h2>EMPRENDIMIENTO</h2>
            <span></span>
<!--            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam nam consectetur fuga? Blanditiis cum necessitatibus dolorem porro reprehenderit, ipsa suscipit.</p>-->
        </div>
    </div>

</div>

<div class="grid-container">

    <div class="element">
        <video src='image/videos/01.mp4' controls></video>   
        <h2>Sobre la medicina y los negocios empresariales</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque perferendis blanditiis asperiores natus labore a!</p>
    </div>

    <div class="element">
        <video src='image/videos/02.mp4' controls></video>
        <h2>Sobre la medicina y los negocios empresariales</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque perferendis blanditiis asperiores natus labore a!</p>
    </div>

    <div class="element">
        <video src='image/videos/03.mp4' controls></video>
        <h2>Sobre la medicina y los negocios empresariales</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque perferendis blanditiis asperiores natus labore a!</p>
    </div>

    <div class="element">
        <video src='image/videos/04.mp4' controls></video>
        <h2>Sobre la medicina y los negocios empresariales</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque perferendis blanditiis asperiores natus labore a!</p>
    </div>

    <div class="element">
        <video src='image/videos/05.mp4' controls></video>
        <h2>Sobre la medicina y los negocios empresariales</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque perferendis blanditiis asperiores natus labore a!</p>
    </div>

    <div class="element">
        <video src='image/videos/06.mp4' controls></video>
        <h2>Sobre la medicina y los negocios empresariales</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque perferendis blanditiis asperiores natus labore a!</p>
    </div>

</div>



<!-- PONENCIAS -->
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
<!-- PONENCIAS END -->

<!--
        <h2 class="alone-title">Nuestros Talleres</h2>

        <div class="grid-container">

            <div class="element">
                <div class="grid-img-mask">
                    <img src='image/emprendimiento/demo.jpg' alt="">
                </div>    
                <h2>Sobre la medicina y los negocios empresariales</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque perferendis blanditiis asperiores natus labore a!</p>
            </div>

            <div class="element">
                <div class="grid-img-mask">
                    <img src='image/emprendimiento/demo.jpg' alt="">
                </div>    
                <h2>Sobre la medicina y los negocios empresariales</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque perferendis blanditiis asperiores natus labore a!</p>
            </div>

            <div class="element">
                <div class="grid-img-mask">
                    <img src='image/emprendimiento/demo.jpg' alt="">
                </div>    
                <h2>Sobre la medicina y los negocios empresariales</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque perferendis blanditiis asperiores natus labore a!</p>
            </div>

        </div>
-->
<!--
        <h2 class="alone-title">Retos Empresariales</h2>

        <div class="retos-grid-container">
            <div class="retos-element retos-uno">
                <p>RETO</p>
                <img src="" alt="number">
            </div>

            <div class="retos-element retos-uno">
                <p>RETO</p>
                <img src="" alt="number">
            </div>

            <div class="retos-element retos-uno">
                <p>RETO</p>
                <img src="" alt="number">
            </div>

            <div class="retos-element retos-uno">
                <p>RETO</p>
                <img src="" alt="number">
            </div>

            <div class="retos-element retos-uno">
                <p>RETO</p>
                <img src="" alt="number">
            </div>

            <div class="retos-element retos-dos">
                <p>RETO</p>
                <img src="" alt="number">
            </div>

            <div class="retos-element retos-dos">
                <p>RETO</p>
                <img src="" alt="number">
            </div>

            <div class="retos-element retos-dos">
                <p>RETO</p>
                <img src="" alt="number">
            </div>

            <div class="retos-element retos-dos">
                <p>RETO</p>
                <img src="" alt="number">
            </div>

            <div class="retos-element retos-dos">
                <p>RETO</p>
                <img src="" alt="number">
            </div>

            <div class="retos-element retos-tres">
                <p>RETO</p>
                <img src="" alt="number">
            </div>

            <div class="retos-element retos-tres">
                <p>RETO</p>
                <img src="" alt="number">
            </div>

            <div class="retos-element retos-tres">
                <p>RETO</p>
                <img src="" alt="number">
            </div>

            <div class="retos-element retos-tres">
                <p>RETO</p>
                <img src="" alt="number">
            </div>

            <div class="retos-element retos-tres">
                <p>RETO</p>
                <img src="" alt="number">
            </div>
        </div>
-->
@endsection