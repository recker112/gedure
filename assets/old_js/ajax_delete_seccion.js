$(document).ready(function(){
	//Ajax delete
	$("#delete-seccion").click(function(event){
		event.preventDefault();
        var curso = $("#admin_del_curso").val();
        var seccion = $("#admin_del_seccion").val();

        if (curso != "" && seccion != "") {
            var datos = $("#admin-delete").serialize();
            $.ajax("assets/php/ajax_borrar_curso.php", {
                type: "POST",
                dataType: "html",
                data: datos,
            	cache: false,
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
                    if (resultado.message == "ok") {
                        var html = "Fueron eliminados "+ resultado.cantidad + " estudiantes del curso: " + resultado.curso;
                    }else if (resultado.message == "no_registro") {
                        var html = "No hay nadie registrado en ese curso.";
                    }else if (resultado.message == "token") {
                        var html = "Error en los procesos internos!! <br> Ex000001"
                    }else {
                        var html = "Error en los procesos internos!! <br> Ex000003";
                    }
                    
                    //Popad
                    $("#popad").fadeIn(200).css("display", "flex");
                    $("#popad-text").text("BORRAR!");
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
                    $("#popad-text").text("BORRAR!");
                    $("#info").html(html);
                }
            });
        }else {
            var html = "Debe de rellenar todos los campos.";
            //Popad
            $("#popad").fadeIn(200).css("display", "flex");
            $("#popad-text").text("BORRAR!");
            $("#info").html(html);
        }
        //Cerrar Popad
        $("#popad-cerrar").on("click", function(){
            cerrar_ventana();
        });
    });
});