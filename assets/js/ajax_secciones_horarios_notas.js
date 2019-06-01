$(document).ready(function(){
	$("#admin_activar_sec_ok").click(function(event){
		event.preventDefault();
		var curso = $("#admin_activar_curso").val();
		var seccion = $("#admin_activar_seccion").val();
		if (curso != "" && seccion != "") {
			var datos = $("#admin-activar-sec").serialize();
			$.ajax("assets/php/ajax_secciones_horarios_notas.php", {
				type: "POST",
				dataType: "html",
				data: datos,
				cache: false,
				beforeSend: function(){
					$("#loading_activar_secciones").fadeIn(400);
					$("#admin_activar_sec_ok").css("display", "none");
                    $("#admin-activar-select").prop("disabled", "disabled");
				},
				success: function(respuesta){
					$("#loading_activar_secciones").css("display", "none");
					$("#admin_activar_sec_ok").fadeIn(200);
                    $("#admin-activar-select").prop("disabled", "");
                    $("#popad").fadeIn(200).css("display", "flex");
                    var resultado = JSON.parse(respuesta);
                    if (resultado.message == "consulta_error") {
                    	var html = "Error en los procesos internos!! <br> Ex000002"
                    }else if (resultado.message == "no_found_seccion") {
                    	var html = "La sección seleccionada no existe en la base de datos";
                    }else if (resultado.message == "no_change") {
                    	var html = "No se han realizado cambios!";
                    }else if (resultado.message == "ok" && resultado.curso_fix == "G") {
                    	if (resultado.seccion == "all") {
                    		var html = "Se han realizado los cambios en todas las secciones del "+ resultado.curso +" grado";
                    	}else {
                    		var html = "Se han realizado los cambios a la sección "+ resultado.curso +" grado "+ resultado.seccion;
                    	}
                    }else if (resultado.message == "ok" && resultado.curso_fix == "A") {
                    	if (resultado.seccion == "all") {
                    		var html = "Se han realizado los cambios en todas las secciones del "+ resultado.curso +" año";
                    	}else {
                    		var html = "Se han realizado los cambios a la sección "+ resultado.curso +" año "+ resultado.seccion;
                    	}
                    }else if (resultado.message == "token") {
                    	var html = "Error en los procesos internos!! <br> Ex000001"
                    }else {
                    	var html = "Error en los procesos internos!! <br> Ex000003";
                    }

                    //Popad
                    $("#popad").fadeIn(200).css("display", "flex");
                    $("#popad-text").text("NOTAS/HORARIOS!");
                    $("#info").html(html);
				}
			});
		}else {
            var html = "Debe de rellenar todos los campos.";
            //Popad
            $("#popad").fadeIn(200).css("display", "flex");
            $("#popad-text").text("NOTAS/HORARIOS!");
            $("#info").html(html);
        }
        //Cerrar Popad
        $("#popad-cerrar").on("click", function(){
            cerrar_ventana();
        });
	});
});