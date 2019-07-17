$(document).ready(function(){
	//Modificar matricula
	$('#modify_users').on("click", function(event) {
		event.preventDefault();
        var cedula = $("#modify_cedula").val();
        var password = $("#modify_password").val();
        var name = $("#modify_name").val();
        var seccion = $("#seccion").val();
        var grado = $("#grado").val();
        var lista = $("#lista").val();
        var privilegio_add = $("#privilegio_add").val();
        var opcion = $("#option").val();
        if (cedula != "" && privilegio_add != "" && password != "" && name != "" && seccion != "" && grado != "" && lista != "" && opcion != "") {
            var datos = $('#modify_user').serialize();
            $.ajax("assets/php/ajax_modify_matricula.php", {
                type: "POST",
                dataType: "html",
                data: datos,
                cache: false,
                beforeSend: function() {
                    $('#loading_modify').fadeIn(400).css("display", "flex");
                    $('#modify_users').css("display", "none");
                    $('.fix_loading2').css("margin-bottom", "0");
                    $('#menu-modify-select').prop("disabled", "disabled");
                },
                success: function(respuesta) {
                    $('#menu-modify-select').prop("disabled", "");
                	$('#loading_modify').css("display", "none");
                    $('#modify_users').fadeIn(400).css("display", "flex");
                    $('.fix_loading2').css("margin-bottom", "15px");

                    var resultado = JSON.parse(respuesta);

                    if (resultado.message == "insertado") {
                    	var html = "El usuario con la cedula " + $('#privilegio_add').val() + $('#modify_cedula').val() + " a sido añadido al servidor.";
                    }else if (resultado.message == "ya_registrado") {
                    	var html = "El usuario" + $('#privilegio_add').val() + $('#modify_cedula').val() + " ya se encuentra en la base de datos.";
                    }else if (resultado.message == "eliminado") {
                    	var html = "El usuario " + $('#privilegio_add').val() + $('#modify_cedula').val() + " a sido eliminado de la base de datos.";
                    }else if (resultado.message == "no_encontrado") {
                    	var html = "El usuario " + $('#privilegio_add').val() + $('#modify_cedula').val() + " no se encuentra registrado en nuestra base de datos.";
                    }else if (resultado.message == "actualizado") {
                    	var html = "Se han actualizado los datos del usuario " + $('#privilegio_add').val() + $('#modify_cedula').val() + ".";
                    }else if (resultado.message == "no_changes") {
                    	var html = "No se han realizado cambios para el usuario " + $('#privilegio_add').val() + $('#modify_cedula').val() + ".";
                    }else if (resultado.message == "token") {
                        var html = "Error en los procesos internos!! <br> Ex000001"
                    }else {
                        var html = "Error en los procesos internos!! <br> Ex000003";
                    }

                    //Popad
                    $("#popad").fadeIn(200).css("display", "flex");
                    $("#popad-text").text("MODIFICAR!");
                    $("#info").html(html);
                },
                error: function(event) {
                    $('#loading_modify').css("display", "none");
                    $('#modify_users').fadeIn(200).css("display", "flex");
                    $('.fix_loading2').css("margin-bottom", "15px");
                    var html = "El servidor arroja el siguente error: "+ event.statusText +".";
                    //Popad
                    $("#popad").fadeIn(200).css("display", "flex");
                    $("#popad-text").text("MODIFICAR!");
                    $("#info").html(html);
                }
            });
        } else {
            var html = "Debe rellenar todos los campos.";
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