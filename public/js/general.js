/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var UrlUniversal = 'http://localhost:8000/FundacionP/fundacionCMN/public/';
var UrlUniversalFile = 'http://localhost:8000/FundacionP/fundacionCMN/';

function CambiarTextoArchivo(val) {
    var Text = $("#Archivo" + val).val();
    $("#NameArchivo" + val).text(Text);
}

function MostrarOcultarSeccion(clase){
    if($("."+clase).is(":visible")){
        $("."+clase).hide("fast")
    } else{
        $("."+clase).show("fast")
    }
}

function MedioContacto(){
    if( $("#MedioContacto option:selected").text() == 'Otro' ){
        $(".OtroMedio").show("slow")
    }else{
      $(".OtroMedio").hide("slow")  
    }
}

var formatNumber = {
    separador: ",", // separador para los miles
    sepDecimal: '.', // separador para los decimales
    formatear: function (num) {
        num += '';
        var splitStr = num.split(',');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
            splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
        }
        return this.simbol + splitLeft + splitRight;
    },

    new: function (num, simbol) {
        this.simbol = simbol || '';
        return this.formatear(num);
    }
}

function VisualizarSubMenu(Val, mod) {
    $(".Submodulos").hide("slow")
    if (Val == 1) {
        $(".Submodulo" + mod).show("slow");
    } else {
        $(".Submodulo" + mod).hide("slow");
    }
}

function VisualizarMenuGeneral() {
    $(".OptionMenu").show("fast");
}

function SalidaMenu(){
    $(".OptionMenu").hide("fast");
    $(".ActiveMenu").show("fast");
}

function OcultarMenuDetalle(val) {
    $(".OptionMenu").hide("fast");
    $(".OptionMenu" + val).show("fast");
    $(".OptionMenu").unbind('mouseover');
}

function VisualizarMenu(val) {
    $(".Submodulos").hide("slow")
    if (val == 0) {
        $(".Menu").show("slow");
        $(".vl").animate(function () {
            width: '152px'
        })
        $(".vl").resize(function () {
            $(".vl2").animate({
                left: $(".vl").width() + 10,
                width: $(window).width() - $(".vl").width() - 10
            })
        })
        $(".IndicadorMenu").html("<img src ='image/left.png' onclick ='VisualizarMenu(1)' height='30px;'/>")
        $(".vl3,.IndicadorMenu").animate({
            left: $(".vl").width() + 120
        })
        $(".vl2").animate({
            left: $(".vl").width() + 10,
            width: $(window).width() - $(".vl").width() - 10
        })

    } else {
        $(".Menu").hide("slow");
        $(".vl").animate(function () {
            width: '90px'
        })
        $(".vl2").animate({
            left: '90px',
            width: $(window).width() - $(".vl").width() + 65
        })
        $(".vl3,.IndicadorMenu").animate({
            left: $(".vl").width() + 50
        })

        $(".IndicadorMenu").html("<img src ='" + UrlUniversal + "image/right.png' onclick ='VisualizarMenu(0)' height='30px;'/>")

    }

}

function VisualizarMenuDetalle(val){
    $(".OptionMenu"+val).addClass("ActiveMenu");
    $(".OptionMenu"+val).show("fast");
}

$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });


    $.fn.datepicker.dates['es'] = {
        days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        daysShort: ["Dom", "Lun", "Mar", "Mié", "Jueves", "Vie", "Sáb"],
        daysMin: ["Do", "Lu", "Ma", "Mi", "Jueves", "Vi", "Sa"],
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        today: "Hoy",
        monthsTitle: "Meses",
        clear: "Borrar",
        weekStart: 1,
        format: "yy-mm-dd"
    };

    $(".DatePicker").datepicker({dateFormat: 'yy-mm-dd'});

    LimpiarModalContent();
    

    $('.dataTable, .dataTable2').DataTable({
        scrollY: 380,
        "ordering": true,
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "",
            "infoEmpty": "Mostrando 0 de 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "<i class='far fa-arrow-alt-circle-left'></i>",
                "last": "<i class='far fa-arrow-alt-circle-right'></i>",
                "next": "<i class='far fa-arrow-alt-circle-right'></i>",
                "previous": "<i class='far fa-arrow-alt-circle-left'></i>"
            }
        }
    });
    
    $(".paginate_button").click(function(){
        $(".page-link").text("");
    })
    $("#DataTables_Table_0_previous a").html("<i class='far fa-arrow-alt-circle-left'></i>")
    $("#DataTables_Table_0_next a").html("<i class='far fa-arrow-alt-circle-right'></i>")

    $(".dataTables_wrapper .row:last-child div.col-sm-12.col-md-5").remove();
    $(".dataTables_wrapper .row:last-child div.col-sm-12.col-md-7").removeClass("col-md-7").addClass("col-md-12").addClass("flex-center");
    $(".paginate_button a").text("");

    $(".page-item.active .page-link").css({
        'background-color': '#ED1C24'
    })
    $("#DataTables_Table_0_previous a").html("<i class='far fa-arrow-alt-circle-left'></i>")
    $("#DataTables_Table_0_next a").html("<i class='far fa-arrow-alt-circle-right'></i>")


    $(".toggle-group > label.toggle-on").text("Activo");
    $(".toggle-group > label.toggle-off").text("Inactivo");
    $(".paginate_button a ").click(function () {
        $(".paginate_button a ").text("")
    })
    $('[data-toggle="tooltip"]').tooltip();
    //$(".ListOpcionSubMenu").hide();
    $("#tabs").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
    $("#tabs li").removeClass("ui-corner-top").addClass("ui-corner-left");
});

function LimpiarModalContent() {
    $(".content_modal").html()
}

function ContentList(Content) {
    if ($(".PARDIV_Content" + Content).is(':visible')) {
        $(".PARDIV_Content" + Content).hide();
        $(".PAR_Content" + Content).html('<i class=" Cursor fas fa-angle-double-down"></i>');
    } else {
        $(".PARDIV_Content" + Content).show();
        $(".PAR_Content" + Content).html('<i class=" Cursor fas fa-angle-double-up"></i>');
    }
}

function VerDetalleStatus(id) {
    $(".DetalleStatus").hide()
    $(".DetalleStatus" + id).show("slow")
}

function AgregarStatus(id) {
    $(".FormStatus" + id).show("slow")
}

function GuardarStatus(id) {
    $.ajax({
        type: 'POST',
        url: UrlUniversal + 'GuardarStatus',
        data: {
            Hash: 1,
            _token: document.getElementsByName('_token')[0].value,
            id: id,
            status: $("#NewStatus" + id).val()
        },
        success: function (data) {
            $(".FormStatus" + id).hide("slow");
            var i = 1;
            $(".StatusC" + id + "").each(function (ind) {
                i++;
            });
            var html = "";
            html + "<tr>"
            html += "<td class = 'CenterText Border-t' style = 'border-left:7px solid #A7A9AC;font-weight:normal;'>" + (i) + "</td>"
            html += "<td class = 'CenterText Border-t' style = 'font-weight:normal;'>" + data.Fecha + "</td>"
            html += "<td class = 'CenterText Border-t' style = 'font-weight:normal;'>" + data.Hora + "</td>"
            html += "<td class = 'Border-t' style = 'font-weight:normal;'>" + data.Usuario + "</td>"
            html += "<td style = 'border-right:7px solid #A7A9AC;font-weight:normal;'>" + $("#NewStatus" + id).val() + "</td>"
            html + "</tr>"

            $(".StatusCaso" + id + " tbody").append(html)
            $("#NewStatus" + id).val("");
        }
    })
}

function GenerarEventoGeneral() {
    $.ajax({
        type: 'POST',
        url: UrlUniversal + 'ListarInfoActas',
        data: {Hash: 1, _token: document.getElementsByName('_token')[0].value, id: 1, status: $("#NewStatus1").val()},
        success: function (data) {
            var html = "";
            html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
            html += "<tr>"
            html += "<td nowrap>"
            html += "<p></p><img src = '" + UrlUniversal + "image/Calendario.png' height='50px'  /> <span class = 'TituloBuscador'>NUEVO EVENTO GENERAL</span>";
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
            html += "<form class='form-signin' action='" + UrlUniversal + "NuevoEventoGeneral' method='post'>"
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

            for (var i = 0; i < data.sqlUser.length; i++) {
                html += "<option value = '" + data.sqlUser[i]['id'] + "'>" + data.sqlUser[i]['nombre'] + "</option>"
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
            $(".FormModals").html(html);
            $(".DatePicker").datepicker({dateFormat: 'yy-mm-dd'});
            $("#ModalContentForms").removeClass('modal-lg').addClass('modal-xl');
        }
    });
}

function GenerarTaller() {
    $.ajax({
        type: 'POST',
        url: UrlUniversal + 'ListarInfoTaller',
        data: {Hash: 1, _token: document.getElementsByName('_token')[0].value, id: 1, status: $("#NewStatus1").val()},
        success: function (data) {
            var html = "";
            html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
            html += "<tr>"
            html += "<td nowrap>"
            html += "<p></p><img src = '" + UrlUniversal + "image/calendar.png' height='50px'  /> <span class = 'TituloBuscador'>NUEVO TALLER</span>";
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
            html += "<form class='form-signin' action='" + UrlUniversal + "ActividadTallerChildren' method='post'>"
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
            html += "<div class = 'col col-sm-12'>"
            html += "<table class = 'tableNew'>"
            html += "<tr>"
            html += "<th colspan = '7' style = 'text-align:left;'>Repetir los días:</th>"
            html += "</tr>"
            html += "<tr>"
            html += "<td style = 'background-color:white;'>"
            html += "<div class='custom-control custom-checkbox'>";
            html += "<input type='checkbox' class='custom-control-input' name = 'DiasTaller[]' value = '1' id='Lunes'>";
            html += "<label class='custom-control-label' for='Lunes'>Lunes</label>";
            html += "</div>";
            html += "</td>"
            html += "<td style = 'background-color:white;'>"
            html += "<div class='custom-control custom-checkbox'>";
            html += "<input type='checkbox' class='custom-control-input'  name = 'DiasTaller[]' value = '2' id='Martes'>";
            html += "<label class='custom-control-label' for='Martes'>Martes</label>";
            html += "</div>";
            html += "</td>"
            html += "<td style = 'background-color:white;'>"
            html += "<div class='custom-control custom-checkbox'>";
            html += "<input type='checkbox' class='custom-control-input'  name = 'DiasTaller[]' value = '3' id='Miercoles'>";
            html += "<label class='custom-control-label' for='Miercoles'>Miércoles</label>";
            html += "</div>";
            html += "</td>"
            html += "<td style = 'background-color:white;'>"
            html += "<div class='custom-control custom-checkbox'>";
            html += "<input type='checkbox' class='custom-control-input'  name = 'DiasTaller[]' value = '4' id='Jueves'>";
            html += "<label class='custom-control-label' for='Jueves'>Jueves</label>";
            html += "</div>";
            html += "</td>"
            html += "<td style = 'background-color:white;'>"
            html += "<div class='custom-control custom-checkbox'>";
            html += "<input type='checkbox' class='custom-control-input'  name = 'DiasTaller[]' value = '5' id='Viernes'>";
            html += "<label class='custom-control-label' for='Viernes'>Viernes</label>";
            html += "</div>";
            html += "</td>"
            html += "<td style = 'background-color:white;'>"
            html += "<div class='custom-control custom-checkbox'>";
            html += "<input type='checkbox' class='custom-control-input' name = 'DiasTaller[]' value = '6' id='Sabado'>";
            html += "<label class='custom-control-label' for='Sabado'>Sábado</label>";
            html += "</div>";
            html += "</td>"
            html += "<td style = 'background-color:white;'>"
            html += "<div class='custom-control custom-checkbox'>";
            html += "<input type='checkbox' class='custom-control-input' name = 'DiasTaller[]' value = '7' id='Domingo'>";
            html += "<label class='custom-control-label' for='Domingo'>Domingo</label>";
            html += "</div>";
            html += "</td>"
            html += "</tr>"
            html += "</table>"
            html += "</div>"
            html += "</div>"

            html += "<div class='form-group row'>"
            html += "<div class='col-sm-6'>"
            html += "<label for='ParGeneralPais' >(*)Nombre Taller:</label>"
            html += "<input autocomplete='off' type = 'text' class = 'form-control' id = 'Asunto' name = 'Asunto' />";
            html += "</div>"
            html += "<div class='col-sm-3'>"
            html += "<label for='ParGeneralPais' >(*)Grupo:</label>"
            html += "<select class = 'form-control' name = 'Grupo'>";
            for (var i = 0; i < data.Children.length; i++) {
                html += "<option value = '" + data.Children[i]['id'] + "'>" + data.Children[i]['nombre'] + "</option>"
            }
            html += "</select>"
            html += "</div>"
            html += "<div class='col-sm-3'>"
            html += "<label for='ParGeneralPais' >(*)Pedagogo:</label>"
            html += "<select class = 'form-control' name = 'Pedagogo'>";
            for (var i = 0; i < data.Usuarios.length; i++) {
                html += "<option value = '" + data.Usuarios[i]['id'] + "'>" + data.Usuarios[i]['nombre'] + "</option>"
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
            html += "<div class='form-group row'>"
            html += "<div class='col-sm-12 CenterText'>"
            html += "<button type = 'submit' class = 'btn btn-primary'>Guardar</button>";
            html += "</div>"
            html += "</div>"

            html += "</form>"

            html += "</div>";
            $(".FormModals").html(html);
            $(".DatePicker").datepicker({dateFormat: 'yy-mm-dd'});
            $("#ModalContentForms").removeClass('modal-lg').addClass('modal-xl');
        }
    });
}

function GenerarNotificacionMasiva(User){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'ListarNinosFundacion',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            var url = UrlUniversal+'EnviarNotificacionMasiva';
            html += "<div class='modal-header'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<p></p><img src = '"+UrlUniversal+"image/Mensajes.png' height='70px'  /> <span class = 'TituloBuscador'>Notificación Masiva General</span>";
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
                            html += "<label for='ParGeneralPais' >(*)Asunto:</label>"
                            html += "<input type = 'text' required class = 'form-control' name = 'asunto'/>"
                        html += "</div>"
                    html += "</div>"
                    html += "<div class='form-group row'>"
                        html += "<div class='col-sm-12'>"
                            html += "<label for='ParGeneralPais' >(*)Notificar A:</label>"
                            html += "<select class = 'form-control' name = 'idnotificados[]' multiple='multiple' required>";
                                for(var i = 0; i < data.Usuarios.length;i++){
                                    html += "<option value = '"+data.Usuarios[i]['id']+"'>"+data.Usuarios[i]['nombre']+"</option>"
                                }
                            html += "</select>"
                        html += "</div>"
                    html += "</div>"
                    html += "<div class='form-group row'>"
                        html += "<div class='col-sm-12'>"
                            html += "<label for='ParGeneralPais' >(*)Mensaje:</label>"
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

function ListarNotificaciones(User){
    $.ajax({
        type: 'POST',
        url: UrlUniversal +'ListarNotificaciones',
        data: {Hash: 1, _token: document.getElementsByName('_token')[0].value, User: User},
        success: function (data) {
            var html = "";
            html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
            html += "<tr>"
            html += "<td nowrap>"
            html += "<p></p><img src = '" + UrlUniversal + "image/Mensajes.png' height='50px'  /> <span class = 'TituloBuscador'>Notificaciones</span>";
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
            html += "<table width = '100%' class = 'tableNew'>"
            html += "<tr>";
            html += "<th class = 'CenterText Border-t'>Número</th>"
            html += "<th class = 'CenterText Border-t'>Tipo</th>"
            html += "<th class = 'CenterText Border-t'>Persona</th>"
            html += "<th class = 'CenterText Border-t'>Observación</th>"
            html += "<th class = 'CenterText Border-t'>Fecha </th>"
            html += "<th class = 'CenterText Border-t'>Radicado Por</th>"
            html += "</tr>";
            for (var i = 0; i < data.Pendientes.length; i++) {
                html += "<tr>"
                html += "<td class = 'CenterText Border-t' style = 'border-left:7px solid #A7A9AC;'>" + (i + 1) + "</td>";
                html += "<td class = 'CenterText Border-t'>" + data.Pendientes[i].Tipo + "</td>";
                html += "<td class = 'CenterText Border-t'>" + data.Pendientes[i].Persona + "</td>";
                html += "<td class = 'CenterText Border-t'>" + data.Pendientes[i].observacion + "</td>";
                html += "<td class = 'CenterText Border-t'>" + data.Pendientes[i].Fecha + "</td>";
                html += "<td class = 'Border-t' nowrap >" + data.Pendientes[i].nombre + "</td>";
                html += "</tr>"
            }
            for (var i = 0; i < data.Pendientes2.length; i++) {
                html += "<tr>"
                html += "<td class = 'CenterText Border-t' style = 'border-left:7px solid #A7A9AC;'>" + (i + 1) + "</td>";
                html += "<td class = 'CenterText Border-t'>" + data.Pendientes2[i].Tipo + "</td>";
                html += "<td class = 'CenterText Border-t'>" + data.Pendientes2[i].Persona + "</td>";
                html += "<td class = 'CenterText Border-t'>" + data.Pendientes2[i].observacion + "</td>";
                html += "<td class = 'CenterText Border-t'>" + data.Pendientes2[i].Fecha + "</td>";
                html += "<td class = 'Border-t' nowrap >" + data.Pendientes2[i].nombre + "</td>";
                html += "</tr>"
            }
            html += "</table>";
            html += "</div>";
            $(".content_modal").html(html);
            $(".DetalleStatus").hide();
            $(".DatePicker").datepicker({dateFormat: 'yy-mm-dd'});
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');

        }
    });
}

function ListarPendientes(User) {
    $.ajax({
        type: 'POST',
        url: UrlUniversal+'ListarPendientes',
        data: {Hash: 1, _token: document.getElementsByName('_token')[0].value, User: User},
        success: function (data) {
            var html = "";
            html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
            html += "<tr>"
            html += "<td nowrap>"
            html += "<p></p><img src = '" + UrlUniversal + "image/Mensajes.png' height='50px'  /> <span class = 'TituloBuscador'>Compromisos</span>";
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
            html += "<table width = '100%' class = 'tableNew'>"
            html += "<tr>";
            html += "<th class = 'CenterText Border-t'>Número</th>"
            html += "<th class = 'CenterText Border-t'>Status</th>"
            html += "<th class = 'CenterText Border-t'>Fecha Registro</th>"
            html += "<th class = 'CenterText Border-t'>Hora Registro</th>"
            html += "<th class = 'CenterText Border-t'>Fecha Entrega</th>"
            html += "<th class = 'CenterText Border-t'>Acta</th>"
            html += "<th class = 'CenterText Border-t'>Radicado Por</th>"
            html += "<th class = 'CenterText Border-t'>Estado</th>"
            html += "<th class = 'CenterText Border-t'>Compromiso</th>"
            html += "</tr>";
            for (var i = 0; i < data.Pendientes.length; i++) {
                html += "<tr>"
                html += "<td class = 'CenterText Border-t' style = 'border-left:7px solid #A7A9AC;'>" + (i + 1) + "</td>";
                html += "<td class = 'CenterText Border-t'><img src = '"+UrlUniversal+"image/detalle.png' onclick = 'VerDetalleStatus(" + data.Pendientes[i].id + ")'class='Cursor IconDescg' /></td>";
                html += "<td class = 'CenterText Border-t'>" + data.Pendientes[i].FechaR + "</td>";
                html += "<td class = 'CenterText Border-t'>" + data.Pendientes[i].HoraR + "</td>";
                html += "<td class = 'CenterText Border-t'>" + data.Pendientes[i].fecha + "</td>";
                html += "<td class = 'CenterText Border-t'>" + data.Pendientes[i].NumActa + "</td>";
                html += "<td class = 'Border-t' nowrap >" + data.Pendientes[i].RadicadoPor + "</td>";
                var Estado = "";
                if (data.Pendientes[i].Estado == 0) {
                    Estado = "Sin Contestar";
                } else if (data.Pendientes[i].Estado == 1) {
                    Estado = "En Proceso";
                }
                html += "<td class = 'CenterText Border-t' nowrap>" + Estado + "</td>";
                html += "<td class = 'Border-t' style = 'text-align:Justify;' style = 'border-right:7px solid #A7A9AC;'>" + data.Pendientes[i].compromiso + "</td>";
                html += "</tr>"
                html += "<tr class = 'DetalleStatus DetalleStatus" + data.Pendientes[i].id + "'>"
                html += "<td class = 'Border-t' colspan = '9' style ='background-color:white;'>"
                html += "<span class = 'btn btn-primary' onclick = 'AgregarStatus(" + data.Pendientes[i].id + ")'>Agregar Status</span><p></p>"
                html += "<div class = 'form-signin FormStatus" + data.Pendientes[i].id + "' style = 'with:100%;display:none;'>"
                html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-12' width = '90%'>"
                html += "<label>Ingrese el status:</label><p></p>"
                html += "<textarea class = 'form-control'width = '90%'id = 'NewStatus" + data.Pendientes[i].id + "' placeholder='Ingrese el status'></textarea>"
                html += "</div>"
                html += "</div>"
                html += "<br>"
                html += "<div class = 'form-group row flex-center'>"
                html += "<div class = 'col-sm-12 CenterText'>"
                html += "<span class = 'btn btn-primary' onclick = 'GuardarStatus(" + data.Pendientes[i].id + ")'>Guardar Status</span><p></p>"
                html += "</div>"
                html += "</div>"
                html += "</div>"
                html += "<table width = '100%' class = 'tableNew StatusCaso" + data.Pendientes[i].id + "'>"
                html += "<tr>"
                html += "<th class = 'Border-t'>Numero</th>"
                html += "<th class = 'Border-t'>Fecha</th>"
                html += "<th class = 'Border-t'>Hora</th>"
                html += "<th class = 'Border-t'>Radicado Por</th>"
                html += "<th class = 'Border-t'>Status</th>"
                html += "</tr>"
                if (data.Pendientes[i].Status.length == 0) {
                    html += "<tr>"
                    html += "<td  colspan = '5' class = 'CenterText Border-t'>NO SE HAN PRESENTADO ESTATUS</td>"
                    html += "</tr>"
                }
                for (var x = 0; x < data.Pendientes[i].Status.length; x++) {
                    var y = data.Pendientes[i].Status[x].fecha.split(" ")
                    html += "<tr StatusCasox" + data.Pendientes[i].id + ">"
                    html += "<td class = 'StatusC" + data.Pendientes[i].id + " CenterText Border-t' style = 'border-left:7px solid #A7A9AC;font-weight:normal;'>" + (x + 1) + "</td>"
                    html += "<td class = 'CenterText' style = 'font-weight:normal;'>" + y[0] + "</td>"
                    html += "<td class = 'CenterText' style = 'font-weight:normal;'>" + y[1] + "</td>"
                    html += "<td  style = 'font-weight:normal;'>" + data.Pendientes[i].Status[x].nombre + "</td>"
                    html += "<td  style = 'text-align:Justify;border-right:7px solid #A7A9AC;font-weight:normal;'>" + data.Pendientes[i].Status[x].comentario + "</td>"
                    html += "</tr>"
                }
                html += "</table>"
                html += "</td>"
                html += "</tr>"
                //html += "<tr><td style ='background-color:white;'><p></p></td></tr>"
            }
            html += "</table>";
            html += "</div>";
            $(".content_modal").html(html);
            $(".DetalleStatus").hide();
            $(".DatePicker").datepicker({dateFormat: 'yy-mm-dd'});
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');

        }
    });
}

function Notificacion(text, alert) {
    var html = "";
    html += "<div class='modal-header'>";
    html += "<h5 class='modal-title' id='exampleModalLabel'>Crear Documento Legal</h5>";
    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
    html += "<span aria-hidden='true'>&times;</span>";
    html += "</button>";
    html += "</div>";
    html += "<div class='modal-body " + alert + "'>";
    html += "<label>" + text + "</label>";
    html += "</div>";

    $(".content_modal").html(html);
}

function MenuGeneral(val) {
    if (val == 0) {
        $(".MenuOptionP").hide();
        $(".ContentFooter").width(40);
        $(".ViewMenu").html('<i class="fas fa-angle-right Cursor" style ="font-size:30px;color:blue;" onclick = "MenuGeneral(1)"></i>')

        $(".ViewMenu i").css({'position': 'absolute', 'top': '50px'});
    } else {
        $(".ContentFooter").height(60);
        $(".ViewMenu").html('<i class="fas fa-angle-left Cursor" style ="font-size:30px;color:blue;" onclick = "MenuGeneral(0)"></i>')
        $(".MenuOptionP").show();
        $(".ContentFooter").width(780);
    }
}

function ListarDepartamentosPais(IdDepartamento) {

    $.ajax({
        type: 'POST',
        url: UrlUniversal+'659de63cb45c46ba1886852e7675145e',
        data: {Hash: $("#ParGeneralPais").val(), _token: document.getElementsByName('_token')[0].value},
        success: function (data) {
            var html = "";
            html += "<option value = ''>Seleccione</option>";
            for (var i = 0; i < data.Deptos.length; i++) {
                html += "<option value = '" + data.Deptos[i]['IdDepartamento'] + "'>" + data.Deptos[i]['Nombre'] + "</option>";
            }
            $("#" + IdDepartamento).html(html);
        }
    });
}

function ListarCiudadesDepartamento(IdCiudad) {
    $.ajax({
        type: 'POST',
        url: UrlUniversal+'8ee56fa44e8b3aebbbcf72fa7b916694',
        data: {Hash: $("#ParGeneralDepartamento").val(), _token: document.getElementsByName('_token')[0].value},
        success: function (data) {
            var html = "";
            html += "<option value = ''>Seleccione</option>";
            for (var i = 0; i < data.Deptos.length; i++) {
                html += "<option value = '" + data.Deptos[i]['IdCiudad'] + "'>" + data.Deptos[i]['Nombre'] + "</option>";
            }
            $("#" + IdCiudad).html(html);
        }
    });
}

function CambiarPresentacion() {
    $(".PUser").css({'height': '70px'}).show("slow");
    $(".ContenedorUser").css({
        'background-color': 'white',
        'background': 'white'
    }).fadeIn("slow");

    $("#MB_Directorio").attr({'src': 'images/options/directoriov.png'});
    $("#MB_Notificacion").attr({'src': 'images/options/notificacionv.png'});
    $("#MB_HorasHombre").attr({'src': 'images/options/hhv.png'});
    $("#MB_CerrarSesion").attr({'src': 'images/options/cerrarsesionv.png'});
    $(".nameUser").css({'color': '#386417'});
    $(".jobUser").css({'color': '#386417'});

    $("#LogoEmpleadoEmpresa").attr({'src': $("#LogoEmpleado").attr("src")});
    $(".ContenedorLogoEmpresaEmpleado").hide("slow").remove();
    $(".ConteinerSalt").remove();
    $("#ListMenuBar").addClass("flex-column");

    $(".IndicadorOption li").each(function () {
        //$(this).addClass("nav-item dropdown");
    });
    $(".IndicadorOption a").each(function () {
        $(this).addClass("nav-link ");
    });

    $(".image").css({'height': '70px'});
    $(".text").css({'height': '70px'});
}

function CalendarioEventos() {
    var url = UrlUniversal+'CalendarioPersonal';
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

CalendarioConvocatoria = () => {
    var url = 'http://localhost:8000/FormRegistrarConvocatoria';
    var html = `
                <div class='modal-header'>
                    <table width = '100%'>
                        <tr>
                            <td nowrap>
                                <p></p><img src = 'image/calendar.png' height='50px'  /> <span class = 'TituloBuscador'>Calendario</span>
                            </td>
                            <td width = '5%'style = 'text-align:rigth;'>
                                <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
                                <img src = 'image/cerrar.png' height='20px'  />
                            </button>
                            </td>
                        </tr>
                    </table>
                    </div>
                    <div class='modal-body'>
                        <iframe width = '100%;' height = '600px'src="${url}"></iframe>
                    </div>`;

    $(".content_modal").html(html);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');

}

function GenerarTallerMadres(){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'ListarInfoTaller',
        data:{Hash:1,_token:document.getElementsByName('_token')[0].value,id:1,status:$("#NewStatus1").val()},
        success:function(data){
            var html = "";
            html += "<div class='modal-header'>";
                html += "<table width = '100%'>"
                html += "<tr>"
                    html += "<td nowrap>"
                        html += "<p></p><img src = '"+UrlUniversal+"image/calendar.png' height='50px'  /> <span class = 'TituloBuscador'>NUEVO TALLER MADRES</span>";
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
                html += "<form class='form-signin' action='"+UrlUniversal+"RegistrarTallerMadres' method='post'>"
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
                        html += "<div class='col-sm-9'>"
                            html += "<label for='ParGeneralPais' >(*)Tema Taller:</label>"
                            html += "<input autocomplete='off' type = 'text' class = 'form-control' id = 'Asunto' name = 'Asunto' />";
                        html += "</div>"
                        html += "<div class='col-sm-3'>"
                            html += "<label for='ParGeneralPais' >(*)Dictado Por:</label>"
                            html += "<input type = 'text' name = 'Pedagogo' class = 'form-control' />"
                        html += "</div>"
                    html += "</div>"
                    html += "<div class='form-group row'>"
                        html += "<div class='col-sm-12'>"
                            html += "<label for='ParGeneralPais' >(*)Objetivos:</label>"
                            html += "<textarea class = 'form-control' id = 'Observaciones' name = 'Observaciones'></textarea>";
                        html += "</div>"
                    html += "</div>"
                    html += "<div class='form-group row'>"
                        html += "<div class='col-sm-12'>"
                            html += "<label for='ParGeneralPais' >(*)Metodología:</label>"
                            html += "<textarea class = 'form-control' id = 'Observaciones' name = 'metodologia'></textarea>";
                        html += "</div>"
                    html += "</div>"
                    html += "<div class='form-group row'>"
                        html += "<div class='col-sm-12'>"
                            html += "<label for='ParGeneralPais' >(*)Logros:</label>"
                            html += "<textarea class = 'form-control' id = 'Observaciones' name = 'logros'></textarea>";
                        html += "</div>"
                    html += "</div>"
                    html += "<div class='form-group row'>"
                        html += "<div class='col-sm-12'>"
                            html += "<label for='ParGeneralPais' >(*)Evaluación:</label>"
                            html += "<textarea class = 'form-control' id = 'Observaciones' name = 'evaluacion'></textarea>";
                        html += "</div>"
                    html += "</div>"
                    html += "<div class='form-group row'>"
                        html += "<div class='col-sm-12 CenterText'>"
                            html += "<button type = 'submit' class = 'btn btn-primary'>Guardar</button>";
                        html += "</div>"
                    html += "</div>"
                    
                html += "</form>"
                
            html += "</div>";
            $(".FormModals").html(html);
            $(".DatePicker").datepicker({ dateFormat: 'yy-mm-dd' });
            $("#ModalContentForms").removeClass('modal-lg').addClass('modal-xl');
        }
    }); 
    $(".DatePicker").datepicker({dateFormat: 'yy-mm-dd'});
}


crearConvocatoria = () => {
    let token = $("#dataDiv").data('token');
    let url = $("#dataDiv").data('urlFormAction');

    const header = `<div class='modal-header'>
        <table width = '100%'>
            <tr>
                <td nowrap>
                    <p></p><img src = 'image/calendar.png' height='50px'  /> <span class = 'TituloBuscador'>NUEVA CONVOCATORIA</span>
                </td>
                <td width = '5%'style = 'text-align:rigth;'>
                    <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
                        <img src = 'image/cerrar.png' height='20px'  />
                    </button>
                </td>
            </tr>
        </table>
    </div>`;

    //Inicio del formulario y se inyecta el block UI
    const fechas = ` <div class='modal-body'>

        <div id="divBlockUi" >
            ${blockUIForModal()}
        </div>

        <form class='form-signin' action='${url}' method='post'>

            <div class="separator">Fechas y horas: </div>

            <div class='form-group row'>

                <div class="col-12 form-group row">
                    <div class='col-sm-3'>
                        <label for='ParGeneralPais' >(*)Fecha de Inicio:</label>
                        <input autocomplete='off' type = 'text' class = 'form-control' id = 'FechaInicial' name = 'FechaInicial' />
                    </div>
                    <div class = 'col-sm-3'>
                        <label>Hora:</label>
                        <select class = 'form-control' name = 'HoraInicial'>
                            <option value = '01'>01</option>
                            <option value = '02'>02</option>
                            <option value = '03'>03</option>
                            <option value = '04'>04</option>
                            <option value = '05'>05</option>
                            <option value = '06'>06</option>
                            <option value = '07'>07</option>
                            <option value = '08'>08</option>
                            <option value = '09'>09</option>
                            <option value = '10'>10</option>
                            <option value = '11'>11</option>
                            <option value = '12'>12</option>
                        </select>
                    </div>
                    <div class = 'col col-sm-3'>
                    <label>Minutos:</label>
                        <select  class = 'form-control' name = 'MinutosInicial'>
                            <option value = '00'>00</option>
                            <option value = '15'>15</option>
                            <option value = '30'>30</option>
                            <option value = '45'>45</option>
                        </select>
                    </div>
                    <div class = 'col col-sm-3'>
                        <label>Formato:</label>
                        <select  class = 'form-control' name = 'FormatoInicial'>
                            <option value = 'AM'>AM</option>
                            <option value = 'PM'>PM</option>
                        </select>
                    </div>
                </div>


                <div class="col-12 form-group row">

                     <div class='col-sm-3'>
                        <label for='ParGeneralPais' >(*)Fecha de final:</label>
                        <input autocomplete='off' type = 'text' class = 'form-control' id = 'FechaFinal' name = 'FechaFinal' />
                    </div>
                    <div class = 'col-sm-3'>
                        <label>Hora:</label>
                        <select class = 'form-control' name = 'HoraFinal'>
                            <option value = '01'>01</option>
                            <option value = '02'>02</option>
                            <option value = '03'>03</option>
                            <option value = '04'>04</option>
                            <option value = '05'>05</option>
                            <option value = '06'>06</option>
                            <option value = '07'>07</option>
                            <option value = '08'>08</option>
                            <option value = '09'>09</option>
                            <option value = '10'>10</option>
                            <option value = '11'>11</option>
                            <option value = '12'>12</option>
                        </select>
                    </div>
                    <div class = 'col col-sm-3'>
                    <label>Minutos:</label>
                        <select  class = 'form-control' name = 'MinutosFinal'>
                            <option value = '00'>00</option>
                            <option value = '15'>15</option>
                            <option value = '30'>30</option>
                            <option value = '45'>45</option>
                        </select>
                    </div>
                    <div class = 'col col-sm-3'>
                        <label>Formato:</label>
                        <select  class = 'form-control' name = 'FormatoFinal'>
                            <option value = 'AM'>AM</option>
                            <option value = 'PM'>PM</option>
                        </select>
                    </div>
                </div>
            </div>

    `;

    const voluntarios = `
            <div class='form-group'>

            <div class="separator">Voluntarios: </div>
                     <div class='col-sm-12'>
                        <table id='tableVoluntariosModal' class="dataTable">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>N&uacute;mero de documento</th>
                                    <th>Profesi&oacute;n / Oficio</th>
                                    <th>D&iacute;as disponible</th>
                                    <th>Seleccionar todos: <input id="checkAll" type="checkbox" name="todosVoluntarios" value="all" ></th>
                                </tr>
                            </thead>
                            <tbody id="tbodyTableVoluntarios">
                            </tbody>
                        </table>
                     </div>
            </div>`;

    //Aca esta el token
    const body = `
                <div class="separator form-group">M&aacute;s informaci&oacute;n: </div>
                <div class='form-group row'>


                    <div class='col-sm-4'>
                        <label for='ParGeneralPais' >(*)Ubicaci&oacute;n:</label>
                        <input autocomplete='off' type = 'text' class = 'form-control' name ='ubicacion' />
                    </div>
                    <div class = 'col-sm-5'>
                        <div class="row">
                            <div class="col-12"><label>Observaciones:</label></div>
                            <div class="col-12">
                                <textarea class="form-control" name="observaciones" id="observaciones" cols="40" rows="10"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class = 'col-sm-3'>
                    <label>(*)Tipo asistencia:</label>
                        <select  class = 'form-control' id="tipoAsistencia" name = 'tipoAsistencia'>
                            ${optionsTipoAsistencia()}
                        </select>
                    </div>
                </div>
                <div class="col-12 d-md-flex justify-content-center">
                    <input type="hidden" name="_token" value="${token}">
                    <button class="btn btn-primary" type="submit">Guardar</button>
                </div>
            </form>
</div>`;
    //Final del formulario

    let html = `${header}${fechas}${voluntarios}${body}`;


    $(".FormModals").html(html);
    $(".DatePicker").datepicker({dateFormat: 'yy-mm-dd'});
    $("#ModalContentForms").removeClass('modal-lg').addClass('modal-xl');

    dataVoluntariosForTable();

    let checkAll = document.getElementById('checkAll');


    checkAll.addEventListener('change', (event) => {

        let checkboxs = $(".modalCheckboxEvento-js");

        for (let i = 0; i < checkboxs.length; i++) {

            if (event.target.checked) {
                checkboxs[i].checked = true;
            }
            //Sino esta checkeado los descheckeara a todos
            else {
                checkboxs[i].checked = false;
            }


        }

    });

    $("#FechaInicial").datepicker({
        format: 'yyyy-mm-dd',
        "setDate": new Date(),
        "autoclose": true
    });

    $("#FechaFinal").datepicker({
        format: 'yyyy-mm-dd',
        "setDate": new Date(),
        "autoclose": true
    });

}

blockUIForModal = () => {
    $.blockUI({ message: 'Por favor espere...</h1>' });
}

dataVoluntariosForTable = () => {
    let html = "";
    let url = $("#dataDiv").data('urlGetVoluntariosForTable');

    $.ajax({
        url: url,
        type: "GET",
        success: function (data) {

            //Recorro la informacion y arreglo el html para imprimirlo
            data.map(function (voluntario, b) {
                html += `<tr>
                            <td>${voluntario.nombre} ${voluntario.apellido}</td>
                            <td>${voluntario.numero_documento}</td>
                            <td>${voluntario.profesion}</td>
                            <td>${diasDisponibleVoluntario(voluntario.id)}</td>
                            <td><input class="modalCheckboxEvento-js" type="checkbox" name="voluntarios[]" value="${voluntario.id}"></td>
                        </tr>`;
            });

            let tbody = $(document).find("#tbodyTableVoluntarios");
            let divBlockUi = $(document).find("#divBlockUi");
            tbody.html(html);
            divBlockUi.remove();
            initTableModal();
            $.unblockUI();
        }
    });
}

diasDisponibleVoluntario = (id) => {
    let html = "";
    $.ajax({
        url: $("#dataDiv").data('urlGetDiasDisponibleVoluntario'),
        type: "GET",
        async: false,
        data: {"id": id},
        success: function (data) {
            //Recorro la informacion y arreglo el html para imprimirlo
            data.map(function (dia, b) {
                switch (dia.dia) {
                    case 1:
                        html += "Lunes - ";
                        break;
                    case 2:
                        html += "Martes - ";
                        break;
                    case 3:
                        html += "Miercoles - ";
                        break;
                    case 4:
                        html += "Jueves - ";
                        break;
                    case 5:
                        html += "Viernes - ";
                        break;
                }
            });
        }
    });

    return html.substr(0, html.length-3);
}

optionsTipoAsistencia = () => {
    let html = "";
    let url = $("#dataDiv").data('urlGetTipoAsistencia');

    $.ajax({
        url: url,
        type: "GET",
        async: false,
        success: function (data) {
            //Recorro la informacion y arreglo el html para imprimirlo
            data.map(function (tipo, b) {
                html += `<option value="${tipo.id}"> ${tipo.descripcion} </option>`;
            });
        }
    });

    return html;
}

function EditarInformacionUsuario(id){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'InfoUsuario',
        data:{Id:id,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
                html += "<div class='modal-header'>";
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<td nowrap>"
                                html += "<p></p><img src = '"+UrlUniversal+"image/Administracion.png' height='50px'  /> <span class = 'TituloBuscador'>Editar Usuario</span>";
                            html += "</td>"
                            html += "<td>"
                                html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                                html += "<p></p><img src = '"+UrlUniversal+"image/cerrar.png' height='20px'  />";
                            html += "</button>";
                            html += "</td>"
                        html += "</tr>"
                    html += "</table>"

                html += "</div>";
                html += "<div class='modal-body'>";
                    html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"EditarInfoUsuario' method='post'>"
                        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
                        html += "<input type='hidden' name='idR' value='" + id + "' />";
                        html += "<div class = 'form-group row'>"
                            html += "<div class = 'col-sm-4'>"
                                html += "<label>Usuario:</label>"
                                html += "<input type = 'text' name = 'Nickname' class = 'form-control' value = '"+data.Usuarios[0]['nickname']+"' required/>"
                            html += "</div>"
                            html += "<div class = 'col-sm-4'>"
                                html += "<label>Nombre:</label>"
                                html += "<input type = 'text' name = 'nombre' class = 'form-control' value = '"+data.Usuarios[0]['nombre']+"' required/>"
                            html += "</div>"
                            html += "<div class = 'col-sm-4'>"
                                html += "<label>Perfil:</label>"
                                html += "<select class = 'form-control' name = 'perfil'>"
                                    for(var i = 0; i < data.Perfiles.length;i++){
                                        if( data.Usuarios[0]['perfil_id'] == data.Perfiles[i]['id'] ){
                                            html += "<option value = '"+data.Perfiles[i]['id']+"' selected>"+data.Perfiles[i]['nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.Perfiles[i]['id']+"' >"+data.Perfiles[i]['nombre']+"</option>"
                                        }
                                    }
                                html += "</select>"
                            html += "</div>"
                        html += "</div>"
                        html += "<div class = 'form-group row'>"
                            html += "<div class = 'col-sm-4'>"
                                html += "<label>Tipo Usuario:</label>"
                                html += "<select class = 'form-control' name = 'tipousuario'>"
                                    for(var i = 0; i < data.TipoUsuario.length;i++){
                                        if( data.Usuarios[0]['tipopersona_id'] == data.TipoUsuario[i]['id'] ){
                                            html += "<option value = '"+data.TipoUsuario[i]['id']+"' selected>"+data.TipoUsuario[i]['nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.TipoUsuario[i]['id']+"' >"+data.TipoUsuario[i]['nombre']+"</option>"
                                        }
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class = 'col-sm-4 Personas' style = 'display:none;'>"
                                html += "<label>Persona:</label>"
                                html += "<select class = 'form-control' name = 'persona'>"
                                        html += "<option value = 'null'>Ninguno</option>"
                                    for(var i = 0; i < data.Persona.length;i++){
                                        if( data.Usuarios[0]['idpersona'] == data.Persona[i]['id'] ){
                                            html += "<option value = '"+data.Persona[i]['id']+"' selected>"+data.Persona[i]['nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.Persona[i]['id']+"' >"+data.Persona[i]['nombre']+"</option>"
                                        }
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class = 'col-sm-4 Personas'>"
                                html += "<label>Estado:</label>"
                                html += "<select class = 'form-control' name = 'estado'>"
                                    if( data.Usuarios[0]['estado'] == 1 ){
                                        html += "<option value = '1' selected>Activo</option>"
                                        html += "<option value = '0'>Inactivo</option>"
                                    }else{
                                        html += "<option value = '1' >Activo</option>"
                                        html += "<option value = '0' selected>Inactivo</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class = 'col-sm-4'>"
                                html += "<label>Nueva Clave:</label>"
                                html += "<input type = 'password' name = 'pass' class = 'form-control' value = ''/>"
                            html += "</div>"
                        html += "</div>"
                        
                        html += "<div class = 'form-group row'>"
                            html += "<div class = 'col-sm-12 flex-center'>"
                                html += "<button class = 'btn btn-primary' type = 'Submit'>Guardar</button>"
                            html += "</div>"
                        html += "</div>"
                    html += "</form>"
            html += "</div>"
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        }
    });
}
