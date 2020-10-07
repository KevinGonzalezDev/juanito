/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function AgregarAsistentesCharla(id){
    $.ajax({
        type: 'POST',
        url: UrlUniversal + 'ListarVoluntarios',
        data: {estado: 1, _token: document.getElementsByName('_token')[0].value},
        success: function (data) {
            var html = "";
            html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
            html += "<tr>"
            html += "<td nowrap>"
            html += "<p></p><img src = '" + UrlUniversal + "image/Calendario.png' height='50px'  /> <span class = 'TituloBuscador'>CONVOCADOS CHARLA INFORMATIVA</span>";
            html += "</td>"
            html += "<td width = '5%'style = 'text-align:rigth;'>"
            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
            html += "<img src = '" + UrlUniversal + "image/cerrar.png' height='20px'  />";
            html += "</button>";
            html += "</td>"
            html += "</tr>"
            html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<form class='form-signin' action='" + UrlUniversal + "AddAsistentesCharla' method='post'>"
                    html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
                    html += "<input type='hidden' name='idCharla' value='" + id + "' />";
                    html += "<div class = 'form-group row'>"
                        html += "<div class = 'col-sm-12'>"
                            html += "<table class = 'tableNew' >"
                                html += "<tr>"
                                    html += "<th>Seleccione</th>"
                                    html += "<th>Nombre</th>"
                                    html += "<th>Apellido</th>"
                                html += "</tr>"
                                for(var i = 0; i < data.Voluntario.length;i++){
                                    html += "<tr>"
                                        html += "<td class = 'CenterText' style = 'border-left:7px solid #A7A9AC;'>"
                                            html += "<div class='custom-control custom-radio '>"
                                                html += "<input type='checkbox'  id = 'Responsable"+data.Voluntario[i]['id']+"' name ='Asistente[]' value = '"+data.Voluntario[i]['id']+"'  class='custom-control-input' />"
                                                html += "<p></p><label class='custom-control-label' for = 'Responsable"+data.Voluntario[i]['id']+"'></label>"
                                            html += "</div>";
                                        html += "</td>"
                                        html += "<td >"+data.Voluntario[i]['nombre']+"</td>"
                                        html += "<td style = 'border-right:7px solid #A7A9AC;'>"+data.Voluntario[i]['apellido']+"</td>"
                                    html += "</tr>"
                                }
                            html += "</Table>"
                        html += "</div>"
                    html += "</div>"
                    html += "<div class = 'form-group row'>"
                        html += "<div class = 'col-sm-12 flex-center'>"
                            html += "<button class = 'btn btn-primary'>Guardar</button>"
                        html += "</div>"
                    html += "</div>"
                html += "</form>"
            html += "</div>";
            $(".content_modal").html(html);
            $(".DatePicker").datepicker({dateFormat: 'yy-mm-dd'});
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-lg');
        }
    });
}

function SolicitarIngreso(id){
    var html = "";
    html += "<div class='modal-header'>";
    html += "<table width = '100%'>"
    html += "<tr>"
    html += "<td nowrap>"
    html += "<p></p><img src = '" + UrlUniversal + "image/Voluntariado.png' height='50px'  /> <span class = 'TituloBuscador'>SOLICITAR INGRESO</span>";
    html += "</td>"
    html += "<td width = '5%'style = 'text-align:rigth;'>"
    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
    html += "<img src = '" + UrlUniversal + "image/cerrar.png' height='20px'  />";
    html += "</button>";
    html += "</td>"
    html += "</tr>"
    html += "</table>"
    html += "</div>";
    html += "<div class='modal-body'>";
        html += "<form class='form-signin' action='" + UrlUniversal + "SolicitarIngresoVoluntario' method='post'>"
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
            html += "<input type='hidden' name='idvoluntario' value='" + id + "' />";
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-12'>"
                    html += "<label>Motivo de Ingreso:</label>"
                    html += "<textarea required class = 'form-control' name = 'jusitificacion' ></textarea>"
                html += "</div>"
            html += "</div>"
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-12 flex-center'>"
                    html += "<button class = 'btn btn-primary'>Guardar</button>"
                html += "</div>"
            html += "</div>"
        html += "</form>"
    html += "</div>";
    $(".content_modal").html(html);
    $(".DatePicker").datepicker({dateFormat: 'yy-mm-dd'});
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-lg');
}

function AgregarAsistentesConvocatoria(id){
    $.ajax({
        type: 'POST',
        url: UrlUniversal + 'ListarVoluntariosEvento',
        data: {id: id, _token: document.getElementsByName('_token')[0].value},
        success: function (data) {
            var html = "";
            html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
            html += "<tr>"
            html += "<td nowrap>"
            html += "<p></p><img src = '" + UrlUniversal + "image/Calendario.png' height='50px'  /> <span class = 'TituloBuscador'>CONVOCADOS CHARLA INFORMATIVA</span>";
            html += "</td>"
            html += "<td width = '5%'style = 'text-align:rigth;'>"
            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
            html += "<img src = '" + UrlUniversal + "image/cerrar.png' height='20px'  />";
            html += "</button>";
            html += "</td>"
            html += "</tr>"
            html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<form class='form-signin' action='" + UrlUniversal + "AddAsistentesEvento' method='post'>"
                    html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
                    html += "<input type='hidden' name='idCharla' value='" + id + "' />";
                    html += "<div class = 'form-group row'>"
                        html += "<div class = 'col-sm-12'>"
                            html += "<table class = 'tableNew' >"
                                html += "<tr>"
                                    html += "<th>Seleccione</th>"
                                    html += "<th>Nombre</th>"
                                    html += "<th>Apellido</th>"
                                html += "</tr>"
                                for(var i = 0; i < data.Voluntario.length;i++){
                                    html += "<tr>"
                                        html += "<td class = 'CenterText' style = 'border-left:7px solid #A7A9AC;'>"
                                            html += "<div class='custom-control custom-radio '>"
                                                html += "<input type='checkbox'  id = 'Responsable"+data.Voluntario[i]['id']+"' name ='Asistente[]' value = '"+data.Voluntario[i]['id']+"'  class='custom-control-input' />"
                                                html += "<p></p><label class='custom-control-label' for = 'Responsable"+data.Voluntario[i]['id']+"'></label>"
                                            html += "</div>";
                                        html += "</td>"
                                        html += "<td >"+data.Voluntario[i]['nombre']+"</td>"
                                        html += "<td style = 'border-right:7px solid #A7A9AC;'>"+data.Voluntario[i]['apellido']+"</td>"
                                    html += "</tr>"
                                }
                            html += "</Table>"
                        html += "</div>"
                    html += "</div>"
                    html += "<div class = 'form-group row'>"
                        html += "<div class = 'col-sm-12 flex-center'>"
                            html += "<button class = 'btn btn-primary'>Guardar</button>"
                        html += "</div>"
                    html += "</div>"
                html += "</form>"
            html += "</div>";
            $(".content_modal").html(html);
            $(".DatePicker").datepicker({dateFormat: 'yy-mm-dd'});
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-lg');
        }
    });
}
function ListarConvocados(id){
    $.ajax({
        type: 'POST',
        url: UrlUniversal + 'ListarVoluntariosConvocatoria',
        data: {id: id, _token: document.getElementsByName('_token')[0].value},
        success: function (data) {
            var html = "";
            html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
            html += "<tr>"
            html += "<td nowrap>"
            html += "<p></p><img src = '" + UrlUniversal + "image/Calendario.png' height='50px'  /> <span class = 'TituloBuscador'>CONVOCADOS EVENTO</span>";
            html += "</td>"
            html += "<td width = '5%'style = 'text-align:rigth;'>"
            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
            html += "<img src = '" + UrlUniversal + "image/cerrar.png' height='20px'  />";
            html += "</button>";
            html += "</td>"
            html += "</tr>"
            html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<table class = 'tableNew' >"
                    html += "<tr>"
                        html += "<th>Número</th>"
                        html += "<th>Nombre</th>"
                        html += "<th>Apellido</th>"
                        html += "<th>Celular</th>"
                        html += "<th>Teléfono</th>"
                        html += "<th>Correo</th>"
                        html += "<th>¿Asistirá?</th>"
                    html += "</tr>"
                    for(var i = 0; i < data.Voluntario.length;i++){
                        html += "<tr>"
                            html += "<td class = 'CenterText' style = 'border-left:7px solid #A7A9AC;'>"+data.Voluntario[i]['Num']+"</td>"
                            html += "<td >"+data.Voluntario[i]['nombre']+"</td>"
                            html += "<td >"+data.Voluntario[i]['apellido']+"</td>"
                            html += "<td >"+data.Voluntario[i]['celular']+"</td>"
                            html += "<td >"+data.Voluntario[i]['telefono']+"</td>"
                            html += "<td >"+data.Voluntario[i]['email']+"</td>"
                            html += "<td class = 'CenterText'style = 'border-right:7px solid #A7A9AC;'>"+data.Voluntario[i]['Asistencia']+"</td>"
                        html += "</tr>"
                    }
                html += "</Table>"
            html += "</div>";
            $(".content_modal").html(html);
            $(".DatePicker").datepicker({dateFormat: 'yy-mm-dd'});
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            
        }
    });
}
function ListarConvocadosCharla(id){
    $.ajax({
        type: 'POST',
        url: UrlUniversal + 'ListarVoluntariosCharla',
        data: {id: id, _token: document.getElementsByName('_token')[0].value},
        success: function (data) {
            var html = "";
            html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
            html += "<tr>"
            html += "<td nowrap>"
            html += "<p></p><img src = '" + UrlUniversal + "image/Calendario.png' height='50px'  /> <span class = 'TituloBuscador'>CONVOCADOS CHARLA INFORMATIVA</span>";
            html += "</td>"
            html += "<td width = '5%'style = 'text-align:rigth;'>"
            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
            html += "<img src = '" + UrlUniversal + "image/cerrar.png' height='20px'  />";
            html += "</button>";
            html += "</td>"
            html += "</tr>"
            html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
                html += "<table class = 'tableNew' >"
                    html += "<tr>"
                        html += "<th>Número</th>"
                        html += "<th>Nombre</th>"
                        html += "<th>Apellido</th>"
                        html += "<th>Celular</th>"
                        html += "<th>Teléfono</th>"
                        html += "<th>Correo</th>"
                    html += "</tr>"
                    for(var i = 0; i < data.Voluntario.length;i++){
                        html += "<tr>"
                            html += "<td class = 'CenterText' style = 'border-left:7px solid #A7A9AC;'>"+data.Voluntario[i]['Num']+"</td>"
                            html += "<td >"+data.Voluntario[i]['nombre']+"</td>"
                            html += "<td >"+data.Voluntario[i]['apellido']+"</td>"
                            html += "<td >"+data.Voluntario[i]['celular']+"</td>"
                            html += "<td >"+data.Voluntario[i]['telefono']+"</td>"
                            html += "<td style = 'border-right:7px solid #A7A9AC;'>"+data.Voluntario[i]['email']+"</td>"
                        html += "</tr>"
                    }
                html += "</Table>"
            html += "</div>";
            $(".content_modal").html(html);
            $(".DatePicker").datepicker({dateFormat: 'yy-mm-dd'});
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            
        }
    });
}

function crearConvocatoriaAsistencia(){
    $.ajax({
        type: 'POST',
        url: UrlUniversal + 'ListarVoluntarios',
        data: {estado: 1, _token: document.getElementsByName('_token')[0].value},
        success: function (data) {
            var html = "";
            html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
            html += "<tr>"
            html += "<td nowrap>"
            html += "<p></p><img src = '" + UrlUniversal + "image/Calendario.png' height='50px'  /> <span class = 'TituloBuscador'>NUEVA CHARLA INFORMATIVA</span>";
            html += "</td>"
            html += "<td width = '5%'style = 'text-align:rigth;'>"
            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
            html += "<img src = '" + UrlUniversal + "image/cerrar.png' height='20px'  />";
            html += "</button>";
            html += "</td>"
            html += "</tr>"
            html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
            html += "<form class='form-signin' action='" + UrlUniversal + "NuevaCharlaInformativa' method='post'>"
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
            html += "<div class='form-group row'>"
            html += "<div class='col-sm-3'>"
            html += "<label for='ParGeneralPais' >(*)Fecha de Inicio:</label>"
            html += "<input autocomplete='off' type = 'text' class = 'form-control DatePicker' id = 'FechaInicial' name = 'FechaInicial' />";
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
            html += "<label for='ParGeneralPais' >(*)Fecha Finalización:</label>"
            html += "<input autocomplete='off' type = 'text' class = 'form-control DatePicker' id = 'FechaFin' name = 'FechaFin' />";
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
            html += "<div class='form-group row'>"
            html += "<div class='col-sm-6'>"
            html += "<label for='ParGeneralPais' >(*)Asunto:</label>"
            html += "<input autocomplete='off' type = 'text' class = 'form-control' id = 'Asunto' name = 'Asunto' />";
            html += "</div>"
            html += "</div>"
            html += "<div class='form-group row'>"
            html += "<div class='col-sm-12'>"
            html += "<label for='ParGeneralPais' >(*)Descripción:</label>"
            html += "<textarea class = 'form-control' id = 'Observaciones' name = 'Observaciones'></textarea>";
            html += "</div>"
            html += "</div>"
            html += "<div class='col-sm-12'>"
            html += "<label>Seleccione los Asistentes:</label>"
            html += "<select class = 'form-control' multiple='multiple' id = 'Asistentes' name = 'Asistentes[]'>"

            for (var i = 0; i < data.Voluntario.length; i++) {
                html += "<option value = '" + data.Voluntario[i]['id'] + "'>" + data.Voluntario[i]['nombre'] + " " + data.Voluntario[i]['apellido'] + "</option>"
            }
            html += "</select>"
            html += "</div>"
            html += "<div class='form-group row'>"
            html += "<div class='col-sm-12 CenterText'>"
            html += "<button type = 'submit' class = 'btn btn-primary'>Guardar</button>";
            html += "</div>"
            html += "</div>"

            html += "</form>"

            html += "</div>";
            $(".content_modal").html(html);
            $(".DatePicker").datepicker({dateFormat: 'yy-mm-dd'});
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        }
    });
}

function crearConvocatoria(){
    $.ajax({
        type: 'POST',
        url: UrlUniversal + 'ListarVoluntariosMultiple',
        data: {estado: 2, _token: document.getElementsByName('_token')[0].value},
        success: function (data) {
            var html = "";
            html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
            html += "<tr>"
            html += "<td nowrap>"
            html += "<p></p><img src = '" + UrlUniversal + "image/Calendario.png' height='50px'  /> <span class = 'TituloBuscador'>NUEVA CONVOCATORIA</span>";
            html += "</td>"
            html += "<td width = '5%'style = 'text-align:rigth;'>"
            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
            html += "<img src = '" + UrlUniversal + "image/cerrar.png' height='20px'  />";
            html += "</button>";
            html += "</td>"
            html += "</tr>"
            html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
            html += "<form class='form-signin' action='" + UrlUniversal + "NuevaConvocatoriaFundacion' method='post'>"
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
            html += "<div class='form-group row'>"
            html += "<div class='col-sm-3'>"
            html += "<label for='ParGeneralPais' >(*)Fecha de Inicio:</label>"
            html += "<input autocomplete='off' type = 'text' class = 'form-control DatePicker' id = 'FechaInicial' name = 'FechaInicial' />";
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
            html += "<label for='ParGeneralPais' >(*)Fecha Finalización:</label>"
            html += "<input autocomplete='off' type = 'text' class = 'form-control DatePicker' id = 'FechaFin' name = 'FechaFin' />";
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
            html += "<div class='form-group row'>"
                html += "<div class='col-sm-6'>"
                    html += "<label for='ParGeneralPais' >(*)Asunto:</label>"
                    html += "<input autocomplete='off' type = 'text' class = 'form-control' id = 'Asunto' name = 'Asunto' />";
                html += "</div>"
                html += "<div class='col-sm-6'>"
                    html += "<label for='ParGeneralPais' >(*)Tipo de Asitencia:</label>"
                    html += "<select class = 'form-control' name = 'tipoasistencia'>";
                        for(var i = 0; i < data.Asistencia.length; i++){
                            html += "<option value = '"+data.Asistencia[i]['id']+"'>"+data.Asistencia[i]['nombre']+"</option>"
                        }
                    html += "</select>"
                html += "</div>"
            html += "</div>"
            html += "<div class='form-group row'>"
            html += "<div class='col-sm-12'>"
            html += "<label for='ParGeneralPais' >(*)Descripción:</label>"
            html += "<textarea class = 'form-control' id = 'Observaciones' name = 'Observaciones'></textarea>";
            html += "</div>"
            html += "</div>"
            html += "<div class='col-sm-12'>"
            html += "<label>Seleccione los Asistentes:</label>"
            html += "<select class = 'form-control' multiple='multiple' id = 'Asistentes' name = 'Asistentes[]'>"

            for (var i = 0; i < data.Voluntario.length; i++) {
                html += "<option value = '" + data.Voluntario[i]['id'] + "'>" + data.Voluntario[i]['nombre'] + " " + data.Voluntario[i]['apellido'] + "</option>"
            }
            html += "</select>"
            html += "</div>"
            html += "<div class='form-group row'>"
            html += "<div class='col-sm-12 CenterText'>"
                html += "<br>"
            html += "<button type = 'submit' class = 'btn btn-primary'>Guardar</button>";
            html += "</div>"
            html += "</div>"

            html += "</form>"

            html += "</div>";
            $(".content_modal").html(html);
            $(".DatePicker").datepicker({dateFormat: 'yy-mm-dd'});
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        }
    });
}

function FormEditarVoluntario(id){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'InfoVoluntario',
        data:{Id:id,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            var url = UrlUniversal+'EditarInformacionVoluntario';
            html += "<div class='modal-header'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<p></p><img src = '"+UrlUniversal+"image/Madres.png' height='70px'  /> <span class = 'TituloBuscador'>REGISTRAR VOLUNTARIO</span>";
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
                    
                    html += "<div class = 'separator'>DATOS DEL VOLUNTARIO</div>";
                    html += "<br>";
                    html += "<table class = 'table' style = 'background-color:white;'>";
                        html += "<tr>";
                            html +="<td class = 'CenterText' style = 'background-color:white;'>";
                            if( data.Voluntario[0]['foto'] == null){
                                html += "<img src = 'image/foto.png' height='200px' style = 'border-radius:5em;'/><p></p>"
                            }else{
                                html += "<img src = '../../storage/app/Voluntario/"+data.Voluntario[0]['id']+"/Fotos/"+data.Voluntario[0]['foto']+"' height='200px' style = 'border-radius:5em;'/><p></p>"
                            }
                                
                                html += "<div class='custom-file mb-3'>";
                                    html += "<input type = 'file' class = 'custom-file-input' onchange = 'CambiarTextoFoto(1)' id = 'foto1' name = 'fotomadre'/>";
                                    html += "<label class='custom-file-label' for='foto1' id = 'NameFoto1'>Seleccione Foto</label>";
                                html += "</div>";
                            html += "</td>";
                        html += "</tr>";
                        html += "<tr>";
                            html += "<td style = 'background-color:white;'>";
                                html += "<div class = 'Subtitulos'><p><i class='fas fa-angle-double-right'></i>Información General</p></div>";
                                html += "<div class='form-group row'>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='nombre1' >Nombre:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='nombre' name='nombre' value = '"+data.Voluntario[0]['nombre']+"' required/>";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='nombre1' >Apellido:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='apellido' name='apellido' value ='"+data.Voluntario[0]['apellido']+"' required/>";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='TipoDocumento1' >Tipo de Documento:</label>";
                                        html += "<select name = 'tipodocumento' id='tipodocumento'  class='form-control' required>";
                                            for(var i = 0; i < data.partipodocmadres.length; i++){
                                                if( data.Voluntario[0]['tipo_documento'] == data.partipodocmadres[i]['id'] ){
                                                    html += "<option value = '"+data.partipodocmadres[i]['id']+"' selected>"+data.partipodocmadres[i]['nombre']+"</option>";
                                                }else{
                                                    html += "<option value = '"+data.partipodocmadres[i]['id']+"'>"+data.partipodocmadres[i]['nombre']+"</option>";
                                                }
                                            } 
                                        html += "</select>";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='NroDoc1' >Nro. de Documento:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='NroDoc1' name='NroDoc1' value='"+data.Voluntario[0]['numero_documento']+"' />";
                                    html += "</div>";
                                html += "</div>";
                                html += "<div class='form-group row'>"
                                    
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Teléfono:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='Telefono' name='Telefono' value='"+data.Voluntario[0]['telefono']+"'  />";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Celular:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='Celular' name='Celular' value='"+data.Voluntario[0]['celular']+"'  />";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Correo:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='Correo' name='Correo' value='"+data.Voluntario[0]['correo']+"'  />";
                                    html += "</div>"
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Dirección:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='Direccion' name='Direccion' value='"+data.Voluntario[0]['direccion']+"'  />";
                                    html += "</div>"
                                html += "</div>"
                                html += "<div class='form-group row'>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Fecha Nacimiento:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control DatePicker' id='FechaNacimiento1' name='FechaNacimiento1' value='"+data.Voluntario[0]['fecha_nacimiento']+"'  />";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Lugar Nacimiento:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='LugarNacimiento' name='LugarNacimiento' value='"+data.Voluntario[0]['lugar_nacimiento']+"'  />";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='Genero1' >Sexo:</label>";
                                        html += "<select name = 'Genero1' id='Genero1'  class='form-control' required>";
                                            if( data.Voluntario[0]['sexo'] == 1 ){
                                                html += "<option value = '1' selected>Masculino</option>";
                                                html += "<option value = '2'>Femenino</option>";
                                            }else{
                                                html += "<option value = '1' >Masculino</option>";
                                                html += "<option value = '2' selected>Femenino</option>";
                                            }
                                            
                                        html += "</select>";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='Genero1' >Medio Contacto:</label>";
                                        html += "<select name = 'MedioContacto' id='MedioContacto'  class='form-control' required>";
                                            for(var i = 0; i < data.MedioContacto.length; i++){
                                                if( data.Voluntario[0]['medio_contacto_id'] == data.MedioContacto[i]['id'] ){
                                                    html += "<option value = '"+data.MedioContacto[i]['id']+"' selected>"+data.MedioContacto[i]['nombre']+"</option>";
                                                }else{
                                                    html += "<option value = '"+data.MedioContacto[i]['id']+"'>"+data.MedioContacto[i]['nombre']+"</option>";
                                                }
                                            } 
                                        html += "</select>";
                                    html += "</div>";
                                html += "</div>";
                                
                                html += "<div class = 'Subtitulos'><p><i class='fas fa-angle-double-right'></i>Información Laboral</p></div>";
                                html += "<div class='form-group row'>";
                                    
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Profesión / Oficio:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='Ocupacion' name='Ocupacion' value='"+data.Voluntario[0]['profesion']+"'  />";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Título:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='Titulo' name='Titulo' value='"+data.Voluntario[0]['titulo']+"'  />";
                                    html += "</div>";
                                html += "</div>";
                                
                                
                                html += "<br>";
                                html += "<div class='form-group row'>"
                                    html += "<div class='col-sm-12'>";
                                        html += "<label for='celular1' >Experiencia profesional o laboral:</label>";
                                        html += "<textarea class = 'form-control' name = 'experiencia'>"+data.Voluntario[0]['experiencia']+"</textarea>";
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

function CrearVoluntario(){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'ListarDatosMadres',
        data:{Hash:1,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            var url = UrlUniversal+'RegistrarVoluntario';
            html += "<div class='modal-header'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<p></p><img src = '"+UrlUniversal+"image/Madres.png' height='70px'  /> <span class = 'TituloBuscador'>REGISTRAR VOLUNTARIO</span>";
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
                    
                    html += "<div class = 'separator'>DATOS DEL VOLUNTARIO</div>";
                    html += "<br>";
                    html += "<table class = 'table' style = 'background-color:white;'>";
                        html += "<tr>";
                            html +="<td class = 'CenterText' style = 'background-color:white;'>";
                                html += "<img src = 'image/foto.png' height='200px' style = 'border-radius:5em;'/><p></p>"
                                html += "<div class='custom-file mb-3'>";
                                    html += "<input type = 'file' class = 'custom-file-input' onchange = 'CambiarTextoFoto(1)' id = 'foto1' name = 'fotomadre'/>";
                                    html += "<label class='custom-file-label' for='foto1' id = 'NameFoto1'>Seleccione Foto</label>";
                                html += "</div>";
                            html += "</td>";
                        html += "</tr>";
                        html += "<tr>";
                            html += "<td style = 'background-color:white;'>";
                                html += "<div class = 'Subtitulos'><p><i class='fas fa-angle-double-right'></i>Información General</p></div>";
                                html += "<div class='form-group row'>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='nombre1' >Nombre:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='nombre' name='nombre' placeholder='Nombre' required/>";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='nombre1' >Apellido:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='apellido' name='apellido' placeholder='Apellido' required/>";
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
                                        html += "<label for='celular1' >Dirección:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='Direccion' name='Direccion' placeholder='Dirección'  />";
                                    html += "</div>"
                                html += "</div>"
                                html += "<div class='form-group row'>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Fecha Nacimiento:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control DatePicker' id='FechaNacimiento1' name='FechaNacimiento1' placeholder='Fecha Nacimiento'  />";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Lugar Nacimiento:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='LugarNacimiento' name='LugarNacimiento' placeholder='Lugar Nacimiento'  />";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='Genero1' >Sexo:</label>";
                                        html += "<select name = 'Genero1' id='Genero1'  class='form-control' required>";
                                            html += "<option value = '1'>Masculino</option>";
                                            html += "<option value = '2'>Femenino</option>";
                                        html += "</select>";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='Genero1' >Medio Contacto:</label>";
                                        html += "<select name = 'MedioContacto' id='MedioContacto'  class='form-control' required>";
                                            html += "<option value = '1'>Whatsapp</option>";
                                            html += "<option value = '2'>Facebook</option>";
                                        html += "</select>";
                                    html += "</div>";
                                html += "</div>";
                                
                                html += "<div class = 'Subtitulos'><p><i class='fas fa-angle-double-right'></i>Información Laboral</p></div>";
                                html += "<div class='form-group row'>";
                                    
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Profesión / Oficio:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='Ocupacion' name='Ocupacion' placeholder='Ocupación'  />";
                                    html += "</div>";
                                    html += "<div class='col-sm-3'>";
                                        html += "<label for='celular1' >Título:</label>";
                                        html += "<input autocomplete = 'off' type='text' class='form-control' id='Titulo' name='Titulo' placeholder='Titulo'  />";
                                    html += "</div>";
                                html += "</div>";
                                html += "<div class='form-group row'>"
                                    html += "<div class='col-sm-12'>";
                                        html += "<label for='celular1' >Estudios:</label>";
                                        html += "<table class = 'tableNew'>"
                                            /*html += "<tr>"
                                                html += "<th colspan = '7' style = 'text-align:left;'>Repetir los días:</th>"
                                            html += "</tr>"*/
                                            html += "<tr>"
                                                html += "<td style = 'background-color:white;border:0px;'>"
                                                    html += "<div class='custom-control custom-checkbox'>";
                                                        html += "<input type='checkbox' class='custom-control-input' name = 'Estudio[]' value = 'Bachiller' id='1'>";
                                                    html += "<label class='custom-control-label' for='1'>Bachiller</label>";
                                                    html += "</div>";
                                                html += "</td>"
                                                html += "<td style = 'background-color:white;border:0px;'>"
                                                    html += "<div class='custom-control custom-checkbox'>";
                                                        html += "<input type='checkbox' class='custom-control-input'  name = 'Estudio[]' value = 'Tecnico' id='2'>";
                                                        html += "<label class='custom-control-label' for='2'>Técnico</label>";
                                                    html += "</div>";
                                                html += "</td>"
                                                html += "<td style = 'background-color:white;border:0px;'>"
                                                    html += "<div class='custom-control custom-checkbox'>";
                                                        html += "<input type='checkbox' class='custom-control-input'  name = 'Estudio[]' value = 'Profesional' id='3'>";
                                                        html += "<label class='custom-control-label' for='3'>Profesional</label>";
                                                    html += "</div>";
                                                html += "</td>"
                                                html += "<td style = 'background-color:white;border:0px;'>"
                                                    html += "<div class='custom-control custom-checkbox'>";
                                                        html += "<input type='checkbox' class='custom-control-input'  name = 'Estudio[]' value = 'Postgrado' id='4'>";
                                                        html += "<label class='custom-control-label' for='4'>Postgrado</label>";
                                                    html += "</div>";
                                                html += "</td>"
                                                
                                            html += "</tr>"
                                        html += "</table>"
                                    html += "</div>";
                                html += "</div>"
                                html += "<div class='form-group row'>"
                                    html += "<div class='col-sm-12'>";
                                        html += "<label for='celular1' >Días de Asistencia:</label>";
                                        html += "<table style = 'width:100%;'>"
                                        html += "<tr>"
                                        html += "<td style = 'background-color:white;border:0px;'>"
                                        html += "<div class='custom-control custom-checkbox'>";
                                        html += "<input type='checkbox' class='custom-control-input' name = 'DiasTaller[]' value = '1' id='Lunes'>";
                                        html += "<label class='custom-control-label' for='Lunes'>Lunes en la Mañana</label>";
                                        html += "</div>";
                                        html += "</td>"
                                        html += "<td style = 'background-color:white;border:0px;'>"
                                        html += "<div class='custom-control custom-checkbox'>";
                                        html += "<input type='checkbox' class='custom-control-input'  name = 'DiasTaller[]' value = '2' id='Lunest'>";
                                        html += "<label class='custom-control-label' for='Lunest'>Lunes en la Tarde</label>";
                                        html += "</div>";
                                        html += "</td>"
                                        html += "<td style = 'background-color:white;border:0px;'>"
                                        html += "<div class='custom-control custom-checkbox'>";
                                        html += "<input type='checkbox' class='custom-control-input'  name = 'DiasTaller[]' value = '3' id='Martes'>";
                                        html += "<label class='custom-control-label' for='Martes'>Martes en la Mañana</label>";
                                        html += "</div>";
                                        html += "</td>"
                                        html += "<td style = 'background-color:white;border:0px;'>"
                                        html += "<div class='custom-control custom-checkbox'>";
                                        html += "<input type='checkbox' class='custom-control-input'  name = 'DiasTaller[]' value = '4' id='Martest'>";
                                        html += "<label class='custom-control-label' for='Martest'>Martes en la Tarde</label>";
                                        html += "</div>";
                                        html += "</td>"
                                        html += "<td style = 'background-color:white;border:0px;'>"
                                            html += "<div class='custom-control custom-checkbox'>";
                                                html += "<input type='checkbox' class='custom-control-input'  name = 'DiasTaller[]' value = '5' id='Miercoles'>";
                                                html += "<label class='custom-control-label' for='Miercoles'>Miércoles en la Mañana</label>";
                                            html += "</div>";
                                            html += "</td>"
                                        html += "<td style = 'background-color:white;border:0px;'>"
                                        html += "<div class='custom-control custom-checkbox'>";
                                        html += "<input type='checkbox' class='custom-control-input' name = 'DiasTaller[]' value = '6' id='Miercolest'>";
                                        html += "<label class='custom-control-label' for='Miercolest'>Miércoles en la Tarde</label>";
                                        html += "</div>";
                                        html += "</td>"
                                        html += "<td style = 'background-color:white;border:0px;'>"
                                        html += "<div class='custom-control custom-checkbox'>";
                                        html += "<input type='checkbox' class='custom-control-input' name = 'DiasTaller[]' value = '7' id='Jueves'>";
                                        html += "<label class='custom-control-label' for='Jueves'>Jueves en la Mañana</label>";
                                        html += "</div>";
                                        html += "</td>"
                                        html += "</tr>"
                                        html += "<tr>"
                                        html += "<td style = 'background-color:white;border:0px;'>"
                                        html += "<div class='custom-control custom-checkbox'>";
                                        html += "<input type='checkbox' class='custom-control-input' name = 'DiasTaller[]' value = '8' id='Juevest'>";
                                        html += "<label class='custom-control-label' for='Juevest'>Jueves en la Tarde</label>";
                                        html += "</div>";
                                        html += "</td>"
                                        html += "<td style = 'background-color:white;border:0px;'>"
                                        html += "<div class='custom-control custom-checkbox'>";
                                        html += "<input type='checkbox' class='custom-control-input'  name = 'DiasTaller[]' value = '9' id='Viernes'>";
                                        html += "<label class='custom-control-label' for='Viernes'>Viernes en la Mañana</label>";
                                        html += "</div>";
                                        html += "</td>"
                                        html += "<td style = 'background-color:white;border:0px;'>"
                                        html += "<div class='custom-control custom-checkbox'>";
                                        html += "<input type='checkbox' class='custom-control-input'  name = 'DiasTaller[]' value = '10' id='Viernest'>";
                                        html += "<label class='custom-control-label' for='Viernest'>Viernes en la Tarde</label>";
                                        html += "</div>";
                                        html += "</td>"
                                        html += "<td style = 'background-color:white;border:0px;'>"
                                        html += "<div class='custom-control custom-checkbox'>";
                                        html += "<input type='checkbox' class='custom-control-input'  name = 'DiasTaller[]' value = '11' id='Sabado'>";
                                        html += "<label class='custom-control-label' for='Sabado'>Sábado en la Mañana</label>";
                                        html += "</div>";
                                        html += "</td>"
                                        html += "<td style = 'background-color:white;border:0px;'>"
                                            html += "<div class='custom-control custom-checkbox'>";
                                                html += "<input type='checkbox' class='custom-control-input'  name = 'DiasTaller[]' value = '12' id='Sabadot'>";
                                                html += "<label class='custom-control-label' for='Sabadot'>Sábado en la Tarde</label>";
                                            html += "</div>";
                                            html += "</td>"
                                        html += "<td style = 'background-color:white;border:0px;'>"
                                        html += "<div class='custom-control custom-checkbox'>";
                                        html += "<input type='checkbox' class='custom-control-input' name = 'DiasTaller[]' value = '13' id='Domingo'>";
                                        html += "<label class='custom-control-label' for='Domingo'>Domingo en la Mañana</label>";
                                        html += "</div>";
                                        html += "</td>"
                                        html += "<td style = 'background-color:white;border:0px;'>"
                                        html += "<div class='custom-control custom-checkbox'>";
                                        html += "<input type='checkbox' class='custom-control-input' name = 'DiasTaller[]' value = '14' id='Domingot'>";
                                        html += "<label class='custom-control-label' for='Domingot'>Domingo en la Tarde</label>";
                                        html += "</div>";
                                        html += "</td>"
                                        html += "</tr>"
                                        html += "</table>"
                                    html += "</div>"
                                html += "</div>"
                                
                                html += "<br>";
                                html += "<div class='form-group row'>"
                                    html += "<div class='col-sm-12'>";
                                        html += "<label for='celular1' >Experiencia profesional o laboral:</label>";
                                        html += "<textarea class = 'form-control' name = 'experiencia'></textarea>";
                                    html += "</div>";
                                html += "</div>"
                                html += "<div class='form-group row'>"
                                    html += "<div class='col-sm-12'>";
                                        html += "<label for='celular1' >Actividades a Realizar:</label>";
                                        html += "<textarea class = 'form-control' name = 'actividades'></textarea>";
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

function crearClase(){
    $.ajax({
        type: 'POST',
        url: UrlUniversal + 'ListarNinosAdopciones',
        data: {estado: 2, _token: document.getElementsByName('_token')[0].value},
        success: function (data) {
            var html = "";
            html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
            html += "<tr>"
            html += "<td nowrap>"
            html += "<p></p><img src = '" + UrlUniversal + "image/Calendario.png' height='50px'  /> <span class = 'TituloBuscador'>Nueva Clase</span>";
            html += "</td>"
            html += "<td width = '5%'style = 'text-align:rigth;'>"
            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
            html += "<img src = '" + UrlUniversal + "image/cerrar.png' height='20px'  />";
            html += "</button>";
            html += "</td>"
            html += "</tr>"
            html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
            html += "<form class='form-signin' action='" + UrlUniversal + "ClaseNinoNina' method='post'>"
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
                html += "<div class='form-group row'>"
                    html += "<div class='col-sm-3'>"
                        html += "<label for='ParGeneralPais' >(*)Fecha de Inicio:</label>"
                        html += "<input autocomplete='off' type = 'text' class = 'form-control DatePicker' id = 'FechaInicial' name = 'FechaInicial' />";
                html += "</div>"
                html += "<div class='col-sm-3'>"
                    html += "<label for='ParGeneralPais' >(*)Fecha Finalización:</label>"
                    html += "<input autocomplete='off' type = 'text' class = 'form-control DatePicker' id = 'FechaFin' name = 'FechaFin' />";
                html += "</div>"
                html += "<div class='col-sm-3'>"
                    html += "<label for='ParGeneralPais' >(*)Nombre Clase:</label>"
                    html += "<input autocomplete='off' type = 'text' class = 'form-control' id = 'clase' name = 'clase' />";
                html += "</div>"
                html += "<div class='col-sm-3'>"
                    html += "<label for='ParGeneralPais' >(*)Horas por Semana:</label>"
                    html += "<input autocomplete='off' type = 'number' class = 'form-control' id = 'horaxsemana' name = 'horaxsemana' />";
                html += "</div>"
                
            html += "</div>"

            html += "<div class='form-group row'>"
                html += "<div class='col-sm-3'>"
                    html += "<label for='ParGeneralPais' >(*)Número de Semanas:</label>"
                    html += "<input autocomplete='off' type = 'number' class = 'form-control' id = 'numsemanas' name = 'numsemanas' />";
                html += "</div>"
                html += "<div class='col-sm-3'>"
                    html += "<label for='ParGeneralPais' >(*)Niño / Niña:</label>"
                    html += "<select class = 'form-control' name = 'nino'>";
                        for(var i = 0; i < data.Voluntario.length; i++){
                            html += "<option value = '"+data.Voluntario[i]['id']+"'>"+data.Voluntario[i]['nombre']+"</option>"
                        }
                    html += "</select>"
                html += "</div>"
                html += "<div class='col-sm-3'>"
                    html += "<label for='ParGeneralPais' >(*)Profesora:</label>"
                    html += "<input autocomplete='off' type = 'text' class = 'form-control' id = 'profesora' name = 'profesora' />";
                html += "</div>"
            html += "</div>"
            
            html += "<div class='form-group row'>"
                html += "<div class='col-sm-12'>"
                    html += "<label for='ParGeneralPais' >Observaciones:</label>"
                    html += "<textarea class = 'form-control' id = 'Observaciones' name = 'Observaciones'></textarea>";
                html += "</div>"
            html += "</div>"
            
            html += "<div class='form-group row'>"
            html += "<div class='col-sm-12 CenterText'>"
                html += "<br>"
            html += "<button type = 'submit' class = 'btn btn-primary'>Guardar</button>";
            html += "</div>"
            html += "</div>"

            html += "</form>"

            html += "</div>";
            $(".content_modal").html(html);
            $(".DatePicker").datepicker({dateFormat: 'yy-mm-dd'});
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        }
    });
}

function AddSemanaClasesChildren(id,horas){
    $.ajax({
        type: 'POST',
        url: UrlUniversal + 'AddSemanaClasesChildren',
        data: {id: id, _token: document.getElementsByName('_token')[0].value},
        success: function (data) {
            
            RegistrarHoras(id,horas)
        }
    });
}

function RegistrarHoras(id,horas){
    $.ajax({
        type: 'POST',
        url: UrlUniversal + 'ListarSemanasClaseschildren',
        data: {id: id, _token: document.getElementsByName('_token')[0].value},
        success: function (data) {
            var Lectura = "";
            if( $(".EstadoClase"+id).text() == 'Finalizada' ){
                Lectura = " readonly " ;
            }
            var html = "";
            html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
            html += "<tr>"
            html += "<td nowrap>"
            html += "<p></p><img src = '" + UrlUniversal + "image/Calendario.png' height='50px'  /> <span class = 'TituloBuscador'>Registro de Horas</span>";
            html += "</td>"
            html += "<td width = '5%'style = 'text-align:rigth;'>"
            html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
            html += "<img src = '" + UrlUniversal + "image/cerrar.png' height='20px'  />";
            html += "</button>";
            html += "</td>"
            html += "</tr>"
            html += "</table>"
            html += "</div>";
            html += "<div class='modal-body'>";
            html += "<br>"
                html += "<button class = 'btn btn-primary' onclick = 'AddSemanaClasesChildren("+id+","+horas+")'>Añadir Semana</button>"
            html += "<br>"
            html += "<br>"
            html += "<form class='form-signin' enctype='multipart/form-data' action='" + UrlUniversal + "ActualizarHorasClasesChildren' method='post'>"
                html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
                html += "<input type='hidden' name='idclase' value='" + id + "' />";
                html += "<div class='form-group row'>"
                    html += "<div class='col-sm-6'>"
                        html += "<label for='ParGeneralPais' >(*)Niño:</label>"
                        html += "<input autocomplete='off' type = 'text' class = 'form-control' readonly value = '"+$(".NombreChildren"+id).text()+"'/>";
                html += "</div>"
                html += "<div class='col-sm-6'>"
                    html += "<label for='ParGeneralPais' >(*)Clase:</label>"
                    html += "<input autocomplete='off' type = 'text' class = 'form-control' readonly value = '"+$(".ClaseChildren"+id).text()+"'/>";
                html += "</div>"
            html += "</div>"

            html += "<div class='form-group row'>"
                html += "<div class='col-sm-12 flex-center'>"
                    html += "<table class = 'tableNew' >"
                        html += "<tr>"
                            html += "<th>Semana</th>"
                            html += "<th>Horas</th>"
                            html += "<th>Observaciones</th>"
                            html += "<th>Archivo</th>"
                        html += "</tr>"
                        for(var i = 0; i < data.info.length; i++){
                            html += "<tr>"
                                html += "<td class = 'CenterText'>"+(i+1)+"</td>"
                                html += "<td>"
                                    html += "<input type = 'number' class = 'form-control' min = '0' max = '"+horas+"'name = 'Horas[]' "+Lectura+" value = '"+data.info[i]['numhoras']+"'/>"
                                    html += "<input type = 'hidden' name = 'ids[]' value = '"+data.info[i]['id']+"'/>"
                                html += "</td>"
                                html += "<td>"
                                    html += "<textarea class = 'form-control' name = 'observaciones[]' rows = '1' "+Lectura+">"+data.info[i]['observaciones']+"</textarea>"
                                html += "</td>"
                                html += "<td class = 'CenterText'>"
                                    if( data.info[i]['archivo'] != null ){
                                        html += "<a target='_blank'  href='../storage/app/Voluntario/Clases/"+id+"/"+data.info[i]['archivo']+"' ><img src ='image/descarga.png' class = 'IconDescg'/></a>"
                                    }else{
                                        html += "<input type ='file' name = 'Archivo[]' class = 'form-control'/>"
                                    }
                                    
                                html += "</td>"
                            html += "</tr>"
                        }
                    html += "</table>"
                html += "</div>"
            html += "</div>"
            if( $(".EstadoClase"+id).text() != 'Finalizada' ){
                html += "<div class='form-group row'>"
                    html += "<div class='col-sm-12 CenterText'>"
                        html += "<br>"
                        html += "<button type = 'submit' class = 'btn btn-primary'>Guardar</button>";
                    html += "</div>"
                html += "</div>"
            }
            

            html += "</form>"

            html += "</div>";
            $(".content_modal").html(html);
            $(".DatePicker").datepicker({dateFormat: 'yy-mm-dd'});
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-lg');
        }
    });
    
}

