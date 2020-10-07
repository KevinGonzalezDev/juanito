/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function AlimentarObservacion(id){
    $("#observaciones"+id).text( CKEDITOR.instances["Editor"+id].getData() )
}

function MostrarMadres(){
    if ( $("#TipoIngreso option:selected").text() == 'Madres Gestantes' ){
        $(".Madres").show("slow")
    }else{
      $(".Madres").hide("slow")  
    }
}

function FormEditarMadres(id){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'ListarDatosMadresEditar',
        data:{id:id,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            var url = UrlUniversal+'EditarInfoMadre';
            html += "<div class='modal-header'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<p></p><img src = '"+UrlUniversal+"image/Madres.png' height='70px'  /> <span class = 'TituloBuscador'>REGISTRAR MADRES GESTANTES</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<p></p><img src = '"+UrlUniversal+"image/cerrar.png' height='30px'  />";
                            //html += "<img class = 'Cursor' onclick = 'abrirNuevoTab(20)' src = 'image/icons-menu/Tutorial.png' height='100px' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                //html += "<img class = 'Cursor' onclick = 'abrirNuevoTab(20)' src = 'image/icons-menu/Tutorial.png' height='100px' />";
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<form class='form-signin'  enctype='multipart/form-data' action='"+url+"' method='post'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                html += "<input type='hidden' name='id' value='" + id + "'>";
                    html += "<div class = 'Subtitulos'><p><i class='fas fa-angle-double-right'></i>Datos General</p></div>";
                    html += "<div class='form-group row'>";
                        html += "<div class='col-sm-3'>";
                            html += "<label for='TipoIngreso' >Tipo de Madre:</label>";
                            html += "<select name = 'TipoMadre' id='TipoMadre' class='form-control' disabled>";
                                for(var i = 0; i < data.Grupo.length; i++){
                                    if( data.Grupo[i]['id'] == data.Contacto[0]['tipomadre'] ){
                                        html += "<option value = '"+data.Grupo[i]['id']+"'>"+data.Grupo[i]['nombre']+"</option>";
                                    }
                                }
                            html += "</select>";
                        html += "</div>";
                        
                        html += "<div class='col-sm-3'>";
                            html += "<label for='ParGeneralPais' >Fecha Solicitud:</label>";
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control DatePicker' value = '"+data.Contacto[0]['fechaingreso']+"' name = 'FechaSol'/>"
                        html += "</div>"; 
                        html += "<div class='col-sm-3'>";
                            html += "<label for='ParGeneralPais' >Fecha Ingreso:</label>";
                            if( data.Contacto[0]['FechaP'] == 1900 ){
                                html += "<input autocomplete = 'off' type = 'text' class = 'form-control DatePicker' value = '' name = 'FechaIngresoProg'/>"
                            }else{
                               html += "<input autocomplete = 'off' type = 'text' class = 'form-control DatePicker' value = '"+data.Contacto[0]['fechaingresoprograma']+"' name = 'FechaIngresoProg'/>" 
                            }
                            
                        html += "</div>"; 
                        html += "<div class='col-sm-3'>";
                            html += "<label for='Grupo' >Tiempo Embarazo:</label>";
                            html += "<select name = 'partiempoembarazo' id='partiempoembarazo'  class='form-control' required>";
                                for(var i = 0; i < data.partiempoembarazo.length; i++){
                                    if( data.partiempoembarazo[i]['id'] == data.Contacto[0]['idsemanas'] ){
                                        html += "<option value = '"+data.partiempoembarazo[i]['id']+"' selected>"+data.partiempoembarazo[i]['nombre']+"</option>";
                                    }else{
                                        html += "<option value = '"+data.partiempoembarazo[i]['id']+"'>"+data.partiempoembarazo[i]['nombre']+"</option>";
                                    }
                                    
                                }
                            html += "</select>";
                        html += "</div>"; 
                    html += "</div>";
                    html += "<div class='form-group row'>"
                        html += "<div class='col-sm-3'>";
                                html += "<label for='Eps' >Eps:</label>";
                                html += "<select name = 'Eps' id='Eps'  class='form-control' required>";
                                    for(var i = 0; i < data.Eps.length; i++){
                                        if( data.Eps[i]['id'] == data.Contacto[0]['ideps'] ){
                                            html += "<option value = '"+data.Eps[i]['id']+"' selected>"+data.Eps[i]['nombre']+"</option>";
                                        }else{
                                            html += "<option value = '"+data.Eps[i]['id']+"'>"+data.Eps[i]['nombre']+"</option>";
                                        }
                                    }
                                html += "</select>";
                            html += "</div>"
                        html += "<div class='col-sm-3'>";
                            html += "<label for='CodigoSim' >Número de Embarazos:</label>";
                            html += "<input autocomplete = 'off' type = 'number' min='0' value = '"+data.Contacto[0]['numembarazos']+"'class = 'form-control' id = 'numEmbarazo' name = 'numEmbarazo'/>"
                        html += "</div>"; 
                        html += "<div class='col-sm-3'>";
                            html += "<label for='Genero1' >Medio de Contacto:</label>";
                            html += "<select name = 'MedioContacto' id='MedioContacto'  onchange = 'MedioContacto()' class='form-control' required>";
                                for(var i = 0; i < data.MedioContacto.length; i++){
                                    if( data.MedioContacto[i]['id'] == data.Contacto[0]['idmediocontacto'] ){
                                        html += "<option value = '"+data.MedioContacto[i]['id']+"' selected>"+data.MedioContacto[i]['nombre']+"</option>";
                                    }else{
                                        html += "<option value = '"+data.MedioContacto[i]['id']+"'>"+data.MedioContacto[i]['nombre']+"</option>";
                                    }
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col-sm-3 OtroMedio' >";
                            html += "<label for='ParGeneralPais' >¿Cúal?:</label>";
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control' id = 'otro_medio' value = '"+data.Contacto[0]['mediocontacto']+"' name = 'otro_medio'/>"
                        html += "</div>"; 
                    html += "</div>";
                    html += "<br>";
                    html += "<div class='form-group row'>"
                        html += "<div class='col-sm-3'>";
                            html += "<label for='Genero1' >Tipo de Ayuda:</label>";
                            html += "<select name = 'TipoAyuda' class='form-control' required>";
                                for(var i = 0; i < data.madres_tipoayuda.length; i++){
                                    if( data.madres_tipoayuda[i]['id'] == data.Contacto[0]['idtipoayuda'] ){
                                        html += "<option value = '"+data.madres_tipoayuda[i]['id']+"' selected>"+data.madres_tipoayuda[i]['nombre']+"</option>";
                                    }else{
                                        html += "<option value = '"+data.madres_tipoayuda[i]['id']+"'>"+data.madres_tipoayuda[i]['nombre']+"</option>";
                                    }
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col-sm-3 OtroMedio' >";
                            html += "<label for='ParGeneralPais' >¿Cúal?:</label>";
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control'  value = '"+data.Contacto[0]['ayuda_text']+"' name = 'ayuda_text'/>"
                        html += "</div>"; 
                    html += "</div>";
                    html += "<br>"
                    html += "<div class = 'separator'>DATOS DE LA MADRE</div>";
                    html += "<br>";
                    html += "<table class = 'table ContentHeader'>";
                        html += "<tr>";
                            html +="<td class = 'CenterText' >";
                                if( data.Contacto[0]['foto'] == null || data.Contacto[0]['foto'] == "" ){
                                   html += "<img src = '../image/foto.png' height='200px' style = 'border-radius:5em;'/><p></p>" 
                                }else{
                                    html += "<img src = '../../storage/app/Madres/"+data.Contacto[0]['id']+"/Fotos/"+data.Contacto[0]['foto']+" ' height='200px' style = 'border-radius:5em;'/><p></p>"
                                }
                                html += "<div class='custom-file mb-3'>";
                                    html += "<input type = 'file' class = 'custom-file-input' onchange = 'CambiarTextoFoto(1)' id = 'foto1' name = 'fotomadre'/>";
                                    html += "<label class='custom-file-label' for='foto1' id = 'NameFoto1'>Seleccione Foto</label>";
                                html += "</div>";
                            html += "</td>";
                        html += "</tr>";
                        html += "<tr>";
                            html += "<td>";
                                html += "<div class = 'Subtitulos'><p><i class='fas fa-angle-double-right'></i>Información General</p></div>";
                                html += "<div class='form-group row'>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='nombre1' >Nombre:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='nombre' name='nombre' value = '"+data.Contacto[0]['nombre']+"' required/>";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='nombre1' >Apellido:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='apellido' name='apellido' value = '"+data.Contacto[0]['apellidos']+"' required/>";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='TipoDocumento1' >Tipo de Documento:</label>";
                                        html += "<select name = 'TipoDocumentoMadre' id='TipoDocumentoMadre'  class='form-control' required>";
                                            for(var i = 0; i < data.partipodocmadres.length; i++){
                                                if( data.partipodocmadres[i]['id'] == data.Contacto[0]['tipodocumento'] ){
                                                    html += "<option value = '"+data.partipodocmadres[i]['id']+"' selected>"+data.partipodocmadres[i]['nombre']+"</option>";
                                                }else{
                                                    html += "<option value = '"+data.partipodocmadres[i]['id']+"'>"+data.partipodocmadres[i]['nombre']+"</option>";
                                                }
                                            } 
                                        html += "</select>";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='NroDoc1' >Nro. de Documento:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='NroDoc1' name='NroDoc1' value = '"+data.Contacto[0]['numdoc']+"' />";
                                    html += "</div>";
                                    
                                html += "</div>";
                                html += "<div class='form-group row'>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Fecha Nacimiento:</label>";
                                        if( data.Contacto[0]['Ano'] == '1900' ){
                                            html += "<input autocomplete = 'off' type='text' class='form-control DatePicker' id='FechaNacimiento1' name='FechaNacimiento1' value = '' />";
                                        }else{
                                            html += "<input autocomplete = 'off' type='text' class='form-control DatePicker' id='FechaNacimiento1' name='FechaNacimiento1' value = '"+data.Contacto[0]['fechanacimiento']+"' />";
                                        }
                                        
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='Genero1' >Sexo:</label>";
                                        html += "<select name = 'Genero1' id='Genero1'  class='form-control' required>";
                                            html += "<option value = '1'>FEMENINO</option>";
                                        html += "</select>";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Ocupación:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='Ocupacion' name='Ocupacion' value = '"+data.Contacto[0]['ocupacion']+"' />";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Nivel Educativo:</label>";
                                        html += "<select name = 'NivelEducativo' id='NivelEducativo'  class='form-control' >";
                                            for(var i = 0; i < data.niveleducativomadres.length; i++){
                                                if( data.niveleducativomadres[i]['id'] == data.Contacto[0]['idniveleducativo'] ){
                                                    html += "<option value = '"+data.niveleducativomadres[i]['id']+"' selected>"+data.niveleducativomadres[i]['nombre']+"</option>";
                                                }else{
                                                    html += "<option value = '"+data.niveleducativomadres[i]['id']+"'>"+data.niveleducativomadres[i]['nombre']+"</option>";
                                                }
                                            } 
                                        html += "</select>";
                                    html += "</div>";
                                html += "</div>";
                                
                                html += "<div class='form-group row'>"
                                    
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Teléfono:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='Telefono' name='Telefono' value = '"+data.Contacto[0]['telefono']+"' />";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Celular:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='Celular' name='Celular' value = '"+data.Contacto[0]['celular']+"'  />";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Correo:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='Correo' name='Correo' value = '"+data.Contacto[0]['correo']+"' />";
                                    html += "</div>"
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Número Historia:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='numHistoria' name='numHistoria' value = '"+data.Contacto[0]['numhistoria']+"' />";
                                    html += "</div>"
                                html += "</div>"
                                html += "<div class='form-group row'>"
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='CodigoSim' >Edad Informada:</label>";
                                        html += "<input autocomplete = 'off' type = 'number' min='0' value = '"+data.Contacto[0]['edadinformada']+"' class = 'form-control' id = 'edadinformada' name = 'edadinformada'/>"
                                    html += "</div>"; 
                                html += "</div>"
                                html += "<br>";
                                html += "<div class='form-group row'>"
                                    html += "<div class='col-sm-12'>";
                                        html += "<label for='celular1' >Motivo de Ingreso al Programa:</label>";
                                        html += "<textarea name = 'motivo' class = 'form-control' placeholder='Motivo de Ingreso al Programa'>"+data.Contacto[0]['motivo']+"</textarea>";
                                    html += "</div>";
                                html += "</div>"
                                html += "<br>";
                                html += "<div class='form-group row'>"
                                    html += "<div class='col-sm-12'>";
                                        html += "<label for='celular1' >Datos Generales de Salud:</label>";
                                        html += "<textarea name = 'salud' class = 'form-control' placeholder='Información general de la Madre'>"+data.Contacto[0]['salud']+"</textarea>";
                                    html += "</div>";
                                html += "</div>"
                                html += "<br>";
                                html += "<div class='form-group row'>"
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='celular1' >Nombre Bebé (Si ya ha nacido):</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='namebb'  placeholder='Nombre Bebé' value = '"+data.Contacto[0]['namebb']+"' />";
                                    html += "</div>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='celular1' >Fecha Nacimiento:</label>";
                                        if( data.Contacto[0]['yearbb'] == '1900' ){
                                            html += "<input autocomplete = 'off' type='text' class='form-control DatePicker' id='fechabb' name='fechabb' placeholder='Fecha Nacimiento' />";
                                        }else{
                                            html += "<input autocomplete = 'off' type='text' class='form-control DatePicker' id='FechaNacimiento1' name='FechaNacimiento1' value = '"+data.Contacto[0]['fechabb']+"' />";
                                        }
                                        
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

function crearMadres(){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'ListarDatosMadres',
        data:{Hash:1,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            var url = UrlUniversal+'RegistrarMadre';
            html += "<div class='modal-header'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<p></p><img src = '"+UrlUniversal+"image/Madres.png' height='70px'  /> <span class = 'TituloBuscador'>REGISTRAR MADRES GESTANTES</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<p></p><img src = '"+UrlUniversal+"image/cerrar.png' height='20px'  />";
                            //html += "<img class = 'Cursor' onclick = 'abrirNuevoTab(20)' src = 'image/icons-menu/Tutorial.png' height='100px' />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                //html += "<img class = 'Cursor' onclick = 'abrirNuevoTab(20)' src = 'image/icons-menu/Tutorial.png' height='100px' />";
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<form class='form-signin'  enctype='multipart/form-data' action='"+url+"' method='post'>";
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                    html += "<div class = 'Subtitulos'><p><i class='fas fa-angle-double-right'></i>Datos General</p></div>";
                    html += "<div class='form-group row'>";
                        html += "<div class='col-sm-3'>";
                            html += "<label for='TipoIngreso' >Tipo de Madre:</label>";
                            html += "<select name = 'TipoMadre' id='TipoMadre' class='form-control' required>";
                                for(var i = 0; i < data.Grupo.length; i++){
                                    html += "<option value = '"+data.Grupo[i]['id']+"'>"+data.Grupo[i]['nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                        
                        html += "<div class='col-sm-3'>";
                            html += "<label for='ParGeneralPais' >Fecha Contacto:</label>";
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control DatePicker' id = 'FechaSol' name = 'FechaSol'/>"
                        html += "</div>"; 
                        html += "<div class='col-sm-3'>";
                            html += "<label for='ParGeneralPais' >Fecha Ingreso:</label>";
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control DatePicker' id = 'FechaIngreso' name = 'FechaIngreso'/>"
                        html += "</div>"; 
                        html += "<div class='col-sm-3'>";
                            html += "<label for='Grupo' >Tiempo Embarazo:</label>";
                            html += "<select name = 'partiempoembarazo' id='partiempoembarazo'  class='form-control' required>";
                                for(var i = 0; i < data.partiempoembarazo.length; i++){
                                    html += "<option value = '"+data.partiempoembarazo[i]['id']+"'>"+data.partiempoembarazo[i]['nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>"; 
                    html += "</div>";
                    html += "<div class='form-group row'>"
                        html += "<div class='col-sm-3'>";
                                html += "<label for='Eps' >Eps:</label>";
                                html += "<select name = 'Eps' id='Eps'  class='form-control' required>";
                                    for(var i = 0; i < data.Eps.length; i++){
                                        html += "<option value = '"+data.Eps[i]['id']+"'>"+data.Eps[i]['nombre']+"</option>";
                                    }
                                html += "</select>";
                            html += "</div>"   
                        html += "<div class='col-sm-3'>";
                            html += "<label for='CodigoSim' >Número de Embarazos:</label>";
                            html += "<input autocomplete = 'off' type = 'number' min='0' class = 'form-control' id = 'numEmbarazo' value = '0' name = 'numEmbarazo'/>"
                        html += "</div>"; 
                        html += "<div class='col-sm-3'>";
                            html += "<label for='Genero1' >Medio de Contacto:</label>";
                            html += "<select name = 'MedioContacto' id='MedioContacto'  onchange = 'MedioContacto()' class='form-control' required>";
                                for(var i = 0; i < data.MedioContacto.length; i++){
                                    html += "<option value = '"+data.MedioContacto[i]['id']+"'>"+data.MedioContacto[i]['nombre']+"</option>";
                                }
                            html += "</select>";
                        html += "</div>";
                        html += "<div class='col-sm-3 OtroMedio' >";
                            html += "<label for='ParGeneralPais' >¿Cúal?:</label>";
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control' id = 'otro_medio' name = 'otro_medio'/>"
                        html += "</div>"; 
                    html += "</div>";
                    html += "<div class='form-group row'>"
                        html += "<div class='col-sm-3'>";
                                html += "<label for='Eps' >Tipo de Ayuda:</label>";
                                html += "<select name = 'TipoAyuda' id='TipoAyuda'  class='form-control' required>";
                                    for(var i = 0; i < data.madres_tipoayuda.length; i++){
                                        html += "<option value = '"+data.madres_tipoayuda[i]['id']+"'>"+data.madres_tipoayuda[i]['nombre']+"</option>";
                                    }
                                html += "</select>";
                            html += "</div>"   
                        html += "<div class='col-sm-3'>";
                            html += "<label for='CodigoSim' >¿Cuál?:</label>";
                            html += "<input autocomplete = 'off' class = 'form-control' id = 'textayuda' name = 'textayuda'/>"
                        html += "</div>"; 
                    html += "</div>";
                    html += "<br>";
                    html += "<div class = 'separator'>DATOS DE LA MADRE</div>";
                    html += "<br>";
                    html += "<table class = 'table ContentHeader'>";
                        html += "<tr>";
                            html +="<td class = 'CenterText' >";
                                html += "<img src = 'image/foto.png' height='200px' style = 'border-radius:5em;'/><p></p>"
                                html += "<div class='custom-file mb-3'>";
                                    html += "<input type = 'file' class = 'custom-file-input' onchange = 'CambiarTextoFoto(1)' id = 'foto1' name = 'fotomadre'/>";
                                    html += "<label class='custom-file-label' for='foto1' id = 'NameFoto1'>Seleccione Foto</label>";
                                html += "</div>";
                            html += "</td>";
                        html += "</tr>";
                        html += "<tr>";
                            html += "<td>";
                                html += "<div class = 'Subtitulos'><p><i class='fas fa-angle-double-right'></i>Información General</p></div>";
                                html += "<div class='form-group row'>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='nombre1' >Nombre:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='nombre' name='nombre' placeholder='Nombre Madre' required/>";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='nombre1' >Apellido:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='apellido' name='apellido' placeholder='Apellido Madre' required/>";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='TipoDocumento1' >Tipo de Documento:</label>";
                                        html += "<select name = 'TipoDocumentoMadre' id='TipoDocumentoMadre'  class='form-control' required>";
                                            for(var i = 0; i < data.partipodocmadres.length; i++){
                                                html += "<option value = '"+data.partipodocmadres[i]['id']+"'>"+data.partipodocmadres[i]['nombre']+"</option>";
                                            } 
                                        html += "</select>";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='NroDoc1' >Nro. de Documento:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='NroDoc1' name='NroDoc1' placeholder='Nro Documento' />";
                                    html += "</div>";
                                    
                                html += "</div>";
                                html += "<div class='form-group row'>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Fecha Nacimiento:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control DatePicker' id='FechaNacimiento1' name='FechaNacimiento1' placeholder='Fecha Nacimiento'  />";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='Genero1' >Sexo:</label>";
                                        html += "<select name = 'Genero1' id='Genero1'  class='form-control' required>";
                                            html += "<option value = '1'>FEMENINO</option>";
                                        html += "</select>";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Ocupación:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='Ocupacion' name='Ocupacion' placeholder='Ocupación'  />";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Nivel Educativo:</label>";
                                        html += "<select name = 'NivelEducativo' id='NivelEducativo'  class='form-control' >";
                                            for(var i = 0; i < data.niveleducativomadres.length; i++){
                                                html += "<option value = '"+data.niveleducativomadres[i]['id']+"'>"+data.niveleducativomadres[i]['nombre']+"</option>";
                                            } 
                                        html += "</select>";
                                    html += "</div>";
                                html += "</div>";
                                
                                html += "<div class='form-group row'>"
                                    
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Teléfono:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='Telefono' name='Telefono' placeholder='Teléfono'  />";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Celular:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='Celular' name='Celular' placeholder='Celular'  />";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Correo:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='Correo' name='Correo' placeholder='Correo'  />";
                                    html += "</div>"
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Número Historia:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='numHistoria' name='numHistoria' placeholder='Número de Historia'  />";
                                    html += "</div>"
                                html += "</div>"
                                html += "<div class='form-group row'>"
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='CodigoSim' >Edad Informada:</label>";
                                        html += "<input autocomplete = 'off' type = 'number' min='0' class = 'form-control' id = 'edadinformada' name = 'edadinformada'/>"
                                    html += "</div>"; 
                                html += "</div>"
                                html += "<br>";
                                html += "<div class='form-group row'>"
                                    html += "<div class='col-sm-12'>";
                                        html += "<label for='celular1' >Motivo de Ingreso al Programa:</label>";
                                        html += "<textarea name = 'motivo' class = 'form-control' placeholder='Motivo de Ingreso al Programa'></textarea>";
                                    html += "</div>";
                                html += "</div>"
                                html += "<br>";
                                html += "<div class='form-group row'>"
                                    html += "<div class='col-sm-12'>";
                                        html += "<label for='celular1' >Datos Generales de Salud:</label>";
                                        html += "<textarea name = 'salud' class = 'form-control' placeholder='Información general de la Madre'></textarea>";
                                    html += "</div>";
                                html += "</div>"
                                html += "<br>";
                                html += "<div class='form-group row'>"
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='celular1' >Nombre Bebé (Si ya ha nacido):</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='namebb'  placeholder='Nombre Bebé'  />";
                                    html += "</div>";
                                    html += "<div class='col-sm-4'>";
                                        html += "<label for='celular1' >Fecha Nacimiento:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control DatePicker' id='fechabb' name='fechabb' placeholder='Fecha Nacimiento' />";
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
            $(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
        }
    
    });
}

function MostrarRA(){
    if($(".formNuevoContacto").is(":visible")){
        $(".formNuevoContacto").hide("fast")
    } else{
        $(".formNuevoContacto").show("fast")
    }
}

function RedesApoyo(){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'ListarDatosRA',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            var url = UrlUniversal+'RegistrarChildren';
            html += "<div class='modal-header'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<p></p><img src = '" + UrlUniversal + "image/Madres.png' height='70px'  /> <span class = 'TituloBuscador'>REDES DE APOYO</span>";
                        html += "</td>"
                        html += "<td>"
                            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                            html += "<p></p><img src = '" + UrlUniversal + "image/cerrar.png' height='20px'  />";
                        html += "</button>";
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                //html += "<img class = 'Cursor' onclick = 'abrirNuevoTab(20)' src = 'image/icons-menu/Tutorial.png' height='100px' />";
            html += "</div>";
            html += "<div class='modal-body'>";
            html += "<br>"
                if( data.Add == 1 ){
                    html += "<img src ='"+UrlUniversal+"image/nuevodoc.png' class = 'IconMenuP Cursor' data-toggle='modal' data-target='#ModalEdit' onclick ='MostrarRA()' />"
                    html += "<span class='FirstText Cursor' data-toggle='modal' data-target='#ModalEdit' onclick ='MostrarRA()'>Agregar Contacto</span>";
            
                }
            html += "<br>"
            html += "<br>"
            html += "<div class = 'formNuevoContacto' style = 'display:none;width:100%;padding-left:50px;padding-right:50px;'>"
                html += "<form class = 'form-signin'enctype='multipart/form-data' action='"+UrlUniversal+"RedesApoyo' method='post'>"
                    html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                    html += "<div class = 'form-group row'>"
                        html += "<div class = 'col-sm-3'>"
                            html += "<label>Empresa:</label>"
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'Empresa'/>"
                        html += "</div>"
                        html += "<div class = 'col-sm-3'>"
                            html += "<label>Servicio:</label>"
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'Servicio'/>"
                        html += "</div>"
                        html += "<div class = 'col-sm-3'>"
                            html += "<label>Nombre:</label>"
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'Nombre'/>"
                        html += "</div>"
                        html += "<div class = 'col-sm-3'>"
                            html += "<label>Cargo:</label>"
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'Cargo'/>"
                        html += "</div>"
                    html += "</div>"

                    html += "<div class = 'form-group row'>"
                        html += "<div class = 'col-sm-3'>"
                            html += "<label>Teléfono:</label>"
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'Telefono'/>"
                        html += "</div>"
                        html += "<div class = 'col-sm-3'>"
                            html += "<label>Celular:</label>"
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'Celular'/>"
                        html += "</div>"
                        html += "<div class = 'col-sm-3'>"
                            html += "<label>Correo:</label>"
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'Correo'/>"
                        html += "</div>"
                    html += "</div>"
                    html += "<div class = 'form-group row'>"
                        html += "<div class = 'col-sm-12 flex-center'>"
                            html += "<button class = 'btn btn-primary'>Guardar</button>"
                        html += "</div>"
                    html += "</div>"

                html += "</form>"
            html += "</div>"
                html += "<table class = 'tableNew' style = 'font-size:13px;'>"
                    html += "<tr>"
                        html += "<th>#</th>"
                        html += "<th>Empresa</th>"
                        html += "<th>Servicio</th>"
                        html += "<th>Nombre</th>"
                        html += "<th>Cargo</th>"
                        html += "<th>Teléfono</th>"
                        html += "<th>Celular</th>"
                        html += "<th>Correo</th>"
                        html += "<th>Editar</th>"
                        html += "<th>Borrar</th>"
                    html += "</tr>"
                    for(var i = 0; i < data.Ra.length; i++){
                         html += "<tr class = 'RA_"+data.Ra[i]['id']+"'>"
                            html += "<td style = 'border-left:7px solid #F47629;color:#F47629;font-weight: bolder;' class = 'Center'>"+data.Ra[i]['Num']+"</td>"
                            html += "<td>"+data.Ra[i]['empresa']+"</td>"
                            html += "<td>"+data.Ra[i]['servicio']+"</td>"
                            html += "<td>"+data.Ra[i]['nombre']+"</td>"
                            html += "<td>"+data.Ra[i]['cargo']+"</td>"
                            html += "<td>"+data.Ra[i]['telefono']+"</td>"
                            html += "<td>"+data.Ra[i]['celular']+"</td>"
                            html += "<td >"+data.Ra[i]['correo']+"</td>"
                            html += "<td class = 'CenterText'>"
                                if( data.Editar == 1 ){
                                    html += "<img src = '"+UrlUniversal+"image/editar.png' onclick = 'EditarRedesApoyo("+data.Ra[i]['id']+")'class = 'IconDescg'/>"
                                }
                            html += "</td>"
                            html += "<td class = 'CenterText' style = 'border-right:7px solid #A7A9AC;'>"
                                if( data.Delete == 1 ){
                                    html += "<img src = '"+UrlUniversal+"image/eliminar.png' class = 'IconDescg' data-toggle='modal' data-target='#Forms'  onclick = 'EliminarRedesApoyo("+data.Ra[i]['id']+")' />"
                                }
                            html += "</td>"
                        html += "</tr>"
                        html += "<tr class = 'RA_Edit"+data.Ra[i]['id']+"' style = 'display:none;'>"
                            html += "<td colspan = '10'>"
                                html += "<div class = 'FormEditarRA"+data.Ra[i]['id']+"' style = 'display:none;width:100%;padding-left:50px;padding-right:50px;'>"
                                    //html += "<form class = 'form-signin'enctype='multipart/form-data' action='"+UrlUniversal+"RedesApoyoEditar' method='post'>"
                                        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                                        html += "<input type='hidden' name='id_RA' value='"+data.Ra[i]['id']+"'>";
                                        html += "<div class = 'form-group row'>"
                                            html += "<div class = 'col-sm-3'>"
                                                html += "<label>Empresa:</label>"
                                                html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'Empresa' id = 'empresa"+data.Ra[i]['id']+"' value = '"+data.Ra[i]['empresa']+"'/>"
                                            html += "</div>"
                                            html += "<div class = 'col-sm-3'>"
                                                html += "<label>Servicio:</label>"
                                                html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'Servicio' id = 'servicio"+data.Ra[i]['id']+"'  value = '"+data.Ra[i]['servicio']+"'/>"
                                            html += "</div>"
                                            html += "<div class = 'col-sm-3'>"
                                                html += "<label>Nombre:</label>"
                                                html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'Nombre' id = 'nombre"+data.Ra[i]['id']+"'  value = '"+data.Ra[i]['nombre']+"'/>"
                                            html += "</div>"
                                            html += "<div class = 'col-sm-3'>"
                                                html += "<label>Cargo:</label>"
                                                html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'Cargo' id = 'cargo"+data.Ra[i]['id']+"'  value = '"+data.Ra[i]['cargo']+"'/>"
                                            html += "</div>"
                                        html += "</div>"

                                        html += "<div class = 'form-group row'>"
                                            html += "<div class = 'col-sm-3'>"
                                                html += "<label>Teléfono:</label>"
                                                html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'Telefono' id = 'telefono"+data.Ra[i]['id']+"'  value = '"+data.Ra[i]['telefono']+"'/>"
                                            html += "</div>"
                                            html += "<div class = 'col-sm-3'>"
                                                html += "<label>Celular:</label>"
                                                html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'Celular' id = 'celular"+data.Ra[i]['id']+"'  value = '"+data.Ra[i]['celular']+"'/>"
                                            html += "</div>"
                                            html += "<div class = 'col-sm-3'>"
                                                html += "<label>Correo:</label>"
                                                html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'Correo' id = 'correo"+data.Ra[i]['id']+"'  value = '"+data.Ra[i]['correo']+"'/>"
                                            html += "</div>"
                                        html += "</div>"
                                        html += "<div class = 'form-group row'>"
                                            html += "<div class = 'col-sm-6 flex-center'>"
                                                html += "<a href = '#' class = 'btn btn-danger' onclick = 'OcultarEditarRA("+data.Ra[i]['id']+")'>Cancelar</a>"
                                            html += "</div>"
                                            html += "<div class = 'col-sm-6 flex-center'>"
                                                html += "<button class = 'btn btn-primary' onclick = 'GuardarInfoRA("+data.Ra[i]['id']+")'>Guardar</button>"
                                            html += "</div>"
                                        html += "</div>"

                                    //html += "</form>"
                            html += "</td>"
                        html += "</tr>"
                    }
                    
                html += "</table>"
            html += "</div>";

            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        }
    });
    
}

function GuardarInfoRA(id){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'RedesApoyoEditar',
        data:{
                id:id,
                empresa:$("#empresa"+id).val(),
                servicio:$("#servicio"+id).val(),
                nombre:$("#nombre"+id).val(),
                cargo:$("#cargo"+id).val(),
                telefono:$("#telefono"+id).val(),
                celular:$("#celular"+id).val(),
                correo:$("#correo"+id).val(),
                _token:document.getElementsByName('_token')[0].value},
        success:function(data){
            if( data.success == 1 ){
                RedesApoyo()
            }else{
                
            }
        }
    });
}

function EditarRedesApoyo(id){
    $(".RA_Edit"+id).show("slow");
    $(".FormEditarRA"+id).show("slow");
}
function OcultarEditarRA(id){
    $(".RA_Edit"+id).hide("slow");
    $(".FormEditarRA"+id).hide("slow");
}

function EliminarRedesApoyo(id){
    var r = confirm("¿Desea eliminar el contacto?");
    if (r == true) {
        $.ajax({
            type:'POST',
            url:UrlUniversal+'EliminarRedesApoyo',
            data:{id:id,_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                if( data.success == 1 ){
                    RedesApoyo()
                }else{

                }
            }
        });
    } else {
        
    }
}

function CargarDataDashboardMadres(){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'DataDashboardMadres',
        data:{Hash:1,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var Info = [];
            var html = "";
            html += "<table width = '100%'><tr>";
                html += "<td  colspan = '2' width = '500px' style = 'border:0px;'>"
                    html += "<div class = 'contenedorReportesX' style = 'background-color:#f5f5f5;height:320px;border:0px;'>"
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<td width = '10%'>";
                                    html += "<table class = 'detalleReportesIcon' width = '100%'>";
                                        var SumFamilias = 0;
                                        for(var i = 0; i < data.sqlf.length;i++){
                                            Info.push({ y:data.sqlf[i]['NumMadres'], label: data.sqlf[i]['EstadoMadre'], x : data.sqlf[i]['Porcentaje']})
                                            SumFamilias+= parseFloat(data.sqlf[i]['NumMadres']);
                                            html += "<tr>"
                                                html += "<td>"
                                                    html += "<img src = '"+UrlUniversal+"image/Madres.png' height = '60px;'/>"
                                                html += "</td>"
                                                html += "<td >"
                                                    html += "<table><tr><td style = 'font-weight: bold;' class = 'Cursor' title='Consultar' data-toggle='modal' data-target='#ModalEdit' onclick = 'ListarFamilias("+data.sqlf[i]['tipomadre']+",0);'>"+data.sqlf[i]['EstadoMadre']+"</td></tr><tr><td style = 'font-weight: 500;'>"+data.sqlf[i]['Porcentaje']+" %</td></tr><tr><td style = 'font-weight: 500;'>Nro.: "+data.sqlf[i]['NumMadres']+"</td></tr></table>"
                                                html += "</td>"
                                            html += "</tr>"
                                            html += "<tr><td><p></p></td></tr>"
                                        }
                                        html += "<tr><td></td></tr>"
                                        html += "<tr><td colspan = '2' nowrap style = 'font-weight: bold;' >Total Madres: "+SumFamilias+"</td></tr>"
                                    html += "</table>"   
                                html += "</td>";
                                html += "<td>";
                                    html += "<div style = 'height:240px;'id = 'TotalFamilias' ></div>"
                                html += "</td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</div>"
                html += "</td>"
            html += "<td width = '50%' colspan = '2'>";
                    html +="<div class = 'contenedorReportesX ' style = 'background-color:white;height:320px;border:0px;'>"
                        html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<td width = '10%'>";
                                html += "<table class = 'detalleReportesIcon' width = '100%'>";
                                        var SumFamilias = 0;
                                        html += "<tr>"
                                            html += "<td>"
                                                html += "<img src = 'image/Madres.png' height = '60px;'/>"
                                            html += "</td>"
                                            html += "<td >"
                                                html += "<table><tr><td style = 'font-weight: bold;' class = 'Cursor' >Arrepentidas</td></tr><tr><td style = 'font-weight: 500;'>33 %</td></tr><tr><td style = 'font-weight: 500;'>Nro.: 5</td></tr></table>"
                                            html += "</td>"
                                        html += "</tr>" 
                                        html += "<tr>"
                                            html += "<td>"
                                                html += "<img src = 'image/Madres.png' height = '60px;'/>"
                                            html += "</td>"
                                            html += "<td >"
                                                html += "<table><tr><td style = 'font-weight: bold;' class = 'Cursor' >Adopción</td></tr><tr><td style = 'font-weight: 500;'>47 %</td></tr><tr><td style = 'font-weight: 500;'>Nro.: 7</td></tr></table>"
                                            html += "</td>"
                                        html += "</tr>"
                                        html += "<tr>"
                                            html += "<td>"
                                                html += "<img src = 'image/Madres.png' height = '60px;'/>"
                                            html += "</td>"
                                            html += "<td >"
                                                html += "<table><tr><td style = 'font-weight: bold;' class = 'Cursor' >Deserción</td></tr><tr><td style = 'font-weight: 500;'>20 %</td></tr><tr><td style = 'font-weight: 500;'>Nro.: 3</td></tr></table>"
                                            html += "</td>"
                                        html += "</tr>"
                                        html += "<tr><td><p></p></td></tr>"
                                        html += "<tr><td colspan = '2' nowrap style = 'font-weight: bold;' >Total Madres: 15</td></tr>"
                                    html += "</table>"   
                            html += "</td>"
                            html += "<td>";
                                html += "<div style = '' ><div id = 'EstadosFamilias' style = 'height:300px;background-color:#f5f5f5;'></div></div>"
                            html += "</td>"
                        html += "</tr>"
                    html += "</table>"
                    html +="</div>"
                    
                html += "</td>";
            html += "</tr></table>" 
            
            $("#ReporteFamilia").html(html);
            
            var chart = new CanvasJS.Chart("TotalFamilias", {
                    theme:  "light2",// "dark1", "dark2"
                    exportEnabled: true,
                    height:300,
                    backgroundColor:"transparent",
                    animationEnabled: true,
                    title: {
                            text: "Total Madres Gestantes",
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
            
            var chartb = new CanvasJS.Chart("EstadosFamilias", {
                animationEnabled: true,
                height:300,
            title:{
                    text:"Datos Generales Madres",
                    fontFamily: "Century Gothic",
                            fontWeight: "bold",
                            fontSize:16
            },
            axisX:{
                    interval: 1
            },
            axisY2:{
                    interlacedColor: "rgba(1,77,101,.2)",
                    gridColor: "rgba(1,77,101,.1)",
            },
            data: [{
                    type: "bar",
                    name: "companies",
                    axisYType: "secondary",
                    dataPoints: [
                            { y: 3, label: "Deserción" },
                            { y: 7, label: "Entrega en Adopción Niños" },
                            { y: 5, label: "Madres Arrepentidas" }
                    ]
            }]
        });
        chartb.render();
        $(".canvasjs-chart-credit").remove()
        $(".canvasjs-chart-toolbar").remove()
        }
        
    });
    $(".canvasjs-chart-credit").remove()
    $(".canvasjs-chart-toolbar").remove()
}

function CargarDocumentoNuevoMadres(id){
    var html = "";
    var url = UrlUniversal+'CargarDocAdicionalMadres';
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '" + UrlUniversal + "image/Nna.png' height='70px'  /> <span class = 'TituloBuscador'>Nuevo Documento</span>";
                html += "</td>"
                html += "<td>"
                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                    html += "<p></p><img src = '" + UrlUniversal + "image/cerrar.png' height='30px'  />";
                    //html += "<img class = 'Cursor' onclick = 'abrirNuevoTab(20)' src = 'image/icons-menu/Tutorial.png' height='100px' />";
                html += "</button>";
                html += "</td>"
            html += "</tr>"
        html += "</table>"
        html += "</div>";
    html += "<form class = 'form-signin' action = '"+url+"'method='post' enctype='multipart/form-data' >"
        html += "<div class='modal-body'>";
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
            html += "<input type='hidden' name='IdMadre' value='" + id + "'>";
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-12'>"
                    html += "<label>Ingrese el nombre del Documento:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'NombreDocumento' />"
                html += "</div>"
            html += "</div>"
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-12'>"
                    html += "<div class='custom-file mb-12' style = 'width:100%'>";
                        html += "<input required type = 'file' class = 'custom-file-input' onchange = 'CambiarTextoFoto(900)' id = 'foto1' name = 'Archivo'/>";
                        html += "<label class='custom-file-label' for='foto900' id = 'NameFoto900'>Seleccione Archivo</label>";
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

function CalendarioCumpleMadres(){
var url = UrlUniversal+'CalendarioBirthDayMadres';
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

function DetalleMadresBirthday(foto,nombre,fechaingreso,id,Edad){
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
                    html += "<img src = '"+UrlUniversal+"image/madres.png' height = '200px' style = 'border-radius:100em'  />";
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

function ResumenMadres(){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'DataResumenMadres',
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
                                                Info.push({ y:data.NUMMADRES[i]['NumMadres'], label: 'Total Madres', x : 100})
                                                SumMadres+= parseFloat(data.NUMMADRES[i]['NumMadres']);
                                                html += "<tr>"
                                                    html += "<td style = 'border:0px;'>"
                                                        html += "<img src = '"+UrlUniversal+"image/Madres.png' height = '60px;'/>"
                                                    html += "</td>"
                                                    html += "<td style = 'border:0px;'>"
                                                        html += "<table><tr><td style = 'font-weight: bold;border:0px;' class = 'Cursor' title='Consultar' data-toggle='modal' data-target='#ModalEdit' onclick = 'ListarMadresResumen();'>Total Madres</td></tr><tr><td style = 'font-weight: 500;border:0px;'>100 %</td></tr><tr><td style = 'font-weight: 500;border:0px;'>Nro.: "+data.NUMMADRES[i]['NumMadres']+"</td></tr></table>"
                                                    html += "</td>"
                                                html += "</tr>"
                                                html += "<tr><td style = 'border:0px;'><p></p></td></tr>"
                                            }
                                            html += "<tr><td style = 'border:0px;'></td></tr>"
                                            html += "<tr><td colspan = '2' nowrap style = 'font-weight: bold;border:0px;' >Total Madres: "+SumMadres+"</td></tr>"
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
                        html += "<div class = 'contenedorReportesX' style = 'height:320px;border:0px;'>"
                            html += "<table width = '100%'>"
                                html += "<tr>"
                                    html += "<td width = '10%' style = 'border:0px;'>";
                                        html += "<table  width = '100%'>";
                                            var SumMadres = 0;
                                            for(var i = 0; i < data.ESTADOS.length;i++){
                                                InfoEstados.push({ y:data.ESTADOS[i]['NumMadres'], label: data.ESTADOS[i]['nombre'], x : data.ESTADOS[i]['por']})
                                                SumMadres+= parseFloat(data.ESTADOS[i]['NumMadres']);
                                                html += "<tr>"
                                                    html += "<td style = 'border:0px;'>"
                                                        html += "<img src = '"+UrlUniversal+"image/Madres.png' height = '60px;'/>"
                                                    html += "</td>"
                                                    html += "<td style = 'border:0px;'>"
                                                        html += "<table><tr><td style = 'font-weight: bold;border:0px;' class = 'Cursor' title='Consultar' data-toggle='modal' data-target='#ModalEdit' onclick = 'ListarMadresResumenEstado("+data.ESTADOS[i]['id']+");' nowrap><span style = 'display:none;' class = 'estado"+data.ESTADOS[i]['id']+"'>"+data.ESTADOS[i]['nombre']+"</span>"+data.ESTADOS[i]['nombre']+"</td></tr><tr><td style = 'font-weight: 500;border:0px;' nowrap>"+data.ESTADOS[i]['por']+" %</td></tr><tr><td style = 'font-weight: 500;border:0px;' nowrap>Nro.: "+data.ESTADOS[i]['NumMadres']+"</td></tr></table>"
                                                    html += "</td>"
                                                html += "</tr>"
                                                html += "<tr><td style = 'border:0px;'><p></p></td></tr>"
                                            }
                                            html += "<tr><td style = 'border:0px;'></td></tr>"
                                            html += "<tr><td colspan = '2' nowrap style = 'font-weight: bold;border:0px;' >Total Madres: "+SumMadres+"</td></tr>"
                                        html += "</table>"   
                                    html += "</td>";
                                    html += "<td style = 'border:0px;'>";
                                        html += "<div style = 'height:240px;' id = 'TotalMadresEstados' ></div>"
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
                                                        html += "<img src = '"+UrlUniversal+"image/Madres.png' height = '60px;'/>"
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
                            text: "Total Madres Gestantes",
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
                    height:300,
                    backgroundColor:"transparent",
                    animationEnabled: true,
                    title: {
                            text: "Estados Madres Gestantes",
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
                            text: "Documentos Madres Gestantes",
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
        }
    });
}

function ListarMadresResumen(){
    
    $.ajax({
        type:'POST',
        url:UrlUniversal+'ListMadresResumenMadres',
        data:{Clave:"Todas",_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
            html += "<tr>"
            html += "<td nowrap>"
            html += "<p></p><img src = '"+UrlUniversal+"image/Madres.png' height='50px'  /> <span class = 'TituloBuscador'>Madres Gestantes</span>";
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
                    html += "<th>Tipo Madre</th>"
                    html += "<th>Nombres</th>"
                    html += "<th>Apellidos</th>"
                    html += "<th>Número Historia</th>"
                    html += "<th>Estado</th>"
                    html += "<th>Fecha Ingreso</th>"
                html += "</tr>"
                for(var i = 0; i < data.madres.length;i++){
                    html += "<tr>"
                        html += "<td class = 'CenterText'>"+data.madres[i]['Num']+"</td>"
                        html += "<td class = 'CenterText'><a target = '_blank' href = '"+UrlUniversal+"DashboardMadre/"+data.madres[i]['id']+"'><img src='image/detalle.png' class='IconDescg'></a></td>"
                        html += "<td>"+data.madres[i]['Tipo']+"</td>"
                        html += "<td>"+data.madres[i]['nombre']+" </td>"
                        html += "<td>"+data.madres[i]['apellidos']+"</td>"
                        html += "<td>"+data.madres[i]['numhistoria']+"</td>"
                        html += "<td>"+data.madres[i]['EstadoMadre']+"</td>"
                        html += "<td>"+data.madres[i]['fechaingreso']+"</td>"
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
        url:UrlUniversal+'ListMadresResumenMadres',
        data:{Clave:"Estado",estado:estado,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
            html += "<tr>"
            html += "<td nowrap>"
            html += "<p></p><img src = '"+UrlUniversal+"image/Madres.png' height='50px'  /> <span class = 'TituloBuscador'>Madres Gestantes - "+$(".estado"+estado).text()+"</span>";
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
                    html += "<th>Tipo Madre</th>"
                    html += "<th>Nombres</th>"
                    html += "<th>Apellidos</th>"
                    html += "<th>Número Historia</th>"
                    html += "<th>Estado</th>"
                    html += "<th>Fecha Ingreso</th>"
                html += "</tr>"
                for(var i = 0; i < data.madres.length;i++){
                    html += "<tr>"
                        html += "<td class = 'CenterText'>"+data.madres[i]['Num']+"</td>"
                        html += "<td class = 'CenterText'><a target = '_blank' href = '"+UrlUniversal+"DashboardMadre/"+data.madres[i]['id']+"'><img src='image/detalle.png' class='IconDescg'></a></td>"
                        html += "<td>"+data.madres[i]['Tipo']+"</td>"
                        html += "<td>"+data.madres[i]['nombre']+" </td>"
                        html += "<td>"+data.madres[i]['apellidos']+"</td>"
                        html += "<td>"+data.madres[i]['numhistoria']+"</td>"
                        html += "<td>"+data.madres[i]['EstadoMadre']+"</td>"
                        html += "<td>"+data.madres[i]['fechaingreso']+"</td>"
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
        url:UrlUniversal+'ListMadresResumenMadres',
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
            html += "<p></p><img src = '"+UrlUniversal+"image/Madres.png' height='50px'  /> <span class = 'TituloBuscador'>Madres Gestantes - "+t+"</span>";
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
                    html += "<th>Tipo Madre</th>"
                    html += "<th>Nombres</th>"
                    html += "<th>Apellidos</th>"
                    html += "<th>Número Historia</th>"
                    html += "<th>Estado</th>"
                    html += "<th>Fecha Ingreso</th>"
                html += "</tr>"
                for(var i = 0; i < data.madres.length;i++){
                    html += "<tr>"
                        html += "<td class = 'CenterText'>"+data.madres[i]['Num']+"</td>"
                        html += "<td class = 'CenterText'><a target = '_blank' href = '"+UrlUniversal+"DashboardMadre/"+data.madres[i]['id']+"'><img src='image/detalle.png' class='IconDescg'></a></td>"
                        html += "<td>"+data.madres[i]['Tipo']+"</td>"
                        html += "<td>"+data.madres[i]['nombre']+" </td>"
                        html += "<td>"+data.madres[i]['apellidos']+"</td>"
                        html += "<td>"+data.madres[i]['numhistoria']+"</td>"
                        html += "<td>"+data.madres[i]['EstadoMadre']+"</td>"
                        html += "<td>"+data.madres[i]['fechaingreso']+"</td>"
                    html += "</tr>"
                }
            html += "</table>"
            html += "</div>";
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        }
    });
}