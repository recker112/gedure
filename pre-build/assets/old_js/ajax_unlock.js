$(document).ready(function(){
    //Desbloquear cuenta
     $("#modify_unlock").on("click", function(event){
        event.preventDefault();
        var dato = $("#modify_block").serialize();
        var cedula = $("#modify-unlock-cedula").val();
        var privilegio = $("#modify_block select").val();
        if (cedula != "") {
            $.ajax("assets/php/ajax_unlock.php", {
                type: "POST",
                dataType: "html",
                data: dato,
                cache: false,
                beforeSend: function(){
                    $("#modify_unlock").css("display", "none");
                    $('#loading_modify_block').fadeIn(400).css("display", "flex");
                    $('#menu-modify-select').prop("disabled", "disabled");
                },
                success: function(respuesta){
                    $('#menu-modify-select').prop("disabled", "");
                    $("#modify_unlock").fadeIn(200).css("display", "flex");
                    $('#loading_modify_block').css("display", "none");
                    var resultado = JSON.parse(respuesta);

                    if (resultado.message == "no_register") {
                        var html = "El usuario "+ privilegio +cedula +" no esta en la lista de baneados."
                    }else if (resultado.message == "unlock") {
                        var html = "El usuario "+ privilegio +cedula +" fue desbloqueado correctamente!"
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
                    $("#modify_unlock").fadeIn(200).css("display", "flex");
                    $('#loading_modify_block').css("display", "none");
                    var html = "El servidor arroja el siguente error: "+ event.statusText +".";
                    //Popad
                    $("#popad").fadeIn(200).css("display", "flex");
                    $("#popad-text").text("MODIFICAR!");
                    $("#info").html(html);
                }
            });
        }else {
            var html = "Debe rellenar todos los campos.";
            //Popad
            $("#popad").fadeIn(200).css("display", "flex");
            $("#popad-text").text("DESBLOQUEAR!");
            $("#info").html(html);
        }
        //Cerrar Popad
        $("#popad-cerrar").on("click", function(){
            cerrar_ventana();
        });
    });
});