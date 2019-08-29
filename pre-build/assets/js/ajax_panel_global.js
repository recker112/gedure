$(document).ready(function() {
	$("#contenido").on("click", "#op_boton", function(e) {
		e.preventDefault();

		//Popad
		$("#popad-titulo").text("Contraseña");

		//Variables
		var pass_actual = $("#pass_actual").val();
		var pass_new = $("#pass_new").val();
		var pass_new_v = $("#pass_new_repit").val();

		//Verificar variables vacias
		if (pass_actual != "" && pass_new != "" && pass_new_v != "") {
			//Verificar contraseñas iguales y que no sea igual a la actual
			if (pass_new == pass_new_v && pass_new != pass_actual) {

				//Variables del formulario a travez de serailize()
				var datos = $("#form_opciones").serialize();

				//Ajax
				$.ajax("assets/php/ajax_password.php", {
					//Parametros estandar
					type: "POST",
					dataType: "html",
					data: datos,
					cache: false,

					//Animación de espera
					beforeSend: function() {
						//Efecto loading
						$("#op_boton").hide();
						$("#op_loading").fadeIn(200);
					},

					//Algoritmos al tener una respuesta del XHR
					success: function(respuesta) {
						//Efecto loading invertido
						$("#op_loading").hide();
						$("#op_boton").fadeIn(200);

						//Transformar respuesta en JSON
						var resultado = JSON.parse(respuesta);

						//Variable del mensaje
						var message;

						//Verificar el mensaje que regresa el servidor
						if (resultado.message == "token") {
							message = "Error: Ex000001";
						}else if (resultado.message == "consult_error") {
							message = "Error: Ex000002";
						}else if (resultado.message == "time") {
							message = "Acabas de cambiar tu contraseña hace un momento, por favor espere un rato antes de poder cambiar de nuevo.";
						}else if (resultado.message == "old_pass") {
							message = "La contraseña actual no coincide con la contraseña guardada en la base de datos.";
						}else if (resultado.message == "ok") {
							message = "Su contraseña fue actualizada correctamente.";
						}else {
							message = "Error: Ex000003";
						}

						//Insertar mensaje en el popad-info
						$("#popad-info").text(message);

						//Mostrar popad
						$("#popad").fadeIn(200).css("display", "flex");
					},

					//XHR Error
					error: function (jqXHR, textStatus, errorThrown) {
		        $("#popad").fadeIn(200).css("display", "flex");
		        $("#popad-titulo").text("PETICION FALLIDA");
		        $("#popad-info").html("El servidor arroja los siguientes datos: <br>jqXHR: "+ jqXHR.statusText +".</br>Type Error: "+ textStatus +".");               
		      }
				});
			}else {

				//Mensaje de error al validar contraseñas
				$("#popad-info").text("Los campos de la nueva contraseña deben ser iguales, y la nueva contraseña no puede ser igual a la actual.");
	    	$("#popad").fadeIn(200).css("display", "flex");
			}
		}else {
			//Mensaje si todos los campos están vacios
	    $("#popad-info").text("Debe rellenar todos los campos.");
	    $("#popad").fadeIn(200).css("display", "flex");
		}
	});
});