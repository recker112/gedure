$(document).ready(function(){
	var errorsazo = getParameterByName("error");

	if (errorsazo) {
		if (errorsazo == "horarios") {
			var html = "Los horarios estan actualmente desactivados."
		}else if (errorsazo == "notas") {
			var html = "Las notas estan actualmente desactivadas.";
		}else if (errorsazo == "loginEntry") {
			var html = "Debes de iniciar primero sección!";
		}else if (errorsazo == "notas_no_found") {
			var html = "Su boleta no esta cargada en el servidor!<br>Por favor vaya a control de estudio para solucionar este problema.";
		}else if (errorsazo == "horarios_no_found") {
			var html = "Su horario no esta cargada en el servidor!<br>Por favor esperé a que se suba su horario.";
		}

		//Popad
		$("#popad").fadeIn(200).css("display", "flex");
		$("#popad-text").text("ADVERTENCIA!");
		$("#info").html(html);
		$("#popad-cerrar").on("click", function(){
        	cerrar_ventana();
        });
	}
});