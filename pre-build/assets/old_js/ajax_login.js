$(document).ready(function(){
	//Login
    $('div.login_submit').on("click", "button",function(event) {
    	event.preventDefault();
        var user = $("#login-user").val();
        var pass = $("#login-password").val();
        if (user != "" && pass != "") {
        	var datos = $('#form_login').serialize();
            $.ajax("assets/php/ajax_check_login.php", {
            	type: "POST",
                dataType: "html",
            	data: datos,
            	cache: false,
            	beforeSend:function(){
            		$("#login_loading").fadeIn(400).css("display", "inline-block");
                	$("div.login_submit button").css("display", "none");
                	$("div.login_submit").css("margin", "8px");
            	},
            	success:function(respuesta){
            		$("#login_loading").css("display", "none");
                    $("div.login_submit button").fadeIn(400).css("display", "inline-block");
                    $("div.login_submit").css("margin", "20px");
                    var resultado = JSON.parse(respuesta);
                    if (resultado.status == 'fallido') {
                    	if (resultado.message == 'token') {
                    		var html = "Error en los procesos internos!! </br>Ex000001";
                    	}else if (resultado.message == 'consult_error') {
                    		var html = "Error en los procesos internos!! </br>Ex000002";
                    	}else if (resultado.message == 'no_encontrado') {
                    		var html = "El usuario y/o la contraseña es incorrecta.";
                    	}else if (resultado.message == 'banlist') {
                    		var html = "El usuario y/o la contraseña es incorrecta.";
                    	}else if (resultado.message == 'block'){
                    		var html = "Exedistes el numero de intentos, tu cuenta esta bloqueada por 5 minutos.";
                    	}else if (resultado.message == 'block_perma'){
                    		var html = "Tu cuenta esta bloqueada, demaciados intentos fallidos. Por favor visite a control de estudio para poder desbloquear su cuenta.";
                    	}else if (resultado.message == 'unlock'){
                    		var html = "Revisa tus credenciales, las sigues poniendo mal.";
                    	}else if (resultado.message == 'still_blocked'){
                    		var html = "Tu cuenta aún sigue bloqueada, espera unos minutos para volver a intentar iniciar sesión.";
                    	}else {
                            var html = "Error en los procesos internos!! </br>Ex000003";
                        }

                    	//Popad
                    	$("#popad").fadeIn(200).css("display", "flex");
            			$("#popad-text").text("LOGIN!");
           				$("#info").html(html);
                    }else if (resultado.status == "exitoso") {
                    	if (resultado.message == "user") {
                    		$("div.login_submit button").prop("disabled", "disabled");
                            setTimeout("window.location.href = 'user.php'", 1000);
                    	}else if (resultado.message == "admin") {
                    		$("div.login_submit button").prop("disabled", "disabled");
                            setTimeout("window.location.href = 'admin.php'", 1000);
                    	}else if (resultado.message == "p_i") {
                    		$("div.login_submit button").prop("disabled", "disabled");
                            setTimeout("window.location.href = 'pre_inscripcion.php'", 1000);
                    	}
                    }
            	},
            	error: function(event) {
            		$("#login_loading").css("display", "none");
                    $("div.login_submit button").fadeIn(200).css("display", "inline-block");
                    $("div.login_submit").css("margin", "20px");
                    $("#popad").fadeIn(200).css("display", "flex");
            		$("#popad-text").text("PETICION FALLIDA!");
           			$("#info").text("El servidor arroja el siguente error: "+ event.statusText +".");
            	}
            });
        } else {
            $("#popad").fadeIn(200).css("display", "flex");
            $("#popad-text").text("ADVERTENCIA!");
            $("#info").text("Rellene todos los campos.");
        }
        $("#popad-cerrar").on("click", function(){
        	cerrar_ventana();
        });
    });
});