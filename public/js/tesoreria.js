/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var localToday = new Date();
var ItemsOC = 1;
var ItemsOCx = [];
ItemsOCx.push(ItemsOC);

function CalcularTotalFactura(){
    var total = 0;
    $(".Valor").each(function(){
        if( isNaN( parseFloat($(this).val()) ) ){
            total += 0;
        }else{
            total +=parseFloat($(this).val());
        }
    })
    $("#ValFact").val( formatNumber.new(total));
}

function CalcularPedido(){
    
    var x = 0;
    var totalG = 0;
    $(".unidades").each(function(){
        var tval = $(".unidades"+ItemsOCx[x]).val();
        if(tval != ""){
            var unidades = 0;
            var valorunitario = 0;
            var valx = tval.split(",");
            if( valx.length > 1 ){
                var val_final = "";
                for(var i = 0;i < valx.length; i++){
                        val_final += ""+valx[i];
                }
                unidades = parseFloat(val_final);
            }else{
                var val = tval.split("");
                var val_final = "";
                for(var i = 0;i < val.length; i++){
                        val_final += ""+val[i];
                }
                unidades = parseFloat(val_final);
            }
            tval = $(".valorunidad"+ItemsOCx[x]).val()
            var valx = tval.split("$ ");
            if( valx.length > 1 ){
                var val = valx[1];
                var valor = val.split(",");
                var val_final = "";
                for(var i = 0;i < valor.length; i++){
                        val_final += ""+valor[i];
                }
                valorunitario = parseFloat(val_final);
            }else{
                var val = tval.split("");
                var val_final = "";
                for(var i = 0;i < val.length; i++){
                        val_final += ""+val[i];
                }
                valorunitario = parseFloat(val_final);
            }
            $(".unidades"+ItemsOCx[x]).val(""+formatNumber.new(unidades));
            $(".unidadesreal"+ItemsOCx[x]).val(unidades);
            $(".valorunidad"+ItemsOCx[x]).val("$ "+formatNumber.new(valorunitario));
            $(".valorreal"+ItemsOCx[x]).val(valorunitario);
        }
        var total = 0;
        total = valorunitario * unidades; 
        totalG += total;
        $(".valortotal"+ItemsOCx[x]).text( formatNumber.new(total) );
        x++;
    })
    
    $(".TotalFact").html( formatNumber.new(totalG) )
}

function BuscarFacturas(){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'ListFacturasProveedor',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
                html += "<div class='modal-header'>";
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<td nowrap>"
                                html += "<p></p><img src = '"+UrlUniversal+"image/check2.png' height='50px'  /> <span class = 'TituloBuscador'>Recepción de Facturas</span>";
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
                    html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"ActualizarFacturaProveedor' method='post'>"
                        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
                        html += "<div class = 'form-group row'>";
                            html += "<div class = 'col col-sm-3'>"
                                html += "<label>Número Orden:</label>"
                                html += "<select class = 'form-control' name = 'oc'>"
                                    html += "<option>Seleccione</option>"
                                    for(var i = 0; i < data.oc.length;i++){
                                        html += "<option value = '"+data.oc[i]['id']+"'>"+data.oc[i]['id']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class = 'col col-sm-3'>"
                                html += "<label>Factura Proveedor:</label>"
                                html += "<input type = 'text' class = 'form-control' name = 'factura'/>"
                            html += "</div>"
                            html += "<div class = 'col col-sm-3'>"
                                html += "<label>Fecha Radición (MM/DD/AAAA):</label>"
                                html += "<input type = 'text' class = 'form-control DatePicker' name = 'fecharadicacion' readonly/>"
                            html += "</div>"
                            /*html += "<div class = 'col col-sm-3'>"
                                html += "<label>Valor Factura:</label>"
                                html += "<input type = 'text' class = 'form-control'/>"
                            html += "</div>"*/
                        html += "</div>"
                        
                        
                        html +="<br>";
                    html += "<div class = 'form-row'>";
                        html += "<div class = 'col col-sm-12 CenterText'>";
                            html += "<button class = 'btn btn-primary' type = 'submit'>Guardar</button>"
                        html += "</div>";
                    html += "</div>"
                html += "</form>"
            html += "</div>"
            $(".content_modal").html(html);
            $(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        }
    }); 
}

function PagoFactura(){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'ListarFacturasPendientesPago',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
                html += "<div class='modal-header'>";
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<td nowrap>"
                                html += "<p></p><img src = '"+UrlUniversal+"image/check2.png' height='50px'  /> <span class = 'TituloBuscador'>Pago de Facturas</span>";
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
                    html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"ActualizarFacturaPagoProveedor' method='post'>"
                        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
                        html += "<div class = 'form-group row'>";
                            html += "<div class = 'col col-sm-3'>"
                                html += "<label>Número Orden:</label>"
                                html += "<select class = 'form-control' name = 'oc'>"
                                    html += "<option>Seleccione</option>"
                                    for(var i = 0; i < data.oc.length;i++){
                                        html += "<option value = '"+data.oc[i]['id']+"'>"+data.oc[i]['id']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class = 'col col-sm-3'>"
                                html += "<label>Fecha pago (MM/DD/AAAA):</label>"
                                html += "<input type = 'text' class = 'form-control DatePicker' name = 'fechapago' readonly/>"
                            html += "</div>"
                        html += "</div>"
                        html +="<br>";
                    html += "<div class = 'form-row'>";
                        html += "<div class = 'col col-sm-12 CenterText'>";
                            html += "<button class = 'btn btn-primary' type = 'submit'>Guardar</button>"
                        html += "</div>";
                    html += "</div>"
                html += "</form>"
            html += "</div>"
            $(".content_modal").html(html);
            $(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        }
    }); 
}

function AgregarNuevoItem(){
    var t = ItemsOC;
    ItemsOC++;
    ItemsOCx.push(ItemsOC);
    var html = "";
    html += "<tr class = 'Item"+ItemsOC+"'>"
        html += "<td>";
            html += "<textarea class = 'form-control' rows = '1' name = 'articulo[]'></textarea>"
        html += "</td>"
        html += "<td>";
            html += "<input type = 'text' value = '0' class = 'form-control unidades unidades"+ItemsOC+"'  onkeyup = 'CalcularPedido()' />"
            html += "<input type = 'hidden' class = 'unidadesreal"+ItemsOC+"' name = 'unidades[]' value = '0' />"
        html += "</td>"
        html += "<td>";
            html += "<input type = 'text' class = 'form-control' name = 'valormedida[]' />"
        html += "</td>"
        html += "<td>";
            html += "<input type = 'text' class = 'form-control ' name = 'pedido[]'/>"
        html += "</td>"
        html += "<td>";
            html += "<input type = 'text' class = 'form-control valorunidad"+ItemsOC+"' value = '$ 0'onkeyup = 'CalcularPedido()'/>"
            html += "<input type = 'hidden' class = 'valorreal"+ItemsOC+"' name = 'valorunitario[]' value = '0' />"
        html += "</td>"
        html += "<td><table width = '100%'><tr><td style = 'width:10%;border:0px;'>$</td><td style = 'text-align:right;border:0px;' class = 'valortotal"+ItemsOC+"'></td></tr></table></td>"
    html += "</tr>"
    $(".Item"+(t)).after(html)
    var t = 0;
    $(".unidades"+ItemsOC).each(function(){
        if( t == 0 ){
            $(this).remove()
        }
        t++;
    })
    var t = 0;
    $(".unidadesreal"+ItemsOC).each(function(){
        if( t == 0 ){
            $(this).remove()
        }
        t++;
    })
    var t = 0;
    $(".valormedida"+ItemsOC).each(function(){
        if( t == 0 ){
            $(this).remove()
        }
        t++;
    })
    var t = 0;
    $(".valorunidad"+ItemsOC).each(function(){
        if( t == 0 ){
            $(this).remove()
        }
        t++;
    })
    var t = 0;
    $(".valorreal"+ItemsOC).each(function(){
        if( t == 0 ){
            $(this).remove()
        }
        t++;
    })
    var t = 0;
    $(".pedido"+ItemsOC).each(function(){
        if( t == 0 ){
            $(this).remove()
        }
        t++;
    })
}

function FormNuevaOc(id){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'DataInformacionFacturas',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
                html += "<div class='modal-header'>";
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<td nowrap>"
                                html += "<p></p><img src = '"+UrlUniversal+"image/check2.png' height='50px'  /> <span class = 'TituloBuscador'>Nueva Orden de Compra</span>";
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
                    html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"GuardarOc' method='post'>"
                        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
                        html += "<input type='hidden' name='idproveedor' value='" + id + "' />";
                        html += "<div class = 'form-group row'>";
                            html += "<div class = 'col col-sm-3'>"
                                html += "<label>Vigencia Inicial (MM/DD/AAAA):</label>"
                                html += "<input type = 'text' class = 'form-control DatePicker' name = 'vinicial' readonly/>"
                            html += "</div>"
                            html += "<div class = 'col col-sm-3'>"
                                html += "<label>Vigencia Final (MM/DD/AAAA):</label>"
                                html += "<input type = 'text' class = 'form-control DatePicker' name = 'vfinal' readonly/>"
                            html += "</div>"
                            html += "<div class = 'col col-sm-3'>"
                                html += "<label>Pago a:</label>"
                                html += "<select class = 'form-control' name = 'formapago'>"
                                    for(var i = 0; i < data.formapago.length;i++){
                                        html += "<option value = '"+data.formapago[i]['id']+"'>"+data.formapago[i]['nombre']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class = 'col col-sm-3'>"
                            html += "<p></p>"
                                html += "<img src = '"+UrlUniversal+"image/additem.png' class = 'IconBuscar' onclick = 'AgregarNuevoItem()'/> <label>Agregar Item</label>"
                            html += "</div>"
                        html += "</div>"
                        html += "<div class = 'form-group row'>";
                            html += "<div class = 'col col-sm-12'>";
                                html += "<table class = 'tableNew'>"
                                    html += "<tr>"
                                        html += "<th style = 'width:300px;'>Articulo</th>"
                                        html += "<th>Unidades</th>"
                                        html += "<th>Vr/Med</th>"
                                        html += "<th>Pedido</th>"
                                        html += "<th>Valor Unitario</th>"
                                        html += "<th>Total</th>"
                                    html += "</tr>"
                                    for(var i = 0; i < ItemsOCx.length; i++){
                                        html += "<tr class = 'Item"+ItemsOCx[i]+"'>"
                                            html += "<td>";
                                                html += "<textarea class = 'form-control' rows = '1' name = 'articulo[]'></textarea>"
                                            html += "</td>"
                                            html += "<td>";
                                                html += "<input type = 'text' value = '0' class = 'form-control unidades unidades"+ItemsOCx[i]+"'  onkeyup = 'CalcularPedido()' />"
                                                html += "<input type = 'hidden' class = 'unidadesreal"+ItemsOCx[i]+"' name = 'unidades[]' value = '0' />"
                                            html += "</td>"
                                            html += "<td>";
                                                html += "<input type = 'text' class = 'form-control valormedida"+ItemsOCx[i]+"' name = 'valormedida[]' />"
                                            html += "</td>"
                                            html += "<td>";
                                                html += "<input type = 'text' class = 'form-control pedido"+ItemsOCx[i]+"' name = 'pedido[]'/>"
                                            html += "</td>"
                                            html += "<td>";
                                                html += "<input type = 'text' class = 'form-control valorunidad"+ItemsOCx[i]+"' value = '$ 0'onkeyup = 'CalcularPedido()'/>"
                                                html += "<input type = 'hidden' class = 'valorreal"+ItemsOCx[i]+"' name = 'valorunitario[]' value = '0'/>"
                                            html += "</td>"
                                            html += "<td><table width = '100%'><tr><td style = 'width:10%;border:0px;'>$</td><td style = 'text-align:right;border:0px;' class = 'valortotal"+ItemsOCx[i]+"'></td></tr></table></td>"
                                        html += "</tr>"
                                    }
                                    html += "<tr>"
                                        html += "<td colspan = '5' class = 'CenterText'>TOTAL</td>"
                                        html += "<td>"
                                            html += "<table width = '100%'>"
                                                html += "<tr>"
                                                    html += "<td class = 'CenterText' style = 'width:20%;border:0px;'>$</td>"
                                                    html += "<td class = 'TotalFact' style = 'text-align:right;border:0px;'></td>"
                                                html += "</tr>"
                                            html += "</table>"
                                        html += "</td>"
                                    html += "</tr>"
                                html += "</table>"
                            html += "</div>";
                            
                        html += "</div>";
                        
                        html +="<br>";
                    html += "<div class = 'form-row'>";
                        html += "<div class = 'col col-sm-12 CenterText'>";
                            html += "<button class = 'btn btn-primary' type = 'submit'>Guardar</button>"
                        html += "</div>";
                    html += "</div>"
                html += "</form>"
            html += "</div>"
            $(".content_modal").html(html);
            $(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            for(var i = 0; i < ItemsOCx.length;i++){
                var t = 0;
                $(".unidades"+ItemsOCx[i]).each(function(){
                    if( t == 0 ){
                        $(this).remove()
                    }
                    t++;
                })
                var t = 0;
                $(".unidadesreal"+ItemsOCx[i]).each(function(){
                    if( t == 0 ){
                        $(this).remove()
                    }
                    t++;
                })
                var t = 0;
                $(".valormedida"+ItemsOCx[i]).each(function(){
                    if( t == 0 ){
                        $(this).remove()
                    }
                    t++;
                })
                var t = 0;
                $(".pedido"+ItemsOCx[i]).each(function(){
                    if( t == 0 ){
                        $(this).remove()
                    }
                    t++;
                })
                var t = 0;
                $(".valorunidad"+ItemsOC).each(function(){
                    if( t == 0 ){
                        $(this).remove()
                    }
                    t++;
                })
                var t = 0;
                $(".valorreal"+ItemsOC).each(function(){
                    if( t == 0 ){
                        $(this).remove()
                    }
                    t++;
                })
            }
        }
    }); 
}

function EditarProveedor(id){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'InformacionProveedor',
        data:{id:id,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
                html += "<div class='modal-header'>";
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<td nowrap>"
                                html += "<p></p><img src = '"+UrlUniversal+"image/editar.png' height='50px'  /> <span class = 'TituloBuscador'>Editar Proveedor</span>";
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
                    html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"ActualizarInfoProveedor' method='post'>"
                        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
                        html += "<input type='hidden' name='id' value='" + data.proveedor[0]['id'] + "' />";
                        
                        html += "<div class = 'form-group row'>";
                            html += "<div class = 'col col-sm-6'>";
                                html += "<label>Nit:</label>";
                                html += "<input type = 'text' class = 'form-control' name = 'nit' value = '" + data.proveedor[0]['nit'] + "'required/>"
                            html += "</div>";
                            html += "<div class = 'col col-sm-6'>";
                                html += "<label>Nombre Comercial:</label>";
                                html += "<input type = 'text' class = 'form-control' name = 'ncomercial' value = '" + data.proveedor[0]['nombrecomercial'] + "' required />"
                            html += "</div>";
                            
                        html += "</div>";
                        html += "<div class = 'form-group row'>";
                            html += "<div class = 'col col-sm-6'>";
                                html += "<label>Nombre Legal:</label>";
                                html += "<input type = 'text' class = 'form-control' name = 'nlegal' value = '" + data.proveedor[0]['nombrelegal'] + "' required/>"
                            html += "</div>";
                            html += "<div class = 'col col-sm-6'>";
                                html += "<label>Dirección:</label>";
                                html += "<input type = 'text' class = 'form-control' name = 'direccion' required value = '" + data.proveedor[0]['direccion'] + "'/>"
                            html += "</div>";
                            
                        html += "</div>";
                        
                        html += "<div class = 'form-group row'>";
                            html += "<div class = 'col col-sm-6'>";
                                html += "<label>Teléfono:</label>";
                                html += "<input type = 'text' class = 'form-control' name = 'telefono' required value = '" + data.proveedor[0]['telefono'] + "'/>"
                            html += "</div>";
                            html += "<div class = 'col col-sm-6'>";
                                html += "<label>Celular:</label>";
                                html += "<input type = 'text' class = 'form-control' name = 'celular' required value = '" + data.proveedor[0]['celular'] + "'/>"
                            html += "</div>";
                        html += "</div>";
                        html += "<div class = 'form-group row'>";
                            html += "<div class = 'col col-sm-6'>";
                                html += "<label>Correo:</label>";
                                html += "<input type = 'mail' class = 'form-control' name = 'correo' value = '" + data.proveedor[0]['correo'] + "' required/>"
                            html += "</div>";
                            html += "<div class = 'col col-sm-6'>";
                                html += "<label>Estado:</label><p></p>";
                                
                                if(  data.proveedor[0]['estado'] == 1){
                                    html += "<div class='form-check form-check-inline'>";
                                        html += "<input class='form-check-input' type='radio' name = 'estado' id='estadoA' value='1' checked >";
                                        html += "<label class='form-check-label' for='estadoA' style = 'font-weight:500;'>Activo</label>";
                                    html += "</div>";
                                    html += "<div class='form-check form-check-inline'>";
                                        html += "<input class='form-check-input' type='radio' name = 'estado' id='estadoE' value='0' >";
                                        html += "<label class='form-check-label' for='estadoE' style = 'font-weight:500;'>Inactivo</label>";
                                    html += "</div>";
                                }else{
                                    html += "<div class='form-check form-check-inline'>";
                                        html += "<input class='form-check-input' type='radio' name = 'estado' id='estadoA' value='1' >";
                                        html += "<label class='form-check-label' for='estadoA' style = 'font-weight:500;'>Activo</label>";
                                    html += "</div>";
                                    html += "<div class='form-check form-check-inline'>";
                                        html += "<input class='form-check-input' type='radio' name = 'estado' id='estadoE' value='0' checked >";
                                        html += "<label class='form-check-label' for='estadoE' style = 'font-weight:500;'>Inactivo</label>";
                                    html += "</div>";
                                }
                                    
                            html += "</div>";
                        html += "</div>";
                        html +="<br>";
                    html += "<div class = 'form-row'>";
                        html += "<div class = 'col col-sm-12 CenterText'>";
                            html += "<button class = 'btn btn-primary' type = 'submit'>Guardar</button>"
                        html += "</div>";
                    html += "</div>"
                html += "</form>"
            html += "</div>"
            $(".content_modal").html(html);
            $(".select2").select2();
            $(".DatePicker").datepicker({ dateFormat: 'yy-mm-dd' });
            $("#ModalContentForm").removeClass('modal-lg').removeClass('modal-xs').addClass('modal-xl');
        }
    });
}

function NuevoContactoProveedor(id){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"image/nuevoproveedor.png' height='50px'  /> <span class = 'TituloBuscador'>Nuevo Contacto</span>";
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
        html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"GuardarContactoProveedor' method='post'>"
            html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
            html += "<input type='hidden' name='id' value='" + id + "' />";

            html += "<div class = 'form-group row'>";
                html += "<div class = 'col col-sm-6'>";
                    html += "<label>Nombre:</label>";
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'nombre' required/>"
                html += "</div>";
                html += "<div class = 'col col-sm-6'>";
                    html += "<label>Cargo:</label>";
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'cargo' />"
                html += "</div>";

            html += "</div>";
            html += "<div class = 'form-group row'>";
                html += "<div class = 'col col-sm-6'>";
                    html += "<label>Teléfono:</label>";
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'telefono' />"
                html += "</div>";
                html += "<div class = 'col col-sm-6'>";
                    html += "<label>Celular:</label>";
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'celular' />"
                html += "</div>";

            html += "</div>";
            html += "<div class = 'form-group row'>";
                html += "<div class = 'col col-sm-6'>";
                    html += "<label>Correo:</label>";
                    html += "<input autocomplete = 'off' type = 'mail' class = 'form-control' name = 'correo' required/>"
                html += "</div>";
            html += "</div>";
            html +="<br>";
        html += "<div class = 'form-row'>";
            html += "<div class = 'col col-sm-12 CenterText'>";
                html += "<button class = 'btn btn-primary' type = 'submit'>Guardar</button>"
            html += "</div>";
        html += "</div>"
    html += "</form>"
html += "</div>"
$(".content_modal").html(html);
$("#ModalContentForm").removeClass('modal-lg').removeClass('modal-xs').addClass('modal-xl');
}

function EditarContactoProveedor(id,idproveedor){
   $.ajax({
        type:'POST',
        url:UrlUniversal+'DatosContactoProveedor',
        data:{id:id,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header'>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td nowrap>"
                            html += "<p></p><img src = '"+UrlUniversal+"image/editar.png' height='50px'  /> <span class = 'TituloBuscador'>Editar Contacto</span>";
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
                html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"ActualizarContactoProveedor' method='post'>"
                    html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
                    html += "<input type='hidden' name='id' value='" + id + "' />";
                    html += "<input type='hidden' name='idp' value='" + idproveedor + "' />";

                    html += "<div class = 'form-group row'>";
                        html += "<div class = 'col col-sm-6'>";
                            html += "<label>Nombre:</label>";
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'nombre' value = '"+data.contacto[0]['nombre']+"'required/>"
                        html += "</div>";
                        html += "<div class = 'col col-sm-6'>";
                            html += "<label>Cargo:</label>";
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'cargo' value = '"+data.contacto[0]['cargo']+"'/>"
                        html += "</div>";

                    html += "</div>";
                    html += "<div class = 'form-group row'>";
                        html += "<div class = 'col col-sm-6'>";
                            html += "<label>Teléfono:</label>";
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'telefono' value = '"+data.contacto[0]['telefono']+"'/>"
                        html += "</div>";
                        html += "<div class = 'col col-sm-6'>";
                            html += "<label>Celular:</label>";
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'celular' value = '"+data.contacto[0]['celular']+"'/>"
                        html += "</div>";

                    html += "</div>";
                    html += "<div class = 'form-group row'>";
                        html += "<div class = 'col col-sm-6'>";
                            html += "<label>Correo:</label>";
                            html += "<input autocomplete = 'off' type = 'mail' class = 'form-control' name = 'correo' required value = '"+data.contacto[0]['correo']+"'/>"
                        html += "</div>";
                    html += "</div>";
                    html +="<br>";
                html += "<div class = 'form-row'>";
                    html += "<div class = 'col col-sm-12 CenterText'>";
                        html += "<button class = 'btn btn-primary' type = 'submit'>Guardar</button>"
                    html += "</div>";
                html += "</div>"
            html += "</form>"
        html += "</div>"
        $(".content_modal").html(html);
        $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        } 
    })
}

function FormProveedor(){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'DatosDonaciones',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
                html += "<div class='modal-header'>";
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<td nowrap>"
                                html += "<p></p><img src = '"+UrlUniversal+"image/nuevoproveedor.png' height='50px'  /> <span class = 'TituloBuscador'>Nuevo Proveedor</span>";
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
                    html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"NuevoProveedor' method='post'>"
                        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
                        
                        html += "<div class = 'form-group row'>";
                            html += "<div class = 'col col-sm-4'>";
                                html += "<label>Nit:</label>";
                                html += "<input type = 'text' class = 'form-control' name = 'nit' required/>"
                            html += "</div>";
                            html += "<div class = 'col col-sm-4'>";
                                html += "<label>Nombre Comercial:</label>";
                                html += "<input type = 'text' class = 'form-control' name = 'ncomercial' required />"
                            html += "</div>";
                            html += "<div class = 'col col-sm-4'>";
                                html += "<label>Nombre Legal:</label>";
                                html += "<input type = 'text' class = 'form-control' name = 'nlegal' required/>"
                            html += "</div>";
                        html += "</div>";
                        html += "<div class = 'form-group row'>";
                            html += "<div class = 'col col-sm-4'>";
                                html += "<label>Dirección:</label>";
                                html += "<input type = 'text' class = 'form-control' name = 'direccion' required />"
                            html += "</div>";
                            html += "<div class = 'col col-sm-4'>";
                                html += "<label>Teléfono:</label>";
                                html += "<input type = 'text' class = 'form-control' name = 'telefono' required/>"
                            html += "</div>";
                            html += "<div class = 'col col-sm-4'>";
                                html += "<label>Celular:</label>";
                                html += "<input type = 'text' class = 'form-control' name = 'celular' required/>"
                            html += "</div>";
                        html += "</div>";
                        html += "<div class = 'form-group row'>";
                            html += "<div class = 'col col-sm-4'>";
                                html += "<label>Correo:</label>";
                                html += "<input type = 'mail' class = 'form-control' name = 'correo' required/>"
                            html += "</div>";
                        html += "</div>";
                        html +="<br>";
                    html += "<div class = 'form-row'>";
                        html += "<div class = 'col col-sm-12 CenterText'>";
                            html += "<button class = 'btn btn-primary' type = 'submit'>Guardar</button>"
                        html += "</div>";
                    html += "</div>"
                html += "</form>"
            html += "</div>"
            $(".content_modal").html(html);
            $(".select2").select2();
            $(".DatePicker").datepicker({ dateFormat: 'yy-mm-dd' });
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        }
    }); 
}

function FormSolicitudes(){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'ListSolicitudesAdmin',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
                html += "<div class='modal-header'>";
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<td nowrap>"
                                html += "<p></p><img src = '"+UrlUniversal+"image/Administracion.png' height='50px'  /> <span class = 'TituloBuscador'>Nueva Solicitud Admnistrativa</span>";
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
                    html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"GuardarSolicitudAdmin' method='post'>"
                        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
                        
                        html += "<div class = 'form-group row'>";
                            html += "<div class = 'col col-sm-12'>";
                                html += "<label>Tipo Solicitud:</label>";
                                html += "<select class = 'form-control' name = 'idsol'>";
                                for(var i = 0; i < data.List.length;i++){
                                    html += "<option value = '"+data.List[i]['id']+"'>"+data.List[i]['nombre']+"</option>"
                                }
                                html += "</select>"
                            html += "</div>";
                        html += "</div>";
                        html += "<div class = 'form-group row'>";
                            html += "<div class = 'col col-sm-12'>";
                                html += "<label>Observaciones:</label>";
                                html += "<textarea class = 'form-control' name = 'observaciones'></textarea>";
                            html += "</div>";
                        html += "</div>";
                        html += "<div class = 'form-row'>";
                        html += "<div class = 'col col-sm-12'>";
                            html += "<div class='custom-file mb-12'>";
                                html += "<input type = 'file' class = 'custom-file-input' onchange = 'CambiarTextoFoto(1)' id = 'foto1' name = 'foto1'/>";
                                html += "<label class='custom-file-label' for='foto1' id = 'NameFoto1'>Seleccione Archivo</label>";
                            html += "</div>";
                        html += "</div>";
                    html += "</div>"
                        html +="<br>";
                    html += "<div class = 'form-row'>";
                        html += "<div class = 'col col-sm-12 CenterText'>";
                            html += "<button class = 'btn btn-primary' type = 'submit'>Guardar</button>"
                        html += "</div>";
                    html += "</div>"
                    
                html += "</form>"
            html += "</div>"
            $(".content_modal").html(html);
            $(".select2").select2();
            $(".DatePicker").datepicker({ dateFormat: 'yy-mm-dd' });
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        }
    }); 
}

function formatValorDonacion(){
    var tval = $(".valordonacion").val();
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
            var val_final = "";
            for(var i = 0;i < val.length; i++){
                    val_final += ""+val[i];
            }
        }
        $(".valordonacion").val("$ "+formatNumber.new(val_final));
        $(".valorrealdonacion").val(val_final);
        $(".valorrealdonacion2").text(val_final);
    }
}

function formatConceptoFactura(id){
    var tval = $(".Valorx"+id).val();
    
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
            var val_final = "";
            for(var i = 0;i < val.length; i++){
                    val_final += ""+val[i];
            }
        }
        $(".Valorx"+id).val("$ "+formatNumber.new(val_final));
        $(".Valorc"+id).val(val_final);
    }
}
function formatValorDonacionTasa(){
    var tval = $(".valortasa").val();
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
            var val_final = "";
            for(var i = 0;i < val.length; i++){
                    val_final += ""+val[i];
            }
        }
        $(".valortasa").val("$ "+formatNumber.new(val_final));
        $(".valortasadonacion").val(val_final);
    }
}

function FormDonaciones(){
    
    $.ajax({
        type:'POST',
        url:UrlUniversal+'DatosDonaciones',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
                html += "<div class='modal-header'>";
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<td nowrap>"
                                html += "<p></p><img src = '"+UrlUniversal+"image/Administracion.png' height='50px'  /> <span class = 'TituloBuscador'>Nueva Donación</span>";
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
                    html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"GuardarDonacion' method='post'>"
                        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
                        
                        html += "<div class = 'form-group row'>";
                            html += "<div class = 'col col-sm-3'>";
                                html += "<label>Pais:</label>";
                                html += "<select class = 'form-control' name = 'pais' required>";
                                    for(var i=0; i<data.Pais.length;i++){
                                        html += "<option value = '"+data.Pais[i]['id']+"'>"+data.Pais[i]['nombre']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>";
                            html += "<div class = 'col col-sm-3'>";
                                html += "<label>Fecha (MM/DD/AAAA):</label>";
                                html += "<input autocomplete='off' type='text' class ='form-control DatePicker' readonly name ='fecha' required/>";
                            html += "</div>";
                            html += "<div class = 'col col-sm-3'>";
                                html += "<label>Tercero:</label>";
                                html += "<input autocomplete='off'  type='text' class ='form-control'  name ='tercero' required/>";
                            html += "</div>";
                            html += "<div class = 'col col-sm-3'>";
                                html += "<label>Correo:</label>";
                                html += "<input autocomplete='off'  type='email' class ='form-control'  name ='correo' required/>";
                            html += "</div>";
                        html += "</div>";
                        html += "<div class = 'form-group row'>";
                            html += "<div class = 'col col-sm-3'>";
                                html += "<label>Moneda:</label>";
                                html += "<select class = 'form-control' name = 'moneda'>";
                                    for(var i=0; i<data.Moneda.length;i++){
                                        html += "<option value = '"+data.Moneda[i]['id']+"'>"+data.Moneda[i]['nombre']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>";
                            html += "<div class = 'col col-sm-3'>";
                                html += "<label>Cantidad:</label>";
                                html += "<input autocomplete='off' value = '0' type='number' min = '0' class ='form-control'  name ='cantidad' />";
                            html += "</div>";
                            html += "<div class = 'col col-sm-3'>";
                                html += "<label>Valor:</label>";
                                html += "<input autocomplete='off' onkeyup = 'formatValorDonacion()' type='text' class = 'form-control valordonacion' value = '$ ' />";
                                html += "<input type='hidden' class ='form-control valorrealdonacion' name = 'valor' value = '0' />";
                                html += "<span style = 'display:none;' class = 'valorrealdonacion2'></span>";
                            html += "</div>";
                            html += "<div class = 'col col-sm-3'>";
                                html += "<label>Recibo de Caja:</label>";
                                html += "<input autocomplete='off'  type='text' class ='form-control'  name ='recibo' />";
                            html += "</div>";
                        html += "</div>";
                        html += "<div class = 'form-group row'>";
                            html += "<div class = 'col col-sm-3'>";
                                html += "<label>Tasa de Cambio:</label>";
                                html += "<input autocomplete='off' onkeyup = 'formatValorDonacionTasa()' type='text' class = 'form-control valortasa' value = '$ ' />";
                                html += "<input type='hidden' class ='form-control valortasadonacion' name = 'valortasa' value = '0' />";
                            html += "</div>";
                        html += "</div>";
                        
                    html += "<div class = 'form-row'>"
                        html += "<div class = 'col col-sm-12'>"
                            html += "<label>Observaciones:</label>";
                                html += "<textarea class = 'form-control' name = 'observaciones'></textarea>";
                        html += "</div>"
                    html += "</div><br>";
                    html += "<div class = 'form-row'>";
                        html += "<div class = 'col col-sm-12 CenterText'>";
                            html += "<button class = 'btn btn-primary' type = 'submit'>Guardar</button>"
                        html += "</div>";
                    html += "</div>"
                html += "</form>"
            html += "</div>"
            $(".content_modal").html(html);
            $(".select2").select2();
            $(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            var x = 0;
            $(".valordonacion").each(function(){
                if( x == 0 ){
                    $(this).remove()
                }
                x++;
            })
            var x = 0;
            $(".valorrealdonacion").each(function(){
                if( x == 0 ){
                    $(this).remove()
                }
                x++;
            })
            var x = 0;
            $(".valortasa").each(function(){
                if( x == 0 ){
                    $(this).remove()
                }
                x++;
            })
            var x = 0;
            $(".valortasadonacion").each(function(){
                if( x == 0 ){
                    $(this).remove()
                }
                x++;
            })
        }
    }); 
}

function EditarInformacionFactura(id){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'EditarInformacionFactura',
        data:{id:id,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var totalFact = 0;
            for(var i = 0; i < data.Factura[0]['Conceptos'].length;i++){
                totalFact+= data.Factura[0]['Conceptos'][i]['valor'];
            }
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
                    html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"ActualizarFacturas' method='post'>"
                        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
                        html += "<input type='hidden' name='id' value='" + data.Factura[0]['id'] + "' />";
                        
                        html += "<div class = 'form-group row'>";
                            html += "<div class = 'col col-sm-3'>";
                                html += "<label>Número Factura:</label>";
                                html += "<input autocomplete='off' type='text' class ='form-control' id ='NumFactura' name ='NumFactura' value = '"+data.Factura[0]['factura']+"'/>";
                            html += "</div>";
                            html += "<div class = 'col col-sm-3'>";
                                html += "<label>Fecha Factura:</label>";
                                html += "<input autocomplete='off' type='text' class ='form-control DatePicker' id ='FechaFact' readonly name ='FechaFact' value = '"+data.Factura[0]['fechafactura']+"'/>";
                            html += "</div>";
                            html += "<div class = 'col col-sm-3'>";
                                html += "<label>Valor Factura:</label>";
                                html += "<input autocomplete='off'  type='text' class ='form-control Valortotal' readonly value = '"+formatNumber.new(totalFact)+"' id ='ValFact' name ='ValFact' />";
                            html += "</div>";
                            html += "<div class = 'col col-sm-3'>";
                                html += "<label>Familia:</label>";
                                html += "<select class = 'form-control' name = 'familia' required>";
                                    html += "<option value = '"+data.Factura[0]['idfamilia']+"' >"+data.Factura[0]['familianame']+"</option>"
                                html += "</select>"
                            html += "</div>";
                        html += "</div>";
                    html += "<br>";
                    html += "<div class = 'form-row'>"
                        html += "<div class = 'col col-sm-12'>"
                            html += "<table class = 'tableNew'>"
                                html += "<tr>"
                                    html += "<th>Concepto</th>"
                                    html += "<th>Valor</th>"
                                    html += "<th>Fecha Pago</th>"
                                html += "</tr>"
                                for(var i = 0; i < data.Factura[0]['Conceptos'].length;i++){
                                    html += "<tr>"
                                        html += "<td>"
                                            html += "<input type = 'hidden' class = 'form-control' name = '_id[]' value = '"+data.Factura[0]['Conceptos'][i]['id']+"'/>"
                                            html += "<input type = 'text' readonly class = 'form-control' value = '"+data.Factura[0]['Conceptos'][i]['nombre']+"'/>"
                                        html += "</td>"
                                        html += "<td>"
                                            html += "<input type = 'text'  min = '0' class = 'form-control Valorx"+data.Factura[0]['Conceptos'][i]['id']+"'  value ='$ "+formatNumber.new(data.Factura[0]['Conceptos'][i]['valor'])+"' onkeyup = 'formatConceptoFactura("+data.Factura[0]['Conceptos'][i]['id']+");CalcularTotalFactura();'/>"
                                            
                                            html += "<input type = 'hidden' value = '"+data.Factura[0]['Conceptos'][i]['valor']+"' class = 'Valor Valorc"+data.Factura[0]['Conceptos'][i]['id']+"' name = 'valor[]'/>"
                                        html += "</td>"
                                        html += "<td>"
                                            html += "<input type = 'text'  readonly min = '0' class = 'form-control DatePicker' name = 'fechapago[]' value ='"+data.Factura[0]['Conceptos'][i]['fecha']+"' />"
                                        html += "</td>"
                                    html += "</tr>"
                                }
                            html += "</table>"
                        html += "</div>"
                    html += "</div><br>";
                    html += "<div class = 'form-row'>";
                        html += "<div class = 'col col-sm-12 CenterText'>";
                            html += "<button class = 'btn btn-primary' type = 'submit'>Guardar Pago</button>"
                        html += "</div>";
                    html += "</div>"
                html += "</form>"
            html += "</div>"
            $(".content_modal").html(html);
            $(".DatePicker").datepicker({ dateFormat: 'yy-mm-dd' });
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            for(var i = 0; i < data.Factura[0]['Conceptos'].length;i++){
                var x = 0;
                $(".Valorc"+data.Factura[0]['Conceptos'][i]['id']).each(function(){
                    if( x == 0 ){
                        $(this).remove()
                    }
                    x++;
                })
                var x = 0;
                $(".Valorx"+data.Factura[0]['Conceptos'][i]['id']).each(function(){
                    if( x == 0 ){
                        $(this).remove()
                    }
                    x++;
                })
            }
            var x = 0;
            $(".Valortotal").each(function(){
                if( x == 0 ){
                    $(this).remove()
                }
                x++;
            })
            CalcularTotalFactura();
        }
    }); 
}

function FacturarFamiliaAdopciones(){
   $.ajax({
        type:'POST',
        url:UrlUniversal+'InformacionFacturacionFamilia',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
                html += "<div class='modal-header'>";
                    html += "<table width = '100%'>"
                        html += "<tr>"
                            html += "<td nowrap>"
                                html += "<p></p><img src = '"+UrlUniversal+"image/Administracion.png' height='50px'  /> <span class = 'TituloBuscador'>Nueva Factura</span>";
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
                    html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"GuardarPagoAdopciones' method='post'>"
                        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
                        
                        html += "<div class = 'form-group row'>";
                            html += "<div class = 'col col-sm-3'>";
                                html += "<label>Número Factura:</label>";
                                html += "<input autocomplete='off' type='text' class ='form-control' id ='NumFactura' name ='NumFactura' />";
                            html += "</div>";
                            html += "<div class = 'col col-sm-3'>";
                                html += "<label>Fecha Factura:</label>";
                                html += "<input autocomplete='off' type='text' class ='form-control DatePicker' id ='FechaFact' readonly name ='FechaFact' />";
                            html += "</div>";
                            html += "<div class = 'col col-sm-3'>";
                                html += "<label>Valor Factura:</label>";
                                html += "<input autocomplete='off'  type='text' class ='form-control Valortotal' readonly value = '0' id ='ValFact' name ='ValFact' />";
                            html += "</div>";
                            html += "<div class = 'col col-sm-3'>";
                                html += "<label>Familia:</label>";
                                html += "<select class = 'form-control' name = 'familia' required>";
                                    for(var i = 0; i < data.Familias.length;i++){
                                        html += "<option value = '"+data.Familias[i]['id']+"' >"+data.Familias[i]['familianame']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>";
                        html += "</div>";
                    html += "<br>";
                    html += "<div class = 'form-row'>"
                        html += "<div class = 'col col-sm-12'>"
                            html += "<table class = 'tableNew'>"
                                html += "<tr>"
                                    html += "<th>Concepto</th>"
                                    html += "<th>Valor</th>"
                                html += "</tr>"
                                for(var i = 0; i < data.Conceptos.length;i++){
                                    html += "<tr>"
                                        html += "<td>"
                                            html += "<input type = 'hidden' class = 'form-control' name = '_id[]' value = '"+data.Conceptos[i]['id']+"' />"
                                            html += "<input type = 'text' readonly class = 'form-control' value = '"+data.Conceptos[i]['nombre']+"'/>"
                                        html += "</td>"
                                        html += "<td>"
                                            html += "<input type = 'text' class = 'form-control Valorx"+data.Conceptos[i]['id']+"' value = '$ '  onkeyup = 'formatConceptoFactura("+data.Conceptos[i]['id']+");CalcularTotalFactura();'/>"
                                            html += "<input type = 'hidden' value = '0' class = 'Valor Valorc"+data.Conceptos[i]['id']+"' name = 'valor[]'/>"
                                        html += "</td>"
                                    html += "</tr>"
                                }
                            html += "</table>"
                        html += "</div>"
                    html += "</div><br>";
                    html += "<div class = 'form-row'>";
                        html += "<div class = 'col col-sm-12 CenterText'>";
                            html += "<button class = 'btn btn-primary' type = 'submit'>Guardar Pago</button>"
                        html += "</div>";
                    html += "</div>"
                html += "</form>"
            html += "</div>"
            
            $(".content_modal").html(html);
            $(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
            for(var i = 0; i < data.Conceptos.length;i++){
                var x = 0;
                $(".Valorc"+data.Conceptos[i]['id']).each(function(){
                    if( x == 0 ){
                        $(this).remove()
                    }
                    x++;
                })
                var x = 0;
                $(".Valorx"+data.Conceptos[i]['id']).each(function(){
                    if( x == 0 ){
                        $(this).remove()
                    }
                    x++;
                })
            }
            var x = 0;
            $(".Valortotal").each(function(){
                if( x == 0 ){
                    $(this).remove()
                }
                x++;
            })
            
        }
    }); 
}

function CrearTransferencia(id){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'InfoCasasTesoreria',
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
                    html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"NuevaTransferencia' method='post'>"
                        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
                        
                        html += "<div class = 'form-group row'>"
                            html += "<div class = 'col-sm-3'>"
                                html += "<label>Casa:</label>"
                                html += "<select class = 'form-control' name = 'casa'>"
                                    for(var i = 0; i < data.Casas.length;i++){
                                        html += "<option value = '"+data.Casas[i]['id']+"' >"+data.Casas[i]['nombre']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class = 'col-sm-3'>"
                                html += "<label>Documento:</label>"
                                html += "<input  autocomplete = 'off'  type = 'text' name = 'documento' class = 'form-control' value = '' required/>"
                            html += "</div>"
                            html += "<div class = 'col-sm-3'>"
                                html += "<label>Recibe:</label>"
                                html += "<input  autocomplete = 'off'  type = 'text' class = 'form-control' name = 'recibe'/>"
                            html += "</div>"
                            html += "<div class = 'col-sm-3'>"
                                html += "<label>Fecha:</label>"
                                html += "<input  autocomplete = 'off'  type = 'text' class = 'form-control DatePicker' readonly name = 'fecha' required/>"
                            html += "</div>"
                        html += "</div><br>"
                        
                        
                        html += "<div class = 'form-group row'>"
                            html += "<div class = 'col-sm-12 flex-center'>"
                                html += "<button class = 'btn btn-primary' type = 'Submit'>Guardar</button>"
                            html += "</div>"
                        html += "</div>"
                    html += "</form>"
            html += "</div>"
            $(".content_modal").html(html);
            $(".DatePicker").datepicker({ dateFormat: 'yy-mm-dd' });
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        }
    });
}

function EditarTransferencia(id){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'InfoRegistroTransferencia',
        data:{id:id,_token:document.getElementsByName('_token')[0].value},
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
                    html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"ActualizarInfoTransferencia' method='post'>"
                        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
                        html += "<input type='hidden' name='id' value='" + id + "' />";
                        
                        html += "<div class = 'form-group row'>"
                            html += "<div class = 'col-sm-3'>"
                                html += "<label>Casa:</label>"
                                html += "<select class = 'form-control' name = 'casa'>"
                                    for(var i = 0; i < data.Casas.length;i++){
                                        if( data.Casas[i]['id'] == data.Data[0]['idcasa'] ){
                                            html += "<option value = '"+data.Casas[i]['id']+"'selected >"+data.Casas[i]['nombre']+"</option>"
                                        }else{
                                            html += "<option value = '"+data.Casas[i]['id']+"' >"+data.Casas[i]['nombre']+"</option>"
                                        }
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class = 'col-sm-3'>"
                                html += "<label>Documento:</label>"
                                html += "<input autocomplete = 'off' type = 'text' name = 'documento' class = 'form-control' value = '"+data.Data[0]['documento']+"' required/>"
                            html += "</div>"
                            html += "<div class = 'col-sm-3'>"
                                html += "<label>Recibe:</label>"
                                html += "<input  autocomplete = 'off'  type = 'text' class = 'form-control' value = '"+data.Data[0]['recibe']+"'name = 'recibe'/>"
                            html += "</div>"
                            html += "<div class = 'col-sm-3'>"
                                html += "<label>Fecha:</label>"
                                html += "<input  autocomplete = 'off'  type = 'text' class = 'form-control DatePicker' readonly value = '"+data.Data[0]['fecha']+"'name = 'fecha' required/>"
                            html += "</div>"
                        html += "</div><br>"
                        
                        
                        html += "<div class = 'form-group row'>"
                            html += "<div class = 'col-sm-12 flex-center'>"
                                html += "<button class = 'btn btn-primary' type = 'Submit'>Guardar</button>"
                            html += "</div>"
                        html += "</div>"
                    html += "</form>"
            html += "</div>"
            $(".content_modal").html(html);
            $(".DatePicker").datepicker({ dateFormat: 'yy-mm-dd' });
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        }
    });
}


function EliminarTransferencia(id){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'BorrarTransferencia',
        data:{id:id,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
             location.reload();
        }
    });
}

function BuscarCxC(){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'DataCXC',
        data:{year:$("#yearcc").val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<table class = 'tableNew'>";
                html += "<tr>"
                    html += "<th>No.</th>"
                    html += "<th>Tipo Familia</th>"
                    html += "<th>Familia</th>"
                    html += "<th>Pais</th>"
                    html += "<th>Solicitante 1</th>"
                    html += "<th>Solicitante 2</th>"
                    html += "<th>Correo</th>"
                    html += "<th>Teléfono Principal</th>"
                    html += "<th>Teléfono Secundario</th>"
                    html += "<th>Factura</th>"
                    html += "<th>Total Factura</th>"
                    html += "<th>Saldo Pendiente</th>"
                html += "</tr>"
                if( data.cc.length == 0 ){
                    html += "<tr>"
                        html += "<td class = 'CenterText' colspan = '12'>No se encontraron facturas pendientes por cobrar.</td>"
                    html += "<tr>"
                }else{
                    var totalCartera = 0;
                    var totalFacturas = 0;
                    for(var i = 0; i < data.cc.length; i++){
                        if( data.cc[i]['valor'].length != 0 ){
                            totalCartera += data.cc[i]['valor'][0]['pendiente'];
                        }
                        totalFacturas += data.cc[i]['valorx'];
                        html += "<tr>"
                            html += "<td class = 'CenterText'>"+data.cc[i]['Num']+"</td>"
                            html += "<td >"+data.cc[i]['TipoFamilia']+"</td>"
                            html += "<td >"+data.cc[i]['FamiliaName']+"</td>"
                            html += "<td >"+data.cc[i]['Pais']+"</td>"
                            html += "<td >"+data.cc[i]['Sol1']+"</td>"
                            html += "<td >"+data.cc[i]['Sol2']+"</td>"
                            html += "<td >"+data.cc[i]['correocontacto']+"</td>"
                            html += "<td >"+data.cc[i]['telefonocontacto']+"</td>"
                            html += "<td >"+data.cc[i]['celularcontacto']+"</td>"
                            html += "<td >"+data.cc[i]['factura']+"</td>"
                            html += "<td >"
                                html +="<table width = '100%'>"
                                    html += "<tr>"
                                        html += "<td style = 'width:20%;border:0px;' class = 'CenterText'>$</td>"
                                        html += "<td style = 'text-align:right;border:0px;'>"+formatNumber.new(data.cc[i]['valorx'])+"</td>"
                                    html += "</tr>"
                                html += "</table>"
                            html += "</td>"
                            html += "<td >"
                                html +="<table width = '100%'>"
                                    html += "<tr>"
                                        html += "<td style = 'width:20%;border:0px;' class = 'CenterText'>$</td>"
                                        var pendiente = 0;
                                        if( data.cc[i]['valor'].length != 0 ){
                                            pendiente = data.cc[i]['valor'][0]['pendiente'];
                                        }
                                        html += "<td style = 'text-align:right;border:0px;'>"+formatNumber.new(data.cc[i]['valorx']-pendiente)+"</td>"
                                    html += "</tr>"
                                html += "</table>"
                            html += "</td>"
                        html += "</tr>"
                    }
                    html += "<tr>"
                        html += "<td class = 'CenterText' style = 'background-color:#7f9fce;' colspan = '10'>Total Cartera</td>"
                        html += "<td style = 'background-color:#7f9fce;'>"
                            html +="<table width = '100%'>"
                                html += "<tr>"
                                    html += "<td style = 'width:20%;border:0px;background-color:transparent;' class = 'CenterText'>$</td>"
                                    html += "<td style = 'text-align:right;border:0px;background-color:transparent;'>"+formatNumber.new(totalFacturas)+"</td>"
                                html += "</tr>"
                            html += "</table>"
                        html += "</td>"
                        html += "<td style = 'background-color:#7f9fce;'>"
                            html +="<table width = '100%' style = 'background-color:transparent;'>"
                                html += "<tr>"
                                    html += "<td style = 'width:20%;border:0px;background-color:transparent;' class = 'CenterText'>$</td>"
                                    html += "<td style = 'text-align:right;border:0px;background-color:transparent;'>"+formatNumber.new(totalFacturas-totalCartera)+"</td>"
                                html += "</tr>"
                            html += "</table>"
                        html += "</td>"
                    html += "<tr>"
                }
            html += "</table>";
            $(".ContenedorCuentas").html(html)
            $(".ContenedorCuentas th").css({'font-size':'12px'})
            $(".ContenedorCuentas td").css({'font-size':'12px'})
        }
    });
}

function BuscarCxP(){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'DataCXP',
        data:{year:$("#yearcc").val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            var total = 0;
            html += "<table class = 'tableNew'>";
                if( data.cc.length == 0 ){
                    html += "<tr>"
                        html += "<td class = 'CenterText' colspan = '12'>No se encontraron facturas pendientes por pagar.</td>"
                    html += "<tr>"
                }else{
                    for(var i = 0; i < data.cc.length;i++){
                        total += data.cc[i]['total'];
                        html += "<tr>"
                            html += "<th colspan = '8' class = 'CenterText border_top_left border_top_right' style = 'background-color:#7f9fce;color:white;'>"+data.cc[i]['nombre']+"</th>"
                        html += "<tr>"
                        html += "<tr>"
                            html += "<th style = 'background-color:#F7EFB0;'>No.</th>"
                            html += "<th style = 'background-color:#F7EFB0;'>Proveedor</th>"
                            html += "<th style = 'background-color:#F7EFB0;'>OC</th>"
                            html += "<th style = 'background-color:#F7EFB0;'>Fecha</th>"
                            html += "<th style = 'background-color:#F7EFB0;'>Estado</th>"
                            html += "<th style = 'background-color:#F7EFB0;'>Factura Proveedor</th>"
                            html += "<th style = 'background-color:#F7EFB0;'>Fecha Recepción</th>"
                            html += "<th style = 'background-color:#F7EFB0;'>Valor</th>"
                        html += "</tr>"
                        for(var x = 0; x < data.cc[i]['detalle'].length;x++){
                            html += "<td class = 'CenterText'>"+data.cc[i]['detalle'][x]['Num']+"</td>"
                            html += "<td >"+data.cc[i]['detalle'][x]['proveedor']+"</td>"
                            html += "<td class = 'CenterText'>"+data.cc[i]['detalle'][x]['id']+"</td>"
                            html += "<td class = 'CenterText'>"+data.cc[i]['detalle'][x]['fecha']+"</td>"
                            html += "<td >"+data.cc[i]['detalle'][x]['Estado']+"</td>"
                            html += "<td >"+data.cc[i]['detalle'][x]['facturaproveedor']+"</td>"
                            html += "<td class = 'CenterText'>"+data.cc[i]['detalle'][x]['fecharecepcion']+"</td>"
                            html += "<td class = '' style = ''>"
                                html +="<table width = '100%' style = 'background-color:transparent;'>"
                                    html += "<tr>"
                                        html += "<td style = 'width:20%;border:0px;background-color:transparent;' class = 'CenterText'>$</td>"
                                        html += "<td style = 'text-align:right;border:0px;background-color:transparent;'>"+formatNumber.new(data.cc[i]['detalle'][x]['valor'])+"</td>"
                                    html += "</tr>"
                                html += "</table>"
                            html += "</td>"
                        }
                        html += "<tr>"
                            html += "<td class = 'CenterText border_bottom_left' style = 'background-color:#7f9fce;color:white;' colspan = '7'>Total</td>"
                            html += "<td class = 'border_bottom_right' style = 'background-color:#7f9fce;color:white;'>"
                                html +="<table width = '100%' style = 'background-color:transparent;'>"
                                    html += "<tr>"
                                        html += "<td style = 'width:20%;border:0px;background-color:transparent;color:white;' class = 'CenterText'>$</td>"
                                        html += "<td style = 'text-align:right;border:0px;background-color:transparent;color:white;'>"+formatNumber.new(data.cc[i]['total'])+"</td>"
                                    html += "</tr>"
                                html += "</table>"
                            html += "</td>"
                        html += "<tr>"
                        html += "<tr><td style = 'background-color:white;border:0px;'><br></td></tr>"
                    }
                    
                    
                    html += "<tr>"
                        html += "<td class = 'CenterText' style = 'background-color:#7f9fce;' colspan = '7'>Total Cartera</td>"
                        html += "<td style = 'background-color:#7f9fce;'>"
                            html +="<table width = '100%'>"
                                html += "<tr>"
                                    html += "<td style = 'width:20%;border:0px;background-color:transparent;' class = 'CenterText'>$</td>"
                                    html += "<td style = 'text-align:right;border:0px;background-color:transparent;'>"+formatNumber.new(total)+"</td>"
                                html += "</tr>"
                            html += "</table>"
                        html += "</td>"
                       
                    html += "<tr>"
                }
            html += "</table>";
            $(".ContenedorCuentas").html(html)
            $(".ContenedorCuentas th").css({'font-size':'12px'})
            $(".ContenedorCuentas td").css({'font-size':'12px'})
        }
    });
}


function BuscarDonaciones(){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'DataDonacionesReporte',
        data:{fdesde:$("#fdesde").val(),fhasta:$("#fhasta").val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            var totalDonacionG = 0;
            html += "<table class = 'tableNew'>";
            if(data.Donaciones.length == 0){
                html += "<tr>"
                    html += "<td class = 'CenterText'>No se han registrado Donaciones para las fechas indicadas.</td>"
                html += "</tr>"
            }else{
                for(var i = 0; i < data.Donaciones.length;i++){
                    html += "<tr>"
                        html += "<th class = 'CenterText border_top_left border_top_right' colspan = '10' style = 'background-color:#7f9fce;color:white;'>"+data.Donaciones[i]['Dia']+" "+data.Donaciones[i]['numdia']+" de "+data.Donaciones[i]['nombremes']+" de "+data.Donaciones[i]['ano']+"</th>"
                    html += "</tr>"
                    html += "<tr>"
                        html += "<th style = 'background-color:#F7EFB0;'>No.</th>"
                        html += "<th style = 'background-color:#F7EFB0;'>Pais</th>"
                        html += "<th style = 'background-color:#F7EFB0;'>Tercero</th>"
                        html += "<th style = 'background-color:#F7EFB0;'>Correo</th>"
                        html += "<th style = 'background-color:#F7EFB0;'>Recibo</th>"
                        html += "<th style = 'background-color:#F7EFB0;'>Moneda</th>"
                        html += "<th style = 'background-color:#F7EFB0;'>Cantidad</th>"
                        html += "<th style = 'background-color:#F7EFB0;'>Valor</th>"
                        html += "<th style = 'background-color:#F7EFB0;'>Tasa</th>"
                        html += "<th style = 'background-color:#F7EFB0;'>Valor Final</th>"
                    html += "</tr>"
                    
                    if( data.Donaciones[i]['data'].length == 0 ){
                        html += "<tr>"
                            html += "<td class = 'CenterText' colspan = '10'>No se han registrado Donaciones para esta fecha.</td>"
                        html += "</tr>"
                    }else{
                        var totalDonacion = 0;
                        for(var x = 0; x < data.Donaciones[i]['data'].length;x++){
                            totalDonacion += data.Donaciones[i]['data'][x]['ValorFinal'];
                            totalDonacionG += data.Donaciones[i]['data'][x]['ValorFinal'];
                            html += "<tr>"
                                html += "<td class = 'CenterText'>"+data.Donaciones[i]['data'][x]['Num']+"</td>"
                                html += "<td >"+data.Donaciones[i]['data'][x]['Pais']+"</td>"
                                html += "<td >"+data.Donaciones[i]['data'][x]['tercero']+"</td>"
                                html += "<td >"+data.Donaciones[i]['data'][x]['correo']+"</td>"
                                html += "<td >"+data.Donaciones[i]['data'][x]['recibocaja']+"</td>"
                                html += "<td >"+data.Donaciones[i]['data'][x]['moneda']+"</td>"
                                html += "<td >"
                                    html +="<table width = '100%'>"
                                        html += "<tr>"
                                            html += "<td style = 'text-align:right;border:0px;'>"+formatNumber.new(data.Donaciones[i]['data'][x]['cantidad'])+"</td>"
                                        html += "</tr>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td >"
                                    html +="<table width = '100%'>"
                                        html += "<tr>"
                                            html += "<td style = 'width:20%;border:0px;' class = 'CenterText'>$</td>"
                                            html += "<td style = 'text-align:right;border:0px;'>"+formatNumber.new(data.Donaciones[i]['data'][x]['valor'])+"</td>"
                                        html += "</tr>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td >"
                                    html +="<table width = '100%'>"
                                        html += "<tr>"
                                            html += "<td style = 'width:20%;border:0px;' class = 'CenterText'>$</td>"
                                            html += "<td style = 'text-align:right;border:0px;'>"+formatNumber.new(data.Donaciones[i]['data'][x]['Tasa'])+"</td>"
                                        html += "</tr>"
                                    html += "</table>"
                                html += "</td>"
                                html += "<td >"
                                    html +="<table width = '100%'>"
                                        html += "<tr>"
                                            html += "<td style = 'width:20%;border:0px;' class = 'CenterText'>$</td>"
                                            html += "<td style = 'text-align:right;border:0px;'>"+formatNumber.new(data.Donaciones[i]['data'][x]['ValorFinal'])+"</td>"
                                        html += "</tr>"
                                    html += "</table>"
                                html += "</td>"
                            html += "</tr>"
                        }
                        html += "<tr>"
                            html += "<td class = 'CenterText border_bottom_left' style = 'background-color:#7f9fce;color:white;' colspan = '9'>Total Ingresos</td>"
                            html += "<td class = 'border_bottom_right' style = 'background-color:#7f9fce;color:white;'>"
                                html +="<table width = '100%' style = 'background-color:transparent;'>"
                                    html += "<tr>"
                                        html += "<td style = 'width:20%;border:0px;background-color:transparent;color:white;' class = 'CenterText'>$</td>"
                                        html += "<td style = 'text-align:right;border:0px;background-color:transparent;color:white;'>"+formatNumber.new(totalDonacion)+"</td>"
                                    html += "</tr>"
                                html += "</table>"
                            html += "</td>"
                        html += "<tr>"
                        html += "<tr><td style = 'background-color:white;border:0px;'><br></td></tr>"
                    }
                }
                html += "<tr>"
                    html += "<td class = 'CenterText border_top_left border_bottom_left' style = 'background-color:#7f9fce;color:white;' colspan = '9'>Total Ingresos</td>"
                    html += "<td class = 'border_bottom_right border_top_right' style = 'background-color:#7f9fce;color:white;'>"
                        html +="<table width = '100%' style = 'background-color:transparent;'>"
                            html += "<tr>"
                                html += "<td style = 'width:20%;border:0px;background-color:transparent;color:white;' class = 'CenterText'>$</td>"
                                html += "<td style = 'text-align:right;border:0px;background-color:transparent;color:white;'>"+formatNumber.new(totalDonacionG)+"</td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</td>"
                html += "<tr>"
                
            }
                
            html += "</table>";
            $(".ContenedorCuentas").html(html)
            $(".ContenedorCuentas th").css({'font-size':'12px'})
            $(".ContenedorCuentas td").css({'font-size':'12px'})
        }
    });
}
function ReporteDonaciones(){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"image/Reporte.png' height='50px'  /> <span class = 'TituloBuscador'>Reporte de Donaciones</span>";
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
        html += "<div class = 'form-group row'>"
            html += "<div class = 'col-sm-3'>"
                html += "<label>Desde (MM/DD/AAAA):</label>"
                html += "<input type = 'text' class = 'form-control DatePicker fdesde' id = 'fdesde' readonly/>"
            html += "</div>"
            html += "<div class = 'col-sm-3'>"
                html += "<label>Hasta (MM/DD/AAAA):</label>"
                html += "<input type = 'text' class = 'form-control DatePicker fhasta' id = 'fhasta' readonly/>"
            html += "</div>"
            html += "<div class = 'col-sm-3'>"
                html += "<p></p>"
                html += "<p></p>"
                html += "<img src = 'image/buscar.png' class = 'IconBuscar' onclick = 'BuscarDonaciones()'/>"
            html += "</div>"
        html += "</div>"
        html += "<br>"
        html += "<div class = 'ContenedorCuentas' style = 'width:100%;height:450px;overflow-y:scroll;'></div>"
    html += "</div>"
    $(".content_modal").html(html);
    $(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
    $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
    var t = 0;
    $(".fhasta").each(function(){
        if( t == 0 ){
            $(this).remove()
        }
        t++;
    })
    var t = 0;
    $(".fdesde").each(function(){
        if( t == 0 ){
            $(this).remove()
        }
        t++;
    })
}

function VCxC(){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'DataYearCXC',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            if( data.Year.length == 0 ){
                alert("En el momento no hay facturas pendientes por cobrar")
            }else{
                var html = "";
                    html += "<div class='modal-header'>";
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<td nowrap>"
                                    html += "<p></p><img src = '"+UrlUniversal+"image/Reporte.png' height='50px'  /> <span class = 'TituloBuscador'>Cuentas por Cobrar</span>";
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
                        html += "<div class = 'form-group row'>"
                            html += "<div class = 'col-sm-3'>"
                                html += "<label>Año:</label>"
                                html += "<select class = 'form-control YearD' id = 'yearcc'>"
                                    for(var i = 0; i < data.Year.length;i++){
                                        html += "<option value = '"+data.Year[i]['years']+"'selected >"+data.Year[i]['years']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class = 'col-sm-3'>"
                                html += "<p></p>"
                                html += "<p></p>"
                                html += "<img src = 'image/buscar.png' class = 'IconBuscar' onclick = 'BuscarCxC()'/>"
                            html += "</div>"
                        html += "</div>"
                        html += "<br>"
                        html += "<div class = 'ContenedorCuentas' style = 'width:100%;height:450px;overflow-y:scroll;'></div>"
                html += "</div>"
                $(".content_modal").html(html);
                $(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
                $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
                var t = 0;
                $(".YearD").each(function(){
                    if( t == 0 ){
                        $(this).remove()
                    }
                    t++;
                })
            }
            
        }
    });
    
}

function VCxP(){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'DataYearCXP',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            if( data.Year.length == 0 ){
                alert("En el momento no hay facturas pendientes por Pagar")
            }else{
                var html = "";
                    html += "<div class='modal-header'>";
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<td nowrap>"
                                    html += "<p></p><img src = '"+UrlUniversal+"image/Reporte.png' height='50px'  /> <span class = 'TituloBuscador'>Cuentas por Cobrar</span>";
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
                        html += "<div class = 'form-group row'>"
                            html += "<div class = 'col-sm-3'>"
                                html += "<label>Año:</label>"
                                html += "<select class = 'form-control YearD' id = 'yearcc'>"
                                    for(var i = 0; i < data.Year.length;i++){
                                        html += "<option value = '"+data.Year[i]['years']+"'selected >"+data.Year[i]['years']+"</option>"
                                    }
                                html += "</select>"
                            html += "</div>"
                            html += "<div class = 'col-sm-3'>"
                                html += "<p></p>"
                                html += "<p></p>"
                                html += "<img src = 'image/buscar.png' class = 'IconBuscar' onclick = 'BuscarCxP()'/>"
                            html += "</div>"
                        html += "</div>"
                        html += "<br>"
                        html += "<div class = 'ContenedorCuentas' style = 'width:100%;height:450px;overflow-y:scroll;'></div>"
                html += "</div>"
                $(".content_modal").html(html);
                $(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
                $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
                var t = 0;
                $(".YearD").each(function(){
                    if( t == 0 ){
                        $(this).remove()
                    }
                    t++;
                })
            }
            
        }
    });
    
}

function FormNuevoEmpleado(){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'ListarDatosPersonal',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
                    html += "<div class='modal-header'>";
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<td nowrap>"
                                    html += "<p></p><img src = '"+UrlUniversal+"image/gestionhumana.png' height='50px'  /> <span class = 'TituloBuscador'>Nuevo Empleado</span>";
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
                        html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"NuevoEmpleadoFundacion' method='post'>"
                        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
                            html += "<div class = 'form-group row'>"
                                html += "<div class = 'col-sm-12 CenterText'>"
                                    html += "<img src = 'image/foto.png' height='200px' style = 'border-radius:5em;'/><p></p>"
                                    html += "<div class='custom-file mb-12'>";
                                        html += "<input type = 'file' class = 'custom-file-input' onchange = 'CambiarTextoFoto(1)' id = 'foto1' name = 'foto'/>";
                                        html += "<label class='custom-file-label' for='foto1' id = 'NameFoto1'>Seleccione Foto</label>";
                                    html += "</div>";
                                html += "<div>"
                            html += "<p></p>"
                            html += "<div class='Subtitulos'><p><i class='fas fa-angle-double-right'></i> Datos Generales</p></div>"
                            html += "<div class = 'form-group row'>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Nombre:</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'nombre' required/>"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Tipo de Documento:</label>"
                                    html += "<select type = 'text' class = 'form-control' name = 'tipodoc' required>"
                                        for(var i = 0; i < data.td.length; i++){
                                            html += "<option value = '"+data.td[i]['id']+"'>"+data.td[i]['nombre']+"</option>";
                                        } 
                                    html += "</select>"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Número Documento:</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'numdoc' required/>"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Fecha Expedición (MM/DD/AAAA):</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control DatePicker' name = 'fexpedicion' readonly/>"
                                html += "</div>"
                            html += "</div>"
                            html += "<div class = 'form-group row'>"
                               html += "<div class = 'col-sm-3'>"
                                   html += "<label>Cargo:</label>"
                                   html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'cargo' required/>"
                               html += "</div>"
                               html += "<div class = 'col-sm-3'>"
                                   html += "<label>Fecha Ingreso (MM/DD/AAAA):</label>"
                                   html += "<input autocomplete = 'off' type = 'text' class = 'form-control DatePicker' name = 'fingreso' readonly/>"
                               html += "</div>"
                            html += "</div>"
                            
                            html += "<div class='Subtitulos'><p><i class='fas fa-angle-double-right'></i> Información Personal</p></div>"
                            html += "<div class = 'form-group row'>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Lugar de Nacimiento:</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'lnacimiento' required/>"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Fecha Nacimiento (MM/DD/AAAA):</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control DatePicker' name = 'fnacimiento' readonly/>"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Estado Civil:</label>"
                                    html += "<select type = 'text' class = 'form-control' name = 'estadocivil' required>"
                                        for(var i = 0; i < data.ec.length; i++){
                                            html += "<option value = '"+data.ec[i]['id']+"'>"+data.ec[i]['nombre']+"</option>";
                                        } 
                                    html += "</select>"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Tipo de Sangre:</label>"
                                    html += "<select type = 'text' class = 'form-control' name = 'rh' required>"
                                        for(var i = 0; i < data.rh.length; i++){
                                            html += "<option value = '"+data.rh[i]['id']+"'>"+data.rh[i]['nombre']+"</option>";
                                        } 
                                    html += "</select>"
                                html += "</div>"
                            html += "</div>"
                            html += "<div class = 'form-group row'>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Dirección:</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'direccion' required/>"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Barrio:</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'barrio' />"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Teléfono Residencia:</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'telcasa' />"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Celular:</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'celular' />"
                                html += "</div>"
                            html += "</div>"
                            html += "<div class = 'form-group row'>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>E-mail empleado:</label>"
                                    html += "<input autocomplete = 'off' type = 'mail' class = 'form-control' name = 'correo' required/>"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Estrato:</label>"
                                    html += "<input autocomplete = 'off' type = 'number' min = '1' value = '1' class = 'form-control' name = 'estrato' />"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Nombre Contacto Emergencia:</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'contactoemergencia' required/>"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Celular:</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'celularemergencia' />"
                                html += "</div>"
                            html += "</div>"
                            html += "<div class = 'form-group row'>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Eps:</label>"
                                    html += "<select type = 'text' class = 'form-control' name = 'eps' required>"
                                        for(var i = 0; i < data.eps.length; i++){
                                            html += "<option value = '"+data.eps[i]['id']+"'>"+data.eps[i]['nombre']+"</option>";
                                        } 
                                    html += "</select>"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Afp:</label>"
                                    html += "<select type = 'text' class = 'form-control' name = 'afs' required>"
                                        for(var i = 0; i < data.afp.length; i++){
                                            html += "<option value = '"+data.afp[i]['id']+"'>"+data.afp[i]['nombre']+"</option>";
                                        } 
                                    html += "</select>"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Cesantías:</label>"
                                    html += "<select type = 'text' class = 'form-control' name = 'cesantias' required>"
                                        for(var i = 0; i < data.cesantias.length; i++){
                                            html += "<option value = '"+data.cesantias[i]['id']+"'>"+data.cesantias[i]['nombre']+"</option>";
                                        } 
                                    html += "</select>"
                                html += "</div>"
                            html += "</div>"
                            html += "<div class = 'form-group row'>"
                                html += "<div class = 'col-sm-12 CenterText'>"
                                    html += "<button class = 'btn btn-primary'>Guardar</button>"
                                html += "</div>"
                            html += "</div>"
                            
                        html += "</form>"
                html += "</div>"
                $(".content_modal").html(html);
                $(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
                $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
                $(".form-group label").css({'font-size':'12px'})
                $(".form-group input,.form-group select").css({'font-size':'13px'})
            
        }
    });
}

function EditarInformacionEmpleado(id){
    $.ajax({
        type:'POST',
        url:UrlUniversal+'ListarDatosPersonalEditar',
        data:{id:id,_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
                    html += "<div class='modal-header'>";
                        html += "<table width = '100%'>"
                            html += "<tr>"
                                html += "<td nowrap>"
                                    html += "<p></p><img src = '"+UrlUniversal+"image/gestionhumana.png' height='50px'  /> <span class = 'TituloBuscador'>Editar Empleado</span>";
                                html += "</td>"
                                html += "<td>"
                                    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                                    html += "<p></p><img src = '"+UrlUniversal+"image/cerrar.png' height='20px'  />";
                                html += "</button>";
                                html += "</td>"
                            html += "</tr>"
                        html += "</table>"
                    $(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
                    html += "</div>";
                    html += "<div class='modal-body'>";
                        html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"ActualizarEmpleadoFundacion' method='post'>"
                        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
                        html += "<input type='hidden' name='id' value='" + id + "' />";
                            html += "<div class = 'form-group row'>"
                                html += "<div class = 'col-sm-12 CenterText'>"
                                if(  data.data[0]['foto'] == ''){
                                    html += "<img src = 'image/foto.png' height='200px' style = 'border-radius:5em;'/><p></p>"
                                }else{
                                    html += "<img src = '"+UrlUniversalFile+"storage/app/Fundacion/"+data.data[0]['foto']+"' height='200px' style = 'border-radius:5em;'/><p></p>"
                                }
                                    html += "<div class='custom-file mb-12'>";
                                        html += "<input type = 'file' class = 'custom-file-input' onchange = 'CambiarTextoFoto(1)' id = 'foto1' name = 'foto'/>";
                                        html += "<label class='custom-file-label' for='foto1' id = 'NameFoto1'>Seleccione Foto</label>";
                                    html += "</div>";
                                html += "<div>"
                            html += "<p></p>"
                            html += "<div class='Subtitulos'><p><i class='fas fa-angle-double-right'></i> Datos Generales</p></div>"
                            html += "<div class = 'form-group row'>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Nombre:</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'nombre' value = '"+data.data[0]['nombre']+"' required/>"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Tipo de Documento:</label>"
                                    html += "<select type = 'text' class = 'form-control' name = 'tipodoc' required>"
                                        for(var i = 0; i < data.td.length; i++){
                                            if( data.data[0]['idtipodoc'] == data.td[i]['id'] ){
                                                html += "<option value = '"+data.td[i]['id']+"' selected>"+data.td[i]['nombre']+"</option>";
                                            }else{
                                                html += "<option value = '"+data.td[i]['id']+"'>"+data.td[i]['nombre']+"</option>";
                                            }
                                        } 
                                    html += "</select>"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Número Documento:</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'numdoc' value = '"+data.data[0]['numdoc']+"' required/>"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Fecha Expedición (MM/DD/AAAA):</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control DatePicker' name = 'fexpedicion' value = '"+data.data[0]['fechaexpedicion']+"' readonly/>"
                                html += "</div>"
                            html += "</div>"
                            html += "<div class = 'form-group row'>"
                               html += "<div class = 'col-sm-3'>"
                                   html += "<label>Cargo:</label>"
                                   html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'cargo' value = '"+data.data[0]['cargo']+"' required/>"
                               html += "</div>"
                               html += "<div class = 'col-sm-3'>"
                                   html += "<label>Fecha Ingreso (MM/DD/AAAA):</label>"
                                   html += "<input autocomplete = 'off' type = 'text' class = 'form-control DatePicker' name = 'fingreso' value = '"+data.data[0]['fechaingreso']+"' readonly/>"
                               html += "</div>"
                            html += "</div>"
                            
                            html += "<div class='Subtitulos'><p><i class='fas fa-angle-double-right'></i> Información Personal</p></div>"
                            html += "<div class = 'form-group row'>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Lugar de Nacimiento:</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'lnacimiento' value = '"+data.data[0]['lugarnacimiento']+"' required/>"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Fecha Nacimiento (MM/DD/AAAA):</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control DatePicker' name = 'fnacimiento' value = '"+data.data[0]['fechanacimiento']+"' readonly/>"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Estado Civil:</label>"
                                    html += "<select type = 'text' class = 'form-control' name = 'estadocivil' required>"
                                        for(var i = 0; i < data.ec.length; i++){
                                            if( data.data[0]['estadocivil'] == data.ec[i]['id'] ){
                                                html += "<option value = '"+data.ec[i]['id']+"' selected>"+data.ec[i]['nombre']+"</option>";
                                            }else{
                                                html += "<option value = '"+data.ec[i]['id']+"'>"+data.ec[i]['nombre']+"</option>";
                                            }
                                        } 
                                    html += "</select>"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Tipo de Sangre:</label>"
                                    html += "<select type = 'text' class = 'form-control' name = 'rh' required>"
                                        for(var i = 0; i < data.rh.length; i++){
                                            if( data.data[0]['idrh'] == data.rh[i]['id'] ){
                                                html += "<option value = '"+data.rh[i]['id']+"'>"+data.rh[i]['nombre']+"</option>";
                                            }else{
                                                html += "<option value = '"+data.rh[i]['id']+"'>"+data.rh[i]['nombre']+"</option>";
                                            }
                                        } 
                                    html += "</select>"
                                html += "</div>"
                            html += "</div>"
                            html += "<div class = 'form-group row'>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Dirección:</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'direccion' value = '"+data.data[0]['direccion']+"' required/>"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Barrio:</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'barrio' value = '"+data.data[0]['barrio']+"' />"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Teléfono Residencia:</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'telcasa' value = '"+data.data[0]['telefonocasa']+"' />"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Celular:</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'celular' value = '"+data.data[0]['celular']+"'/>"
                                html += "</div>"
                            html += "</div>"
                            html += "<div class = 'form-group row'>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>E-mail empleado:</label>"
                                    html += "<input autocomplete = 'off' type = 'mail' class = 'form-control' name = 'correo' value = '"+data.data[0]['correo']+"' required/>"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Estrato:</label>"
                                    html += "<input autocomplete = 'off' type = 'number' min = '1' value = '1' class = 'form-control' name = 'estrato' value = '"+data.data[0]['estrato']+"'/>"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Nombre Contacto Emergencia:</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'contactoemergencia' value = '"+data.data[0]['nombreemergencia']+"' required/>"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Celular:</label>"
                                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'celularemergencia' value = '"+data.data[0]['celularemergencia']+"'/>"
                                html += "</div>"
                            html += "</div>"
                            html += "<div class = 'form-group row'>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Eps:</label>"
                                    html += "<select type = 'text' class = 'form-control' name = 'eps' required>"
                                        for(var i = 0; i < data.eps.length; i++){
                                            if( data.data[0]['ideps'] == data.eps[i]['id'] ){
                                                html += "<option value = '"+data.eps[i]['id']+"' selected>"+data.eps[i]['nombre']+"</option>";
                                            }else{
                                                html += "<option value = '"+data.eps[i]['id']+"'>"+data.eps[i]['nombre']+"</option>";
                                            }
                                            
                                        } 
                                    html += "</select>"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Afp:</label>"
                                    html += "<select type = 'text' class = 'form-control' name = 'afs' required>"
                                        for(var i = 0; i < data.afp.length; i++){
                                            if( data.data[0]['idafs'] == data.afp[i]['id'] ){
                                                html += "<option value = '"+data.afp[i]['id']+"' selected>"+data.afp[i]['nombre']+"</option>";
                                            }else{
                                                html += "<option value = '"+data.afp[i]['id']+"'>"+data.afp[i]['nombre']+"</option>";
                                            }
                                            
                                        } 
                                    html += "</select>"
                                html += "</div>"
                                html += "<div class = 'col-sm-3'>"
                                    html += "<label>Cesantías:</label>"
                                    html += "<select type = 'text' class = 'form-control' name = 'cesantias' required>"
                                        for(var i = 0; i < data.cesantias.length; i++){
                                            if( data.data[0]['idcesantias'] == data.cesantias[i]['id'] ){
                                                html += "<option value = '"+data.cesantias[i]['id']+"' selected>"+data.cesantias[i]['nombre']+"</option>";
                                            }else{
                                                html += "<option value = '"+data.cesantias[i]['id']+"'>"+data.cesantias[i]['nombre']+"</option>";
                                            }
                                            
                                        } 
                                    html += "</select>"
                                html += "</div>"
                            html += "</div>"
                            html += "<div class = 'form-group row'>"
                                html += "<div class = 'col-sm-12 CenterText'>"
                                    html += "<button class = 'btn btn-primary'>Guardar</button>"
                                html += "</div>"
                            html += "</div>"
                            
                        html += "</form>"
                html += "</div>"
                $(".content_modal").html(html);
                $(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' })/*.datepicker("setDate", new Date().getDay+15)*/;
                $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
                $(".form-group label").css({'font-size':'12px'})
                $(".form-group input,.form-group select").css({'font-size':'13px'})
            
        }
    });
}

function EditarGF(id){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"image/gestionhumana.png' height='50px'  /> <span class = 'TituloBuscador'>Nuevo Integrante Grupo Familiar</span>";
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
        html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"NuevoIntegranteGF' method='post'>"
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
        html += "<input type='hidden' name='id' value='" + id + "' />";
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-4'>"
                    html += "<label>Nombre:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'nombre' required/>"
                html += "</div>"
                html += "<div class = 'col-sm-4'>"
                    html += "<label>Fecha Nacimiento (MM/DD/AAAA):</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control DatePicker' name = 'fnacimiento' readonly/>"
                html += "</div>"
                html += "<div class = 'col-sm-4'>"
                    html += "<label>Parentesco:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'parentesco' required/>"
                html += "</div>"
            html += "</div>"
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-12 CenterText'>"
                    html += "<button class = 'btn btn-primary'>Guardar</button>"
                html += "</div>"
            html += "</div>"
        html += "</form>"
html += "</div>"
$(".content_modal").html(html);
$(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
$("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
      
}

function EditarGFDetalle(id,idpersona){
    var f = $(".FechaNacimientoGF"+id).text().split("-");
    var fecha = f[1]+"/"+f[2]+"/"+f[0];
    console.log(fecha)
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"image/gestionhumana.png' height='50px'  /> <span class = 'TituloBuscador'>Editar Integrante Grupo Familiar</span>";
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
        html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"ActualizarIntegranteGF' method='post'>"
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
        html += "<input type='hidden' name='id' value='" + id + "' />";
        html += "<input type='hidden' name='idpersona' value='" + idpersona + "' />";
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-4'>"
                    html += "<label>Nombre:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'nombre' value = '"+$(".NombreGF"+id).text()+"'  required/>"
                html += "</div>"
                html += "<div class = 'col-sm-4'>"
                    html += "<label>Fecha Nacimiento (MM/DD/AAAA):</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control DatePicker' name = 'fnacimiento' value = '"+fecha+"' readonly/>"
                html += "</div>"
                html += "<div class = 'col-sm-4'>"
                    html += "<label>Parentesco:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'parentesco' value = '"+$(".Parentesco"+id).text()+"'  required/>"
                html += "</div>"
            html += "</div>"
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-12 CenterText'>"
                    html += "<button class = 'btn btn-primary'>Guardar</button>"
                html += "</div>"
            html += "</div>"
        html += "</form>"
html += "</div>"
$(".content_modal").html(html);
$(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
$(".DatePicker").val(fecha)
$("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
      
}

function EditarFE(id){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"image/gestionhumana.png' height='50px'  /> <span class = 'TituloBuscador'>Nueva Formación y Educación</span>";
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
        html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"NuevoFEPersona' method='post'>"
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
        html += "<input type='hidden' name='id' value='" + id + "' />";
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-3'>"
                    html += "<label>Profesión:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'profesion' required/>"
                html += "</div>"
                html += "<div class = 'col-sm-3'>"
                    html += "<label>Institución:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'institucion' required/>"
                html += "</div>"
                html += "<div class = 'col-sm-3'>"
                    html += "<label>Fecha Finalización (MM/DD/AAAA):</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control DatePicker' name = 'fechafin' readonly/>"
                html += "</div>"
                html += "<div class = 'col-sm-3'>"
                    html += "<label>Título Obtenido:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'titulo'/>"
                html += "</div>"
            html += "</div>"
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-12 CenterText'>"
                    html += "<button class = 'btn btn-primary'>Guardar</button>"
                html += "</div>"
            html += "</div>"
        html += "</form>"
html += "</div>"
$(".content_modal").html(html);
$(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
$("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
}

function EditarPEDetalle(id,idpersona){
    var f = $(".FechaFinPE"+id).text().split("-");
    var fecha = f[1]+"/"+f[2]+"/"+f[0];
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"image/gestionhumana.png' height='50px'  /> <span class = 'TituloBuscador'>Editar Formación y Educación</span>";
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
        html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"ActualizarFormacionPersona' method='post'>"
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
        html += "<input type='hidden' name='id' value='" + id + "' />";
        html += "<input type='hidden' name='idpersona' value='" + idpersona + "' />";
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-3'>"
                    html += "<label>Profesión:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'profesion' value = '"+$(".ProfesionPE"+id).text()+"'required/>"
                html += "</div>"
                html += "<div class = 'col-sm-3'>"
                    html += "<label>Institución:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'institucion' value = '"+$(".InstitucionPE"+id).text()+"' required/>"
                html += "</div>"
                html += "<div class = 'col-sm-3'>"
                    html += "<label>Fecha Finalización (MM/DD/AAAA):</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control DatePicker' name = 'fechafin' value = '"+fecha+"'  readonly/>"
                html += "</div>"
                html += "<div class = 'col-sm-3'>"
                    html += "<label>Título Obtenido:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'titulo' value = '"+$(".TituloPE"+id).text()+"' />"
                html += "</div>"
            html += "</div>"
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-12 CenterText'>"
                    html += "<button class = 'btn btn-primary'>Guardar</button>"
                html += "</div>"
            html += "</div>"
        html += "</form>"
html += "</div>"
$(".content_modal").html(html);
$(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
$(".DatePicker").val(fecha)
$("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
}

function EditarEL(id){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"image/gestionhumana.png' height='50px'  /> <span class = 'TituloBuscador'>Nueva Experiencia Laboral</span>";
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
        html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"NuevoEmpleadoPersonal' method='post'>"
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
        html += "<input type='hidden' name='id' value='" + id + "' />";
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-3'>"
                    html += "<label>Empresa:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'empresa' required/>"
                html += "</div>"
                html += "<div class = 'col-sm-3'>"
                    html += "<label>Cargo:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'cargo' required/>"
                html += "</div>"
                html += "<div class = 'col-sm-3'>"
                    html += "<label>Fecha Ingreso (MM/DD/AAAA):</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control DatePicker' name = 'fingreso' readonly/>"
                html += "</div>"
                html += "<div class = 'col-sm-3'>"
                    html += "<label>Fecha Retiro (MM/DD/AAAA):</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control DatePicker' name = 'fretiro' readonly/>"
                html += "</div>"
            html += "</div>"
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-3'>"
                    html += "<label>Jefe Inmediato:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'jefe' required/>"
                html += "</div>"
                html += "<div class = 'col-sm-3'>"
                    html += "<label>Teléfono:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'telefono' required/>"
                html += "</div>"
            html += "</div>"
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-12'>"
                    html += "<label>Motivo Retiro:</label>"
                    html += "<textarea class = 'form-control' name = 'motivo' required></textarea>"
                html += "</div>"
            html += "</div>"
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-12 CenterText'>"
                    html += "<button class = 'btn btn-primary'>Guardar</button>"
                html += "</div>"
            html += "</div>"
        html += "</form>"
html += "</div>"
$(".content_modal").html(html);
$(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
$("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
}

function EditarELDetalle(id,idpersona){
    var f = $(".FI"+id).text().split("-");
    var fecha1 = f[1]+"/"+f[2]+"/"+f[0];
    
    var f = $(".FS"+id).text().split("-");
    var fecha2 = f[1]+"/"+f[2]+"/"+f[0];
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"image/gestionhumana.png' height='50px'  /> <span class = 'TituloBuscador'>Editar Experiencia Laboral</span>";
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
        html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"ActualizarEmpleadoPersonal' method='post'>"
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
        html += "<input type='hidden' name='id' value='" + id + "' />";
        html += "<input type='hidden' name='idpersona' value='" + idpersona + "' />";
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-3'>"
                    html += "<label>Empresa:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'empresa' value = '"+$(".empresaEL"+id).text()+"' required/>"
                html += "</div>"
                html += "<div class = 'col-sm-3'>"
                    html += "<label>Cargo:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'cargo' value = '"+$(".cargoEL"+id).text()+"' required/>"
                html += "</div>"
                html += "<div class = 'col-sm-3'>"
                    html += "<label>Fecha Ingreso (MM/DD/AAAA):</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control DatePicker f1' name = 'fingreso' readonly/>"
                html += "</div>"
                html += "<div class = 'col-sm-3'>"
                    html += "<label>Fecha Retiro (MM/DD/AAAA):</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control DatePicker f2' name = 'fretiro' readonly/>"
                html += "</div>"
            html += "</div>"
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-3'>"
                    html += "<label>Jefe Inmediato:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'jefe' value = '"+$(".jefe"+id).text()+"' required/>"
                html += "</div>"
                html += "<div class = 'col-sm-3'>"
                    html += "<label>Teléfono:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'telefono' value = '"+$(".telefono"+id).text()+"'required/>"
                html += "</div>"
            html += "</div>"
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-12'>"
                    html += "<label>Motivo Retiro:</label>"
                    html += "<textarea class = 'form-control' name = 'motivo'  required>"+$(".motivo"+id).text()+"</textarea>"
                html += "</div>"
            html += "</div>"
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-12 CenterText'>"
                    html += "<button class = 'btn btn-primary'>Guardar</button>"
                html += "</div>"
            html += "</div>"
        html += "</form>"
html += "</div>"
$(".content_modal").html(html);
$(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
$(".f1").val(fecha1)
$(".f2").val(fecha2)
$("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
}

function EditarRLaboral(id){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"image/gestionhumana.png' height='50px'  /> <span class = 'TituloBuscador'>Nueva Referencia Laboral</span>";
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
        html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"NuevaReferenciaLaboral' method='post'>"
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
        html += "<input type='hidden' name='id' value='" + id + "' />";
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-4'>"
                    html += "<label>Nombre:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'nombre' required/>"
                html += "</div>"
                html += "<div class = 'col-sm-4'>"
                    html += "<label>Teléfono:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control ' name = 'telefono' required/>"
                html += "</div>"
                html += "<div class = 'col-sm-4'>"
                    html += "<label>Ocupación:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'ocupacion' required/>"
                html += "</div>"
            html += "</div>"
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-12 CenterText'>"
                    html += "<button class = 'btn btn-primary'>Guardar</button>"
                html += "</div>"
            html += "</div>"
        html += "</form>"
html += "</div>"
$(".content_modal").html(html);
$(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
$("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
}

function EditarRLDetalle(id,idpersona){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"image/gestionhumana.png' height='50px'  /> <span class = 'TituloBuscador'>Editar Referencia Laboral</span>";
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
        html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"ActualizarReferenciaLaboral' method='post'>"
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
        html += "<input type='hidden' name='id' value='" + id + "' />";
        html += "<input type='hidden' name='idpersona' value='" + idpersona + "' />";
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-4'>"
                    html += "<label>Nombre:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'nombre' value = '"+$(".nombreRL"+id).text()+"' required/>"
                html += "</div>"
                html += "<div class = 'col-sm-4'>"
                    html += "<label>Teléfono:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control ' name = 'telefono' value = '"+$(".telefonoRL"+id).text()+"' required/>"
                html += "</div>"
                html += "<div class = 'col-sm-4'>"
                    html += "<label>Ocupación:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'ocupacion' value = '"+$(".cargoRL"+id).text()+"' required/>"
                html += "</div>"
            html += "</div>"
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-12 CenterText'>"
                    html += "<button class = 'btn btn-primary'>Guardar</button>"
                html += "</div>"
            html += "</div>"
        html += "</form>"
html += "</div>"
$(".content_modal").html(html);
$(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
$("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
}

function EditarRPLaboral(id){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"image/gestionhumana.png' height='50px'  /> <span class = 'TituloBuscador'>Nueva Referencia Laboral</span>";
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
        html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"NuevaReferenciaPersonal' method='post'>"
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
        html += "<input type='hidden' name='id' value='" + id + "' />";
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-4'>"
                    html += "<label>Nombre:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'nombre' required/>"
                html += "</div>"
                html += "<div class = 'col-sm-4'>"
                    html += "<label>Teléfono:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control ' name = 'telefono' required/>"
                html += "</div>"
                html += "<div class = 'col-sm-4'>"
                    html += "<label>Ocupación:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'ocupacion' required/>"
                html += "</div>"
            html += "</div>"
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-12 CenterText'>"
                    html += "<button class = 'btn btn-primary'>Guardar</button>"
                html += "</div>"
            html += "</div>"
        html += "</form>"
html += "</div>"
$(".content_modal").html(html);
$(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
$("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
}

function EditarRPDetalle(id,idpersona){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"image/gestionhumana.png' height='50px'  /> <span class = 'TituloBuscador'>Editar Referencia Laboral</span>";
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
        html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"ActualizarReferenciaPersonal' method='post'>"
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
        html += "<input type='hidden' name='id' value='" + id + "' />";
        html += "<input type='hidden' name='idpersona' value='" + idpersona + "' />";
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-4'>"
                    html += "<label>Nombre:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'nombre' value = '"+$(".nombreRP"+id).text()+"' required/>"
                html += "</div>"
                html += "<div class = 'col-sm-4'>"
                    html += "<label>Teléfono:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control ' name = 'telefono' value = '"+$(".telefonoRP"+id).text()+"' required/>"
                html += "</div>"
                html += "<div class = 'col-sm-4'>"
                    html += "<label>Ocupación:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'ocupacion' value = '"+$(".cargoRP"+id).text()+"' required/>"
                html += "</div>"
            html += "</div>"
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-12 CenterText'>"
                    html += "<button class = 'btn btn-primary'>Guardar</button>"
                html += "</div>"
            html += "</div>"
        html += "</form>"
html += "</div>"
$(".content_modal").html(html);
$(".DatePicker").datepicker({ dateFormat: 'dd-mm-yy' }).datepicker("setDate", new Date().getDay+15);
$("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
}

function NuevoDocAdicionalEmpleado(id){
    var html = "";
    html += "<div class='modal-header'>";
        html += "<table width = '100%'>"
            html += "<tr>"
                html += "<td nowrap>"
                    html += "<p></p><img src = '"+UrlUniversal+"image/nuevodoc.png' height='50px'  /> <span class = 'TituloBuscador'>Nuevo Documento Adicional</span>";
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
        html += "<form class='form-signin'  enctype='multipart/form-data' action='"+UrlUniversal+"NuevoDocPersonal' method='post'>"
        html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "' />";
        html += "<input type='hidden' name='id' value='" + id + "' />";
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-12'>"
                    html += "<label>Nombre:</label>"
                    html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'nombre' required/>"
                html += "</div>"
                
            html += "</div>"
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-12'>"
                    html += "<div class='custom-file mb-12' style = 'width:100%;'>";
                        html += "<input type = 'file' class = 'custom-file-input' onchange = 'CambiarTextoFoto(1)' id = 'foto1' name = 'foto' style = 'width:100%;'/>";
                        html += "<label class='custom-file-label' for='foto1' id = 'NameFoto1'>Seleccione Documento</label>";
                    html += "</div>";
                html += "</div>"
            html += "</div>"
            html += "<div class = 'form-group row'>"
                html += "<div class = 'col-sm-12 CenterText'>"
                    html += "<button class = 'btn btn-primary'>Guardar</button>"
                html += "</div>"
            html += "</div>"
        html += "</form>"
html += "</div>"
$(".content_modal").html(html);
$("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
}