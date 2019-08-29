$(document).ready(function(){
	$("#matricula").on("click", function(event) {
		event.preventDefault();

        var seccion = $("#seccion_matricula").val();
        var curso = $("#curso_matricula").val();
        var datos = new FormData();
        datos.append("archivo", $("#archivo_matricula")[0].files[0]);
        datos.append("curso", curso);
        datos.append("seccion", seccion);
        if (seccion != "" && curso != "") {
            $.ajax("assets/php/ajax_upload_matricula.php", {
                type: "POST",
                contentType: false,
                data: datos,
                processData: false,
                cache: false,
                beforeSend: function() {
                    $('#loading_matricula').fadeIn(400).css("display", "flex");
                    $('#matricula').css("display", "none");
                    $('.fix_loading1').css("margin-bottom", "0");
                },
                success: function(respuesta) {
                	$('#loading_matricula').css("display", "none");
                    $('#matricula').fadeIn(400).css("display", "flex");
                    $('.fix_loading1').css("margin-bottom", "15px");

                    var resultado = JSON.parse(respuesta);
                    if (resultado.message == "update none") {
                    	var html = "Debe de seleccionar un archivo el cual cargar al servidor";
                    }else if (resultado.message == "update max") {
                    	var html = "El archivo seleccionado pesa mas de 10KB.";
                    }else if (resultado.message == "update type") {
                    	var html = "Solo se permiten archivos en formato .csv.";
                    }else if (resultado.message == "update local") {
                    	var html = "No se ha podido localizar la carpeta destino.";
                    }else if (resultado.message == "update error") {
                    	var html = "Error al intentar cargar el archivo al servidor.";
                    }else if (resultado.message == "update ok") {
                    	var insertados = resultado.insert;
                        var actualizados = resultado.update;
                        var errores_matricula = resultado.error;
                        var html = "Matricula cargada correctamente!!<br/>Insertados: " + insertados + ".<br/>Actualizados: " + actualizados + ".<br/>Errores: " + errores_matricula + ".";
                        setTimeout("document.location = '" + resultado.dowload + "'", 2000);
                    }else if (resultado.message == "token") {
                        var html = "Error en los procesos internos!! <br> Ex000001"
                    }else {
                    	var html = "Error en los procesos internos!! </br>Ex000003";
                    }

                    //Popad
                    $("#popad").fadeIn(200).css("display", "flex");
                    $("#popad-text").text("CARGAR!");
                    $("#info").html(html);
                },
                error: function(event) {
                    $('#loading_matricula').css("display", "none");
                    $('#matricula').fadeIn(200).css("display", "flex");
                    $('.fix_loading1').css("margin-bottom", "15px");
                    var html = "El servidor arroja el siguente error: "+ event.statusText +".";
                    //Popad
                    $("#popad").fadeIn(200).css("display", "flex");
                    $("#popad-text").text("CARGAR!");
                    $("#info").html(html);
                }
            });
        } else {
        	var html = "Debe seleccionar un año y una seccion.";
            //Popad
            $("#popad").fadeIn(200).css("display", "flex");
            $("#popad-text").text("CARGAR!");
            $("#info").html(html);
        }
        //Cerrar Popad
        $("#popad-cerrar").on("click", function(){
            cerrar_ventana();
        });
    });
});