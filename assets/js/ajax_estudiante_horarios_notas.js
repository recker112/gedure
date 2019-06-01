$(document).ready(function(){
	//Ajax notas/horarios estudiante
	$("#admin_activar_estu_ok").click(function(event){
		event.preventDefault();
		var cedula = $("#admin_activar_cedula").val();

		if (cedula != "") {
			var datos = $("#admin-activar-estu").serialize();
			$.ajax("assets/php/ajax_estudiante_horarios_notas.php", {
				type: "POST",
				dataType: "html",
				data: datos,
				cache: false,
				beforeSend: function() {
					$("#loading_activar_estudiante").fadeIn(400);
					$("#admin_activar_estu_ok").css("display", "none");
                    $("#admin-activar-select").prop("disabled", "disabled");
				},
				success: function(respuesta){
					$("#loading_activar_estudiante").css("display", "none");
					$("#admin_activar_estu_ok").fadeIn(200);
                    $("#admin-activar-select").prop("disabled", "");
                    $("#popad").fadeIn(200).css("display", "flex");
                    var resultado = JSON.parse(respuesta);
                    if (resultado.message == "consulta_error") {
                        var html = "Error en la consulta interna, contacte con el develper de la pagina!"
                    }else if (resultado.message == "user_no_found") {
                        var html = "La cedula V-"+ cedula +" no se encuentra registrada en la base de datos."
                    }else if (resultado.message == "no_change") {
                        var html = "No se han realizado cambios!"
                    }else if (resultado.message == "ok") {
                        var html = "Los cambios fueron cargados al servidor correctamente!"
                    }else if (resultado.message == "token") {
                        var html = "Error en los procesos internos!! <br> Ex000001"
                    }else {
                        var html = "Error en los procesos internos!! <br> Ex000003";
                    }

                    //Popad
                    $("#popad").fadeIn(200).css("display", "flex");
                    $("#popad-text").text("NOTAS/HORARIOS!");
                    $("#info").html(html);
				},
				error: function(event) {
                	$("#loading_delete").css("display", "none");
                    $("#delete-seccion").fadeIn(200);
                    $("#admin-delete-select").prop("disabled", "");
                    $(".secciones-delete").css("margin-bottom", "15px");
                    var html = "El servidor arroja el siguente error: "+ event.statusText +".";
                    //Popad
                    $("#popad").fadeIn(200).css("display", "flex");
                    $("#popad-text").text("NOTAS/HORARIOS!");
                    $("#info").html(html);
                }
			})
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