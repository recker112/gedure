$(document).ready(function(){
	//Subir boletas
    $('#ok_boletin').on("click", function(event) {
    	event.preventDefault();
        var datos = new FormData();
        var curso = $("#curso_boletin").val();
        var seccion = $("#seccion_boletin").val();
        for (var i = 0; i <= $("#archivo_boletin")[0].files.length - 1; i++) {
            datos.append("archivo" + i, $("#archivo_boletin")[0].files[i]);
        }
        datos.append("archivo_cantidad", $("#archivo_boletin")[0].files.length);
        datos.append("curso", curso);
        datos.append("seccion", seccion);
        if (curso != "" && seccion != "") {
            $.ajax("assets/php/ajax_boletin.php", {
                type: "POST",
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
                    //Popad
                    $("#popad").fadeIn(200).css("display", "flex");
                    $("#popad-text").text("CARGAR!");
                    $("#info").html(respuesta);
                },
                error: function(event) {
                    $("#loading").css("display", "none");
                    $("#change_pw_ok").fadeIn(200).css("display", "inline-block");
                    var html = "El servidor arroja el siguente error: "+ event.statusText +".";
                    //Popad
                    $("#popad").fadeIn(200).css("display", "flex");
                    $("#popad-text").text("CARGAR!");
                    $("#info").html(html);
                }
            });
        } else {
            var html = "Debe de rellenar todos los campos.";
            //Popad
            $("#popad").fadeIn(200).css("display", "flex");
            $("#popad-text").text("CARGAR!");
            $("#info").html(html);
        }
        //Cerrar Popad
        $("#popad-cerrar").on("click", function(){
            cerrar_ventana();
        });
    });
});