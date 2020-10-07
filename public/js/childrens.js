/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function AlimentarObservacion(id){
    $("#observaciones"+id).text( CKEDITOR.instances["Editor"+id].getData() )
}

function MostrarAgendamientoCitas(){
    if($(".Agendamiento").is(":visible")){
        $(".Agendamiento").hide("fast")
    } else{
        $(".Agendamiento").show("fast")
    }
}



function MostrarOcultarSeccion(clase){
    if($("."+clase).is(":visible")){
        $("."+clase).hide("fast")
    } else{
        $("."+clase).show("fast")
    }
}

function EditarAsignadosGrupos(id){
    if($(".EditarForm"+id).is(":visible")){
        $(".EditarForm"+id).hide("fast")
    } else{
        $(".EditarForm"+id).show("fast")
    }
}

function MostrarCargaCitas(){
    if($(".CargaSeguimientos").is(":visible")){
        $(".CargaSeguimientos").hide("fast")
    } else{
        $(".CargaSeguimientos").show("fast")
    }
}


function FormETChildren(id){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'ListarETChildren',
        data:{id:id,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            var url = UrlUniversal+'AdminETChildren';
            html += "<div class='modal-header'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<p></p><img src = '../image/Nna.png' height='70px'  /> <span class = 'TituloBuscador'>ENFERMEDADES NIÑO</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<p></p><img src = '../image/cerrar.png' height='20px'  />";
                            //html += "<img class = 'Cursor' onclick = 'abrirNuevoTab(20)' src = 'image/icons-menu/Tutorial.png' height='100px' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "</div>";
            html += "<form class = 'form-signin' action = '"+url+"'method='post' enctype='multipart/form-data' >"
                html += "<div class='modal-body'>";
                    html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                    html += "<input type='hidden' name='IdChildren' value='" + id + "'>";
                    html += "<div class = 'form-group row'>"
                        html += "<div class = 'col-sm-12'>"
                            html += "<label>A continuación Marque o Desmarque las Enfermedades o Traumas que aplica al menor:</label>"
                            for(var i = 0; i < data.Enfermedades.length; i++){
                                html += "<div class='custom-control custom-radio '>"
                                    if( data.Enfermedades[i]['IdX'] == null ){
                                        html += "<input type='checkbox'  id = 'Enfermedad"+data.Enfermedades[i]['id']+"' name ='Enfermedad[]' value = '"+data.Enfermedades[i]['id']+"'  class='custom-control-input' />"
                                    }else{
                                        html += "<input type='checkbox'  checked = 'checked' id = 'Enfermedad"+data.Enfermedades[i]['id']+"' name ='Enfermedad[]' value = '"+data.Enfermedades[i]['id']+"'  class='custom-control-input' />"
                                    }
                                    html += "<p></p><label class='custom-control-label' for = 'Enfermedad"+data.Enfermedades[i]['id']+"'>"+data.Enfermedades[i]['Enfermedad']+"</label> "  
                                html += "</div>"
                            }
                        html += "</div>"
                    html += "</div>"
                html += "</div>";

                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
                    html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
                html += "</div>";
            html += "</form>";

            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-lg');
        }
    });
}

function CargarDocumentoNuevo(id){
    var html = "";
    var url = UrlUniversal+'CargarDocAdicional';
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '../image/Nna.png' height='70px'  /> <span class = 'TituloBuscador'>Nuevo Documento</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '../image/cerrar.png' height='20px'  />";
                    //html += "<img class = 'Cursor' onclick = 'abrirNuevoTab(20)' src = 'image/icons-menu/Tutorial.png' height='100px' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
        html += "</div>";
    html += "<form class = 'form-signin' action = '"+url+"'method='post' enctype='multipart/form-data' >"
        html += "<div class='modal-body'>";
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<input type='hidden' name='IdChildren' value='" + id + "'>";
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-12'>"
                    html += "<label>Ingrese el nombre del Documento:</label>"
                    html += "<input type = 'text' class = 'form-control' name = 'NombreDocumento' />"
                html += "</div>"
            html += "</div>"
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-12'>"
                    html += "<div class='custom-file mb-12' style = 'width:100%'>";
                        html += "<input required type = 'file' class = 'custom-file-input' onchange = 'CambiarTextoFoto(1)' id = 'foto1' name = 'Archivo'/>";
                        html += "<label class='custom-file-label' for='foto1' id = 'NameFoto1'>Seleccione Archivo</label>";
                    html += "</div>";
                html += "</div>"
            html += "</div>"
        html += "</div>";
    
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";

    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-lg');
}

function RegistrarInfante(){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'ListarDatosChildren',
        data:{Hash:1,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            var url = UrlUniversal+'RegistrarChildren';
            html += "<div class='modal-header'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<p></p><img src = 'image/Nna.png' height='70px'  /> <span class = 'TituloBuscador'>REGISTRAR NIÑO</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<p></p><img src = 'image/cerrar.png' height='20px'  />";
                            html += "<img class = 'Cursor' onclick = 'abrirNuevoTab(20)' src = 'image/icons-menu/Tutorial.png' height='100px' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "</div>";
            html += "<div class='modal-body'>";
                html += "<form class='form-signin'  enctype='multipart/form-data' action='"+url+"' method='post'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                    html += "<div class = 'Subtitulos'><p><i class='fas fa-angle-double-right'></i>Datos General</p></div>";
                    html += "<div class='form-group row'>";
                        html += "<div class='col-sm-3'>";
                            html += "<label for='TipoIngreso' >Ingreso Por:</label>";
                            html += "<select name = 'TipoIngreso' id='TipoIngreso' onchange='MostrarMadres()' class='form-control' required>";
                                for(var i = 0; i < data.Ingreso.length; i++){
                                    html += "<option value = '"+data.Ingreso[i]['id']+"'>"+data.Ingreso[i]['nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col-sm-3 Madres' style = 'display:none;' >";
                            html += "<label for='Madre' >Madre Gestante:</label>";
                            html += "<select name = 'Madre' id='Madre'  class='form-control' required>";
                                html += "<option value = '0'>Sin Especificar</option>";  
                                for(var i = 0; i < data.Madres.length; i++){
                                    html += "<option value = '"+data.Madres[i]['id']+"'>"+data.Madres[i]['nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col-sm-3'>";
                            html += "<label for='ParGeneralPais' >Fecha Solicitud:</label>";
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control DatePicker' id = 'FechaSol' name = 'FechaSol'/>"
                        html += "</div>"; 
                        html += "<div class='col-sm-3'>";
                            html += "<label for='Grupo' >Grupo:</label>";
                            html += "<select name = 'Grupo' id='Grupo'  class='form-control' required>";
                                html += "<option value = '0'>Sin Especificar</option>";  
                                for(var i = 0; i < data.Grupo.length; i++){
                                    html += "<option value = '"+data.Grupo[i]['id']+"'>"+data.Grupo[i]['nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>"; 
                        html += "<div class='col-sm-3'>";
                            html += "<label for='Grupo' >Defensor:</label>";
                            html += "<select name = 'Defensor' id='Defensor'  class='form-control' required>";
                                for(var i = 0; i < data.Defensor.length; i++){
                                    html += "<option value = '"+data.Defensor[i]['id']+"'>"+data.Defensor[i]['nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>"; 
                    html += "</div>";
                    html += "<div class='form-group row'>";
                        html += "<div class='col-sm-3'>";
                            html += "<label for='CodigoSim' >SIM:</label>";
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control' id = 'ChildrenSim' name = 'ChildrenSim'/>"
                        html += "</div>"; 
                        html += "<div class='col-sm-3'>";
                            html += "<label for='Eps' >Eps:</label>";
                            html += "<select name = 'Eps' id='Eps'  class='form-control' required>";
                                for(var i = 0; i < data.Eps.length; i++){
                                    html += "<option value = '"+data.Eps[i]['id']+"'>"+data.Eps[i]['nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>"; 
                        html += "<div class='col-sm-3'>";
                            html += "<label for='CentroZonal' >Centro Zonal:</label>";
                            html += "<select name = 'CentroZonal' id='CentroZonal'  class='form-control' required>";
                                html += "<option value = '0'>Sin Especificar</option>";  
                                for(var i = 0; i < data.parcentrozonal.length; i++){
                                    html += "<option value = '"+data.parcentrozonal[i]['id']+"'>"+data.parcentrozonal[i]['nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>"; 
                        html += "<div class='col-sm-3'>";
                            html += "<label for='CentroZonal' >Psicólogo a Cargo:</label>";
                            html += "<select name = 'Encargado' id='Encargado'  class='form-control' required>";  
                                html += "<option value = '0'>Sin Especificar</option>";
                                for(var i = 0; i < data.Usuarios.length; i++){
                                    html += "<option value = '"+data.Usuarios[i]['id']+"'>"+data.Usuarios[i]['nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>"; 
                    html += "</div>";
                    html += "<br>";
                    html += "<div class = 'separator'>DATOS DEL NIÑO</div>";
                    html += "<br>";
                    html += "<table class = 'table ContentHeader'>";
                        html += "<tr>";
                            html +="<td class = 'CenterText' >";
                                html += "<img src = 'image/foto.png' height='200px' style = 'border-radius:5em;'/><p></p>"
                                html += "<div class='custom-file mb-3'>";
                                    html += "<input type = 'file' class = 'custom-file-input' onchange = 'CambiarTextoFoto(1)' id = 'foto1' name = 'fotoChildren'/>";
                                    html += "<label class='custom-file-label' for='foto1' id = 'NameFoto1'>Seleccione Foto</label>";
                                html += "</div>";
                            html += "</td>";
                        html += "</tr>";
                        html += "<tr>";
                            html += "<td>";
                                html += "<div class = 'Subtitulos'><p><i class='fas fa-angle-double-right'></i>Información General</p></div>";
                                html += "<div class='form-group row'>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='nombre1' >Nombre:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='NombreNino' name='NombreNino' placeholder='Nombre Niño' required/>";
                                    html += "</div>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='TipoDocumento1' >Tipo de Documento:</label>";
                                        html += "<select name = 'TipoDocumentoChildren' id='TipoDocumentoChildren'  class='form-control' required>";
                                            for(var i = 0; i < data.parchildren_tipodoc.length; i++){
                                                html += "<option value = '"+data.parchildren_tipodoc[i]['id']+"'>"+data.parchildren_tipodoc[i]['nombre']+"</option>";
                                            } 
                                        html += "</select>";
                                    html += "</div>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='NroDoc1' >Nro. de Documento:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='NroDoc1' name='NroDoc1' placeholder='Nro Documento' required/>";
                                    html += "</div>";
                                html += "</div>";
                                html += "<div class='form-group row'>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='celular1' >Fecha Nacimiento:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control DatePicker' id='FechaNacimiento1' name='FechaNacimiento1' placeholder='Fecha Nacimiento' required />";
                                    html += "</div>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='Genero1' >Sexo:</label>";
                                        html += "<select name = 'Genero1' id='Genero1'  class='form-control' required>";
                                            html += "<option value = '2'>Femenino</option>"; 
                                            html += "<option value = '1'>Masculino</option>"; 
                                        html += "</select>";
                                    html += "</div>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='Genero1' >Serial:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='serial' name='serial' placeholder='Serial'/>";
                                    html += "</div>";
                                html += "</div>";
                                
                                html += "<div class='form-group row'>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='celular1' >Código CMN:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='codigocmn' name='codigocmn' placeholder='' />";
                                    html += "</div>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='Genero1' >Registraduría:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='registraduria' name='registraduria' placeholder='' />";
                                    html += "</div>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='Genero1' >Trabajador Social:</label>";
                                        html += "<select name = 'trabajadorsocial' id='trabajadorsocial'  class='form-control' required>";  
                                            html += "<option value = '0'>Sin Especificar</option>";
                                            for(var i = 0; i < data.Usuarios.length; i++){
                                                html += "<option value = '"+data.Usuarios[i]['id']+"'>"+data.Usuarios[i]['nombre']+"</option>";
                                            }
                                        html += "</select>";
                                    html += "</div>";
                                html += "</div>";
                                html += "<div class='form-group row'>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='celular1' >Colegio:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='colegio' name='colegio' placeholder='' />";
                                    html += "</div>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='Genero1' >Resolución:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='resolucion' name='resolucion' placeholder='' />";
                                    html += "</div>";
                                html += "</div>";
                                
                                html += "<div class='form-group row'>"
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='NombreMadre' >Nombre Madre:</label>";
                                        html += "<input type = 'text' class = 'form-control InfoMadre' name ='NombreMadre' id = 'NombreMadre'/>";
                                    html += "</div>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='NombrePadre' >Nombre Padre:</label>";
                                        html += "<input type = 'text' class = 'form-control' name ='NombrePadre' id = 'NombrePadre'/>";
                                    html += "</div>";
                                html += "</div>"
                                html += "<br>";
                                html += "<div class='form-group row'>"
                                    html += "<div class='col-sm-12'>";
                                        html += "<label for='celular1' >Motivo de Ingreso:</label>";
                                        html += "<textarea name = 'MotivoIngreso' class = 'form-control' placeholder='Motivo de Ingreso'></textarea>";
                                    html += "</div>";
                                html += "</div>"
                                html += "<br>";
                                html += "<div class='form-group row'>"
                                    html += "<div class='col-sm-12'>";
                                        html += "<label for='celular1' >Datos Sociodemográficos:</label>";
                                        html += "<textarea name = 'sociodemograficos'class = 'form-control' placeholder='Datos Sociodemográficos'></textarea>";
                                    html += "</div>";
                                html += "</div>"
                                html += "<br>";
                                html += "<div class='form-group row'>"
                                    html += "<div class='col-sm-12'>";
                                        html += "<label for='celular1' >Datos Generales de Salud:</label>";
                                        html += "<textarea name = 'salud' class = 'form-control' placeholder='Observaciones generales del niño'></textarea>";
                                    html += "</div>";
                                html += "</div>"
                                html += "<br>";
                                html += "<div class='form-group row'>"
                                    html += "<div class='col-sm-12'>";
                                        html += "<label for='celular1' >Marcas de Nacimiento:</label>";
                                        html += "<textarea name = 'marcasnacimiento' class = 'form-control' placeholder='Observaciones generales del niño'></textarea>";
                                    html += "</div>";
                                html += "</div>"
                            html += "</td>"
                        html += "</tr>";
                    html += "</table>";
                    html += "<br>";
                    
                    
                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
                    html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            html += "</div>";

            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            $(".DatePicker").datepicker({ dateFormat: 'yy-mm-dd' });
        }
    });
}

function FormEditarChildren(id){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'ListarDatosChildrenEdicion',
        data:{id:id,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            var url = UrlUniversal+'EditarInformacionChildren';
            html += "<div class='modal-header'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<p></p><img src = '../image/Nna.png' height='70px'  /> <span class = 'TituloBuscador'>EDITAR NIÑO</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<p></p><img src = '../image/cerrar.png' height='20px'  />";
                            html += "<img class = 'Cursor' onclick = 'abrirNuevoTab(20)' src = '../image/icons-menu/Tutorial.png' height='100px' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "</div>";
            html += "<div class='modal-body'>";
                html += "<form class='form-signin'  enctype='multipart/form-data' action='"+url+"' method='post'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                html += "<input type='hidden' name='IdChildren' value='" +id + "'>";
                    html += "<div class = 'Subtitulos'><p><i class='fas fa-angle-double-right'></i>Datos General</p></div>";
                    html += "<div class='form-group row'>";
                        html += "<div class='col-sm-3'>";
                            html += "<label for='TipoIngreso' >Ingreso Por:</label>";
                            html += "<select name = 'TipoIngreso' id='TipoIngreso' onchange='MostrarMadres()' onmouseover = 'MostrarMadres()' class='form-control' required>";
                                for(var i = 0; i < data.Ingreso.length; i++){
                                    if( data.Contacto[0]['tipoingreso'] == data.Ingreso[i]['id'] ){
                                        html += "<option value = '"+data.Ingreso[i]['id']+"' selected>"+data.Ingreso[i]['nombre']+"</option>";
                                    }else{
                                        html += "<option value = '"+data.Ingreso[i]['id']+"'>"+data.Ingreso[i]['nombre']+"</option>";
                                    }
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col-sm-3 Madres' style = 'display:none;' >";
                            html += "<label for='Madre' >Madre Gestante:</label>";
                            html += "<select name = 'Madre' id='Madre'  class='form-control' required>";
                                html += "<option value = '0'>Sin Especificar</option>";  
                                for(var i = 0; i < data.Madres.length; i++){
                                    html += "<option value = '"+data.Madres[i]['id']+"'>"+data.Madres[i]['nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col-sm-3'>";
                            html += "<label for='ParGeneralPais' >Fecha Solicitud:</label>";
                            html += "<input autocomplete = 'off' type = 'text' value = '"+data.Contacto[0]['fechaingreso']+"' class = 'form-control DatePicker' id = 'FechaSol' name = 'FechaSol'/>"
                        html += "</div>"; 
                        html += "<div class='col-sm-3'>";
                            html += "<label for='Grupo' >Grupo:</label>";
                            html += "<select name = 'Grupo' id='Grupo'  class='form-control' required>";
                                html += "<option value = '0'>Sin Especificar</option>";  
                                for(var i = 0; i < data.Grupo.length; i++){
                                    if( data.Contacto[0]['idgrupo'] == data.Grupo[i]['id'] ){
                                        html += "<option value = '"+data.Grupo[i]['id']+"' selected>"+data.Grupo[i]['nombre']+"</option>";
                                    }else{
                                        html += "<option value = '"+data.Grupo[i]['id']+"'>"+data.Grupo[i]['nombre']+"</option>";
                                    }
                                }
                            html += "</select>";
                        html += "</div>"; 
                        html += "<div class='col-sm-3'>";
                            html += "<label for='Grupo' >Defensor:</label>";
                            html += "<select name = 'Defensor' id='Defensor'  class='form-control' required>";
                                for(var i = 0; i < data.Defensor.length; i++){
                                    if( data.Contacto[0]['iddefensor'] == data.Defensor[i]['id'] ){
                                        html += "<option value = '"+data.Defensor[i]['id']+"' selected>"+data.Defensor[i]['nombre']+"</option>";
                                    }else{
                                        html += "<option value = '"+data.Defensor[i]['id']+"'>"+data.Defensor[i]['nombre']+"</option>";
                                    }
                                    
                                }
                            html += "</select>";
                        html += "</div>"; 
                    html += "</div>";
                    html += "<div class='form-group row'>";
                        html += "<div class='col-sm-3'>";
                            html += "<label for='CodigoSim' >SIM:</label>";
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control' value = '"+data.Contacto[0]['codigosim']+"'id = 'ChildrenSim' name = 'ChildrenSim'/>"
                        html += "</div>"; 
                        html += "<div class='col-sm-3'>";
                            html += "<label for='Eps' >Eps:</label>";
                            html += "<select name = 'Eps' id='Eps'  class='form-control' required>";
                                for(var i = 0; i < data.Eps.length; i++){
                                    if( data.Contacto[0]['ideps'] == data.Eps[i]['id'] ){
                                        html += "<option value = '"+data.Eps[i]['id']+"' selected>"+data.Eps[i]['nombre']+"</option>";
                                    }else{
                                        html += "<option value = '"+data.Eps[i]['id']+"'>"+data.Eps[i]['nombre']+"</option>";
                                    }
                                }
                            html += "</select>";
                        html += "</div>"; 
                        html += "<div class='col-sm-3'>";
                            html += "<label for='CentroZonal' >Centro Zonal:</label>";
                            html += "<select name = 'CentroZonal' id='CentroZonal'  class='form-control' required>";
                                html += "<option value = '0'>Sin Especificar</option>";  
                                for(var i = 0; i < data.parcentrozonal.length; i++){
                                    if( data.Contacto[0]['idcentro'] == data.parcentrozonal[i]['id'] ){
                                        html += "<option value = '"+data.parcentrozonal[i]['id']+"' selected>"+data.parcentrozonal[i]['nombre']+"</option>";
                                    }else{
                                        html += "<option value = '"+data.parcentrozonal[i]['id']+"'>"+data.parcentrozonal[i]['nombre']+"</option>";
                                    }
                                    
                                }
                            html += "</select>";
                        html += "</div>"; 
                        html += "<div class='col-sm-3'>";
                            html += "<label for='CentroZonal' >Encargado:</label>";
                            html += "<select name = 'idpsicologo' id='idpsicologo'  class='form-control' required>";
                                html += "<option value = '0'>Sin Especificar</option>";  
                                for(var i = 0; i < data.Usuarios.length; i++){
                                    if( data.Contacto[0]['idpsicologo'] == data.Usuarios[i]['id'] ){
                                        html += "<option value = '"+data.Usuarios[i]['id']+"' selected>"+data.Usuarios[i]['nombre']+"</option>";
                                    }else{
                                        html += "<option value = '"+data.Usuarios[i]['id']+"'>"+data.Usuarios[i]['nombre']+"</option>";
                                    }
                                    
                                }
                            html += "</select>";
                        html += "</div>";
                    html += "</div>";
                    html += "<br>";
                    html += "<div class = 'separator'>DATOS DEL NIÑO</div>";
                    html += "<br>";
                    html += "<table class = 'table ContentHeader'>";
                        html += "<tr>";
                            html +="<td class = 'CenterText' >";
                                if( data.Contacto[0]['foto'] == null || data.Contacto[0]['foto'] == "" ){
                                   html += "<img src = '../image/foto.png' height='200px' style = 'border-radius:5em;'/><p></p>" 
                                }else{
                                    html += "<img src = '../../storage/app/Ninos/"+data.Contacto[0]['id']+"/Fotos/"+data.Contacto[0]['foto']+" ' height='200px' style = 'border-radius:5em;'/><p></p>"
                                }
                                
                                html += "<div class='custom-file mb-3'>";
                                    html += "<input type = 'file' class = 'custom-file-input' onchange = 'CambiarTextoFoto(1)' id = 'foto1' name = 'fotoChildren'/>";
                                    html += "<label class='custom-file-label' for='foto1' id = 'NameFoto1'>Seleccione Foto</label>";
                                html += "</div>";
                            html += "</td>";
                        html += "</tr>";
                        html += "<tr>";
                            html += "<td>";
                                html += "<div class = 'Subtitulos'><p><i class='fas fa-angle-double-right'></i>Información General</p></div>";
                                html += "<div class='form-group row'>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='nombre1' >Nombre:</label>";
                                        html += "<input autocomplete = 'off' type='text' value = '"+data.Contacto[0]['nombre']+"'class='form-control' id='NombreNino' name='NombreNino' placeholder='Nombre Niño' required/>";
                                    html += "</div>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='TipoDocumento1' >Tipo de Documento:</label>";
                                        html += "<select name = 'TipoDocumentoChildren' id='TipoDocumentoChildren'  class='form-control' required>";
                                            for(var i = 0; i < data.parchildren_tipodoc.length; i++){
                                                if( data.Contacto[0]['tipodocumento'] == data.parchildren_tipodoc[i]['id'] ){
                                                    html += "<option value = '"+data.parchildren_tipodoc[i]['id']+"' selected>"+data.parchildren_tipodoc[i]['nombre']+"</option>";
                                                }else{
                                                    html += "<option value = '"+data.parchildren_tipodoc[i]['id']+"'>"+data.parchildren_tipodoc[i]['nombre']+"</option>";
                                                }
                                            } 
                                        html += "</select>";
                                    html += "</div>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='NroDoc1' >Nro. de Documento:</label>";
                                        html += "<input autocomplete = 'off' type='text' value = '"+data.Contacto[0]['numdoc']+"' class='form-control' id='NroDoc1' name='NroDoc1' placeholder='Nro Documento' required/>";
                                    html += "</div>";
                                html += "</div>";
                                html += "<div class='form-group row'>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='celular1' >Fecha Nacimiento:</label>";
                                        html += "<input autocomplete = 'off' type='text' value = '"+data.Contacto[0]['fechanacimiento']+"'  class='form-control DatePicker' id='FechaNacimiento1' name='FechaNacimiento1' placeholder='Fecha Nacimiento' required />";
                                    html += "</div>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='Genero1' >Sexo:</label>";
                                        html += "<select name = 'Genero1' id='Genero1'  class='form-control' required>";
                                                if( data.Contacto[0]['sexo'] == 1 ){
                                                    html += "<option value = '1' selected >Masculino</option>"; 
                                                    html += "<option value = '2'>Femenino</option>"; 
                                                }else if( data.Contacto[0]['sexo'] == 2 ){
                                                    html += "<option value = '1'  >Masculino</option>"; 
                                                    html += "<option value = '2' selected>Femenino</option>"; 
                                                }
                                            
                                            
                                        html += "</select>";
                                    html += "</div>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='celular1' >Serial:</label>";
                                        html += "<input autocomplete = 'off' type='text' value = '"+data.Contacto[0]['serial']+"'  class='form-control' id='serial' name='serial' />";
                                    html += "</div>";
                                html += "</div>";
                                
                                html += "<div class='form-group row'>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='celular1' >Código CMN:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' value = '"+data.Contacto[0]['codigocmn']+"' id='codigocmn' name='codigocmn' placeholder='' />";
                                    html += "</div>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='Genero1' >Registraduría:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' value = '"+data.Contacto[0]['registraduria']+"' id='registraduria' name='registraduria' placeholder='' />";
                                    html += "</div>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='Genero1' >Trabajador Social:</label>";
                                        html += "<select name = 'idtsocial' id='idtsocial'  class='form-control' required>";  
                                            html += "<option value = '0'>Sin Especificar</option>";
                                            for(var i = 0; i < data.Usuarios.length; i++){
                                                if( data.Contacto[0]['idtsocial'] == data.Usuarios[i]['id'] ){
                                                    html += "<option value = '"+data.Usuarios[i]['id']+"' selected>"+data.Usuarios[i]['nombre']+"</option>";
                                                }else{
                                                    html += "<option value = '"+data.Usuarios[i]['id']+"'>"+data.Usuarios[i]['nombre']+"</option>";
                                                }

                                            }
                                        html += "</select>";
                                    html += "</div>";
                                html += "</div>";
                                html += "<div class='form-group row'>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='celular1' >Colegio:</label>";
                                        html += "<input autocomplete = 'off' type='text' value = '"+data.Contacto[0]['colegio']+"'  class='form-control' id='colegio' name='colegio' placeholder='' />";
                                    html += "</div>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='Genero1' >Resolución:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' value = '"+data.Contacto[0]['resolucion']+"'  id='resolucion' name='resolucion' placeholder='' />";
                                    html += "</div>";
                                html += "</div>";
                                
                                html += "<div class='form-group row'>"
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='NombreMadre' >Nombre Madre:</label>";
                                        html += "<input type = 'text' class = 'form-control InfoMadre' value = '"+data.Contacto[0]['madre']+"' name ='NombreMadre' id = 'NombreMadre'/>";
                                    html += "</div>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='NombrePadre' >Nombre Padre:</label>";
                                        html += "<input type = 'text' class = 'form-control' value = '"+data.Contacto[0]['papa']+"' name ='NombrePadre' id = 'NombrePadre'/>";
                                    html += "</div>";
                                html += "</div>"
                                html += "<br>";
                                html += "<div class='form-group row'>"
                                    html += "<div class='col-sm-12'>";
                                        html += "<label for='celular1' >Motivo de Ingreso:</label>";
                                        html += "<textarea name = 'MotivoIngreso' class = 'form-control' placeholder='Motivo de Ingreso'>"+data.Contacto[0]['motivoingreso']+"</textarea>";
                                    html += "</div>";
                                html += "</div>"
                                html += "<br>";
                                html += "<div class='form-group row'>"
                                    html += "<div class='col-sm-12'>";
                                        html += "<label for='celular1' >Datos Sociodemográficos:</label>";
                                        html += "<textarea name = 'sociodemograficos'class = 'form-control' placeholder='Datos Sociodemográficos'>"+data.Contacto[0]['sociodemograficos']+"</textarea>";
                                    html += "</div>";
                                html += "</div>"
                                html += "<br>";
                                html += "<div class='form-group row'>"
                                    html += "<div class='col-sm-12'>";
                                        html += "<label for='celular1' >Datos Generales de Salud:</label>";
                                        html += "<textarea name = 'salud' class = 'form-control' placeholder='Observaciones generales del niño'>"+data.Contacto[0]['salud']+"</textarea>";
                                    html += "</div>";
                                html += "</div>"
                                html += "<br>";
                                html += "<div class='form-group row'>"
                                    html += "<div class='col-sm-12'>";
                                        html += "<label for='celular1' >Marcas de Nacimiento:</label>";
                                        html += "<textarea name = 'marcasnacimiento'class = 'form-control' placeholder='Observaciones generales del niño'>"+data.Contacto[0]['marcasnacimiento']+"</textarea>";
                                    html += "</div>";
                                html += "</div>"
                            html += "</td>"
                        html += "</tr>";
                    html += "</table>";
                    html += "<br>";
                    
                    
                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
                    html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
                html += "</div>";
            html += "</form>";
            html += "</div>";

            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            $(".DatePicker").datepicker({ dateFormat: 'yy-mm-dd' });
        }
    });
}

function CrearTurnoSalaCuna(){
    var html = "";
    var url = UrlUniversal+'AddTurnoSalaCuna';
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"image/Nna.png' height='70px'  /> <span class = 'TituloBuscador'>Nuevo Turno</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"image/cerrar.png' height='20px'  />";
                    //html += "<img class = 'Cursor' onclick = 'abrirNuevoTab(20)' src = 'image/icons-menu/Tutorial.png' height='100px' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
        html += "</div>";
    html += "<form class = 'form-signin' action = '"+url+"'method='post' enctype='multipart/form-data' >"
        html += "<div class='modal-body'>";
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<div class='form-group row'>"
            html += "<div class='col-sm-3'>"
            html += "<label for='ParGeneralPais' >(*)Fecha de Inicio:</label>"
            html += "<input autocomplete='off' type = 'text' class = 'form-control DatePicker' id = 'FechaInicial' name = 'FechaInicial' readonly />";
            html += "</div>"
            html += "<div class = 'col-sm-3'>";
            html += "<label>Hora:</label>";
            html += "<select class = 'form-control' name = 'Hora'>";
            html += "<option value = '01'>01</option>";
            html += "<option value = '02'>02</option>";
            html += "<option value = '03'>03</option>";
            html += "<option value = '04'>04</option>";
            html += "<option value = '05'>05</option>";
            html += "<option value = '06'>06</option>";
            html += "<option value = '07'>07</option>";
            html += "<option value = '08'>08</option>";
            html += "<option value = '09'>09</option>";
            html += "<option value = '10'>10</option>";
            html += "<option value = '11'>11</option>";
            html += "<option value = '12'>12</option>";
            html += "</select>";
            html += "</div>";
            html += "<div class = 'col col-sm-3'>";
            html += "<label>Minutos:</label>";
            html += "<select  class = 'form-control' name = 'Minutos'>";
            html += "<option value = '00'>00</option>";
            html += "<option value = '15'>15</option>";
            html += "<option value = '30'>30</option>";
            html += "<option value = '45'>45</option>";
            html += "</select>";
            html += "</div>";
            html += "<div class = 'col col-sm-3'>";
            html += "<label>Formato:</label>";
            html += "<select  class = 'form-control' name = 'Formato'>";
            html += "<option value = 'AM'>AM</option>";
            html += "<option value = 'PM'>PM</option>";
            html += "</select>";
            html += "</div>";
            html += "</div>"

            html += "<div class='form-group row'>"
            html += "<div class='col-sm-3'>"
            html += "<label for='ParGeneralPais' >(*)Fecha Fin:</label>"
            html += "<input autocomplete='off' type = 'text' class = 'form-control DatePicker' id = 'FechaFin' name = 'FechaFin' readonly />";
            html += "</div>"
            html += "<div class = 'col-sm-3'>";
            html += "<label>Hora:</label>";
            html += "<select class = 'form-control' name = 'HoraFin'>";
            html += "<option value = '01'>01</option>";
            html += "<option value = '02'>02</option>";
            html += "<option value = '03'>03</option>";
            html += "<option value = '04'>04</option>";
            html += "<option value = '05'>05</option>";
            html += "<option value = '06'>06</option>";
            html += "<option value = '07'>07</option>";
            html += "<option value = '08'>08</option>";
            html += "<option value = '09'>09</option>";
            html += "<option value = '10'>10</option>";
            html += "<option value = '11'>11</option>";
            html += "<option value = '12'>12</option>";
            html += "</select>";
            html += "</div>";
            html += "<div class = 'col col-sm-3'>";
            html += "<label>Minutos:</label>";
            html += "<select  class = 'form-control' name = 'MinutosFin'>";
            html += "<option value = '00'>00</option>";
            html += "<option value = '15'>15</option>";
            html += "<option value = '30'>30</option>";
            html += "<option value = '45'>45</option>";
            html += "</select>";
            html += "</div>";
            html += "<div class = 'col col-sm-3'>";
            html += "<label>Formato:</label>";
            html += "<select  class = 'form-control' name = 'FormatoFin'>";
            html += "<option value = 'AM'>AM</option>";
            html += "<option value = 'PM'>PM</option>";
            html += "</select>";
            html += "</div>";
            html += "</div>"
        html += "</div>";
    
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";

    $(".content_modal").html(html);
    $(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-lg');
}

function CerrarTurnoSalaCuna(id){
    var html = "";
    var url = UrlUniversal+'CerrarTurnoSalaCuna';
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"image/Nna.png' height='70px'  /> <span class = 'TituloBuscador'>Cerrar Turno</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '"+UrlUniversal+"image/cerrar.png' height='20px'  />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
        html += "</div>";
    html += "<form class = 'form-signin' action = '"+url+"'method='post' enctype='multipart/form-data' >"
        html += "<div class='modal-body'>";
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
            html += "<input type='hidden' name='id' value = '" + id + "' />";
            html += "<div class='form-group row'>"
                html += "<div class='col-sm-12'>"
                    html += "<label for='ParGeneralPais' >(*)Persona:</label>"
                    html += "<input autocomplete='off' type = 'text' class = 'form-control' id = 'personar' name = 'personar' required />";
                html += "</div>"
            html += "</div>"
            html += "<div class='form-group row'>"
                html += "<div class='col-sm-12'>"
                    html += "<label for='ParGeneralPais' >(*)Observaciones:</label>"
                    html += "<textarea class = 'form-control' required name = 'observaciones'></textarea>";
                html += "</div>"
            html += "</div>"
            
        html += "</div>";
    
        html += "<div class='modal-footer'>";
            html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
            html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
        html += "</div>";
    html += "</form>";

    $(".content_modal").html(html);
    $(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-lg');
}

function CalendarioTurnos(){
    var url = UrlUniversal+'CalendarioSalaCuna';
    var html = "";
    html += "<div class='modal-header'>";
    html += "<table width = '100%'>"
    html += "<tr>"
    html += "<td nowrap>"
    html += "<p></p><img src = 'image/Calendario.png' height='50px'  /> <span class = 'TituloBuscador'>Calendario Sala Cuna</span>";
    html += "</td>"
    html += "<td width = '5%'style = 'text-align:rigth;'>"
    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
    html += "<img src = 'image/cerrar.png' height='20px'  />";
    html += "</button>";
    html += "</td>"
    html += "</tr>"
    html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
    html += "<iframe width = '100%;' height = '600px'src=" + url + "></iframe>"
    html += "</div>";
    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
}


function NotificacionMasivaChildren(){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'ListarNinosFundacion',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            var url = UrlUniversal+'AddDatosImportesNinoSalud';
            html += "<div class='modal-header'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<p></p><img src = '"+UrlUniversal+"image/Mensajes.png' height='70px'  /> <span class = 'TituloBuscador'>Notificación Masiva Niños</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<p></p><img src = '"+UrlUniversal+"image/cerrar.png' height='20px'  />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "</div>";
            html += "<form class = 'form-signin' action = '"+url+"'method='post' enctype='multipart/form-data' >"
                html += "<div class='modal-body'>";
                    html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
                    
                    html += "<div class='form-group row'>"
                        html += "<div class='col-sm-12'>"
                            html += "<label for='ParGeneralPais' >(*)Seleccione el Niño:</label>"
                            html += "<select class = 'form-control' name = 'idnino'>";
                                for(var i = 0; i < data.Ninos.length;i++){
                                    html += "<option value = '"+data.Ninos[i]['id']+"'>"+data.Ninos[i]['nombre']+"</option>"
                                }
                            html += "</select>"
                        html += "</div>"
                    html += "</div>"
                    html += "<div class='form-group row'>"
                        html += "<div class='col-sm-12'>"
                            html += "<label for='ParGeneralPais' >(*)Notificar A:</label>"
                            html += "<select class = 'form-control' name = 'idnotificados[]' multiple='multiple'>";
                                for(var i = 0; i < data.Usuarios.length;i++){
                                    html += "<option value = '"+data.Usuarios[i]['id']+"'>"+data.Usuarios[i]['nombre']+"</option>"
                                }
                            html += "</select>"
                        html += "</div>"
                    html += "</div>"
                    html += "<div class='form-group row'>"
                        html += "<div class='col-sm-12'>"
                            html += "<label for='ParGeneralPais' >(*)Observaciones:</label>"
                            html += "<textarea class = 'form-control' required name = 'observaciones'></textarea>";
                        html += "</div>"
                    html += "</div>"

                html += "</div>";

                html += "<div class='modal-footer'>";
                    html += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
                    html += "<button type='submit' class='btn btn-primary'>Guardar</button>";
                html += "</div>";
            html += "</form>";

            $(".content_modal").html(html);
            $(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-lg');
        }
    });
}

function CalendarioChildrenBirthday(){
    var url = UrlUniversal+'CalendarioBirthDayChildren';
    var html = "";
    html += "<div class='modal-header'>";
    html += "<table width = '100%'>"
    html += "<tr>"
    html += "<td nowrap>"
    html += "<p></p><img src = '"+UrlUniversal+"image/Calendario.png' height='50px'  /> <span class = 'TituloBuscador'>Calendario</span>";
    html += "</td>"
    html += "<td width = '5%'style = 'text-align:rigth;'>"
    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
    html += "<img src = '"+UrlUniversal+"image/cerrar.png' height='20px'  />";
    html += "</button>";
    html += "</td>"
    html += "</tr>"
    html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
    html += "<iframe width = '100%;' height = '600px'src=" + url + "></iframe>"
    html += "</div>";
    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
}


function RegresarCalendarioChildren(){
    $(".Visual").html("");
    $('#calendar').show("slow");
}
function DetalleChildren(foto,nombre,fechaingreso,id,Edad) {
    $('#calendar').hide("slow");
    var html = "";
    html += "<div class='modal-header'>";
    html += "<table width = '100%'>"
    html += "<tr>"
    html += "<td nowrap>"
    html += "</td>"
    html += "<td width = '5%'style = 'text-align:rigth;'>"
    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
    html += "<img src = '" + UrlUniversal + "image/cerrar.png' height='20px' onclick = 'RegresarCalendarioChildren()' />";
    html += "</button>";
    html += "</td>"
    html += "</tr>"
    html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'  >";
        html += "<div id = 'FondoTarjeta' heigth = '500px'>"
            html += "<div class='form-group row'>"
                html += "<div class='col-sm-12 CenterText'>"
                if( foto == '' ){
                    html += "<img src = '"+UrlUniversal+"image/nino.jpg' />";
                }else{
                    html += "<img src = '"+UrlUniversalFile+"storage/app/Ninos/"+id+"/Fotos/"+foto+"' height = '200px' style = 'border-radius:100em' />";
                }
                html += "</div>"
            html += "</div><br>"
            html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td class = 'CenterText'><span style = 'background-color:#1B4075;padding:10px;color:white;font-weight:500;'>FELIZ CUMPLEAÑOS "+nombre+"</span><br><br><br></td>"
                html += "</tr>"
            html += "</table><br><br><br>"
        html += "</div><br><br><br>"

    html += "</div>";
    $(".Visual").html(html);
    $("#FondoTarjeta").css({
        'background-image':'url("image/tarjetacumple.png")',
        'background-position': 'bottom',
        'background-repeat':'no-repeat',
        'height': '600px' 
    })
    
}


function ResumenNinos(){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'DataResumenNinos',
        data:{Hash:1,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            //ContenedorDataFamilias
            var Info = [];
            var InfoEstados = [];
            var InfoDocs = [];
            var html = "";
            html += "<table class = 'tableNew'>"
                html += "<tr>"
                    html += "<td class = 'CenterText'>"
                        html += "<div class = 'contenedorReportesX' style = 'height:320px;border:0px;'>"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<td width = '10%' style = 'border:0px;'>";
                                        html += "<table  width = '100%'>";
                                            var SumMadres = 0;
                                            console.log(data.NUMMADRES[0]['NumMadres'])
                                            for(var i = 0; i < data.NUMMADRES.length;i++){
                                                Info.push({ y:data.NUMMADRES[i]['NumMadres'], label: 'Total Niños y Niñas', x : 100})
                                                SumMadres+= parseFloat(data.NUMMADRES[i]['NumMadres']);
                                                html += "<tr>"
                                                    html += "<td style = 'border:0px;'>"
                                                        html += "<img src = '"+UrlUniversal+"image/Nna.png' height = '60px;'/>"
                                                    html += "</td>"
                                                    html += "<td style = 'border:0px;'>"
                                                        html += "<table><tr><td style = 'font-weight: bold;border:0px;' class = 'Cursor' title='Consultar' data-toggle='modal' data-target='#ModalEdit' onclick = 'ListarMadresResumen();' nowrap>Total Niños y Niñas</td></tr><tr><td style = 'font-weight: 500;border:0px;'>100 %</td></tr><tr><td style = 'font-weight: 500;border:0px;'>Nro.: "+data.NUMMADRES[i]['NumMadres']+"</td></tr></table>"
                                                    html += "</td>"
                                                html += "</tr>"
                                                html += "<tr><td style = 'border:0px;'><p></p></td></tr>"
                                            }
                                            html += "<tr><td style = 'border:0px;'></td></tr>"
                                            html += "<tr><td colspan = '2' nowrap style = 'font-weight: bold;border:0px;' >Total Niños y Niñas: "+SumMadres+"</td></tr>"
                                        html += "</table>"   
                                    html += "</td>";
                                    html += "<td style = 'border:0px;'>";
                                        html += "<div style = 'height:240px;' id = 'TotalMadres' ></div>"
                                    html += "</td>"
                                html += "</tr>"
                            html += "</table>"
                        html += "</div>"
                    html += "</td>"
                html += "</tr>"
            html += "</table>"
            html += "<table class = 'tableNew'>"
                html += "<tr>"
                    html += "<td class = 'CenterText'>"
                        html += "<div class = 'contenedorReportesX' id = 'contenedorEstadosNinos' style = 'height:320px;border:0px;'>"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<td width = '10%' style = 'border:0px;'>";
                                        html += "<table  width = '100%' class = 'DimensionesEstado'>";
                                            var SumMadres = 0;
                                            for(var i = 0; i < data.ESTADOS.length;i++){
                                                InfoEstados.push({ y:data.ESTADOS[i]['NumMadres'], label: data.ESTADOS[i]['nombre'], x : data.ESTADOS[i]['por']})
                                                SumMadres+= parseFloat(data.ESTADOS[i]['NumMadres']);
                                                html += "<tr>"
                                                    html += "<td style = 'border:0px;'>"
                                                        html += "<img src = '"+UrlUniversal+"image/Nna.png' height = '60px;'/>"
                                                    html += "</td>"
                                                    html += "<td style = 'border:0px;'>"
                                                        html += "<table><tr><td style = 'font-weight: bold;border:0px;' class = 'Cursor' title='Consultar' data-toggle='modal' data-target='#ModalEdit' onclick = 'ListarMadresResumenEstado("+data.ESTADOS[i]['id']+");' nowrap><span style = 'display:none;' class = 'estado"+data.ESTADOS[i]['id']+"'>"+data.ESTADOS[i]['nombre']+"</span>"+data.ESTADOS[i]['nombre']+"</td></tr><tr><td style = 'font-weight: 500;border:0px;' nowrap>"+data.ESTADOS[i]['por']+" %</td></tr><tr><td style = 'font-weight: 500;border:0px;' nowrap>Nro.: "+data.ESTADOS[i]['NumMadres']+"</td></tr></table>"
                                                    html += "</td>"
                                                html += "</tr>"
                                                //html += "<tr><td style = 'border:0px;'><p></p></td></tr>"
                                            }
                                            //html += "<tr><td style = 'border:0px;'></td></tr>"
                                            html += "<tr><td colspan = '2' nowrap style = 'font-weight: bold;border:0px;' >Total Niños y Niñas: "+SumMadres+"</td></tr>"
                                        html += "</table>"   
                                    html += "</td>";
                                    html += "<td style = 'border:0px;'>";
                                        html += "<div style = 'height:300px;' id = 'TotalMadresEstados' ></div>"
                                    html += "</td>"
                                html += "</tr>"
                            html += "</table>"
                        html += "</div>"
                    html += "</td>"
                html += "</tr>"
            html += "</table>"
            html += "<table class = 'tableNew'>"
                html += "<tr>"
                    html += "<td class = 'CenterText'>"
                        html += "<div class = 'contenedorReportesX' style = 'height:320px;border:0px;'>"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<td width = '10%' style = 'border:0px;'>";
                                        html += "<table  width = '100%'>";
                                            var SumMadres = 0;
                                            for(var i = 0; i < data.DOCS.length;i++){
                                                InfoDocs.push({ y:data.DOCS[i]['NumMadres'], label: data.DOCS[i]['nombre'], x : data.DOCS[i]['por']})
                                                SumMadres+= parseFloat(data.DOCS[i]['NumMadres']);
                                                html += "<tr>"
                                                    html += "<td style = 'border:0px;'>"
                                                        html += "<img src = '"+UrlUniversal+"image/Nna.png' height = '60px;'/>"
                                                    html += "</td>"
                                                    html += "<td style = 'border:0px;'>"
                                                        html += "<table><tr><td style = 'font-weight: bold;border:0px;' class = 'Cursor' title='Consultar' data-toggle='modal' data-target='#ModalEdit' onclick = 'ListarMadresResumenDocs("+data.DOCS[i]['cargado']+");' nowrap>"+data.DOCS[i]['nombre']+"</td></tr><tr><td style = 'font-weight: 500;border:0px;' nowrap>"+data.DOCS[i]['por']+" %</td></tr><tr><td style = 'font-weight: 500;border:0px;' nowrap>Nro.: "+data.DOCS[i]['NumMadres']+"</td></tr></table>"
                                                    html += "</td>"
                                                html += "</tr>"
                                                html += "<tr><td style = 'border:0px;'><p></p></td></tr>"
                                            }
                                            html += "<tr><td style = 'border:0px;'></td></tr>"
                                            html += "<tr><td colspan = '2' nowrap style = 'font-weight: bold;border:0px;' >Total Documentos: "+SumMadres+"</td></tr>"
                                        html += "</table>"   
                                    html += "</td>";
                                    html += "<td style = 'border:0px;'>";
                                        html += "<div style = 'height:240px;' id = 'TotalMadresDocs' ></div>"
                                    html += "</td>"
                                html += "</tr>"
                            html += "</table>"
                        html += "</div>"
                    html += "</td>"
                html += "</tr>"
            html += "</table>"
            $("#ContenedorDataFamilias").html(html)
            var chart = new CanvasJS.Chart("TotalMadres", {
                    theme:  "light2",// "dark1", "dark2"
                    exportEnabled: true,
                    height:300,
                    backgroundColor:"transparent",
                    animationEnabled: true,
                    title: {
                            text: "Total Niños y Niñas",
                            fontFamily: "Century Gothic",
                            fontWeight: "bold",
                            fontSize:16
                    },
                    legend:{
                        fontSize: 16,
                        itemclick:function(e){
                            ListarFamilias(e.dataPoint.IdFamilia,0);
                        },
                        itemTextFormatter:function(e){
                            var content = "<table style = 'border:0px;'>";
                            for (var i = 0; i < e.entries.length; i++){
                                content += '<tr><td>asdadsa</td></tr>'
                            }
                            content += '<table>'
                            return content;
                        }
                        
                    },
                    toolTip: {
			shared: true,
                        borderThickness: 0,
			contentFormatter: function (e) {
                            var content = "<table style = 'border:0px;'>";
                            for (var i = 0; i < e.entries.length; i++) {
                                content += '<td style = "border:0px;background-color:'+e.entries[i].dataPoint.color+';padding:5px;color:black;border-radius:0.5em;font-weight:bold;">' 
                                    content += '<table width="100%" >'
                                        content += '<tr>'
                                            content += '<td colspan = "2" style = "border:1px solid white;text-align:center;padding:5px;">'+ e.entries[i].dataPoint.label +'</td>'
                                        content += '</tr>'
                                        content += '<tr><td style = "border:1px solid white;text-align:center;padding:5px;">Número</td><td style = "padding:5px;text-align:center;border:1px solid white;">Porcentaje</td></tr>'
                                        
                                        content += '<tr>'
                                            content += '<td nowrap style = "border:1px solid white;">'
                                                content += '<div style = "border:0px;width: 40px;height: 40px;-moz-border-radius: 50%;-webkit-border-radius: 50%;border-radius: 50%;background: white;display: flex;justify-content: center;align-items: center;text-align: center;margin:0px auto;"><span>'
                                                content += +e.entries[i].dataPoint.y+'</span></div>'
                                            content += '</td>'
                                            content += '<td nowrap style = "border:1px solid white;">'
                                                content += '<div style = "border:0px;width: 40px;height: 40px;-moz-border-radius: 50%;-webkit-border-radius: 50%;border-radius: 50%;background: white;display: flex;justify-content: center;align-items: center;text-align: center;margin:0px auto;"><span>'
                                                content += +e.entries[i].dataPoint.x+'%</span></div>'
                                            content += '</td>'
                                            
                                        content +='</tr>';
                            }
                            content += '</table>';
                            return content;
			}
                    },
                    data: [{
                            type: "pie",
                            startAngle: 25,
                            legendText: "{label}",
                            indexLabelFontSize: 16,
                            //indexLabelPlacement: "inside",
                            indexLabel: "{x}%",
                            dataPoints: Info,
                            showInLegend: true,
                    }]
            });
            chart.render();
            $(".canvasjs-chart-credit").remove()
            $(".canvasjs-chart-toolbar").remove()
            
            var chart = new CanvasJS.Chart("TotalMadresEstados", {
                    theme:  "light2",// "dark1", "dark2"
                    exportEnabled: true,
                    height:240,
                    backgroundColor:"transparent",
                    animationEnabled: true,
                    title: {
                            text: "Estados Niños y Niñas",
                            fontFamily: "Century Gothic",
                            fontWeight: "bold",
                            fontSize:16
                    },
                    legend:{
                        fontSize: 16,
                        itemclick:function(e){
                            ListarFamilias(e.dataPoint.IdFamilia,0);
                        },
                        itemTextFormatter:function(e){
                            var content = "<table style = 'border:0px;'>";
                            for (var i = 0; i < e.entries.length; i++){
                                content += '<tr><td>asdadsa</td></tr>'
                            }
                            content += '<table>'
                            return content;
                        }
                        
                    },
                    toolTip: {
			shared: true,
                        borderThickness: 0,
			contentFormatter: function (e) {
                            var content = "<table style = 'border:0px;'>";
                            for (var i = 0; i < e.entries.length; i++) {
                                content += '<td style = "border:0px;background-color:'+e.entries[i].dataPoint.color+';padding:5px;color:black;border-radius:0.5em;font-weight:bold;">' 
                                    content += '<table width="100%" >'
                                        content += '<tr>'
                                            content += '<td colspan = "2" style = "border:1px solid white;text-align:center;padding:5px;">'+ e.entries[i].dataPoint.label +'</td>'
                                        content += '</tr>'
                                        content += '<tr><td style = "border:1px solid white;text-align:center;padding:5px;">Número</td><td style = "padding:5px;text-align:center;border:1px solid white;">Porcentaje</td></tr>'
                                        
                                        content += '<tr>'
                                            content += '<td nowrap style = "border:1px solid white;">'
                                                content += '<div style = "border:0px;width: 40px;height: 40px;-moz-border-radius: 50%;-webkit-border-radius: 50%;border-radius: 50%;background: white;display: flex;justify-content: center;align-items: center;text-align: center;margin:0px auto;"><span>'
                                                content += +e.entries[i].dataPoint.y+'</span></div>'
                                            content += '</td>'
                                            content += '<td nowrap style = "border:1px solid white;">'
                                                content += '<div style = "border:0px;width: 40px;height: 40px;-moz-border-radius: 50%;-webkit-border-radius: 50%;border-radius: 50%;background: white;display: flex;justify-content: center;align-items: center;text-align: center;margin:0px auto;"><span>'
                                                content += +e.entries[i].dataPoint.x+'%</span></div>'
                                            content += '</td>'
                                            
                                        content +='</tr>';
                            }
                            content += '</table>';
                            return content;
			}
                    },
                    data: [{
                            type: "pie",
                            startAngle: 25,
                            legendText: "{label}",
                            indexLabelFontSize: 16,
                            //indexLabelPlacement: "inside",
                            indexLabel: "{x}%",
                            dataPoints: InfoEstados,
                            showInLegend: true,
                    }]
            });
            chart.render();
            $(".canvasjs-chart-credit").remove()
            $(".canvasjs-chart-toolbar").remove()
            
            var chart = new CanvasJS.Chart("TotalMadresDocs", {
                    theme:  "light2",// "dark1", "dark2"
                    exportEnabled: true,
                    height:300,
                    backgroundColor:"transparent",
                    animationEnabled: true,
                    title: {
                            text: "Documentos Niños y Niñas",
                            fontFamily: "Century Gothic",
                            fontWeight: "bold",
                            fontSize:16
                    },
                    legend:{
                        fontSize: 16,
                        itemclick:function(e){
                            ListarFamilias(e.dataPoint.IdFamilia,0);
                        },
                        itemTextFormatter:function(e){
                            var content = "<table style = 'border:0px;'>";
                            for (var i = 0; i < e.entries.length; i++){
                                content += '<tr><td>asdadsa</td></tr>'
                            }
                            content += '<table>'
                            return content;
                        }
                        
                    },
                    toolTip: {
			shared: true,
                        borderThickness: 0,
			contentFormatter: function (e) {
                            var content = "<table style = 'border:0px;'>";
                            for (var i = 0; i < e.entries.length; i++) {
                                content += '<td style = "border:0px;background-color:'+e.entries[i].dataPoint.color+';padding:5px;color:black;border-radius:0.5em;font-weight:bold;">' 
                                    content += '<table width="100%" >'
                                        content += '<tr>'
                                            content += '<td colspan = "2" style = "border:1px solid white;text-align:center;padding:5px;">'+ e.entries[i].dataPoint.label +'</td>'
                                        content += '</tr>'
                                        content += '<tr><td style = "border:1px solid white;text-align:center;padding:5px;">Número</td><td style = "padding:5px;text-align:center;border:1px solid white;">Porcentaje</td></tr>'
                                        
                                        content += '<tr>'
                                            content += '<td nowrap style = "border:1px solid white;">'
                                                content += '<div style = "border:0px;width: 40px;height: 40px;-moz-border-radius: 50%;-webkit-border-radius: 50%;border-radius: 50%;background: white;display: flex;justify-content: center;align-items: center;text-align: center;margin:0px auto;"><span>'
                                                content += +e.entries[i].dataPoint.y+'</span></div>'
                                            content += '</td>'
                                            content += '<td nowrap style = "border:1px solid white;">'
                                                content += '<div style = "border:0px;width: 40px;height: 40px;-moz-border-radius: 50%;-webkit-border-radius: 50%;border-radius: 50%;background: white;display: flex;justify-content: center;align-items: center;text-align: center;margin:0px auto;"><span>'
                                                content += +e.entries[i].dataPoint.x+'%</span></div>'
                                            content += '</td>'
                                            
                                        content +='</tr>';
                            }
                            content += '</table>';
                            return content;
			}
                    },
                    data: [{
                            type: "pie",
                            startAngle: 25,
                            legendText: "{label}",
                            indexLabelFontSize: 16,
                            //indexLabelPlacement: "inside",
                            indexLabel: "{x}%",
                            dataPoints: InfoDocs,
                            showInLegend: true,
                    }]
            });
            chart.render();
            $(".canvasjs-chart-credit").remove()
            $(".canvasjs-chart-toolbar").remove()
            $("#contenedorEstadosNinos").height("350")
        }
    });
}

function ListarMadresResumen(){
    
    $.ajax({
        type:'POST',
        url:UrlUniversal+'ListNinosResumenNinos',
        data:{Clave:"Todas",_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
            html += "<tr>"
            html += "<td nowrap>"
            html += "<p></p><img src = '"+UrlUniversal+"image/Nna.png' height='50px'  /> <span class = 'TituloBuscador'>Niños y Niñas</span>";
            html += "</td>"
            html += "<td width = '5%'style = 'text-align:rigth;'>"
            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
            html += "<img src = '"+UrlUniversal+"image/cerrar.png' height='20px'  />";
            html += "</button>";
            html += "</td>"
            html += "</tr>"
            html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
            html += "<table class = 'tableNew'>"
                html += "<tr>"
                    html += "<th>No.</th>"
                    html += "<th>Consultar</th>"
                    html += "<th>Codigo Sim</th>"
                    html += "<th>Nombres</th>"
                    html += "<th>Ingreso Por</th>"
                    html += "<th>Fecha de Ingreso</th>"
                    html += "<th>Estado</th>"
                html += "</tr>"
                for(var i = 0; i < data.madres.length;i++){
                    html += "<tr>"
                        html += "<td class = 'CenterText'>"+data.madres[i]['Num']+"</td>"
                        html += "<td class = 'CenterText'><a target = '_blank' href = '"+UrlUniversal+"DashboardNinos/"+data.madres[i]['id']+"'><img src='image/detalle.png' class='IconDescg'></a></td>"
                        html += "<td>"+data.madres[i]['codigosim']+"</td>"
                        html += "<td>"+data.madres[i]['nombre']+"</td>"
                        html += "<td>ICBF</td>"
                        html += "<td>"+data.madres[i]['fechaingreso']+"</td>"
                        html += "<td>"+data.madres[i]['estado']+"</td>"
                    html += "</tr>"
                }
            html += "</table>"
            html += "</div>";
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        }
    });
}

function ListarMadresResumenEstado(estado){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'ListNinosResumenNinos',
        data:{Clave:"Estado",estado:estado,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
            html += "<tr>"
            html += "<td nowrap>"
            html += "<p></p><img src = '"+UrlUniversal+"image/Nna.png' height='50px'  /> <span class = 'TituloBuscador'>Niños y Niñas - "+$(".estado"+estado).text()+"</span>";
            html += "</td>"
            html += "<td width = '5%'style = 'text-align:rigth;'>"
            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
            html += "<img src = '"+UrlUniversal+"image/cerrar.png' height='20px'  />";
            html += "</button>";
            html += "</td>"
            html += "</tr>"
            html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
            html += "<table class = 'tableNew'>"
                html += "<tr>"
                    html += "<th>No.</th>"
                    html += "<th>Consultar</th>"
                    html += "<th>Codigo Sim</th>"
                    html += "<th>Nombres</th>"
                    html += "<th>Ingreso Por</th>"
                    html += "<th>Fecha de Ingreso</th>"
                    html += "<th>Estado</th>"
                html += "</tr>"
                for(var i = 0; i < data.madres.length;i++){
                    html += "<tr>"
                        html += "<td class = 'CenterText'>"+data.madres[i]['Num']+"</td>"
                        html += "<td class = 'CenterText'><a target = '_blank' href = '"+UrlUniversal+"DashboardNinos/"+data.madres[i]['id']+"'><img src='image/detalle.png' class='IconDescg'></a></td>"
                        html += "<td>"+data.madres[i]['codigosim']+"</td>"
                        html += "<td>"+data.madres[i]['nombre']+"</td>"
                        html += "<td>ICBF</td>"
                        html += "<td>"+data.madres[i]['fechaingreso']+"</td>"
                        html += "<td>"+data.madres[i]['estado']+"</td>"
                    html += "</tr>"
                }
            html += "</table>"
            html += "</div>";
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        }
    });
}
function ListarMadresResumenDocs(cargado){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'ListNinosResumenNinos',
        data:{Clave:"Doc",estado:cargado,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var t = "";
            if(cargado == 1){
                t = "Documentos Al Día";
            }else{
                t = "Documentos con Pendientes";
            }
            var html = "";
            html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
            html += "<tr>"
            html += "<td nowrap>"
            html += "<p></p><img src = '"+UrlUniversal+"image/Nna.png' height='50px'  /> <span class = 'TituloBuscador'>Niños y Niñas - "+t+"</span>";
            html += "</td>"
            html += "<td width = '5%'style = 'text-align:rigth;'>"
            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
            html += "<img src = '"+UrlUniversal+"image/cerrar.png' height='20px'  />";
            html += "</button>";
            html += "</td>"
            html += "</tr>"
            html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
            html += "<table class = 'tableNew'>"
                html += "<tr>"
                    html += "<th>No.</th>"
                    html += "<th>Consultar</th>"
                    html += "<th>Codigo Sim</th>"
                    html += "<th>Nombres</th>"
                    html += "<th>Ingreso Por</th>"
                    html += "<th>Fecha de Ingreso</th>"
                    html += "<th>Estado</th>"
                html += "</tr>"
                for(var i = 0; i < data.madres.length;i++){
                    html += "<tr>"
                        html += "<td class = 'CenterText'>"+data.madres[i]['Num']+"</td>"
                        html += "<td class = 'CenterText'><a target = '_blank' href = '"+UrlUniversal+"DashboardNinos/"+data.madres[i]['id']+"'><img src='image/detalle.png' class='IconDescg'></a></td>"
                        html += "<td>"+data.madres[i]['codigosim']+"</td>"
                        html += "<td>"+data.madres[i]['nombre']+"</td>"
                        html += "<td>ICBF</td>"
                        html += "<td>"+data.madres[i]['fechaingreso']+"</td>"
                        html += "<td>"+data.madres[i]['estado']+"</td>"
                    html += "</tr>"
                }
            html += "</table>"
            html += "</div>";
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        }
    });
}