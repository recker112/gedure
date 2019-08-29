$(document).ready(function() {
	//Login
	$("div#login-submit").on("click", "#login_button", function(event) {
		event.preventDefault();//Evitar comportamiento normal de form

    //Variables
		var user = $("#login_user").val();
		var pass = $("#login_password").val();

    //Verificar si las variables están vacias
		if (user != "" && user != " " && pass != "" && pass != " ") {
			var datos = $('#form_login').serialize();//Obtener datos del formulario

      //Ajax
			$.ajax("assets/php/ajax_check_login.php",{
        //Parametros estandar
				type: "POST",
				dataType: "html",
      	data: datos,
      	cache: false,
        
        //Animación de espera
      	beforeSend: function() {
      		//Efecto loading
      		$("#login_button").hide();
      		$("#login_loading").fadeIn(450);
      	},

        //Algoritmos al tener una respuesta del XHR
      	success: function(respuesta) {
      		//Revertir Efecto loading
      		$("#login_loading").hide();
      		$("#login_button").fadeIn(450);

          //Transformar resultado a JSON
      		var resultado = JSON.parse(respuesta);

      		//Mensajes del JSON
      		if (resultado.status == 'fallido') {

            //Mensajes en caso de error
        		if (resultado.message == 'token') {
        			var popad_text = "Error: Ex000001";
        		}else if (resultado.message == 'consult_error1') {
            	var popad_text = "Error: Ex000002";
            }else if (resultado.message == 'consult_error2') {
          		var popad_text = "Error: Ex000002";
          	}else if (resultado.message == 'consult_error3') {
          		var popad_text = "Error: Ex000002";
          	}else if (resultado.message == 'no_encontrado') {
          		var popad_text = "El usuario y/o la contraseña es incorrecta.";
          	}else if (resultado.message == 'banlist') {
          		var popad_text = "El usuario y/o la contraseña es incorrecta.";
          	}else if (resultado.message == 'block'){
            	var popad_text = "Exedistes el numero de intentos, tu cuenta esta bloqueada por 5 minutos.";
          	}else if (resultado.message == 'block_perma'){
            	var popad_text = "Tu cuenta esta bloqueada, demaciados intentos fallidos. Por favor visite a control de estudio para poder desbloquear su cuenta.";
            }else if (resultado.message == 'unlock'){
            	var popad_text = "Revisa tus credenciales, las sigues poniendo mal.";
          	}else if (resultado.message == 'still_blocked'){
          		var popad_text = "Tu cuenta aún sigue bloqueada, espera unos minutos para volver a intentar iniciar sesión.";
          	}else {
              var popad_text = "Error: Ex000003";
            }

            //Mostrar resultado del JSON en popad
            $("#popad-titulo").text("Login");
            $("#popad-info").text(popad_text);
            $("#popad").fadeIn(200).css("display", "flex");
        	}else if (resultado.status == "exitoso") {

            //Login realizado sin nungún problema
        		$("#login_button").prop("disabled", "disabled");
                setTimeout("window.location.href = 'panel.php'", 1000);
        	}else {

        		//En caso de GRAN error
        		console.log("Error faltal ubicado en los archivos de login, hay que revisar esto carnal!!");
        		var popad_text = "Error en los procesos internos!! </br>Ex000003";

        		//Mostrar resultado del JSON en popad
              $("#popad-titulo").text("Login");
              $("#popad-info").text(popad_text);
              $("#popad").fadeIn(200).css("display", "flex");
        	}
      	},

        //Error en la petición XHR
      	error: function (jqXHR, textStatus, errorThrown) {
      		//Revertir Efecto loading
      		$("#login_loading").hide();
      		$("#login_button").fadeIn(450);

          //Mostrar datos
          $("#popad").fadeIn(200).css("display", "flex");
      		$("#popad-titulo").text("PETICION FALLIDA");
     			$("#popad-info").html("El servidor arroja los siguientes datos: <br>jqXHR: "+ jqXHR.statusText +".</br>Type Error: "+ textStatus +".");            	
     		}
			});
		}else {

      //Mensaje de error al no rellenar todos los campos
			$("#popad-titulo").text("Login");
			$("#popad-info").text("Debe rellenar todos los campos.");
			$("#popad").fadeIn(200).css("display", "flex");
		}
	});

  //Cerrar ventana del popad
	$("#popad-cerrar").on("click", function() {
		cerrar_ventana();
	});
});