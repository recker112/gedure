$(document).ready(function(){
	$("#modify_prof_ok").click(function(event){
		event.preventDefault();

		var nombre = $("#prof_nombre").val();
		var curso = $("#prof_curso").val();
		var seccion = $("#prof_seccion").val();
		if (nombre != "" && curso != "" && seccion != "") {
			var datos = $('#modify_prof').serialize();
			$.ajax("assets/php/ajax_modify_prof.php", {
				type: "POST",
				dataType: "html",
				data: datos,
				cache: false,
				beforeSend: function(){
					$('#loading_modify_prof').fadeIn(400).css("display", "flex");
                    $('#modify_prof_ok').css("display", "none");
                    $('.fix_loading2').css("margin-bottom", "0");
                    $('#menu-modify-select').prop("disabled", "disabled");
				},
				success: function(respuesta){
					$('#menu-modify-select').prop("disabled", "");
                	$('#loading_modify_prof').css("display", "none");
                    $('#modify_prof_ok').fadeIn(400).css("display", "flex");
                    $('.fix_loading2').css("margin-bottom", "15px");
                    var resultado = JSON.parse(respuesta);

                    if (resultado.message == "no_found_seccion") {
                    	var html = "No se pudo encontrar el curso seleccionado, no esta registrado en la base de datos.";
                    }else if (resultado.message == "no_change") {
                    	var html = "No se han realizado cambios!";
                    }else if (resultado.message == "ok"){
                    	if (resultado.curso_fix == "G") {
                    		var html = "Se actualizó el profesor guia del curso "+ resultado.curso +" grado "+ resultado.seccion;
                    	}else {
                    		var html = "Se actualizó el profesor guia del curso "+ resultado.curso +" año "+ resultado.seccion;
                    	}
                    }else if (resultado.message == "token") {
                        var html = "Error en los procesos internos!! <br> Ex000001"
                    }else {
                        var html = "Error en los procesos internos!! <br> Ex000003";
                    }

                    //Popad
                    $("#popad").fadeIn(200).css("display", "flex");
                    $("#popad-text").text("MODIFICAR!");
                    $("#info").html(html);
				}
			});
		}else {
        	var html = "Debe de rellenar todos los campos.";
            //Popad
            $("#popad").fadeIn(200).css("display", "flex");
            $("#popad-text").text("MODIFICAR!");
            $("#info").html(html);
        }
        //Cerrar Popad
        $("#popad-cerrar").on("click", function(){
            cerrar_ventana();
        });
	});
});