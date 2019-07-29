$(document).ready(function(){
	$("#admin-search-input").on("keyup", function(event){
		event.preventDefault();
        var dato = $("#search-admin").serialize();
        var cedula = $("#admin-search-input").val();
        if (cedula != "") {
            $.ajax("assets/php/ajax_search_user.php", {
                type: "POST",
                dataType: "html",
                data: dato,
                cache: false,
                success: function(respuesta){
                	var resultado = JSON.parse(respuesta);
                	var i = 0;
                    var text = ""
                	while (i <= resultado.total - 1) {
                		text += "<div class='popad_info_user search_result_dato' data-cedula='"+ resultado.cedula[i] +"' data-user='"+ resultado.user[i] +"' data-curso='"+ resultado.curso[i] +"' data-seccion='"+ resultado.seccion[i] +"' data-pg='"+ resultado.pg[i] +"' data-attempts='"+ resultado.attempts_user +"' data-locks='"+ resultado.locks_user +"' data-lista='"+ resultado.lista[i] +"'>"+ resultado.cedula[i] + "</div>"
                		i++;
                	}
                    $("#resultado-buscar").html(text);
                    $(document).on("click", ".search_result_dato", function(){
                        var cedula = $(this).data("cedula");
                        var user = $(this).data("user");
                        var curso = $(this).data("curso");
                        var lista = $(this).data("lista");
                        var seccion = $(this).data("seccion");
                        var pg = $(this).data("pg");
                        var attempts = $(this).data("attempts");
                        var locks = $(this).data("locks");
                        $("#popad").fadeIn(200).css("display", "flex");
                        var text_popad = "Cedula: " + cedula +
                            "<br>Usuario: " + user +
                            "<br>Curso: " + curso +
                            "<br>Sección: " + seccion +
                            "<br>N° lista: " + lista +
                            "<br>Profesor Guia: " + pg;
                        if (attempts != 0 || locks != 0) {
                            text_popad += "<br>Errores: " + attempts +
                            "<br>Bloqueos: " + locks;
                        }
                        //Popad
                        $("#popad").fadeIn(200).css("display", "flex");
                        $("#popad-text").text("DATOS!");
                        $("#info").html(text_popad);
                    });
                }
            });     
        }else {
            $("#resultado-buscar").html("");
        }
        //Cerrar Popad
        $("#popad-cerrar").on("click", function(){
            cerrar_ventana();
        });
    });
});