
function AddItemPpto(id){
    $(".FormNewItemPptoGeneral").show("slow");
    $(".TablaPpto").hide("slow");
    $(".BtnAddItem").hide("slow");
    var i = 0;
    $(".ValorItemMesPptoGeneral").each(function(){
        if(i == 0){
           $(this).remove(); 
        }
        i++;   
    })
    var x = 0;
    $(".ItemPptoGeneral").each(function(){
        if(x == 0){
           $(this).remove(); 
        }
        x++;   
    })
    var f = 0;
    $(".IdGrupoPpto").each(function(){
        if(f == 0){
           $(this).remove(); 
        }
        f++;   
    })
    var f = 0;
    $(".ValorItemReal").each(function(){
        if(f == 0){
           $(this).remove(); 
        }
        f++;   
    })
}
function AddGrupoPpto(id){
    $(".FormNewGrupoPptoGeneral").show("slow");
    $(".TablaPpto").hide("slow");
    $(".BtnAddGrupo").hide("slow");
}

function OcultarFormPptoGeneral(){
    $(".FormNewGrupoPptoGeneral").hide("slow");
    $(".TablaPpto").show("slow");
    $(".BtnAddGrupo").show("slow");
}
function OcultarFormPptoGeneralItem(){
    $(".FormNewItemPptoGeneral").hide("slow");
    $(".TablaPpto").show("slow");
    $(".BtnAddItem").show("slow");
}

function GuardarGrupoPptoGeneral(id){
    var g = "";
    $(".Grupoppto").each(function(){
        if( $(this).val().length > 1 ){
            g = $(this).val();
        }
    })
    console.log(g)
    if( g.length > 1){
        $.ajax({
        type:'POST',
        url:UrlUniversal+'GuardarGrupoPptoGeneral',
        data:{id:id,grupo:g,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            PptoGeneral(id);
        }
    });
    }
    
}

function GuardarItemPptoGeneral(id){
    var x = 0;
    if( $("#IdGrupoPpto").val() != 'Seleccione' ){
        x++;
    }
    if( $('#ItemPptoGeneral').val().length > 2 ){
        x++;
    }
    if( $(".ValorItemReal").text().length > 1 ){
        x++;
    }
    if( x == 3 ){
        $.ajax({
            type:'POST',
            url:UrlUniversal+'GuardarItemPptoGeneral',
            data:{
                id:id,
                grupo:$("#IdGrupoPpto").val(),
                item:$('#ItemPptoGeneral').val(),
                valor:$(".ValorItemReal").text(),
                _token:document.getElementsByName('_token')[0].value},
            success:function(data){
                PptoGeneral(id);
            }
        });
    }else{
        alert("Complete todos los datos");
    }
    
}

function formatNumberValorEjecutado(){
    var tval = $("#valorRealEjecutadoMes").val();
    if(tval != ""){
        var valx = tval.split("$ ");
        if( valx.length > 1 ){
            var val = valx[1];
            var valor = val.split(",");
            var val_final = "";
            for(var i = 0;i < valor.length; i++){
                    val_final += ""+valor[i];
            }
        }else{
            var val = tval.split("");
            //var valor = val.split(",");
            var val_final = "";
            for(var i = 0;i < val.length; i++){
                    val_final += ""+val[i];
            }
        }
        
        $("#valorRealEjecutadoMes").val("$ "+formatNumber.new(val_final));
        $(".valorrealejecutadomes").text(val_final);
    }
}

function formatValorItemMes(){
    var tval = $ ('*[data-id = "ValorItemMesPptoGeneral"]').val();
    if(tval != ""){
        var valx = tval.split("$ ");
        if( valx.length > 1 ){
            var val = valx[1];
            var valor = val.split(",");
            var val_final = "";
            for(var i = 0;i < valor.length; i++){
                    val_final += ""+valor[i];
            }
        }else{
            var val = tval.split("");
            //var valor = val.split(",");
            var val_final = "";
            for(var i = 0;i < val.length; i++){
                    val_final += ""+val[i];
            }
        }
        
        $ ('*[data-id = "ValorItemMesPptoGeneral"]').val("$ "+formatNumber.new(val_final));
        $(".ValorItemReal").text(val_final);
    }
}

function VolverPptoGeneral(){
    $("#ModalContentForms").modal("hide");
    $(".ModalContentForms").hide("slow");
    $(".modal").modal("hide")
    $("#ModalEdit").modal("show");
    $("#ModalContentForm").show("slow");
    
}

function EditarEjecutadoItemPpto(id,ppto,mes,item){
    var valor = "";
    $(".ValorRealItemx"+id).each(function(){
        valor = $(this).text()
    })
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"image/Administracion.png' height='50px'  /> <span class = 'TituloBuscador'>Valor Ejecutado</span>";
                html += "</td>"
                html += "<td>"
                    html += "<p></p><img onclick = 'VolverPptoGeneral()'src = '"+UrlUniversal+"image/cerrar.png' height='20px'  />";
                html += "</td>"
            html += "</tr>"
        html += "</table>"

    html += "</div>";
    html += "<div class='modal-body' >";
        html += "<p style = 'font-weight:400;'>Modifique el valor ejecutado para el mes de <span style = 'font-weight:bold;'>"+mes+"</span> del Item <span style = 'font-weight:bold;'>"+item+"</span>:</p>"
        html += "<div class='form-group row'>"
            html += "<div class='col-sm-12'>"
                html += "<label>Valor:</label>"
                html += "<input type = 'text' required class = 'form-control' id = 'valorRealEjecutadoMes' value = '$ "+formatNumber.new(valor)+"'onkeyup = 'formatNumberValorEjecutado()'  />"
                html += "<span class = 'valorrealejecutadomes' style = 'display:none;'>"+valor+"</span>"
            html += "</div>"
        html += "</div>"
        html += "<div class='form-group row'>"
            html += "<div class='col-sm-6 CenterText'>"
                html += "<button class = 'btn btn-danger' aria-label='Close' onclick = 'VolverPptoGeneral()'>Cancelar</button>"
            html += "</div>"
            html += "<div class='col-sm-6 CenterText'>"
                html += "<button class = 'btn btn-primary' onclick = 'ActualizarInformacionItemRE("+id+","+ppto+")'>Actualizar</button>"
            html += "</div>"
        html += "</div>"
    $(".FormModals").html(html);
    $("#ModalEdit").modal("hide");
    $("#ModalContentForm").hide("slow");
    $("#ModalContentForms").removeClass('modal-lg').addClass('modal-xs');
}

function ActualizarInformacionItemRE(id,ppto){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'ActualizarItemPptoGeneral',
        data:{id:id,valor:$(".valorrealejecutadomes").text(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            VolverPptoGeneral();
            PptoGeneral(ppto)
        }
    });
}

function EliminarGrupoPpto(id,ppto){
    var r = confirm("¿Está completamente seguro(a) de Eliminar este Grupo? Tenga en cuenta que al hacerlo la información de los Items También será Eliminada.")
    if (r == true) {
        $.ajax({
            type:'POST',
            url:UrlUniversal+'EliminarGrupoPpto',
            data:{id:id,_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                PptoGeneral(ppto)
            }
        });
    } else {
      
    }
}

function EliminarItemGrupoPpto(id,ppto){
    var r = confirm("¿Está completamente seguro(a) de Eliminar este Item?.")
    if (r == true) {
        $.ajax({
            type:'POST',
            url:UrlUniversal+'EliminarItemGrupoPpto',
            data:{id:id,_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                PptoGeneral(ppto)
            }
        });
    } else {
      
    }
}

function EditarPptadoItem(id,ppto){
    var valor = "";
    $(".ValorPptadoItemMensual"+id).each(function(){
        valor = $(this).text()
    })
    
    var item = "";
    $(".NombreItem"+id).each(function(){
        item = $(this).text()
    })
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"image/Administracion.png' height='50px'  /> <span class = 'TituloBuscador'>Valor Presupuestado Mensual</span>";
                html += "</td>"
                html += "<td>"
                    html += "<p></p><img onclick = 'VolverPptoGeneral()'src = '"+UrlUniversal+"image/cerrar.png' height='20px'  />";
                html += "</td>"
            html += "</tr>"
        html += "</table>"

    html += "</div>";
    html += "<div class='modal-body' >";
        html += "<p style = 'font-weight:400;'>Modifique el valor presupuestado mensual del Item <span style = 'font-weight:bold;'>"+item+"</span>:</p>"
        html += "<div class='form-group row'>"
            html += "<div class='col-sm-12'>"
                html += "<label>Valor:</label>"
                html += "<input type = 'text' required class = 'form-control' id = 'valorRealEjecutadoMes' value = '$ "+formatNumber.new(valor)+"'onkeyup = 'formatNumberValorEjecutado()'  />"
                html += "<span class = 'valorrealejecutadomes' style = 'display:none;'>"+valor+"</span>"
            html += "</div>"
        html += "</div>"
        html += "<div class='form-group row'>"
            html += "<div class='col-sm-6 CenterText'>"
                html += "<button class = 'btn btn-danger' aria-label='Close' onclick = 'VolverPptoGeneral()'>Cancelar</button>"
            html += "</div>"
            html += "<div class='col-sm-6 CenterText'>"
                html += "<button class = 'btn btn-primary' onclick = 'ActualizarInformacionItemPptado("+id+","+ppto+")'>Actualizar</button>"
            html += "</div>"
        html += "</div>"
    $(".FormModals").html(html);
    $("#ModalEdit").modal("hide");
    $("#ModalContentForm").hide("slow");
    $("#ModalContentForms").removeClass('modal-lg').addClass('modal-xs');
}

function ActualizarInformacionItemPptado(id,ppto){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'ActualizarItemPptadoPptoGeneral',
        data:{id:id,valor:$(".valorrealejecutadomes").text(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            VolverPptoGeneral();
            PptoGeneral(ppto)
        }
    });
}

function VisualizarMeses(x){
    if( $('.meses'+x).prop('checked') ){
        $(".mex"+x).hide();
        $(".meses"+x).prop("checked", false);   
    }else{
        $(".mex"+x).show();
        $(".meses"+x).prop("checked", true); 
    }
}

function PptoGeneral(id){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'DataPptoGeneral',
        data:{id:id,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
                html += "<div class='modal-header'>";
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<td nowrap>"
                                html += "<p></p><img src = '"+UrlUniversal+"image/Administracion.png' height='50px'  /> <span class = 'TituloBuscador'>Presupuesto General Año "+($(".YearPpto"+id).text())+"</span>";
                            html += "</td>"
                            html += "<td>"
                                html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                                html += "<p></p><img src = '"+UrlUniversal+"image/cerrar.png' height='20px'  />";
                            html += "</button>";
                            html += "</td>"
                        html += "</tr>"
                    html += "</table>"

                html += "</div>";
                html += "<div class='modal-body' style = 'overflow-x:scroll;font-size:12px;'>";
                /*
                 * Meses
                 */
                    html += "<table>"
                        html += "<tr>"
                            html += "<td>"
                                html += "<button class = 'btn btn-primary BtnAddGrupo' onclick = 'AddGrupoPpto("+id+")'>Agregar Grupo</button>"
                            html += "</td>"
                            html += "<td>"
                                html += "<button class = 'btn btn-primary BtnAddItem' onclick = 'AddItemPpto("+id+")'>Agregar Item</button>"
                            html += "</td>"
                        html += "</tr>"
                        
                    html += "</table>"
                    
                    
                    html += "<p></p>"
                    html += "<table>"
                        html += "<tr>"
                            for(var i = 0; i < data.Meses.length; i++){
                                html += "<td class = 'CenterText'>"
                                    html += "<div class='form-check form-check-inline'>";
                                        html += "<input class='form-check-input meses"+i+"' type='checkbox' id='mes"+i+"' value='"+i+"' checked onclick = 'VisualizarMeses("+i+")'>";
                                        html += "<label class='form-check-label' for='mes"+i+"' style = 'font-weight:500;'>"+data.Meses[i]+"</label>";
                                    html += "</div>";
                                html += "</td>"
                            }
                        html += "</tr>"
                        html += "<tr>"
                            html += "<td><br></td>"
                        html += "</tr>"
                    html += "</table>"
                    html += "<div class='form-signin FormNewGrupoPptoGeneral' style = 'display:none;' >"
                        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
                            html += "<div class = 'form-group row'>";
                                html += "<div class = 'col col-sm-4'>";
                                    html += "<label>Nombre Grupo:</label>";
                                    html += "<input type = 'text' class = 'form-control Grupoppto'required/>"
                                html += "</div>";
                            html += "</div>";
                            html += "<div class = 'form-group row'>";
                                html += "<div class = 'col col-sm-2 CenterText'>";
                                    html += "<button class = 'btn btn-danger' onclick = 'OcultarFormPptoGeneral()'>Cancelar</button>"
                                html += "</div>";
                                html += "<div class = 'col col-sm-2 CenterText'>";
                                    html += "<button class = 'btn btn-primary' onclick = 'GuardarGrupoPptoGeneral("+id+")'>Guardar</button>"
                                html += "</div>";
                            html += "</div>";
                    html += "</div>"
                    
                    html += "<div class='form-signin FormNewItemPptoGeneral' style = 'display:none;' >"
                        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
                            html += "<div class = 'form-group row'>";
                                html += "<div class = 'col col-sm-4'>";
                                    html += "<label>Grupo:</label>";
                                    html += "<select class = 'form-control IdGrupoPpto' id = 'IdGrupoPpto'>"
                                        html += "<option>Seleccione</option>"
                                        for(var y = 0; y < data.Grupos.length;y++){
                                            html += "<option value = '"+data.Grupos[y]['id']+"'>"+data.Grupos[y]['grupo']+"</option>"
                                        }
                                    html += "</select>"
                                html += "</div>";
                                html += "<div class = 'col col-sm-4'>";
                                    html += "<label>Item:</label>";
                                    html += "<input type = 'text' class = 'form-control ItemPptoGeneral' required id = 'ItemPptoGeneral'/>"
                                html += "</div>";
                                html += "<div class = 'col col-sm-4'>";
                                    html += "<label>Valor mensual:</label>";
                                    html += "<input type = 'text' class = 'form-control ValorItemMesPptoGeneral' data-id='ValorItemMesPptoGeneral'  onkeyup = 'formatValorItemMes()' value = '$ ' required  />"
                                    html += "<span class = 'ValorItemReal' style = 'display:none;'></span>"
                                html += "</div>";
                            html += "</div>";
                            html += "<div class = 'form-group row'>";
                                html += "<div class = 'col col-sm-6 CenterText'>";
                                    html += "<button class = 'btn btn-danger' onclick = 'OcultarFormPptoGeneralItem()'>Cancelar</button>"
                                html += "</div>";
                                html += "<div class = 'col col-sm-6 CenterText'>";
                                    html += "<button class = 'btn btn-primary' onclick = 'GuardarItemPptoGeneral("+id+")'>Guardar</button>"
                                html += "</div>";
                            html += "</div>";
                    html += "</div>"
                    html += "<table width = '100%' class = 'TablaPpto'>"
                        html += "<tr>"
                            html += "<td></td><th colspan = '5' class = 'CenterText cabecera_th_dark border_top'>Gastos Administrativos "+($(".YearPpto"+id).text())+"</th>"
                            html += "<td></td>"
                            for(var i = 0; i < data.Meses.length; i++){
                                var class_color_mes = "";
                                if(i % 2 == 0) {
                                    class_color_mes = "cabecera_th";
                                }
                                else {
                                    class_color_mes = "cabecera_th_dark";
                                }
                                html += "<th colspan = '8' class = 'CenterText "+class_color_mes+" border_top mex"+i+"'>"+data.Meses[i]+"</th>"
                                html += "<td class = 'mex"+i+"'></td>"
                            }
                            html += "<th colspan = '8' class = 'CenterText cabecera_th_dark border_top'>Total Gastos Administrativos "+($(".YearPpto"+id).text())+"</th>"
                        html += "</tr>"
                        html += "<tr><td></td></tr>"
                        html += "<tr>"
                            html += "<td></td>"
                            html += "<td class = 'subtitulos_principales' style = 'width:200px;'>Costos</td>"
                            html += "<td class = 'subtitulos_principales'>%</td>"
                            html += "<td class = 'subtitulos_principales' nowrap>Presupuesto "+($(".YearPpto"+id).text())+"</td>"
                            html += "<td class = 'subtitulos_principales'>%</td>"
                            html += "<td class = 'subtitulos_principales' nowrap>Presupuesto Mes</td>"
                            
                            html += "<td style = 'width:20px;'></td>"
                            for(var i = 0; i < data.Meses.length; i++){
                                html += "<td class = 'CenterText subtitulos_mes mex"+i+"'>Presupuestado</td>"
                                html += "<td class = 'CenterText subtitulos_mes mex"+i+"'>%</td>"
                                html += "<td class = 'CenterText subtitulos_mes mex"+i+"'>Pagado</td>"
                                html += "<td class = 'CenterText subtitulos_mes mex"+i+"'>%</td>"
                                html += "<td class = 'CenterText subtitulos_mes mex"+i+"'>Pendiente por Pagar</td>"
                                html += "<td class = 'CenterText subtitulos_mes mex"+i+"'>%</td>"
                                html += "<td class = 'CenterText subtitulos_mes mex"+i+"'>Real Ejecutado</td>"
                                html += "<td class = 'CenterText subtitulos_mes mex"+i+"'>%</td>"
                                html += "<td class = 'mex"+i+"'></td>"
                            }
                            html += "<td class = 'CenterText subtitulos_mes '>Presupuestado</td>"
                            html += "<td class = 'CenterText subtitulos_mes '>%</td>"
                            html += "<td class = 'CenterText subtitulos_mes '>Pagado</td>"
                            html += "<td class = 'CenterText subtitulos_mes '>%</td>"
                            html += "<td class = 'CenterText subtitulos_mes '>Pendiente por Pagar</td>"
                            html += "<td class = 'CenterText subtitulos_mes '>%</td>"
                            html += "<td class = 'CenterText subtitulos_mes '>Real Ejecutado</td>"
                            html += "<td class = 'CenterText subtitulos_mes '>%</td>"
                        html += "</tr>"
                        html += "<tr><td><p></p></td></tr>"
                        var TotalesVG = [];
                        var TotalesG = [];
                        var TotalesP = [12];
                        var TotalesE = [12];
                        var TotalesD = [12];
                        /*Grupos*/
                        for(var g = 0;g < data.Grupos.length; g++){
                            html += "<tr>"
                                html += "<td class = 'CenterText'>"
                                    html += "<img src = 'image/eliminar.png' class = 'IconDescg' onclick = 'EliminarGrupoPpto("+data.Grupos[g]['id']+","+id+")'/>"
                                html += "</td>"
                                html += "<td class = 'subtitulos_mes border_top_left' nowrap>"+data.Grupos[g]['grupo']+"</td>"
                                html += "<td class = 'subtitulos_mes' nowrap>100 %</td>"
                                html += "<td class = 'subtitulos_mes'></td>"
                                html += "<td class = 'subtitulos_mes' nowrap>100 %</td>"
                                html += "<td class = 'subtitulos_mes border_top_right' nowrap></td>"

                                html += "<td></td>"
                                for(var i = 0; i < data.Meses.length; i++){
                                    var class_color_mes = "";
                                    if(i % 2 == 0) {
                                        class_color_mes = "cabecera_th";
                                    }
                                    else {
                                        class_color_mes = "cabecera_th_dark";
                                    }
                                    html += "<td colspan = '8' class = 'CenterText border_top_left border_top_right "+class_color_mes+" mex"+i+"'>"+data.Grupos[g]['grupo']+"</td>"
                                    html += "<td class = 'mex"+i+"'></td>"
                                }
                                html += "<td colspan = '8' class = 'CenterText border_top_left border_top_right cabecera_th '>"+data.Grupos[g]['grupo']+"</td>"
                            html += "</tr>"
                            
                            /*Grupos - Items*/
                            
                            
                            for(var x = 0;x < data.Grupos[g]['Items'].length; x++){
                                html += "<tr>"
                                    html += "<td class = 'CenterText'>"
                                        html += "<img src = 'image/eliminar.png' class = 'IconDescg' onclick = 'EliminarItemGrupoPpto("+data.Grupos[g]['Items'][x]['id']+","+id+")'/>"
                                    html += "</td>"
                                    html += "<td class = 'td_cuerpo_table  NombreItem"+data.Grupos[g]['Items'][x]['id']+"' nowrap>"+data.Grupos[g]['Items'][x]['item']+"</td>"
                                    html += "<td class = 'td_cuerpo_table' nowrap>100 %</td>"
                                    html += "<td class = 'td_cuerpo_table' style = 'width:50px;'>"
                                        html += "<table width = '100%'>"
                                            html += "<tr>"
                                                html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Grupos[g]['Items'][x]['TotalYear'])+"</td>"
                                            html += "</tr>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'td_cuerpo_table' nowrap>100 %</td>"
                                    html += "<td class = 'td_cuerpo_table'>"
                                        html += "<table width = '100%'>"
                                            html += "<tr>"
                                                html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Grupos[g]['Items'][x]['valormensual'])+"</td>"
                                                html += "<td class = 'CenterText' style = 'width:20%;'>"
                                                    html += "<img src = 'image/editar.png' class = 'IconDescg Cursor' data-toggle='modal' data-target='#Forms' onclick = 'EditarPptadoItem("+data.Grupos[g]['Items'][x]['id']+","+id+")'/>"
                                                    html += "<span style = 'display:none' class = 'ValorPptadoItemMensual"+data.Grupos[g]['Items'][x]['id']+"'>"+data.Grupos[g]['Items'][x]['valormensual']+"</span>"
                                                html += "</td>"
                                            html += "</tr>"
                                        html += "</table>"
                                    html += "</td>"

                                    html += "<td style = 'width:20px;'></td>"
                                    for(var i = 0; i < data.Grupos[g]['Items'][x]['DetalleItem'].length; i++){
                                        html += "<td class = 'td_cuerpo_table mex"+i+"' style = 'width:70px;'>"
                                            html += "<table width = '100%'>"
                                                html += "<tr>"
                                                    html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Grupos[g]['Items'][x]['valormensual'])+"</td>"
                                                html += "</tr>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table mex"+i+"' nowrap>100 %</td>"
                                        
                                        var ClassValor = "";
                                        if( data.Grupos[g]['Items'][x]['DetalleItem'][i]['valor'] == 0 ){
                                            
                                        }else if(data.Grupos[g]['Items'][x]['DetalleItem'][i]['valor'] > 0 && data.Grupos[g]['Items'][x]['DetalleItem'][i]['valor'] < data.Grupos[g]['Items'][x]['valormensual']){
                                            ClassValor = "alerta_positiva";
                                        }else if(data.Grupos[g]['Items'][x]['DetalleItem'][i]['valor'] > 0 && data.Grupos[g]['Items'][x]['DetalleItem'][i]['valor'] > data.Grupos[g]['Items'][x]['valormensual']){
                                            ClassValor = "alerta_negativa";
                                        }
                                        html += "<td class = 'td_cuerpo_table mex"+i+" "+ClassValor+"' style = 'width:70px;'>"
                                            html += "<table width = '100%'>"
                                                html += "<tr>"
                                                    html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Grupos[g]['Items'][x]['DetalleItem'][i]['valor'])+"</td>"
                                                    html += "<td class = 'CenterText' style = 'width:20%;'>"
                                                        html += "<img src = 'image/editar.png' class = 'IconDescg Cursor' data-toggle='modal' data-target='#Forms' onclick = 'EditarEjecutadoItemPpto("+data.Grupos[g]['Items'][x]['DetalleItem'][i]['id']+","+id+",\""+data.Meses[i]+"\",\""+data.Grupos[g]['Items'][x]['item']+"\")'/>"
                                                    html += "</td>"
                                                html += "</tr>"
                                            html += "</table>"
                                            html += "<span style = 'display:none;' class = 'ValorRealItemx"+data.Grupos[g]['Items'][x]['DetalleItem'][i]['id']+"'>"+data.Grupos[g]['Items'][x]['DetalleItem'][i]['valor']+"</span>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table mex"+i+"' nowrap>"+data.Grupos[g]['Items'][x]['DetalleItem'][i]['Porcentaje']+" %</td>"
                                        html += "<td class = 'td_cuerpo_table mex"+i+"'>"
                                            html += "<table width = '100%'>"
                                                html += "<tr>"
                                                    html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Grupos[g]['Items'][x]['DetalleItem'][i]['DiferenciaValor'])+"</td>"
                                                html += "</tr>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table mex"+i+"' nowrap>"+data.Grupos[g]['Items'][x]['DetalleItem'][i]['PorDif']+" %</td>"
                                        html += "<td class = 'td_cuerpo_table mex"+i+" "+ClassValor+"' style = 'width:70px;'>"
                                            html += "<table width = '100%'>"
                                                html += "<tr>"
                                                    html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Grupos[g]['Items'][x]['DetalleItem'][i]['valor'])+"</td>"
                                                html += "</tr>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'td_cuerpo_table mex"+i+"' nowrap>"+data.Grupos[g]['Items'][x]['DetalleItem'][i]['Porcentaje']+" %</td>"
                                        html += "<td class = 'mex"+i+"' style = 'width:20px;'></td>"
                                    }
                                    
                                    html += "<td class = 'td_cuerpo_table ' style = 'width:70px;'>"
                                        html += "<table width = '100%'>"
                                            html += "<tr>"
                                                html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Grupos[g]['Items'][x]['TotalItem'][0]['valormensual'])+"</td>"
                                            html += "</tr>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'td_cuerpo_table ' nowrap>100 %</td>"

                                    var ClassValor = "";
                                    if( data.Grupos[g]['Items'][x]['TotalItem'][0]['valor'] == 0 ){

                                    }else if(data.Grupos[g]['Items'][x]['TotalItem'][0]['valor'] > 0 && data.Grupos[g]['Items'][x]['TotalItem'][0]['valor'] < data.Grupos[g]['Items'][x]['TotalItem'][0]['valormensual']){
                                        ClassValor = "alerta_positiva";
                                    }else if(data.Grupos[g]['Items'][x]['TotalItem'][0]['valor'] > 0 && data.Grupos[g]['Items'][x]['TotalItem'][0]['valor'] > data.Grupos[g]['Items'][x]['TotalItem'][0]['valormensual']){
                                        ClassValor = "alerta_negativa";
                                    }
                                    html += "<td class = 'td_cuerpo_table "+ClassValor+"' style = 'width:70px;'>"
                                        html += "<table width = '100%'>"
                                            html += "<tr>"
                                                html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Grupos[g]['Items'][x]['TotalItem'][0]['valor'])+"</td>"
                                            html += "</tr>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'td_cuerpo_table ' nowrap>"+data.Grupos[g]['Items'][x]['TotalItem'][0]['Porcentaje']+" %</td>"
                                    html += "<td class = 'td_cuerpo_table ' style = 'width:70px;'>"
                                        html += "<table width = '100%'>"
                                            html += "<tr>"
                                                html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Grupos[g]['Items'][x]['TotalItem'][0]['DiferenciaValor'])+"</td>"
                                            html += "</tr>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'td_cuerpo_table ' nowrap>"+data.Grupos[g]['Items'][x]['TotalItem'][0]['PorDif']+" %</td>"
                                    html += "<td class = 'td_cuerpo_table  "+ClassValor+"' style = 'width:70px;'>"
                                        html += "<table width = '100%'>"
                                            html += "<tr>"
                                                html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Grupos[g]['Items'][x]['TotalItem'][0]['valor'])+"</td>"
                                            html += "</tr>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'td_cuerpo_table ' nowrap>"+data.Grupos[g]['Items'][x]['TotalItem'][0]['Porcentaje']+" %</td>"
                                    
                                    
                                html += "</tr>"
                            }
                            
                            /*Totales */
                            
                            for(var x = 0;x < data.Grupos[g]['ItemsTotal'].length; x++){
                                TotalesVG['PptoYear'] += data.Grupos[g]['ItemsTotal'][x]['TotalYear'];
                                TotalesVG['PptoMes'] += data.Grupos[g]['ItemsTotal'][x]['valormensual'];
                                html += "<tr>"
                                    html += "<td class = 'CenterText'>"
                                        
                                    html += "</td>"
                                    html += "<td class = 'subtitulos_mes border_bottom_left ' nowrap>Total</td>"
                                    html += "<td class = 'subtitulos_mes' nowrap>100 %</td>"
                                    html += "<td class = 'subtitulos_mes' style = 'width:70px;'>"
                                        html += "<table width = '100%'>"
                                            html += "<tr>"
                                                html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Grupos[g]['ItemsTotal'][x]['TotalYear'])+"</td>"
                                            html += "</tr>"
                                        html += "</table>"
                                        
                                    html += "</td>"
                                    html += "<td class = 'subtitulos_mes' nowrap>100 %</td>"
                                    html += "<td class = 'subtitulos_mes border_bottom_right' style = 'width:70px;'>"
                                        html += "<table width = '100%' >"
                                            html += "<tr>"
                                                html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Grupos[g]['ItemsTotal'][x]['valormensual'])+"</td>"
                                                
                                            html += "</tr>"
                                        html += "</table>"
                                    html += "</td>"

                                    html += "<td style = 'width:20px;'></td>"
                                    for(var i = 0; i < data.Grupos[g]['ItemsTotal'][x]['DetalleItem'].length; i++){
                                        
                                        var class_color_mes = "";
                                        if(i % 2 == 0) {
                                            class_color_mes = "cabecera_th";
                                        }
                                        else {
                                            class_color_mes = "cabecera_th_dark";
                                        }
                                        html += "<td class = ' "+class_color_mes+" border_bottom_left mex"+i+"' style = 'width:70px;'>"
                                            html += "<table width = '100%'>"
                                                html += "<tr>"
                                                    html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Grupos[g]['ItemsTotal'][x]['valormensual'])+"</td>"
                                                html += "</tr>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = ' "+class_color_mes+" mex"+i+"' nowrap>100 %</td>"
                                        
                                        var ClassValor = "";
                                        if( data.Grupos[g]['ItemsTotal'][x]['DetalleItem'][i]['valor'] == 0 ){
                                            
                                        }else if(data.Grupos[g]['ItemsTotal'][x]['DetalleItem'][i]['valor'] > 0 && data.Grupos[g]['ItemsTotal'][x]['DetalleItem'][i]['valor'] < data.Grupos[g]['ItemsTotal'][x]['valormensual']){
                                            ClassValor = "alerta_positiva";
                                        }else if(data.Grupos[g]['ItemsTotal'][x]['DetalleItem'][i]['valor'] > 0 && data.Grupos[g]['ItemsTotal'][x]['DetalleItem'][i]['valor'] > data.Grupos[g]['ItemsTotal'][x]['valormensual']){
                                            ClassValor = "alerta_negativa";
                                        }
                                        html += "<td class = ' "+class_color_mes+" mex"+i+" "+ClassValor+"' style = 'width:70px;'>"
                                            html += "<table width = '100%'>"
                                                html += "<tr>"
                                                    html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Grupos[g]['ItemsTotal'][x]['DetalleItem'][i]['valor'])+"</td>"
                                                    
                                                html += "</tr>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = ' "+class_color_mes+" mex"+i+"' nowrap>"+data.Grupos[g]['ItemsTotal'][x]['DetalleItem'][i]['Porcentaje']+" %</td>"
                                        html += "<td class = ' "+class_color_mes+" mex"+i+"' style = 'width:70px;'>"
                                            html += "<table width = '100%'>"
                                                html += "<tr>"
                                                    html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Grupos[g]['ItemsTotal'][x]['DetalleItem'][i]['DiferenciaValor'])+"</td>"
                                                html += "</tr>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = ' "+class_color_mes+" mex"+i+"' nowrap>"+data.Grupos[g]['ItemsTotal'][x]['DetalleItem'][i]['PorDif']+" %</td>"
                                        html += "<td class = ' "+class_color_mes+" mex"+i+" "+ClassValor+"'>"
                                            html += "<table width = '100%'>"
                                                html += "<tr>"
                                                    html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                                    html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Grupos[g]['ItemsTotal'][x]['DetalleItem'][i]['valor'])+"</td>"
                                                html += "</tr>"
                                            html += "</table>"
                                        html += "</td>"
                                        html += "<td class = 'border_bottom_right "+class_color_mes+" mex"+i+"' nowrap>"+data.Grupos[g]['ItemsTotal'][x]['DetalleItem'][i]['Porcentaje']+" %</td>"
                                        html += "<td class = 'mex"+i+"' style = 'width:20px;'></td>"
                                    }
                                    html += "<td class = 'cabecera_th border_bottom_left ' style = 'width:70px;'>"
                                        html += "<table width = '100%'>"
                                            html += "<tr>"
                                                html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Grupos[g]['ItemsTotal'][x]['TotalItem'][0]['valormensual'])+"</td>"
                                            html += "</tr>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = ' cabecera_th ' nowrap>100 %</td>"

                                    var ClassValor = "";
                                    if( data.Grupos[g]['ItemsTotal'][x]['TotalItem'][0]['valor'] == 0 ){

                                    }else if(data.Grupos[g]['ItemsTotal'][x]['TotalItem'][0]['valor'] > 0 && data.Grupos[g]['ItemsTotal'][x]['TotalItem'][0]['valor'] < data.Grupos[g]['ItemsTotal'][x]['TotalItem'][0]['valormensual']){
                                        ClassValor = "alerta_positiva";
                                    }else if(data.Grupos[g]['ItemsTotal'][x]['TotalItem'][0]['valor'] > 0 && data.Grupos[g]['ItemsTotal'][x]['TotalItem'][0]['valor'] > data.Grupos[g]['ItemsTotal'][x]['TotalItem'][0]['valormensual']){
                                        ClassValor = "alerta_negativa";
                                    }
                                    html += "<td class = ' "+ClassValor+"'  style = 'font-weight:400;' style = 'width:70px;'>"
                                        html += "<table width = '100%'>"
                                            html += "<tr>"
                                                html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Grupos[g]['ItemsTotal'][x]['TotalItem'][0]['valor'])+"</td>"
                                            html += "</tr>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = ' cabecera_th ' nowrap>"+data.Grupos[g]['ItemsTotal'][x]['TotalItem'][0]['Porcentaje']+" %</td>"
                                    html += "<td class = 'cabecera_th' style = 'width:70px;'>"
                                        html += "<table width = '100%'>"
                                            html += "<tr>"
                                                html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Grupos[g]['ItemsTotal'][x]['TotalItem'][0]['DiferenciaValor'])+"</td>"
                                            html += "</tr>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = ' cabecera_th' nowrap>"+data.Grupos[g]['ItemsTotal'][x]['TotalItem'][0]['PorDif']+" %</td>"
                                    html += "<td class = 'td_cuerpo_table "+ClassValor+"' style = 'font-weight:400;width:70px;'>"
                                        html += "<table width = '100%'>"
                                            html += "<tr>"
                                                html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Grupos[g]['ItemsTotal'][x]['TotalItem'][0]['valor'])+"</td>"
                                            html += "</tr>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = ' cabecera_th border_bottom_right' nowrap>"+data.Grupos[g]['ItemsTotal'][x]['TotalItem'][0]['Porcentaje']+" %</td>"

                                html += "</tr>"
                            }
                            
                            
                            html += "<tr><td><p></p></td></tr>"
                            
                            /*Totales*/
                            
                        }
                        //console.log(TotalesP)
                        
                        for(var x = 0;x < 1; x++){
                            html += "<tr>"
                                html += "<td class = 'CenterText'>"

                                html += "</td>"
                                html += "<td class = 'subtitulos_mes border_bottom_left ' nowrap>Total</td>"
                                html += "<td class = 'subtitulos_mes' nowrap>100 %</td>"
                                html += "<td class = 'subtitulos_mes'>"
                                    html += "<table width = '100%'>"
                                        html += "<tr>"
                                            html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Totales[0]['TotalYear'])+"</td>"
                                        html += "</tr>"
                                    html += "</table>"

                                html += "</td>"
                                html += "<td class = 'subtitulos_mes' nowrap>100 %</td>"
                                html += "<td class = 'subtitulos_mes border_bottom_right'>"
                                    html += "<table width = '100%'>"
                                        html += "<tr>"
                                            html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Totales[0]['valormensual'])+"</td>"

                                        html += "</tr>"
                                    html += "</table>"
                                html += "</td>"

                                html += "<td style = 'width:20px;'></td>"
                                for(var i = 0; i < 12; i++){
                                    var class_color_mes = "";
                                    if(i % 2 == 0) {
                                        class_color_mes = "cabecera_th";
                                    }
                                    else {
                                        class_color_mes = "cabecera_th_dark";
                                    }
                                    html += "<td class = ' "+class_color_mes+" border_bottom_left mex"+i+"'>"
                                        html += "<table width = '100%'>"
                                            html += "<tr>"
                                                html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Totales[0]['DetalleItem'][i]['valormensual'])+"</td>"
                                            html += "</tr>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = ' "+class_color_mes+" mex"+i+"' nowrap>100 %</td>"

                                    var ClassValor = "";
                                    if( data.Totales[0]['DetalleItem'][i]['valor'] == 0 ){

                                    }else if(data.Totales[0]['DetalleItem'][i]['valor'] > 0 && data.Totales[0]['DetalleItem'][i]['valor'] < data.Totales[0]['DetalleItem'][i]['valormensual']){
                                        ClassValor = "alerta_positiva";
                                    }else if(data.Totales[0]['DetalleItem'][i]['valor'] > 0 && data.Totales[0]['DetalleItem'][i]['valor'] > data.Totales[0]['DetalleItem'][i]['valormensual']){
                                        ClassValor = "alerta_negativa";
                                    }
                                    html += "<td class = ' "+class_color_mes+" mex"+i+" "+ClassValor+"'>"
                                        html += "<table width = '100%'>"
                                            html += "<tr>"
                                                html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Totales[0]['DetalleItem'][i]['valor'])+"</td>"

                                            html += "</tr>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = ' "+class_color_mes+" mex"+i+"' nowrap>"+data.Totales[0]['DetalleItem'][i]['Porcentaje']+" %</td>"
                                    html += "<td class = ' "+class_color_mes+" mex"+i+"'>"
                                        html += "<table width = '100%'>"
                                            html += "<tr>"
                                                html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Totales[0]['DetalleItem'][i]['DiferenciaValor'])+"</td>"
                                            html += "</tr>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = ' "+class_color_mes+" mex"+i+"' nowrap>"+data.Totales[0]['DetalleItem'][i]['PorDif']+" %</td>"
                                    html += "<td class = ' "+class_color_mes+" mex"+i+" "+ClassValor+"'>"
                                        html += "<table width = '100%'>"
                                            html += "<tr>"
                                                html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                                html += "<td style = 'text-align:right;'>"+formatNumber.new(data.Totales[0]['DetalleItem'][i]['valor'])+"</td>"
                                            html += "</tr>"
                                        html += "</table>"
                                    html += "</td>"
                                    html += "<td class = 'border_bottom_right "+class_color_mes+" mex"+i+"' nowrap>"+data.Totales[0]['DetalleItem'][i]['Porcentaje']+" %</td>"
                                    html += "<td class = 'mex"+i+"' style = 'width:20px;'></td>"
                                }
                                var class_color_mes = "cabecera_th";
                                html += "<td class = ' "+class_color_mes+" border_bottom_left mex"+i+"'>"
                                    html += "<table width = '100%'>"
                                        html += "<tr>"
                                            html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(data.TotalesF[0]['valormensual'])+"</td>"
                                        html += "</tr>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = ' "+class_color_mes+" mex"+i+"' nowrap>100 %</td>"

                                var ClassValor = "";
                                if( data.TotalesF[0]['valor'] == 0 ){

                                }else if(data.TotalesF[0]['valor'] > 0 && data.TotalesF[0]['valor'] < data.TotalesF[0]['valormensual']){
                                    ClassValor = "alerta_positiva";
                                }else if(data.TotalesF[0]['valor'] > 0 && data.TotalesF[0]['valor'] > data.TotalesF[0]['valormensual']){
                                    ClassValor = "alerta_negativa";
                                }
                                html += "<td class = ' "+class_color_mes+" mex"+i+" "+ClassValor+"'>"
                                    html += "<table width = '100%'>"
                                        html += "<tr>"
                                            html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(data.TotalesF[0]['valor'])+"</td>"

                                        html += "</tr>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = ' "+class_color_mes+" mex"+i+"' nowrap>"+data.TotalesF[0]['Porcentaje']+" %</td>"
                                html += "<td class = ' "+class_color_mes+" mex"+i+"'>"
                                    html += "<table width = '100%'>"
                                        html += "<tr>"
                                            html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(data.TotalesF[0]['DiferenciaValor'])+"</td>"
                                        html += "</tr>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = ' "+class_color_mes+" mex"+i+"' nowrap>"+data.TotalesF[0]['PorDif']+" %</td>"
                                html += "<td class = ' "+class_color_mes+" mex"+i+" "+ClassValor+"'>"
                                    html += "<table width = '100%'>"
                                        html += "<tr>"
                                            html += "<td class = 'CenterText' style = 'width:20%;'>$</td>"
                                            html += "<td style = 'text-align:right;'>"+formatNumber.new(data.TotalesF[0]['valor'])+"</td>"
                                        html += "</tr>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td class = 'border_bottom_right "+class_color_mes+" mex"+i+"' nowrap>"+data.TotalesF[0]['Porcentaje']+" %</td>"

                            html += "</tr>"
                        }
                        html += "<tr><td><p></p></td></tr>"
                        
                    html += "</table>";
            html += "</div>"
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        }
    });
    
}

function FormNuevoPptoGeneral(){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'DataNewPptoGeneral',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
                html += "<div class='modal-header'>";
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<td nowrap>"
                                html += "<p></p><img src = '"+UrlUniversal+"image/Administracion.png' height='50px'  /> <span class = 'TituloBuscador'>Nuevo Presupuesto General</span>";
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
                    html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"GuardarPptoGeneral' method='post'>"
                        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
                        
                        html += "<div class = 'form-group row'>";
                            html += "<div class = 'col col-sm-3'>";
                                html += "<label>Año:</label>";
                                html += "<select class = 'form-control' name = 'year'>";
                                    for(var i=0; i<data.Years.length;i++){
                                        html += "<option value = '"+data.Years[i]+"'>"+data.Years[i]+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>";
                            
                        html += "</div>";
                    
                    html += "<div class = 'form-row'>";
                        html += "<div class = 'col col-sm-12 CenterText'>";
                            html += "<button class = 'btn btn-primary' type = 'submit'>Guardar</button>"
                        html += "</div>";
                    html += "</div>"
                html += "</form>"
            html += "</div>"
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-lg');
        }
    }); 
}