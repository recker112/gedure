$(document).ready(function(){
	//Cambiar contraseña
    $('#change_pw_ok').on("click", function(event) {
        event.preventDefault();
        var old_pass = $("#pass_o").val();
        var new_pass = $("#pass_n").val();
        var new_pass_v = $("#pass_nv").val();
        if (old_pass != "" && new_pass != "" && new_pass_v != "") {
            if (old_pass != new_pass_v && old_pass != new_pass) {
                if (new_pass == new_pass_v) {
                    var datos = $('#change_pw').serialize();
                    $.ajax("assets/php/ajax_change_password.php", {
                        type: "POST",
                        dataType: "html",
                        data: datos,
                        cache: false,
                        beforeSend: function() {
                            $("#change_pw_ok").css("display", "none");
                            $("#loading").fadeIn(400).css("display", "inline-block");
                        },
                        success: function(respuesta) {
                            $("#loading").css("display", "none");
                            $("#change_pw_ok").fadeIn(400).css("display", "inline-block");
                            
                            var resultado = JSON.parse(respuesta);
                            if (resultado.status == "fallido") {
                                if (resultado.message == "consulta fallida") {
                                    var html = "Error en los procesos internos!! </br>Ex000002";
                                }else if (resultado.message == "old_pass") {
                                    var html = "Su contraseña actual no coincide con la del servidor, por favor verifiquela.";
                                }else if (resultado.message == "time") {
                                    var html = "Cambiastes tu contraseña recientemente, espera unos minutos para volver a cambiarla.";
                                }else {
                                    html = "Error en los procesos internos!! </br>Ex000003";
                                }
                            }else if (resultado.status == "exitoso") {
                                if (resultado.message == "ok") {
                                    var html = "Tu nueva contraseña es: " + new_pass + ".";
                                }
                            }
                            //Popad
                            $("#popad").fadeIn(200).css("display", "flex");
                            $("#popad-text").text("CAMBIAR CONTRASEÑA!");
                            $("#info").html(html);
                        },
                        error: function(event) {
                            $("#loading").css("display", "none");
                            $("#change_pw_ok").fadeIn(200).css("display", "inline-block");
                            var html = "El servidor arroja el siguente error: "+ event.statusText +".";
                            //Popad
                            $("#popad").fadeIn(200).css("display", "flex");
                            $("#popad-text").text("CAMBIAR CONTRASEÑA!");
                            $("#info").html(html);
                        }
                    });
                } else {
                    html = "Verifique que este colocando la repeticion de la contraseña correctamente.";
                    //Popad
                    $("#popad").fadeIn(200).css("display", "flex");
                    $("#popad-text").text("CAMBIAR CONTRASEÑA!");
                    $("#info").html(html);
                }
            } else {
                var html = "La contraseña actual es igual a la nueva, ponga una contraseña diferente.";
                //Popad
                $("#popad").fadeIn(200).css("display", "flex");
                $("#popad-text").text("CAMBIAR CONTRASEÑA!");
                $("#info").html(html);
            }
        } else {
            var html = "Debe de rellenar todos los campos.";
            //Popad
            $("#popad").fadeIn(200).css("display", "flex");
            $("#popad-text").text("CAMBIAR CONTRASEÑA!");
            $("#info").html(html);
        }
        //Cerrar Popad
        $("#popad-cerrar").on("click", function(){
            cerrar_ventana();
        });
    });
});