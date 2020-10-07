/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
UrlUniversalFile = 'http://localhost:8000/BropPayU/';
var Slide = 3;
            
function EventChangeSlide(v){
    if( v == 1 ){
        var x = Slide;
        for(var i = (Slide); i < (Slide+3);i++,x--){
            $(".Slide"+x).hide();
            $(".Slide"+i).show();
            
        }
        Slide += 3;
    }else{
        if(Slide > 2){
            Slide -= 3;
        }
        var x = Slide;
        for(var i = Slide; i > (Slide-3);i--,x++){
            $(".Slide"+i+1).show();
            $(".Slide"+x).hide();
        }
        Slide += 3;
    }
    console.log(Slide)

}


var ArrayBoletas = [];
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

function ActualizarCantidad(id,val,limit){
    var t = $(".contador"+id).text()
    if( val == 0 ){
        t--;
    }else{
        t++;
    }
    if( t < 0 ){
        $(".contador"+id).text("0")
    }else{
        if( t > limit ){
            alert("No se pueda sobrepasar la cantidad de pases disponibles")
            $(".contador"+id).text(t--)
        }else{
            $(".contador"+id).text(t)
        }
            
    }
}

function nextPaso(val){
    $(".Step").hide("slow");
    $(".P"+val).show("slow");
    
}
function nextPasoValEmpresa(val){
    ArrayBoletas = [];
    if( val == 0 ){
        
    }
    if( val === 1 ){
        var t = 0;
        var y = $("#Correo").val();
        if( y.length > 0 ){
            y = y.split("@")
            if( y.length > 1 ){
                
            }else{
                alert("Correo no válido")
                t++;
            }
        }else{
            alert("No ha ingresado ningún correo.")
            t++;
        }
        
        var y = $("#pwd").val()
        if( y.length > 5 ){
        }else{
            alert("No ha ingresado una contraseña válida")
            t++;
        }
        
        var y = $("#name").val()
        if( y.length > 2 ){
        }else{
            alert("No ha ingresado un nombre válido")
            t++;
        }
        
        var y = $("#apellido").val()
        if( y.length > 2 ){
        }else{
            alert("No ha ingresado un apellido válido")
            t++;
        }
        
        var y = $("#celular").val()
        if( y.length == 10 ){
        }else{
            alert("No ha ingresado un celular válido")
            t++;
        }
        
        var y = $("#Empresa").val()
        if( y.length > 3 ){
        }else{
            alert("Ingrese el nombre de la Empresa")
            t++;
        }
        
        var y = $("#cargo").val()
        if( y.length > 3 ){
        }else{
            alert("No ha ingresado un cargo válido")
            t++;
        }
        
        if( t == 0 ){
            $(".Step").hide("slow");
            $(".P"+val).show("slow");
        }
    }
    if(val == 2){
        $(".Contador").each(function(){
            if( $(this).text() != 0 ){
                ArrayBoletas.push({
                    'cantidad':$(this).text(),
                    'id':$(this).next().text(),
                    'valor':$(this).next().next().text(),
                    'img':$(this).next().next().next().text(),
                    'ip':$(this).next().next().next().next().text(),
                    'ig':$(this).next().next().next().next().next().text(),
                    'name':$(this).next().next().next().next().next().next().text(),
                    'photo2':$(this).next().next().next().next().next().next().next().text(),
                })
            }
        })
        if( ArrayBoletas.length ==  0 ){
            alert("No se ha seleccionado ninguna boleta ni la cantidad a comprar.");
        }else{
            var html = "";
            var cantidad = 0;
            var Subtotal = 0;
            html += "<table width = '100%' class = 'DetallePrecios'>"
                html += "<tr>"
                    html += "<td width = '200px;'></td>"
                    html += "<td  class = 'ValorBoleta' style = 'font-size:14px;font-weight:bold;text-align:center;'>PRECIO</td>"
                    html += "<td  class = 'ValorBoleta' style = 'font-size:14px;font-weight:bold;text-align:center;'>CANTIDAD</td>"
                    html += "<td  class = 'ValorBoleta' style = 'font-size:14px;font-weight:bold;text-align:center;'>DETALLE BOLETA</td>"
                html += "</tr>"
                for(var i = 0; i < ArrayBoletas.length; i++){
                    Subtotal += (ArrayBoletas[i]['cantidad']*ArrayBoletas[i]['valor'])
                    cantidad += parseFloat(ArrayBoletas[i]['cantidad'])
                    console.log(cantidad);
                    html += "<tr>"
                        html += "<td style = 'text-align:center;' >"
                            html += "<img src ='"+UrlUniversalFile+"/public/../storage/app/Boletas/"+ArrayBoletas[i]['photo2']+"' class = 'ImagenBoletas2'/>"
                        html += "</td>"
                        html += "<td style = 'text-align:center;'>"+formatNumber.new(ArrayBoletas[i]['valor'])+"</td>"
                        html += "<td style = 'text-align:center;'>"+ArrayBoletas[i]['cantidad']+"</td>"
                        html += "<td style = 'text-align:center;'>"
                            html += "<img src ='"+UrlUniversalFile+"/public/../storage/app/Boletas/"+ArrayBoletas[i]['img']+"' class = 'ImagenBoletas2' style = 'width:200px'/>"
                        html += "</td>"
                        /*html += "<td>"
                            html += "<table width = '100%'>"
                                html += "<td style = 'border:0px;'><textarea readonly class = 'TextDetalle' style = 'min-height:80px;color:#333333;'>"+ArrayBoletas[i]['ip']+"</textarea></td>"
                                html += "<td style = 'border:0px;'><textarea readonly class = 'TextDetalle' style = 'min-height:100px;text-align:justify;'>"+ArrayBoletas[i]['ig']+"</textarea></td>"
                            html += "</table>"
                        html += "</td>"*/
                    html += "</tr>"
                }
                var iva = (Subtotal*0.19);
                var descuento = 0;
                var pordes = "";
                var px = 0;
                if( parseFloat($(".fecha_limit").text()) > 0 ){
                    $(".CodigoDescuentoDiv").hide();
                    pordes = "15%";
                    px = 15;
                    descuento = (iva+Subtotal)*0.15;
                }else{
                    if( cantidad > 4 && cantidad < 11 ){
                        $(".CodigoDescuentoDiv").hide();
                        pordes = "10%";
                        px = 10;
                        descuento = (iva+Subtotal)*0.10;
                    }else if( cantidad > 10 ){
                        $(".CodigoDescuentoDiv").hide();
                        pordes = "20%";
                        px = 20;
                        descuento = (iva+Subtotal)*0.20;
                    }else if( cantidad < 5 ){
                        $(".CodigoDescuentoDiv").show();
                    }
                }
                $(".valorboleta_").text(Subtotal-descuento);
                $(".impuesto_").text(iva);
                $(".descuento_").text(px);
                $(".promo_").text(0);
                html += "<tr>"
                    html += "<td style = 'border:0px;'></td>"
                    html += "<td style = 'border:0px;'></td>"
                    html += "<td style = 'border:0px;' class = 'TotalCOmpra'>"
                        var temp = "";
                        temp += "<table width = '250px'>"
                            temp += "<tr>"
                                temp += "<td style = 'border:0px;color:black;font-weight:bold;'>SUBTOTAL:</td>"
                                temp += "<td style = 'border:0px;color:black;font-weight:bold;'>$ "+formatNumber.new(Subtotal)+"</td>"
                            temp += "</tr>"
                            temp += "<tr>"
                                temp += "<td style = 'border:0px;color:black;font-weight:bold;'>IVA:</td>"
                                temp += "<td style = 'border:0px;color:black;font-weight:bold;'>$ "+formatNumber.new(iva)+"</td>"
                            temp += "</tr>"
                            temp += "<tr>"
                                temp += "<td style = 'border:0px;color:black;font-weight:bold;'>DTO "+pordes+":</td>"
                                temp += "<td style = 'border:0px;color:black;font-weight:bold;'>$ "+formatNumber.new(descuento)+"</td>"
                            temp += "</tr>"
                            temp += "<tr>"
                                temp += "<td style = 'border:0px;font-size:14px;font-weight:bold;' class = 'ValorBoleta'>TOTAL:</td>"
                                temp += "<td style = 'border:0px;font-size:14px;font-weight:bold;' class = 'ValorBoleta'>$ "+formatNumber.new(Subtotal+iva-descuento)+"</td>"
                            temp += "</tr>"
                        temp += "</table>"
                        html += temp
                        $(".ResumenFactura").html(temp)
                    html += "</td>"
                html += "</tr>"
            html += "</table>"
            $(".DetalleTicket").html(html)
            $(".Step").hide("slow");
            $(".P"+val).show("slow");
        }
    }
    
    if(val == 3){
        var t = 0;
        var y = $("#F_name").val()
        if( y.length > 1 ){
        }else{
            alert("No ha ingresado un nombre válido")
            t++;
        }
        
        var y = $("#F_nit").val()
        if( y.length > 4 ){
        }else{
            alert("No ha ingresado una cédula válida")
            t++;
        }
        
        var y = $("#F_direccion").val()
        if( y.length > 4 ){
        }else{
            alert("No ha ingresado una dirección válida")
            t++;
        }
        var y = $("#F_ciudad").val()
        if( y.length > 3 ){
        }else{
            alert("No ha ingresado una ciudad válida")
            t++;
        }
        var y = $("#F_pais").val()
        if( y.length > 4 ){
        }else{
            alert("No ha ingresado un país válida")
            t++;
        }
        var y = $("#F_persona").val()
        if( y.length > 5 ){
        }else{
            alert("No ha ingresado un nombre válido")
            t++;
        }
        var y = $("#F_cargo").val()
        if( y.length > 2 ){
        }else{
            alert("No ha ingresado un cargo válido")
            t++;
        }
        var y = $("#F_celular").val()
        if( y.length == 10 ){
        }else{
            alert("No ha ingresado un celular válido")
            t++;
        }
        var y = $("#F_acteco").val()
        if( y.length > 1 ){
        }else{
            alert("No ha ingresado una actividad económica válida")
            t++;
        }
        var y = $("#F_codigo").val()
        if( y.length > 0 ){
        }else{
            alert("No ha ingresado un código válido")
            t++;
        }
        
        var y = $("#F_mail").val();
        if( y.length > 0 ){
            y = y.split("@")
            if( y.length > 1 ){
                
            }else{
                alert("Correo no válido")
                t++;
            }
        }else{
            alert("No ha ingresado ningún correo.")
            t++;
        }
        
        
        if(  t == 0 ){
            ArrayBoletas = [];
                $(".Contador").each(function(){
                            if( $(this).text() != 0 ){
                                ArrayBoletas.push({
                                    'cantidad':$(this).text(),
                                    'id':$(this).next().text(),
                                    'valor':$(this).next().next().text(),
                                    'img':$(this).next().next().next().text(),
                                    'ip':$(this).next().next().next().next().text(),
                                    'ig':$(this).next().next().next().next().next().text(),
                                    'name':$(this).next().next().next().next().next().next().text(),
                                })
                            }
                        })
            if( $('input[name=taller]:checked').val() == 3 ){
                $.ajax({
                    type:'POST',
                    url:'GuardarTicketsCompraE',
                    data:{
                        correo:$("#Correo").val(),
                        pwd:$("#pwd").val(),
                        name:$("#name").val(),
                        apellido:$("#apellido").val(),
                        celular:$("#celular").val(),
                        empresa:$("#empresa").val(),
                        F_name:$("#F_name").val(),
                        F_nit:$("#F_nit").val(),
                        F_Asociado:$("#F_Asociado").val(),
                        F_direccion:$("#F_direccion").val(),
                        F_ciudad:$("#F_ciudad").val(),
                        F_pais:$("#F_pais").val(),
                        F_persona:$("#F_persona").val(),
                        F_cargo:$("#F_cargo").val(),
                        F_mail:$("#F_mail").val(),
                        F_celular:$("#F_celular").val(),
                        F_acteco:$("#F_acteco").val(),
                        F_codigo:$("#F_codigo").val(),
                        valorboleta:$(".valorboleta_").text(),
                        impuesto:$(".impuesto_").text(),
                        descuento:$(".descuento_").text(),
                        promo:$(".promo_").text(),
                        ArrayBoletas:JSON.stringify(ArrayBoletas)
                        ,_token:document.getElementsByName('_token')[0].value},
                    success:function(data){
                            if( data.info == 1 ){
                                location.href='http://process.grupotesta.com.co:8989/BropPayU/public/formPayUP/'+data.Id;
                            }
                    }
                })
            }else{
                ArrayBoletas = [];
                $(".Contador").each(function(){
                            if( $(this).text() != 0 ){
                                ArrayBoletas.push({
                                    'cantidad':$(this).text(),
                                    'id':$(this).next().text(),
                                    'valor':$(this).next().next().text(),
                                    'img':$(this).next().next().next().text(),
                                    'ip':$(this).next().next().next().next().text(),
                                    'ig':$(this).next().next().next().next().next().text(),
                                    'name':$(this).next().next().next().next().next().next().text(),
                                })
                            }
                        })
                            $.ajax({
                                type:'POST',
                                url:'GuardarTicketsCompraE',
                                data:{
                                    correo:$("#Correo").val(),
                                    pwd:$("#pwd").val(),
                                    name:$("#name").val(),
                                    apellido:$("#apellido").val(),
                                    celular:$("#celular").val(),
                                    empresa:$("#empresa").val(),
                                    F_name:$("#F_name").val(),
                                    F_nit:$("#F_nit").val(),
                                    F_Asociado:$("#F_Asociado").val(),
                                    F_direccion:$("#F_direccion").val(),
                                    F_ciudad:$("#F_ciudad").val(),
                                    F_pais:$("#F_pais").val(),
                                    F_persona:$("#F_persona").val(),
                                    F_cargo:$("#F_cargo").val(),
                                    F_mail:$("#F_mail").val(),
                                    F_celular:$("#F_celular").val(),
                                    F_acteco:$("#F_acteco").val(),
                                    F_codigo:$("#F_codigo").val(),
                                    valorboleta:$(".valorboleta_").text(),
                                    impuesto:$(".impuesto_").text(),
                                    descuento:$(".descuento_").text(),
                                    promo:$(".promo_").text(),
                                    ArrayBoletas:JSON.stringify(ArrayBoletas)
                                    ,_token:document.getElementsByName('_token')[0].value},
                                success:function(data){
                                        if( data.info == 1 ){
                                            location.href='http://process.grupotesta.com.co:8989/BropPayU/public/ConfirmacionCompra';
                                        }
                                }
                            })
                        }
            }
        
        
    }
    if( val == 4 ){
        ArrayBoletas = [];
        $(".Contador").each(function(){
            if( $(this).text() != 0 ){
                ArrayBoletas.push({
                    'cantidad':$(this).text(),
                    'id':$(this).next().text(),
                    'valor':$(this).next().next().text(),
                    'img':$(this).next().next().next().text(),
                    'ip':$(this).next().next().next().next().text(),
                    'ig':$(this).next().next().next().next().next().text(),
                    'name':$(this).next().next().next().next().next().next().text(),
                })
            }
        })
            $.ajax({
                type:'POST',
                url:'GuardarTicketsCompraE',
                data:{
                    correo:$("#Correo").val(),
                    pwd:$("#pwd").val(),
                    name:$("#name").val(),
                    ArrayBoletas:JSON.stringify(ArrayBoletas)
                    ,_token:document.getElementsByName('_token')[0].value},
                success:function(data){
                        $(".Step").hide("slow");
                        $(".P"+(val+1)).show("slow");
                }
            })
        }
}

function nextPasoVal(val){
    ArrayBoletas = [];
    if(val == 0){
        location.href='http://process.grupotesta.com.co:8989/BropPayU/public/Sitio';
    }
    if( val === 1 ){
        var t = 0;
        var y = $("#Correo").val();
        if( y.length > 0 ){
            y = y.split("@")
            if( y.length > 1 ){
                
            }else{
                alert("Correo no válido")
                t++;
            }
        }else{
            alert("No ha ingresado ningún correo.")
            t++;
        }
        
        var y = $("#pwd").val()
        if( y.length > 5 ){
        }else{
            alert("No ha ingresado una contraseña válida")
            t++;
        }
        
        var y = $("#name").val()
        if( y.length > 2 ){
        }else{
            alert("No ha ingresado un nombre válido")
            t++;
        }
        
        var y = $("#apellido").val()
        if( y.length > 2 ){
        }else{
            alert("No ha ingresado un apellido válido")
            t++;
        }
        
        var y = $("#celular").val()
        if( y.length == 10 ){
        }else{
            alert("No ha ingresado un celular válido")
            t++;
        }
        
        if( t == 0 ){
            $(".Step").hide("slow");
            $(".P"+val).show("slow");
        }
    }
    if(val == 2){
        $(".Contador").each(function(){
            if( $(this).text() != 0 ){
                ArrayBoletas.push({
                    'cantidad':$(this).text(),
                    'id':$(this).next().text(),
                    'valor':$(this).next().next().text(),
                    'img':$(this).next().next().next().text(),
                    'ip':$(this).next().next().next().next().text(),
                    'ig':$(this).next().next().next().next().next().text(),
                    'name':$(this).next().next().next().next().next().next().text(),
                    'photo2':$(this).next().next().next().next().next().next().next().text(),
                })
            }
        })
        if( ArrayBoletas.length ==  0 ){
            alert("No se ha seleccionado ninguna boleta ni la cantidad a comprar.");
        }else{
            var html = "";
            var cantidad = 0;
            var Subtotal = 0;
            html += "<table width = '100%' class = 'DetallePrecios'>"
                html += "<tr>"
                    html += "<td width = '200px;'></td>"
                    html += "<td  class = 'ValorBoleta' style = 'font-size:14px;font-weight:bold;text-align:center;'>PRECIO</td>"
                    html += "<td  class = 'ValorBoleta' style = 'font-size:14px;font-weight:bold;text-align:center;'>CANTIDAD</td>"
                    html += "<td  class = 'ValorBoleta' style = 'font-size:14px;font-weight:bold;text-align:center;'>DETALLE BOLETA</td>"
                    /*html += "<td  class = 'ValorBoleta' style = 'font-size:14px;font-weight:bold;text-align:center;'>DETALLES RESERVA</td>"*/
                html += "</tr>"
                for(var i = 0; i < ArrayBoletas.length; i++){
                    Subtotal += (ArrayBoletas[i]['cantidad']*ArrayBoletas[i]['valor'])
                    cantidad += parseFloat(ArrayBoletas[i]['cantidad'])
                    html += "<tr>"
                        html += "<td style = 'text-align:center;' >"
                            html += "<img src ='"+UrlUniversalFile+"/public/../storage/app/Boletas/"+ArrayBoletas[i]['photo2']+"' class = 'ImagenBoletas2'/>"
                            /*html += "<div class = 'BoletasSize' style = 'background-color:#"+ArrayBoletas[i]['img']+"' >"
                                html += "<span class = 'NombreBoleta NombreBoletaB flex-center TitulosS'>"+ArrayBoletas[i]['name']+"</span>"
                            html += "</div>"*/
                        html += "</td>"
                        html += "<td style = 'text-align:center;'>"+formatNumber.new(ArrayBoletas[i]['valor'])+"</td>"
                        html += "<td style = 'text-align:center;'>"+ArrayBoletas[i]['cantidad']+"</td>"
                        html += "<td style = 'text-align:center;'>"
                            html += "<img src ='"+UrlUniversalFile+"/public/../storage/app/Boletas/"+ArrayBoletas[i]['img']+"' class = 'ImagenBoletas2' style = 'width:200px'/>"
                        html += "</td>"
                        /*html += "<td>"
                            html += "<table width = '100%'>"
                                html += "<td style = 'border:0px;'><textarea readonly class = 'TextDetalle' style = 'min-height:80px;color:#333333;'>"+ArrayBoletas[i]['ip']+"</textarea></td>"
                                html += "<td style = 'border:0px;'><textarea readonly class = 'TextDetalle' style = 'min-height:100px;text-align:justify;'>"+ArrayBoletas[i]['ig']+"</textarea></td>"
                            html += "</table>"
                        html += "</td>"*/
                    html += "</tr>"
                }
                var iva = (Subtotal*0.19);
                var descuento = 0;
                var pordes = "";
                if( parseFloat($(".fecha_limit").text()) > 0 ){
                    $(".CodigoDescuentoDiv").hide();
                    pordes = "15%";
                    descuento = (iva+Subtotal)*0.15;
                }else{
                    if( cantidad > 4 && cantidad < 11 ){
                        $(".CodigoDescuentoDiv").hide();
                        pordes = "10%";
                        descuento = (iva+Subtotal)*0.10;
                    }else if( cantidad > 10 ){
                        $(".CodigoDescuentoDiv").hide();
                        pordes = "20%";
                        descuento = (iva+Subtotal)*0.20;
                    }else if( cantidad < 5 ){
                        $(".CodigoDescuentoDiv").show();
                    }
                }
                $(".valorboleta_").text(Subtotal-descuento);
                $(".impuesto_").text(iva);
                $(".descuento_").text(pordes);
                $(".promo_").text(0);
                
                html += "<tr>"
                    html += "<td style = 'border:0px;'></td>"
                    html += "<td style = 'border:0px;'></td>"
                    /*html += "<td style = 'border:0px;'></td>"*/
                    html += "<td style = 'border:0px;' class = 'TotalCOmpra'>"
                        var temp = "";
                        temp += "<table width = '250px'>"
                            temp += "<tr>"
                                temp += "<td style = 'border:0px;color:black;font-weight:bold;'>SUBTOTAL:</td>"
                                temp += "<td style = 'border:0px;color:black;font-weight:bold;'>$ "+formatNumber.new(Subtotal)+"</td>"
                            temp += "</tr>"
                            temp += "<tr>"
                                temp += "<td style = 'border:0px;color:black;font-weight:bold;'>IVA:</td>"
                                temp += "<td style = 'border:0px;color:black;font-weight:bold;'>$ "+formatNumber.new(iva)+"</td>"
                            temp += "</tr>"
                            temp += "<tr>"
                                temp += "<td style = 'border:0px;color:black;font-weight:bold;'>DTO "+pordes+":</td>"
                                temp += "<td style = 'border:0px;color:black;font-weight:bold;'>$ "+formatNumber.new(descuento)+"</td>"
                            temp += "</tr>"
                            temp += "<tr>"
                                temp += "<td style = 'border:0px;font-size:14px;font-weight:bold;' class = 'ValorBoleta'>TOTAL:</td>"
                                temp += "<td style = 'border:0px;font-size:14px;font-weight:bold;' class = 'ValorBoleta'>$ "+formatNumber.new(Subtotal+iva-descuento)+"</td>"
                            temp += "</tr>"
                        temp += "</table>"
                        html += temp
                        $(".ResumenFactura").html(temp)
                    html += "</td>"
                html += "</tr>"
            html += "</table>"
            $(".DetalleTicket").html(html)
            $(".Step").hide("slow");
            $(".P"+val).show("slow");
        }
    }
    
    if(val == 3){
        var t = 0;
        var y = $("#F_name").val()
        if( y.length > 10 ){
        }else{
            alert("No ha ingresado un nombre válido")
            t++;
        }
        
        var y = $("#F_cedula").val()
        if( y.length > 4 ){
        }else{
            alert("No ha ingresado una cédula válida")
            t++;
        }
        
        var y = $("#F_direccion").val()
        if( y.length > 4 ){
        }else{
            alert("No ha ingresado una dirección válida")
            t++;
        }
        var y = $("#F_ciudad").val()
        if( y.length > 3 ){
        }else{
            alert("No ha ingresado una ciudad válida")
            t++;
        }
        var y = $("#F_pais").val()
        if( y.length > 4 ){
        }else{
            alert("No ha ingresado un país válida")
            t++;
        }
        var y = $("#F_celular").val()
        if( y.length == 10 ){
        }else{
            alert("No ha ingresado un celular válido")
            t++;
        }
        var y = $("#F_telefono").val()
        if( y.length > 6 ){
        }else{
            alert("No ha ingresado telefono válido")
            t++;
        }
        
        var y = $("#F_mail").val();
        if( y.length > 0 ){
            y = y.split("@")
            if( y.length > 1 ){
                
            }else{
                alert("Correo no válido")
                t++;
            }
        }else{
            alert("No ha ingresado ningún correo.")
            t++;
        }
        
        
        if(  t == 0 ){
            $(".Contador").each(function(){
                if( $(this).text() != 0 ){
                    ArrayBoletas.push({
                        'cantidad':$(this).text(),
                        'id':$(this).next().text(),
                        'valor':$(this).next().next().text(),
                        'img':$(this).next().next().next().text(),
                        'ip':$(this).next().next().next().next().text(),
                        'ig':$(this).next().next().next().next().next().text(),
                        'name':$(this).next().next().next().next().next().next().text(),
                    })
                }
            })
            $.ajax({
                type:'POST',
                url:'GuardarTicketsCompra',
                data:{
                    correo:$("#Correo").val(),
                    pwd:$("#pwd").val(),
                    name:$("#name").val(),
                    apellido:$("#apellido").val(),
                    celular:$("#celular").val(),
                    empresa:$("#empresa").val(),
                    F_name:$("#F_name").val(),
                    F_cedula:$("#F_cedula").val(),
                    F_direccion:$("#F_direccion").val(),
                    F_ciudad:$("#F_ciudad").val(),
                    F_pais:$("#F_pais").val(),
                    F_telefono:$("#F_telefono").val(),
                    F_mail:$("#F_mail").val(),
                    F_celular:$("#F_celular").val(),
                    valorboleta:$(".valorboleta_").text(),
                    impuesto:$(".impuesto_").text(),
                    descuento:$(".descuento_").text(),
                    promo:$(".promo_").text(),
                    ArrayBoletas:JSON.stringify(ArrayBoletas)
                    ,_token:document.getElementsByName('_token')[0].value},
                success:function(data){
                        if( data.info == 1 ){
                            location.href='http://process.grupotesta.com.co:8989/BropPayU/public/formPayUP/'+data.Id;
                        }
                }
            })
            /*if( $("input[name*='taller']").val() == 3 ){
                $(".Step").hide("slow");
                $(".P"+val).show("slow");
            }else{
                $(".Step").hide("slow");
                $(".P"+(val+1)).show("slow");
            }*/
        }
        
        
    }
    if( val == 4 ){
        
    }
}

function formatBoleta(){
    var tval = $(".valorboleta").val();
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
        $(".valorboleta").val("$ "+formatNumber.new(val_final));
        $(".textboleta").val(val_final);
    }
}

function validaasociado(){
    $.ajax({
            type:'POST',
            url:'ValidarAsociado',
            data:{codigo:$("#F_nit").val(),_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                if(data.info == 1){
                    $("#F_Asociado").val("Si")
                    if( parseFloat($(".fecha_limit").text()) < 1 ){
                        var Subtotal = 0;
                    var cantidad = 0;
                    for(var i = 0; i < ArrayBoletas.length; i++){
                        Subtotal += (ArrayBoletas[i]['cantidad']*ArrayBoletas[i]['valor'])
                        cantidad += parseFloat(ArrayBoletas[i]['cantidad'])
                    }
                    var iva = (Subtotal*0.19);
                    var descuento = 0;
                    var pdesc = 0;
                    var pordes = "";
                    if( cantidad < 5 ){
                        pordes = "20%";
                        pdesc = 20;
                        descuento = (iva+Subtotal)*0.20;
                    }

                    var desCodigo = (iva+Subtotal)*(data.por/100);
                    var porCodigo = data.por+"%";
                    
                    $(".valorboleta_").text(Subtotal-descuento);
                    $(".impuesto_").text(iva);
                    $(".descuento_").text(pdesc);
                    $(".promo_").text(0);
                    var temp = "";
                        temp += "<table width = '250px'>"
                            temp += "<tr>"
                                temp += "<td style = 'border:0px;color:black;font-weight:bold;'>SUBTOTAL:</td>"
                                temp += "<td style = 'border:0px;color:black;font-weight:bold;'>$ "+formatNumber.new(Subtotal)+"</td>"
                            temp += "</tr>"
                            temp += "<tr>"
                                temp += "<td style = 'border:0px;color:black;font-weight:bold;'>IVA:</td>"
                                temp += "<td style = 'border:0px;color:black;font-weight:bold;'>$ "+formatNumber.new(iva)+"</td>"
                            temp += "</tr>"
                            temp += "<tr>"
                                temp += "<td style = 'border:0px;color:black;font-weight:bold;'>DTO "+pordes+":</td>"
                                temp += "<td style = 'border:0px;color:black;font-weight:bold;'>$ "+formatNumber.new(descuento)+"</td>"
                            temp += "</tr>"
                            temp += "<tr>"
                                temp += "<td style = 'border:0px;font-size:14px;font-weight:bold;' class = 'ValorBoleta'>DTO CÓDIGO "+porCodigo+":</td>"
                                temp += "<td style = 'border:0px;font-size:14px;font-weight:bold;' class = 'ValorBoleta'>$ "+formatNumber.new(desCodigo)+"</td>"
                            temp += "</tr>"
                            temp += "<tr>"
                                temp += "<td style = 'border:0px;font-size:14px;font-weight:bold;' class = 'ValorBoleta'>TOTAL:</td>"
                                temp += "<td style = 'border:0px;font-size:14px;font-weight:bold;' class = 'ValorBoleta'>$ "+formatNumber.new(Subtotal+iva-descuento-desCodigo)+"</td>"
                            temp += "</tr>"
                        temp += "</table>"
                        $(".ResumenFactura").html(temp)
                        $(".TotalCOmpra").html(temp)
                    }
                }else{
                    $("#F_Asociado").val("No")
                }
            }
        })
}

function validarCodigo(){
    if( $("#codigodescuento").val().length > 3 ){
        $.ajax({
            type:'POST',
            url:'ValidaCodigo',
            data:{codigo:$("#codigodescuento").val(),_token:document.getElementsByName('_token')[0].value},
            success:function(data){
                if( data.info == 1 ){
                    var Subtotal = 0;
                    var cantidad = 0;
                    for(var i = 0; i < ArrayBoletas.length; i++){
                        Subtotal += (ArrayBoletas[i]['cantidad']*ArrayBoletas[i]['valor'])
                        cantidad += parseFloat(ArrayBoletas[i]['cantidad'])
                    }
                    var iva = (Subtotal*0.19);
                    var descuento = 0;
                    var pordes = "";
                    var pdesc = 0;
                    if( cantidad > 4 && cantidad < 11 ){
                        pordes = "10%";
                        pdesc = 10;
                        descuento = (iva+Subtotal)*0.10;
                    }else if( cantidad > 10 ){
                        pordes = "20%";
                        pdesc = 20;
                        descuento = (iva+Subtotal)*0.20;
                    }

                    var desCodigo = (iva+Subtotal)*(data.por/100);
                    var porCodigo = data.por+"%";
                    pdesc = data.por;

                    $(".valorboleta_").text(Subtotal-descuento);
                    $(".impuesto_").text(iva);
                    $(".descuento_").text(pdesc);
                    $(".promo_").text(data.id);
                    
                    var temp = "";
                        temp += "<table width = '250px'>"
                            temp += "<tr>"
                                temp += "<td style = 'border:0px;color:black;font-weight:bold;'>SUBTOTAL:</td>"
                                temp += "<td style = 'border:0px;color:black;font-weight:bold;'>$ "+formatNumber.new(Subtotal)+"</td>"
                            temp += "</tr>"
                            temp += "<tr>"
                                temp += "<td style = 'border:0px;color:black;font-weight:bold;'>IVA:</td>"
                                temp += "<td style = 'border:0px;color:black;font-weight:bold;'>$ "+formatNumber.new(iva)+"</td>"
                            temp += "</tr>"
                            temp += "<tr>"
                                temp += "<td style = 'border:0px;color:black;font-weight:bold;'>DTO "+pordes+":</td>"
                                temp += "<td style = 'border:0px;color:black;font-weight:bold;'>$ "+formatNumber.new(descuento)+"</td>"
                            temp += "</tr>"
                            temp += "<tr>"
                                temp += "<td style = 'border:0px;font-size:14px;font-weight:bold;' class = 'ValorBoleta'>DTO CÓDIGO "+porCodigo+":</td>"
                                temp += "<td style = 'border:0px;font-size:14px;font-weight:bold;' class = 'ValorBoleta'>$ "+formatNumber.new(desCodigo)+"</td>"
                            temp += "</tr>"
                            temp += "<tr>"
                                temp += "<td style = 'border:0px;font-size:14px;font-weight:bold;' class = 'ValorBoleta'>TOTAL:</td>"
                                temp += "<td style = 'border:0px;font-size:14px;font-weight:bold;' class = 'ValorBoleta'>$ "+formatNumber.new(Subtotal+iva-descuento-desCodigo)+"</td>"
                            temp += "</tr>"
                        temp += "</table>"
                        $(".ResumenFactura").html(temp)
                        $(".TotalCOmpra").html(temp)
                        alert("Se ha aplicado el descuento por el código")
                }else{
                    alert("No se ha encontrado el código ingresado.")
                }
            }
        })
    }
}
function ConsultarBoleta(){
    $.ajax({
        type:'POST',
        url:'ListarBoletas',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
            html += "<tr>"
            html += "<td nowrap>"
            html += "<p></p><img src = 'image/Administracion.png' height='50px'  /> <span class = 'TituloBuscador'>Nueva Boleta</span>";
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
                html += "<table width = '100%'>"
                var t = 0;
                for(var i = 0; i < data.info.length;i++){
                    if( t == 0){
                        html += "<tr>"
                            
                    }
                    html += "<td>"
                        html += "<table width = '300px'>"
                            html += "<tr>"
                                html += "<td>"
                                    html += "<div class = 'ImagenBoleta'style = 'height:150px;border:radius:0.5em;'>"
                                        html += "<img src = '"+UrlUniversalFile+"storage/app/Boletas/"+data.info[i]['photo']+"' class = 'ImagenBoleta'/>"
                                        html += "<span class = 'NombreBoleta flex-center'>"+data.info[i]['name']+"</span>"
                                    html += "</div>"
                                html += "</td>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<td>"
                                    html += "<span class = 'ValorBoleta flex-center'>$ "+formatNumber.new(data.info[i]['valor'])+" + IVA</span>"
                                html += "</td>"
                            html += "</tr>"
                            html += "<tr>"
                            html += "<tr>"
                                html += "<td>"
                                    html += "<span class = 'ValorBoleta flex-center'>Publico: "+data.info[i]['TipoComprador']+"</span>"
                                html += "</td>"
                            html += "</tr>"
                            html += "<tr>"
                                html += "<td>"
                                    html += "<span class = 'Incluye'>"
                                        html += "<p>INCLUYE:</p>";
                                        html += "<textarea readonly>"+data.info[i]['include_principal']+"</textarea>"
                                    html += "</span>"
                                html += "</td>"
                            html += "</tr>"
                        html += "</table>"
                    html += "</td>"
                    if( t == 2){
                        t = 0;
                        html += "</tr>"
                    }
                    t++;
                }
                html += "</table>"
            html += "</div>";
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        }
    })
}

function finalizarcompraboletas(){
    $.ajax({
        type:'POST',
        url:'../EnviarLinkBoletas',
        data:{fact:$(".fact").text(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            $("#indicativo").val(data.info);
            location.href='http://process.grupotesta.com.co:8989/BropPayU/public/Sitio';
        }
    })
}

function descargarpase(id){
    window.open('http://process.grupotesta.com.co:8989/BropPayU/public/Boleta/'+id);
}
function Indicativopais(){
    $.ajax({
        type:'POST',
        url:'../IndicativoPais',
        data:{pais:$("#pais").val(),_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            $("#indicativo").val(data.info);
        }
    })
}

function CambiarTextoFoto(val){
    var Text = $("#foto"+val).val();
    
    $("#NameFoto"+val).html(Text);
}

function CrearBoleta(){
    $.ajax({
        type:'POST',
        url:'ListTipoComprador',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
            html += "<tr>"
            html += "<td nowrap>"
            html += "<p></p><img src = 'image/Administracion.png' height='50px'  /> <span class = 'TituloBuscador'>Nueva Boleta</span>";
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
                html += "<form class = 'form-signin' action = 'AddBoleta' method='post' enctype='multipart/form-data' >"
                    html += "<input type='hidden' name='_token' value='" + document.getElementsByName('_token')[0].value + "'>";
                    html += "<div class = 'form-group row'>"
                        html += "<div class = 'col-sm-3'>"
                            html += "<label>Nombre Boleta:</label>"
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'nboleta' />"
                        html += "</div>"
                        html += "<div class = 'col-sm-3'>"
                            html += "<label>Valor Boleta:</label>"
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control valorboleta' value = '$ ' onkeyup = 'formatBoleta()' />"
                            html += "<input type = 'hidden' class ='textboleta' name = 'valor' />"
                        html += "</div>"
                        html += "<div class = 'col-sm-3'>"
                            html += "<label>Valor en Dólares:</label>"
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'usd'value = '' />"
                        html += "</div>"
                        html += "<div class = 'col-sm-3'>"
                            html += "<label>Imagen Boleta:</label>"
                            html += "<div class='custom-file mb-3'>";
                                html += "<input required type = 'file' class = 'custom-file-input' onchange = 'CambiarTextoFoto(1)' id = 'foto1' name = 'foto1'/>";
                                html += "<label class='custom-file-label' for='foto1' id = 'NameFoto1'>Seleccione Foto</label>";
                            html += "</div>";
                        html += "</div>"
                        /*
                        html += "<div class = 'col-sm-3'>"
                            html += "<label>Color Boleta:</label>"
                            html += "<input autocomplete = 'off' type = 'text' class = 'form-control' name = 'color' />"
                        html += "</div>"
                        */
                    html += "</div>"
                    /*
                    html += "<div class = 'form-group row'>"
                        html += "<div class = 'col-sm-6'>"
                            html += "<label>Inluye:</label>"
                            html += "<textarea class = 'form-control' name = 'incluye' ></textarea>"
                        html += "</div>"
                        html += "<div class = 'col-sm-6'>"
                            html += "<label>Complemento:</label>"
                            html += "<textarea class = 'form-control' name = 'complemento' ></textarea>"
                        html += "</div>"
                    html += "</div>"*/
                    html += "<div class = 'form-group row'>"
                        html += "<div class = 'col-sm-3'>"
                            html += "<label>Titulo Boleta:</label>"
                            html += "<div class='custom-file mb-3'>";
                                html += "<input required type = 'file' class = 'custom-file-input' onchange = 'CambiarTextoFoto(2)' id = 'foto2' name = 'foto2'/>";
                                html += "<label class='custom-file-label' for='foto2' id = 'NameFoto2'>Seleccione Foto</label>";
                            html += "</div>";
                        html += "</div>"
                        html += "<div class = 'col-sm-3'>"
                            html += "<label>Aplica para:</label>"
                            html += "<select class = 'form-control' name = 'aplicaa' >"
                                for(var i = 0; i < data.info.length;i++){
                                    html += "<option value = '"+data.info[i]['id']+"'>"+data.info[i]['nombre']+"</option>"
                                }
                            html += "</select>"
                        html += "</div>"
                        html += "<div class = 'col-sm-3'>"
                            html += "<label>¿Incluye Talleres?:</label><p></p>"
                            html += "<div class='form-check form-check-inline'>";
                                html += "<input class='form-check-input' type='radio' name = 'taller' id='estadoA' value='1' >";
                                html += "<label class='form-check-label' for='estadoA' style = 'font-weight:500;'>Si</label>";
                            html += "</div>";
                            html += "<div class='form-check form-check-inline'>";
                                html += "<input class='form-check-input' type='radio' name = 'taller' id='estadoE' value='0' checked >";
                                html += "<label class='form-check-label' for='estadoE' style = 'font-weight:500;'>No</label>";
                            html += "</div>";
                        html += "</div>"
                        html += "<div class = 'col-sm-3'>"
                            html += "<label>Cantidad:</label>"
                            html += "<input autocomplete = 'off' type = 'number' min = '1' class = 'form-control' name = 'cantidad' />"
                        html += "</div>"
                    html += "</div>"
                    html += "<div class = 'form-group row'>"
                        html += "<div class = 'col-sm-12' style = 'text-align:center;'>"
                            html += "<button class = 'btn btn-primary'>Guardar</button>"
                        html += "</div>"
                    html += "</div>"
                html += "</form>"
            html += "</div>";
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        }
    });
    
}

function PoliciticaCancelacion(){
    $.ajax({
        type:'POST',
        url:'ListTipoComprador',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
            html += "<tr>"
            html += "<td nowrap>"
            html += "<p></p><span class = 'TituloBuscador'>Política de Cancelación</span>";
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
                html += "<h5>Términos y Condiciones</h5>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>1. El Congreso ó evento  se desarrollará bajo los parámetros del catálogo del mismo.</p>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>2. BPrO  podrá, por razones atribuidas a fuerza mayor, caso fortuito, o por no cumplir con el número mínimo de participantes requerido, cancelar o posponer con un día hábil de preaviso para lo cual se reintegrará la suma pagada, sin derecho a ningún otro tipo de indemnización a él o los participantes inscritos. </p>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>3. Autorizo a BPrO  para  que le de tratamiento a mi información y a la de los asistentes  para utilizarla en la promoción, comercialización y fidelización de eventos, mensajes institucionales, productos y/ó servicios de los patrocinadores y de la BPrO .</p>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>4. Con el diligenciamiento de este formulario,  el Inscrito confirma su participación en el evento en las condiciones que indique  BPrO  y al cumplimiento de los términos aquí previstos.</p>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>5. En el caso en que el inscrito decida  retractarse de la participación en el evento, dicho retracto deberá presentarse por escrito ante BPrO  con antelación NO inferior a quince (15) días calendario previos a la fecha de inicio del evento, en caso en que el inscrito no llegare a cumplir el requisito de retracto dentro del término señalado,  entienden y aceptan que su conducta implica un incumplimiento a los términos del presente documento, por tanto deberá pagar a favor de  BPrO  el cien por ciento (100%) del valor total de la inscripción del evento.</p>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>6. En el caso que  el inscrito avise su inasistencia  antes de los últimos  15  días  previos al congreso y no cede su inscripción a otra persona, deberá pagar a favor de BPrO  una penalidad del  cincuenta porciento (50%) del valor total de la  inscripción.</p>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>En el caso que no haya realizado el pago, autoriza BPrO facturar el valor de la penalidad que corresponda.</p>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>7. Con el diligenciamiento de este formulario, la Empresa por medio de la cual se inscribe(n) el (los) asistente(s), se obliga a garantizar la participación y el cumplimiento de los términos señalados en el presente formulario por parte del (los) inscrito(s), especialmente, pero sin limitar, al cumplimiento de los términos definidos para el ejercicio del retracto. En caso de que el (los) asistente(s) o la empresa directamente no comunique a BPrO del retracto en el tiempo establecido, responderán solidariamente ante la BPrO por el pago del 100% sobre el valor total del evento.</p>"
            html += "</div>";
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        }
    });
}

function TerminosCondiciones(){
    $.ajax({
        type:'POST',
        url:'ListTipoComprador',
        data:{_token:document.getElementsByName('_token')[0].value},
        success:function(data){
            var html = "";
            html += "<div class='modal-header'>";
            html += "<table width = '100%'>"
            html += "<tr>"
            html += "<td nowrap>"
            html += "<p></p><span class = 'TituloBuscador'>Terminos y Condiciones</span>";
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
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td style = 'text-align:center;'>"
                            html += "<h5>MANUAL INTERNO DE POLÍTICAS Y PROCEDIMIENTOS PARA GARANTIZAR EL ADECUADO CUMPLIMIENTO DE LA LEY 1581 DE 2012 Y LAS DEMÁS NORMAS QUE REGULAN LA MATERIA DE PROTECCIÓN DE DATOS PERSONALES</h5>"
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td style = 'text-align:center;'>"
                            html += "<h5 class = 'TitulosS'>1.	Introducción </h5>"
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>En virtud de lo establecido en los artículos 17 literal k) y 18 literal f) de la Ley 1581 de 2012, así como de los artículos 13 a 19 del Decreto 1377 de 2013 y lo estipulado en el Decreto 886 de 2014 y la Circular No. 2 de la Superintendencia de Industria y Comercio, a continuación, se establecen las Políticas de Tratamiento de Bases de Datos Personales, las cuales serán obligatorias para todos los empleados de la Asociación Colombiana de Contact Centers y BPO. Éstos serán responsables a su vez por garantizar que las mismas sean conocidas por terceros, clientes, proveedores y contratistas que con ocasión de una relación contractual puedan llegar a tener acceso a la información de las bases de datos personales frente a las cuales la Asociación Colombiana de Contact Centers y BPO sea responsable o encargado del tratamiento. Las presentes Políticas principalmente se entienden aplicables a las bases de datos de la Empresa donde la Asociación Colombiana de Contact Centers y BPO sea el responsable del tratamiento, tales como: las bases de datos de los trabajadores, las bases de datos de clientes y las bases de datos de proveedores. </p>"
            
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td style = 'text-align:center;'>"
                            html += "<h5 class = 'TitulosS'>2.	Ámbito de Aplicación</h5>"
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>Las Políticas serán aplicables a los datos personales de personas naturales, registrados en cualquier Base de Datos, construidas antes o después de la entrada en vigencia de las normas sobre tratamiento de datos personales.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>Las Políticas no serán aplicables a aquellos datos que por su generalidad se convierten en anónimos al no permitir identificar o individualizar a un Titular específico.</p>"
            
            
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td style = 'text-align:center;'>"
                            html += "<h5 class = 'TitulosS'>3.	Definiciones</h5>"
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'><span style = 'font-weight:bold;'>a)	Autorización</span>: Consentimiento previo, expreso e informado del Titular para llevar a cabo el tratamiento de datos personales.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>b)	Aviso de Privacidad: Comunicación verbal o escrita generada por el Responsable, dirigida al Titular para el tratamiento de sus datos personales, mediante la cual se le informa acerca de la existencia de las Políticas de Tratamiento de Información que le serán aplicables, la forma de acceder a las mismas y las finalidades del tratamiento que se pretende dar a los datos personales.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>c)	Base de Datos: Conjunto organizado de datos personales que sea objeto de tratamiento.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>d)	Dato Personal: Cualquier información vinculada o que pueda asociarse a una o varias personas naturales determinadas o determinables.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>e)	Dato Privado: Es el dato que por su naturaleza íntima o reservada sólo es relevante para el Titular.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>f)	Dato Semiprivado: Es semiprivado el dato que no tiene naturaleza íntima, reservada, ni pública y cuyo conocimiento o divulgación puede interesar no sólo a su Titular sino a cierto sector o grupo de personas o a la sociedad en general.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>g)	Dato Público: Es el dato que no sea semiprivado, privado o sensible. Son considerados datos públicos, entre otros, los datos relativos al estado civil de las personas, a su profesión u oficio ya su calidad de comerciante o de servidor público. Por su naturaleza, los datos públicos pueden estar contenidos, entre otros, en registros públicos, documentos públicos, gacetas y boletines oficiales y sentencias judiciales debidamente ejecutoriadas que no estén sometidas a reserva. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>h)	Dato Sensible: Se entiende por datos sensibles aquellos que afectan la intimidad del Titular o cuyo uso indebido puede generar su discriminación, tales como aquellos que revelen el origen racial o étnico, la orientación política, las convicciones religiosas o filosóficas, la pertenencia a sindicatos, organizaciones sociales, de derechos humanos o que promueva intereses de cualquier partido político o que garanticen los derechos y garantías de partidos políticos de oposición, así como los datos relativos a la salud, a la vida sexual, y los datos biométricos.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>i)	Empresa: Para los efectos del presente documento se refiere a la Asociación Colombiana de Contact Centers y BPO.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>j)	Encargado del Tratamiento: Persona Natural o Jurídica, pública o privada que por sí mismo o en asocio con otros, realice el tratamiento de datos personales por cuenta del responsable del tratamiento.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>k)	Responsable del Tratamiento: Persona natural o jurídica, pública o privada, que por si misma o en asocio con otros, decida sobre la Base de Datos y/o el tratamiento de los datos.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>l)	Titular: Persona natural cuyos datos personales sean objeto de tratamiento.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>m)	Tratamiento: Cualquier operación o conjunto de operaciones sobre datos personales, tales como la recolección, almacenamiento, uso, circulación o supresión.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>n)	Transmisión: Tratamiento de datos personales que implica la comunicación de los mismos dentro o fuera del territorio de la República de Colombia cuando tenga por objeto la realización de un Tratamiento por el Encargado por cuenta del Responsable. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>o)	Transferencia: La transferencia de datos tiene lugar cuando el Responsable y/o Encargado del Tratamiento de datos personales, ubicado en Colombia, envía la información o los datos personales a un receptor, que a su vez es Responsable del Tratamiento y se encuentra dentro o fuera del país.";
                
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td style = 'text-align:center;'>"
                            html += "<h5 class = 'TitulosS'>4.	Principios Rectores</h5>"
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>a)	Principio de Legalidad: Este principio hace alusión a lo siguiente; El tratamiento a que se refiere la presente ley, es una actividad regulada que debe sujetarse a lo establecido en ella y en las demás disposiciones que la desarrollen.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>b)	Principio de Finalidad: Se encuentra definido en los siguientes términos: El tratamiento debe obedecer a una finalidad legítima de acuerdo con la constitución y la Ley, la cual debe ser informada al Titular.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>c)	Principio de Libertad: Hace alusión a que el tratamiento solo puede ejercerse con el consentimiento previo, expreso e informado del Titular. Los datos personales no podrán ser obtenidos o divulgados sin previa autorización, o en ausencia de mandato legal o judicial que releve el consentimiento. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>d)	Principio de Veracidad o Calidad: Establece que la información sujeta a tratamiento debe ser veraz, completa, exacta, actualizada, comprobable y comprensible. Se prohíbe el tratamiento de datos parciales, incompletos, fraccionados o que induzcan al error.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>e)	Principio de Transparencia: En el tratamiento debe garantizarse el derecho del Titular a obtener del responsable del tratamiento o del encargado del tratamiento, en cualquier momento y sin restricciones, información acerca de la existencia de datos que le conciernan.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>f)	Principio de Acceso y Circulación Restringida: El tratamiento se sujeta a los límites que se derivan de la naturaleza de los datos personales, de las disposiciones de la presente ley y la Constitución. En este sentido, el tratamiento sólo podrá hacerse por personas autorizadas por el Titular y/o por las personas previstas en la presente ley. Los datos personales, salvo información pública, no podrán estar disponibles en internet u otros medios de divulgación o comunicaciones masivas, salvo que el acceso sea técnicamente controlable para brindar un conocimiento restringido solo a los Titulares o terceros autorizados conforme la presente ley.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>g)	Principio de Seguridad: La información sujeta a tratamiento por el Responsable del Tratamiento o Encargado del Tratamiento a que se refiere la presente Ley, se deberá manejar con las medidas técnicas, humanas y administrativas que sean necesarias para otorgar seguridad a los registros evitando su adulteración, perdida, consulta, uso o acceso no autorizado o fraudulento.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>h)	Principio de Confidencialidad: Todas las personas que intervengan en el tratamiento de los datos personales que no tengan la naturaleza de públicos están obligadas a garantizar la reserva de la información, inclusive después de finalizada su relación con alguna de las labores que comprende el tratamiento, pudiendo solo realizar suministro o comunicación de datos personales cuando ello corresponde al desarrollo de las actividades autorizadas en la presente ley y en los términos de la misma.</p>";

                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td style = 'text-align:center;'>"
                            html += "<h5 class = 'TitulosS'>5.	Identificación del Responsable</h5>"
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>La Asociación Colombiana de Contact Centers y BPO, actuará normalmente como Responsable del tratamiento de datos, pero eventualmente podría ser Encargado. En cualquiera de estos casos, la Empresa se encontrará identificada de la siguiente manera:</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>Razón social: Asociación Colombiana de Contact Centers y BPO</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>Domicilio Social: Calle 99 No. 7A-77 oficina 506 de Bogotá D.C.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>Nit: 830.101.821-5</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>Dirección: Calle 99 No. 7A-77 oficina 506 de Bogotá D.C.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>Correo electrónico: comunicaciones@bpro.org</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>Teléfono: (57) 1 742 0280</p>";
                
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td style = 'text-align:center;'>"
                            html += "<h5 class = 'TitulosS'>6.	De las Bases de Datos</h5>"
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>A continuación, se indica el tratamiento de las bases de datos de la Asociación Colombiana de Contact Centers y BPO, según sea encargado o responsable del tratamiento.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>6.1. Como Responsable: La Empresa hará el tratamiento de los datos personales en los términos y alcances de la autorización entregada por el Titular de la información, de las siguientes bases:</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>a)	Bases de datos de trabajadores: Comprende los datos de trabajadores activos de la Empresa para la siguiente finalidad: recopilación, almacenamiento, copia, entrega, actualización, ordenamiento, clasificación, transferencia, corrección, verificación, uso para fines estadísticos y, en general, empleo y utilización de todos los datos suministrados con el propósito de administrar correctamente la relación laboral por parte de La Empresa con los empleados de la Empresa. La Empresa, podrá compartir los datos de los trabajadores de la Empresa con sus clientes actuales o potenciales, en desarrollo de su relación comercial y con el fin de cumplir con sus obligaciones comerciales y/o contractuales. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>b)	Bases de datos de proveedores: Recopilación, almacenamiento, copia, entrega, actualización, ordenamiento, clasificación, transferencia, corrección, verificación, uso para fines estadísticos y en general empleo y utilización de todos los datos suministrados con el propósito de desarrollar el objeto social de la Empresa y lo estipulado en los respectivos contratos y/o documentos comerciales suscritos entre las partes así como para administrar correctamente la relación comercial por parte de La Empresa con los proveedores de la Empresa. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>c)	Bases de datos de clientes: Comprende todos los clientes a quienes se les venden productos o prestan servicios, y tendrá la siguiente finalidad: recopilación, almacenamiento, copia, entrega, actualización, ordenamiento, clasificación, transferencia, corrección, verificación, uso para fines estadísticos y en general empleo y utilización de todos los datos suministrados con el propósito de desarrollar el objeto social de la Empresa y lo estipulado en los respectivos contratos y/o documentos comerciales suscritos entre las partes así como para administrar correctamente la relación comercial por parte de La Empresa con los clientes de la Empresa.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>6.2. Encargado del Tratamiento: Eventualmente la Empresa podrá hacer el tratamiento de los datos personales en los términos y alcances de la autorización entregada por el Titular de la información:</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>a)	Bases de datos de Propiedad de Clientes de La Empresa: Recopilación, almacenamiento, copia, entrega, actualización, utilización, ordenamiento, clasificación, transferencia, corrección, verificación y uso para fines estadísticos de bases de datos de propiedad de clientes corporativos de La Empresa, la cual estará en todo momento sujeta a las políticas e instrucciones que se acuerden entre las Partes. En la medida de lo posible, en los contratos con los clientes de La Empresa se hará expresa la condición de encargado del tratamiento de La Empresa y de responsable del tratamiento de sus clientes con las obligaciones que tal calidad les impone. Las bases entregadas por los clientes sólo se utilizarán según la finalidad establecida en los respectivos contratos, y por lo mismo, serán devueltas al Responsable una vez se concluyan las obligaciones contractuales de la Asociación Colombiana de Contact Centers y BPO como encargado. </p>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td style = 'text-align:center;'>"
                            html += "<h5 class = 'TitulosS'>7.	Seguridad de la Información</h5>"
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>Los mecanismos a través de los cuales la Empresa hace uso de los datos personales son seguros y confidenciales, pues cuenta con los medios tecnológicos idóneos para asegurar que sean almacenados de manera tal que se impida el acceso indeseado por parte de terceras personas, asegurando la confidencialidad de los mismos. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>Los datos personales contenidos en las bases de datos serán conservados mientras exista una relación comercial entre la Asociación Colombiana de Contact Centers y BPO y los terceros. </p>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td style = 'text-align:center;'>"
                            html += "<h5 class = 'TitulosS'>8.	Derechos de los Titulares de la Información </h5>"
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>Los Titulares de la información tienen los siguientes derechos</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>a)	Conocer, actualizar y rectificar sus datos personales frente a los Responsables del Tratamiento o Encargados del Tratamiento. Este derecho se podrá ejercer, entre otros frente a datos parciales, inexactos, incompletos, fraccionados, que induzcan a error, o aquellos cuyo Tratamiento esté expresamente prohibido o no haya sido autorizado;</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>b)	Solicitar prueba de la autorización otorgada al Responsable del Tratamiento salvo cuando expresamente se exceptúe como requisito para el Tratamiento, de conformidad con lo previsto en el artículo 10 de la ley 1581 de 2012;</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>c)	Ser informado por el Responsable del Tratamiento o el Encargado del Tratamiento, previa solicitud, respecto del uso que le ha dado a sus datos personales;</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>d)	Presentar ante la Superintendencia de Industria y Comercio quejas por infracciones a lo dispuesto en la ley y las demás normas que la modifiquen, adicionen o complementen;</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>e)	Revocar la autorización y/o solicitar la supresión del dato cuando en el Tratamiento no se respeten los principios, derechos y garantías constitucionales y legales. La revocatoria y/o supresión procederá cuando la Superintendencia de Industria y Comercio haya determinado que en el Tratamiento el Responsable o Encargado han incurrido en conductas contrarias a la ley y a la Constitución;</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>f)	Acceder en forma gratuita a sus datos personales que hayan sido objeto de Tratamiento. En ejercicio de los derechos anteriormente listados podrá realizar las consultas que resulten pertinentes y realizar los reclamos que entienda necesarios de cara a garantizar el respeto de los mismos.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>g)	Los demás derechos que se encuentren contenidos en la normatividad vigente respecto de la materia.</p>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td style = 'text-align:center;'>"
                            html += "<h5 class = 'TitulosS'>9.	De los Deberes de la Empresa</h5>"
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>9.1. Deberes como Responsable del Tratamiento: la Asociación Colombiana de Contact Centers y BPO, cuando actúe como Responsable del Tratamiento, deberá cumplir los siguientes deberes: </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>a)	Garantizar al Titular, en todo tiempo, el pleno y efectivo ejercicio del derecho de hábeas data.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>b)	Solicitar y conservar, copia de la respectiva autorización otorgada por el Titular. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>c)	Informar debidamente al Titular sobre la finalidad de la recolección y los derechos que le asisten por virtud de la autorización otorgada. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>d)	Conservar la información bajo las condiciones de seguridad necesarias para impedir su adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>e)	Garantizar que la información que se suministre al Encargado del Tratamiento sea veraz, completa, exacta, actualizada, comprobable y comprensible. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>f)	Actualizar la información, comunicando de forma oportuna al Encargado del Tratamiento, todas las novedades respecto de los datos que previamente le haya suministrado y adoptar las demás medidas necesarias para que la información suministrada a éste se mantenga actualizada.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>g)	Rectificar la información cuando sea incorrecta y comunicar lo pertinente al Encargado del Tratamiento.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>h)	Suministrar al Encargado del Tratamiento, según el caso, únicamente datos cuyo Tratamiento esté previamente autorizado.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>i)	Exigir al Encargado del Tratamiento en todo momento, el respeto a las condiciones de seguridad y privacidad de la información del Titular. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>j)	Tramitar las consultas y reclamos formulados en los términos señalados en la ley. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>k)	Informar al Encargado del Tratamiento cuando determinada información se encuentra en discusión por parte del Titular, una vez se haya presentado la reclamación y no haya finalizado el trámite respectivo.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>l)	Informar a Solicitud del Titular sobre el uso dado a sus datos.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>m)	Informar a la autoridad de protección de datos cuando se presenten violaciones a los códigos de seguridad y existan riesgos en la administración de la información de los Titulares.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>n)	Cumplir las instrucciones y requerimientos que imparta la Superintendencia de Industria y Comercio. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>o)	Los demás previstos en la Ley.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>9.2. Deberes como Encargado del Tratamiento: la Asociación Colombiana de Contact Centers y BPO, como Encargado del Tratamiento, en caso que llegare a serlo, deberá cumplir los siguientes deberes:</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>a)	Garantizar al Titular, en todo tiempo el pleno y efectivo ejercicio del derecho de hábeas data. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>b)	Solicitar y conservar la información bajo las condiciones de seguridad necesarias para impedir su adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento y según las condiciones establecidas en el respectivo contrato suscrito con el Responsable. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>c)	Realizar oportunamente la actualización, rectificación o supresión de los datos.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>d)	Actualizar la información reportada por los Responsables del Tratamiento dentro de los cinco (5) días hábiles contados a partir de su recibo. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>e)	Tramitar las consultas y los reclamos formulados por los Titulares.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>f)	Registrar en la Base de Datos la leyenda 'reclamo en trámite' en la forma en que se regula en la ley. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>g)	Insertar en la Base de Datos la leyenda 'información en discusión judicial' una vez notificado por parte de la autoridad competente sobre procesos judiciales relacionados con la calidad del Dato Personal. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>h)	Abstenerse de circular información que esté siendo controvertida por el Titular y cuyo bloqueo haya sido ordenado por la Superintendencia de Industria y Comercio. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>i)	Permitir el acceso a la información únicamente a las personas que pueden tener acceso a ella. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>j)	Informar a la Superintendencia de Industria y Comercio cuando se presenten violaciones a los códigos de seguridad y existan riesgos en la administración de la información de los Titulares. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>k)	Cumplir las instrucciones y requerimientos que imparta la Superintendencia de Industria y Comercio. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>l)	Conservar la información y grabaciones de los Titulares según los términos establecidos en los respectivos contratos. En caso que no se señale un plazo en particular, la Empresa conservará la información por un tiempo máximo de 1 año. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>9.3. Concurrencia de Calidades: En el evento en que concurran las calidades de Responsable del Tratamiento y Encargado del Tratamiento a la Empresa le será exigible el cumplimiento de los deberes previstos para cada uno.</p>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td style = 'text-align:center;'>"
                            html += "<h5 class = 'TitulosS'>10.	De los Datos Sensibles y de menores de edad</h5>"
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>La Empresa hace tratamiento de Datos Sensibles de los trabajadores, de los cuales ninguno es menor de edad. La Empresa se compromete a cumplir cabalmente con la Ley 1581 de 2012 respecto del tratamiento de datos sensibles.</p>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td style = 'text-align:center;'>"
                            html += "<h5 class = 'TitulosS'>11.	Procedimiento para el ejercicio de derechos por los Titulares de la información.</h5>"
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>Los Titulares de la información podrán ejercer los derechos a conocer, actualizar, rectificar y suprimir información, revocar la autorización inicialmente otorgada, consultar información, presentar reclamos y en general los demás derechos establecidos en el artículo 8 y demás concordantes de la Ley 1581 de 2012, a través de los siguientes medios:</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>Correo electrónico: comunicaciones@bpro.org o enviando su comunicación a la calle 99 No. 7A-77 oficina 506 de Bogotá D.C., dirigido a Melanie Triana, quien será el Oficial de Cumplimiento en la Empresa.  </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>La Asociación Colombiana de Contact Centers y BPO, dentro de la oportunidad legal, atenderá los derechos ejercidos por los Titulares de la información, sus solicitudes, consultas y/o reclamos a través del Oficial de Cumplimiento.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>Los Titulares deben entender que de acuerdo con el Articulo 9 del Decreto 1377 de 2013, “la solicitud de la información y la revocatoria de la autorización no procederá cuando el Titular tenga un deber legal o contractual de permanecer en la Base de Datos”.</p>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td style = 'text-align:center;'>"
                            html += "<h5 class = 'TitulosS'>12.	Áreas responsables de la atención de peticiones, consultas y reclamos de los Titulares de la información en el ejercicio de sus derechos.</h5>"
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>Cualquier proceso relacionado con el tratamiento de datos personales será coordinado y supervisado por el Oficial de Cumplimiento, Melanie Triana. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>Correo electrónico: comunicaciones@bpro.org</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>Dirección: Calle 99 No. 7A-77 oficina 506 de Bogotá D.C.</p>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td style = 'text-align:center;'>"
                            html += "<h5 class = 'TitulosS'>13.	Medidas de seguridad tratamiento Base de Datos</h5>"
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>La Empresa aplicará en el tratamiento de las bases de datos a su cargo, bien sea como responsable o como encargado, las mejores prácticas, el mayor esfuerzo y diligencia de cara a garantizar la seguridad y confidencialidad de los datos de seguridad de las Bases de Datos de la Empresa. </p>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td style = 'text-align:center;'>"
                            html += "<h5 class = 'TitulosS'>14.	Transferencia y transmisión de datos personales</h5>"
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>La Empresa realiza transmisión más no transferencia de los datos personales contenidos en las bases de datos de las cuales es responsable. </p>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td style = 'text-align:center;'>"
                            html += "<h5 class = 'TitulosS'>15.	Prevalencia de las normas sustantivas sobre la materia</h5>"
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>Teniendo en cuenta que el presente documento busca dar cumplimiento a las normas que regulan la protección del derecho de habeas data consagrado en la constitución, las leyes estatutarias sobre la materia y los reglamentos que expida el Gobierno Nacional para tal propósito, la interpretación de las Políticas de la entidad estará en todo momento subordinada al contenido de tales disposiciones superiores, por lo que en caso de incompatibilidad o contradicción entre las presentes Políticas y la normatividad superior será aplicable esta última.</p>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td style = 'text-align:center;'>"
                            html += "<h5 class = 'TitulosS'>16.	Fecha de entrada en vigencia de la Política de Tratamiento de la Información. </h5>"
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>La presente versión del Manual de Políticas de Tratamiento de Información entra en vigencia a partir de su publicación en la Empresa. </p>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td style = 'text-align:center;'>"
                            html += "<h5 class = 'TitulosS'>17.	Aviso de Privacidad</h5>"
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>Según lo estipulado en el Articulo 14 del Decreto 1377 de 2013, en caso que no sea posible poner a disposición del Titular las Políticas de Tratamiento de la Información, los Responsables deberán informar por medio de un Aviso de Privacidad al Titular sobre la existencia de tales Políticas y la forma de acceder a las mismas, manera oportuna y en todos caso a más tardar al momento de recolección de los datos personales. A continuación, se transcribe el Aviso de Privacidad que se puede emplear por parte de la Empresa. No obstante, la Empresa podrá ajustar dichos avisos para su aplicación en los diferentes tipos de autorizaciones, pero sin incumplir con lo previsto en la normatividad vigente. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>Aviso De Privacidad:</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>La Asociación Colombiana de Contact Centers y BPO (en adelante la “Empresa”) está comprometida con la protección de datos personales. Por medio de este aviso se le informa nuestra Política de Protección de Datos Personales, se describe el tratamiento al que serán sometidos los datos y su finalidad, los derechos de los Titulares, las medidas de seguridad y el medio para realizar consultas, peticiones y reclamos. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>La Empresa hará el tratamiento de los datos personales en los términos y alcances de la autorización entregada por el Titular de la información, de las siguientes bases:</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>a)	Bases de datos de trabajadores.</p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>b)	Bases de datos de proveedores. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>c)	Bases de datos de clientes.</p>";
                html += "<table width = '100%'>"
                    html += "<tr>"
                        html += "<td style = 'text-align:center;'>"
                            html += "<h5 class = 'TitulosS'>18. Derechos de los Titulares y Mecanismos para Hacer Efectivos los Derechos</h5>"
                        html += "</td>"
                    html += "</tr>"
                html += "</table>"
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>Los Titulares tienen los derechos contemplados en la normatividad vigente de protección de datos y en cualquier momento podrán contactarse con la Empresa escribiendo al Correo electrónico comunicaciones@bpro.org donde también podrán solicitar el envío de la Política de Protección de Datos. </p>";
                html += "<p class = 'TitulosS' style = 'text-align:justify;'>La Empresa responderá el reclamo a la mayor brevedad sin exceder el término máximo fijado por la Ley. </p>";
                
                
            html += "</div>";
            $(".content_modal").html(html);
            $("#ModalContentForm").removeClass('modal-lg').addClass('modal-xl');
        }
    });
}

var slideIndex = 0;
function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    
    slideIndex++;
    console.log(slideIndex)
    if (slideIndex > x.length) {slideIndex = 1}
    x[slideIndex-1].style.display = "block";
    setTimeout(carousel, 2000); // Change image every 2 seconds
  }
  
  
  function cardFormValidate(){
    var cardValid = 0;

    //card number validation
    $('#card_number').validateCreditCard(function(result){
        if(result.valid){
            $("#card_number").removeClass('required');
            cardValid = 1;
        }else{
            $("#card_number").addClass('required');
            cardValid = 0;
        }
    });
      
    //card details validation
    var cardName = $("#name_on_card").val();
    var expMonth = $("#expiry_month").val();
    var expYear = $("#expiry_year").val();
    var cvv = $("#cvv").val();
    var regName = /^[a-z ,.'-]+$/i;
    var regMonth = /^01|02|03|04|05|06|07|08|09|10|11|12$/;
    var regYear = /^2017|2018|2019|2020|2021|2022|2023|2024|2025|2026|2027|2028|2029|2030|2031$/;
    var regCVV = /^[0-9]{3,3}$/;
    if (cardValid == 0) {
        $("#card_number").addClass('required');
        $("#card_number").focus();
        return false;
    }else if (!regMonth.test(expMonth)) {
        $("#card_number").removeClass('required');
        $("#expiry_month").addClass('required');
        $("#expiry_month").focus();
        return false;
    }else if (!regYear.test(expYear)) {
        $("#card_number").removeClass('required');
        $("#expiry_month").removeClass('required');
        $("#expiry_year").addClass('required');
        $("#expiry_year").focus();
        return false;
    }else if (!regCVV.test(cvv)) {
        $("#card_number").removeClass('required');
        $("#expiry_month").removeClass('required');
        $("#expiry_year").removeClass('required');
        $("#cvv").addClass('required');
        $("#cvv").focus();
        return false;
    }else if (!regName.test(cardName)) {
        $("#card_number").removeClass('required');
        $("#expiry_month").removeClass('required');
        $("#expiry_year").removeClass('required');
        $("#cvv").removeClass('required');
        $("#name_on_card").addClass('required');
        $("#name_on_card").focus();
        return false;
    }else{
        $("#card_number").removeClass('required');
        $("#expiry_month").removeClass('required');
        $("#expiry_year").removeClass('required');
        $("#cvv").removeClass('required');
        $("#name_on_card").removeClass('required');
        return true;
    }
}