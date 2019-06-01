$(document).ready(function(){
	//Ajax Delete boletas
	$("#delete-boletas").click(function(event){
		event.preventDefault();
        var curso = $("#admin_del_curso").val();
        var seccion = $("#admin_del_seccion").val();

        if (curso != "" && seccion != "") {
            var datos = $("#admin-delete").serialize();
            $.ajax("assets/php/ajax_borrar_boletas.php", {
                type: "POST",
                dataType: "html",
                data: datos,
                cache: false,
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
                        var html = "No hay archivos que borrar."
                    }else {
                    	var html = respuesta;
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