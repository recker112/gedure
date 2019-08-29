var ventana = document.getElementById("popad");
var titulo = document.getElementById("title");
var texto = document.getElementById("info");
var loading = document.getElementById("loading");
$(document).ready(function() {
	//Login
    $('#entrar').click(function() {
        var caja = document.getElementById("submit");
        var usuario = document.getElementById("usuario").value;
        var contra = document.getElementById("contrasena").value;
        if (usuario != "" && contra != "") {
            var datos = $('#login').serialize();
            $.ajax({
                type: "POST",
                url: "assets/php/check-login.php",
                data: datos,
                beforeSend: function() {
                    $("#loading").fadeIn(400).css("display", "inline-block");
                    $("#entrar").css("display", "none");
                    caja.style.margin = "8px";
                },
                success: function(respuesta) {
                    $("#loading").css("display", "none");
                    $("#entrar").fadeIn(200).css("display", "inline-block");
                    caja.style.margin = "20px";
                    if (respuesta == "token") {
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "LOGIN";
                        texto.innerHTML = "Error en los procesos internos!! </br>Ex000001";
                    } else if (respuesta == "consulta fallida") {
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "LOGIN";
                        texto.innerHTML = "Error en los procesos internos!! </br>Ex000002";
                    } else if (respuesta == "no encontrado") {
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "LOGIN";
                        texto.innerHTML = "El usuario y/o la contraseña son incorrecta.";
                    } else if (respuesta == "password invalida") {
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "LOGIN";
                        texto.innerHTML = "El usuario y/o la contraseña son incorrecta.";
                    } else if (respuesta == "error añadido ban") {
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "LOGIN";
                        texto.innerHTML = "El usuario y/o la contraseña son incorrecta.";
                    } else if (respuesta == "bloqueo") {
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "LOGIN";
                        texto.innerHTML = "Exedistes el numero de intentos, tu cuenta esta bloqueada por 5 minutos.";
                    } else if (respuesta == "bloqueo permanente") {
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "LOGIN";
                        texto.innerHTML = "Tu cuenta esta bloqueada, demaciados intentos fallidos. Contactate con un administrador de la pagina.";
                    } else if (respuesta == "desbloqueo de cuenta") {
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "LOGIN";
                        texto.innerHTML = "Revisa tus credenciales, las sigues poniendo mal.";
                    } else if (respuesta == "cuenta aun bloqueada") {
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "LOGIN";
                        texto.innerHTML = "Tu cuenta aun sigue bloqueada, espera unos minutos para volver a intentar iniciar sesión.";
                    } else if (respuesta == "login aceptado user") {
                        $("#entrar").fadeIn(200).prop("disabled", "disabled");
                        setTimeout("window.location.href = 'user.php'", 1000);
                    } else if (respuesta == "login aceptado admin") {
                        $("#entrar").fadeIn(200).prop("disabled", "disabled");
                        setTimeout("window.location.href = 'admin.php'", 1000);
                    } else if (respuesta == "login aceptado pre_inscripcion") {
                        $("#entrar").fadeIn(200).prop("disabled", "disabled");
                        setTimeout("window.location.href = 'pre_inscripcion.php'", 1000);
                    } else {
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "LOGIN";
                        texto.innerHTML = "Error en los procesos internos!! </br>Ex000003";
                    }
                }
            });
        } else {
            $("#popad").fadeIn(200).css("display", "flex");
            titulo.innerHTML = "ADVERTENCIA!";
            texto.innerHTML = "Rellene todos los campos.";
        }
        ventana.addEventListener("click", cerrar_ventana);
        return false;
    });

	//Cambiar contraseña
    $('#change_pw_ok').click(function() {
        var old_pass = document.getElementById("pass_o").value;
        var new_pass = document.getElementById("pass_n").value;
        var new_pass_v = document.getElementById("pass_nv").value;
        if (old_pass != "" && new_pass != "" && new_pass_v != "") {
            if (old_pass != new_pass_v && old_pass != new_pass) {
                if (new_pass == new_pass_v) {
                    var datos = $('#change_pw').serialize();
                    $.ajax({
                        type: "POST",
                        url: "assets/php/change_password.php",
                        dataType: "html",
                        data: datos,
                        beforeSend: function() {
                            $("#change_pw_ok").css("display", "none");
                            $("#loading").fadeIn(400).css("display", "inline-block");
                        },
                        success: function(respuesta) {
                            $("#loading").css("display", "none");
                            $("#change_pw_ok").fadeIn(200).css("display", "inline-block");
                            if (respuesta == "old_pass no coinciden") {
                                $("#popad").fadeIn(200).css("display", "flex");
                                titulo.innerHTML = "CAMBIAR CONTRASEÑA";
                                texto.innerHTML = "Su contraseña actual no coincide con la del servidor, por favor verifiquela.";
                            } else if (respuesta == "consulta fallida") {
                                $("#popad").fadeIn(200).css("display", "flex");
                                titulo.innerHTML = "CAMBIAR CONTRASEÑA";
                                texto.innerHTML = "Error en los procesos internos!! </br>Ex000002";
                            } else if (respuesta == "time no") {
                                $("#popad").fadeIn(200).css("display", "flex");
                                titulo.innerHTML = "CAMBIAR CONTRASEÑA";
                                texto.innerHTML = "Cambiastes tu contraseña recientemente, espera unos minutos para volver a cambiarla.";
                            } else if (respuesta == "execute") {
                                $("#popad").fadeIn(200).css("display", "flex");
                                titulo.innerHTML = "CAMBIAR CONTRASEÑA";
                                texto.innerHTML = "Tu nueva contraseña es: " + new_pass + ".";
                            } else {
                                $("#popad").fadeIn(200).css("display", "flex");
                                titulo.innerHTML = "CAMBIAR CONTRASEÑA";
                                texto.innerHTML = "Error en los procesos internos!! </br>Ex000003";
                            }
                        }
                    });
                } else {
                    $("#popad").fadeIn(200).css("display", "flex");
                    titulo.innerHTML = "CAMBIAR CONTRASEÑA";
                    texto.innerHTML = "Verifique que este colocando la repeticion de la contraseña correctamente.";
                }
            } else {
                $("#popad").fadeIn(200).css("display", "flex");
                titulo.innerHTML = "CAMBIAR CONTRASEÑA";
                texto.innerHTML = "La contraseña actual es igual a la nueva, ponga una contraseña diferente.";
            }
        } else {
            $("#popad").fadeIn(200).css("display", "flex");
            titulo.innerHTML = "CAMBIAR CONTRASEÑA";
            texto.innerHTML = "Debe de rellenar todos los campos.";
        }
        ventana.addEventListener("click", cerrar_ventana);
        return false;
    });
    $("#archivo_matricula").change(function() {
        $("#matricula").prop("disabled", $("#archivo_matricula")[0].files.length == 0);
    });

    //Subir matricula
    $("#matricula").click(function() {
        var datos = new FormData();
        datos.append("archivo", $("#archivo_matricula")[0].files[0]);
        datos.append("curso", $("#curso_matricula").prop('value'));
        datos.append("seccion", $("#seccion_matricula").prop('value'));
        var seccion = document.getElementById("seccion_matricula").value;
        var curso = document.getElementById("curso_matricula").value;
        if (seccion != "" && curso != "") {
            $.ajax({
                type: "POST",
                url: "assets/php/upload_matricula.php",
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
                    $('#matricula').fadeIn(200).css("display", "flex");
                    $('.fix_loading1').css("margin-bottom", "15px");
                    var resultado = JSON.parse(respuesta);
                    if (resultado.estado == "update none") {
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "CARGAR MATRICULA";
                        texto.innerHTML = "Debe de seleccionar un archivo el cual cargar al servidor.";
                        ventana.addEventListener("click", cerrar_ventana);
                    } else if (resultado.estado == "update max") {
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "CARGAR MATRICULA";
                        texto.innerHTML = "El archivo seleccionado pesa mas de 10KB.";
                        ventana.addEventListener("click", cerrar_ventana);
                    } else if (resultado.estado == "update type") {
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "CARGAR MATRICULA";
                        texto.innerHTML = "Solo se permiten archivos en formato .csv.";
                        ventana.addEventListener("click", cerrar_ventana);
                    } else if (resultado.estado == "update local") {
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "CARGAR MATRICULA";
                        texto.innerHTML = "No se ha podido localizar la carpeta destino.";
                        ventana.addEventListener("click", cerrar_ventana);
                    } else if (resultado.estado == "update error") {
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "CARGAR MATRICULA";
                        texto.innerHTML = "Error al intentar cargar el archivo al servidor.";
                        ventana.addEventListener("click", cerrar_ventana);
                    } else if (resultado.estado == "update ok") {
                        var insertados = resultado.insert;
                        var actualizados = resultado.update;
                        var errores_matricula = resultado.error;
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "CARGAR MATRICULA";
                        texto.innerHTML = "Matricula cargada correctamente!!<br/>Insertados: " + insertados + ".<br/>Actualizados: " + actualizados + ".<br/>Errores: " + errores_matricula + ".";
                        setTimeout("document.location = '" + resultado.dowload + "'", 2000);
                        ventana.addEventListener("click", cerrar_ventana);
                    } else {
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "CARGAR MATRICUlA";
                        texto.innerHTML = "Error en los procesos internos!! </br>Ex000003";
                        ventana.addEventListener("click", cerrar_ventana);
                    }
                }
            });
        } else {
            $("#popad").fadeIn(200).css("display", "flex");
            titulo.innerHTML = "CARGAR MATRICULA";
            texto.innerHTML = "Debe seleccionar un año y una seccion.";
            ventana.addEventListener("click", cerrar_ventana);
        }
        return false;
    });

    $('#modify_users').click(function() {
        var cedula = document.getElementById("modify_cedula").value;
        var password = document.getElementById("modify_password").value;
        var name = document.getElementById("modify_name").value;
        var seccion = document.getElementById("seccion").value;
        var grado = document.getElementById("grado").value;
        var lista = document.getElementById("lista").value;
        var privilegio_add = document.getElementById("privilegio_add").value;
        var opcion = document.getElementById("option").value;
        if (cedula != "" && privilegio_add != "" && password != "" && name != "" && seccion != "" && grado != "" && lista != "" && opcion != "") {
            var datos = $('#modify_user').serialize();
            $.ajax({
                type: "POST",
                url: "assets/php/modify_matricula.php",
                dataType: "html",
                data: datos,
                beforeSend: function() {
                    $('#loading_modify').fadeIn(400).css("display", "flex");
                    $('#modify_users').css("display", "none");
                    $('.fix_loading2').css("margin-bottom", "0");
                },
                success: function(respuesta) {
                	$('#loading_modify').css("display", "none");
                    $('#modify_users').fadeIn(200).css("display", "flex");
                    $('.fix_loading2').css("margin-bottom", "15px");
                    if (respuesta == "Añadido al servidor") {
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "MODIFICAR MATRICULA";
                        texto.innerHTML = "El usuario con la cedula " + $('#privilegio_add').val() + $('#modify_cedula').val() + " a sido añadido al servidor.";
                        ventana.addEventListener("click", cerrar_ventana);
                    } else if (respuesta == "Ya esta registrado") {
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "MODIFICAR MATRICULA";
                        texto.innerHTML = "El usuario" + $('#privilegio_add').val() + $('#modify_cedula').val() + " ya se encuentra en la base de datos.";
                        ventana.addEventListener("click", cerrar_ventana);
                    } else if (respuesta == "Eliminado") {
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "MODIFICAR MATRICULA";
                        texto.innerHTML = "El usuario " + $('#privilegio_add').val() + $('#modify_cedula').val() + " a sido eliminado de la base de datos.";
                        ventana.addEventListener("click", cerrar_ventana);
                    } else if (respuesta == "No encontrado") {
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "MODIFICAR MATRICULA";
                        texto.innerHTML = "El usuario " + $('#privilegio_add').val() + $('#modify_cedula').val() + " no se encuentra registrado en nuestra base de datos.";
                        ventana.addEventListener("click", cerrar_ventana);
                    } else if (respuesta == "Actualizado") {
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "MODIFICAR MATRICULA";
                        texto.innerHTML = "Se han actualizado los datos del usuario " + $('#privilegio_add').val() + $('#modify_cedula').val() + ".";
                        ventana.addEventListener("click", cerrar_ventana);
                    } else if (respuesta == "No se han realizado cambios") {
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "MODIFICAR MATRICULA";
                        texto.innerHTML = "No se han realizado cambios para el usuario " + $('#privilegio_add').val() + $('#modify_cedula').val() + ".";
                        ventana.addEventListener("click", cerrar_ventana);
                    }
                }
            });
        } else {
            $("#popad").fadeIn(200).css("display", "flex");
            titulo.innerHTML = "MODIFICAR MATRICULA";
            texto.innerHTML = "Debe de rellenar todos los campos.";
            ventana.addEventListener("click", cerrar_ventana);
        }
        return false;
    });
    $('#archivo_boletin').change(function() {
        $("#ok_boletin").prop("disabled", $("#archivo_boletin")[0].files.length == 0);
    });

    //Subir boletas
    $('#ok_boletin').click(function() {
        var datos = new FormData();
        for (var i = 0; i <= $("#archivo_boletin")[0].files.length - 1; i++) {
            datos.append("archivo" + i, $("#archivo_boletin")[0].files[i]);
        }
        datos.append("archivo_cantidad", $("#archivo_boletin")[0].files.length);
        datos.append("curso", $("#curso_boletin").prop('value'));
        datos.append("seccion", $("#seccion_boletin").prop('value'));
        var curso = document.getElementById("curso_boletin").value;
        var seccion = document.getElementById("seccion_boletin").value;
        if (curso != "" && seccion != "") {
            $.ajax({
                type: "POST",
                url: "assets/php/boletin.php",
                contentType: false,
                data: datos,
                processData: false,
                cache: false,
                beforeSend: function() {
                    $('#loading_boletin').fadeIn(400).css("display", "flex");
                    $('#ok_boletin').css("display", "none");
                    $('.fix_loading3').css("margin-bottom", "0");
                },
                success: function(respuesta) {
                	$('#loading_boletin').css("display", "none");
                	$('#ok_boletin').fadeIn(200).css("display", "flex");
                	$('.fix_loading3').css("margin-bottom", "15px");
                    $("#popad").fadeIn(200).css("display", "flex");
                    titulo.innerHTML = "SUBIR BOLETAS";
                    texto.innerHTML = respuesta;
                    ventana.addEventListener("click", cerrar_ventana);
                }
            });
        } else {
            $("#popad").fadeIn(200).css("display", "flex");
            titulo.innerHTML = "SUBIR BOLETAS";
            texto.innerHTML = "Debe de rellenar todos los campos.";
            ventana.addEventListener("click", cerrar_ventana);
        }
        return false;
    });

    $("#admin-search-input").keyup(function(){
        var dato = $("#search-admin").serialize();
        var cedula = $("#admin-search-input").val();
        if (cedula != "") {
            $.ajax({
                type: "POST",
                url: "assets/php/search-user.php",
                dataType: "html",
                data: dato,
                success: function(respuesta){
                    $("#resultado-buscar").html(respuesta);
                    $(document).on("click", ".search-result-dato", function(){
                        var cedula = $(this).find("#search-cedula").val();
                        var user = $(this).find("#search-user").val();
                        var curso = $(this).find("#search-curso").val();
                        var seccion = $(this).find("#search-seccion").val();
                        var pg = $(this).find("#search-pg").val();
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "DATOS";
                        texto.innerHTML = "Cedula: " + cedula +
                            "<br>Usuario: " + user +
                            "<br>Curso: " + curso +
                            "<br>Sección: " + seccion +
                            "<br>Profesor Guia: " + pg;
                        ventana.addEventListener("click", cerrar_ventana);
                    })
                }
            });     
        }else {
            $("#resultado-buscar").html("");
        }
    });





    $("#modify_unlock").click(function(){
        var dato = $("#modify_block").serialize();
        var cedula = $("#modify-unlock-cedula").val();
        if (cedula != "") {
            $.ajax({
                type: "POST",
                url: "assets/php/unlock.php",
                dataType: "html",
                data: dato,
                beforeSend: function(){
                    $("#modify_unlock").css("display", "none");
                    $('#loading_modify_block').fadeIn(400).css("display", "flex");
                },
                success: function(respuesta){
                    $("#modify_unlock").fadeIn(200).css("display", "flex");
                    $('#loading_modify_block').css("display", "none");
                    $("#popad").fadeIn(200).css("display", "flex");
                    titulo.innerHTML = "DESBANEO";
                    texto.innerHTML = respuesta;
                    ventana.addEventListener("click", cerrar_ventana);
                }
            });
        }else {
            $("#popad").fadeIn(200).css("display", "flex");
            titulo.innerHTML = "DESBANEO";
            texto.innerHTML = "Debes de rellenar todos los campos."
            ventana.addEventListener("click", cerrar_ventana);
        }
        return false;
    });

    $("#delete-seccion").click(function(){
        var curso = $("#admin-del-curso").val();
        var seccion = $("#admin-del-seccion").val();

        if (curso != "" && seccion != "") {
            var datos = $("#admin-delete").serialize();
            $.ajax({
                type: "POST",
                url: "assets/php/borrar-curso.php",
                dataType: "html",
                data: datos,
                beforeSend: function() {
                    $("#loading_delete").fadeIn(400);
                    $("#delete-seccion").css("display", "none");
                    $("#admin-delete-select").prop("disabled", "disabled");
                    $(".secciones-delete").css("margin-bottom", "0");
                },
                success: function(respuesta){
                    $("#loading_delete").css("display", "none");
                    $("#delete-seccion").fadeIn(200);
                    $("#admin-delete-select").prop("disabled", "");
                    $(".secciones-delete").css("margin-bottom", "15px");
                    var resultado = JSON.parse(respuesta);
                    if (resultado.estado == "ok") {
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "BORRAR";
                        texto.innerHTML = "Fueron eliminados "+ resultado.cantidad + " estudiantes del curso: " + resultado.curso;
                        ventana.addEventListener("click", cerrar_ventana);
                    }else if (resultado.estado == "no registro") {
                        $("#popad").fadeIn(200).css("display", "flex");
                        titulo.innerHTML = "BORRAR";
                        texto.innerHTML = "No hay nadie registrado en ese curso."
                        ventana.addEventListener("click", cerrar_ventana);
                    }
                }
            });
        }else {
            $("#popad").fadeIn(200).css("display", "flex");
            titulo.innerHTML = "BORRAR";
            texto.innerHTML = "Debes de rellenar todos los campos."
            ventana.addEventListener("click", cerrar_ventana);
        }
        return false;
    });

   $("#delete-boletas").click(function(){
        var curso = $("#admin-del-curso").val();
        var seccion = $("#admin-del-seccion").val();

        if (curso != "" && seccion != "") {
            var datos = $("#admin-delete").serialize();
            $.ajax({
                type: "POST",
                url: "assets/php/borrar-matricula.php",
                dataType: "html",
                data: datos,
                beforeSend: function() {
                    $("#loading_delete").fadeIn(400);
                    $("#delete-boletas").css("display", "none");
                    $("#admin-delete-select").prop("disabled", "disabled");
                    $(".secciones-delete").css("margin-bottom", "0");
                },
                success: function(respuesta){
                    $("#loading_delete").css("display", "none");
                    $("#delete-boletas").fadeIn(200);
                    $("#admin-delete-select").prop("disabled", "");
                    $(".secciones-delete").css("margin-bottom", "15px");
                    $("#popad").fadeIn(200).css("display", "flex");
                    if (respuesta == "") {
                        respuesta = "No hay archivos que borrar."
                    }
                    titulo.innerHTML = "BORRAR";
                    texto.innerHTML = respuesta;
                    ventana.addEventListener("click", cerrar_ventana);
                }
            });
        }else {
            $("#popad").fadeIn(200).css("display", "flex");
            titulo.innerHTML = "BORRAR";
            texto.innerHTML = "Debes de rellenar todos los campos.";
            ventana.addEventListener("click", cerrar_ventana);
        }
        return false;
    });
});