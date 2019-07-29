$(document).ready(function(){
    //Menu admin
  $("#admin-menu-registro").click(function(){
    $("#admin-menu-registro").addClass("activo");
    $("#admin-menu-matricula").removeClass("activo");
    $("#admin-menu-modificar").removeClass("activo");
    $("#admin-menu-buscar").removeClass("activo");
    $("#admin-menu-boletas").removeClass("activo");
    $("#admin-menu-delete").removeClass("activo");
    $("#admin-menu-activar").removeClass("activo");
    $("#admin-titulo1").fadeIn(200);
    $("#admin-titulo2").css("display", "none");
    $("#admin-titulo3").css("display", "none");
    $("#admin-titulo4").css("display", "none");
    $("#admin-titulo5").css("display", "none");
    $("#admin-titulo6").css("display", "none");
    $("#admin-titulo7").css("display", "none");
    $(".admin-registros").fadeIn(200);
    $(".admin-upload").css("display", "none");
    $(".admin-modify").css("display", "none");
    $(".admin-buscar").css("display", "none");
    $(".admin-boletin").css("display", "none");
    $(".admin-delete").css("display", "none");
    $(".admin-activar").css("display", "none");
  });
  $("#admin-menu-matricula").click(function(){
    $("#admin-menu-registro").removeClass("activo");
    $("#admin-menu-matricula").addClass("activo");
    $("#admin-menu-modificar").removeClass("activo");
    $("#admin-menu-buscar").removeClass("activo");
    $("#admin-menu-boletas").removeClass("activo");
    $("#admin-menu-delete").removeClass("activo");
    $("#admin-menu-activar").removeClass("activo");
    $("#admin-titulo1").css("display", "none");
    $("#admin-titulo2").fadeIn(200);
    $("#admin-titulo3").css("display", "none");
    $("#admin-titulo4").css("display", "none");
    $("#admin-titulo5").css("display", "none");
    $("#admin-titulo6").css("display", "none");
    $("#admin-titulo7").css("display", "none");
    $(".admin-registros").css("display", "none");
    $(".admin-upload").fadeIn(200);
    $(".admin-modify").css("display", "none");
    $(".admin-buscar").css("display", "none");
    $(".admin-boletin").css("display", "none");
    $(".admin-delete").css("display", "none");
    $(".admin-activar").css("display", "none");
  });
  $("#admin-menu-modificar").click(function(){
    $("#admin-menu-registro").removeClass("activo");
    $("#admin-menu-matricula").removeClass("activo");
    $("#admin-menu-modificar").addClass("activo");
    $("#admin-menu-buscar").removeClass("activo");
    $("#admin-menu-boletas").removeClass("activo");
    $("#admin-menu-delete").removeClass("activo");
    $("#admin-menu-activar").removeClass("activo");
    $("#admin-titulo1").css("display", "none");
    $("#admin-titulo2").css("display", "none");
    $("#admin-titulo3").fadeIn(200);
    $("#admin-titulo4").css("display", "none");
    $("#admin-titulo5").css("display", "none");
    $("#admin-titulo6").css("display", "none");
    $("#admin-titulo7").css("display", "none");
    $(".admin-registros").css("display", "none");
    $(".admin-upload").css("display", "none");
    $(".admin-modify").fadeIn(200);
    $(".admin-buscar").css("display", "none");
    $(".admin-boletin").css("display", "none");
    $(".admin-delete").css("display", "none");
    $(".admin-activar").css("display", "none");
  });
  $("#admin-menu-boletas").click(function(){
    $("#admin-menu-registro").removeClass("activo");
    $("#admin-menu-matricula").removeClass("activo");
    $("#admin-menu-modificar").removeClass("activo");
    $("#admin-menu-buscar").removeClass("activo");
    $("#admin-menu-boletas").addClass("activo");
    $("#admin-menu-buscar").removeClass("activo");
    $("#admin-menu-delete").removeClass("activo");
    $("#admin-menu-activar").removeClass("activo");
    $("#admin-titulo1").css("display", "none");
    $("#admin-titulo2").css("display", "none");
    $("#admin-titulo3").css("display", "none");
    $("#admin-titulo4").fadeIn(200);
    $("#admin-titulo5").css("display", "none");
    $("#admin-titulo6").css("display", "none");
    $("#admin-titulo7").css("display", "none");
    $(".admin-registros").css("display", "none");
    $(".admin-upload").css("display", "none");
    $(".admin-modify").css("display", "none");
    $(".admin-buscar").css("display", "none");
    $(".admin-boletin").fadeIn(200);
    $(".admin-delete").css("display", "none");
    $(".admin-activar").css("display", "none");
  });
  $("#admin-menu-buscar").click(function(){
    $("#admin-menu-registro").removeClass("activo");
    $("#admin-menu-matricula").removeClass("activo");
    $("#admin-menu-modificar").removeClass("activo");
    $("#admin-menu-buscar").addClass("activo");
    $("#admin-menu-boletas").removeClass("activo");
    $("#admin-menu-delete").removeClass("activo");
    $("#admin-menu-activar").removeClass("activo");
    $("#admin-titulo1").css("display", "none");
    $("#admin-titulo2").css("display", "none");
    $("#admin-titulo3").css("display", "none");
    $("#admin-titulo4").css("display", "none");
    $("#admin-titulo5").fadeIn(200);
    $("#admin-titulo6").css("display", "none");
    $("#admin-titulo7").css("display", "none");
    $(".admin-registros").css("display", "none");
    $(".admin-upload").css("display", "none");
    $(".admin-modify").css("display", "none");
    $(".admin-buscar").fadeIn(200);
    $(".admin-boletin").css("display", "none");
    $(".admin-delete").css("display", "none");
    $(".admin-activar").css("display", "none");
  });
  $("#admin-menu-delete").click(function(){
    $("#admin-menu-registro").removeClass("activo");
    $("#admin-menu-matricula").removeClass("activo");
    $("#admin-menu-modificar").removeClass("activo");
    $("#admin-menu-buscar").removeClass("activo");
    $("#admin-menu-boletas").removeClass("activo");
    $("#admin-menu-delete").addClass("activo");
    $("#admin-menu-activar").removeClass("activo");
    $("#admin-titulo1").css("display", "none");
    $("#admin-titulo2").css("display", "none");
    $("#admin-titulo3").css("display", "none");
    $("#admin-titulo4").css("display", "none");
    $("#admin-titulo5").css("display", "none");
    $("#admin-titulo6").fadeIn(200);
    $("#admin-titulo7").css("display", "none");
    $(".admin-registros").css("display", "none");
    $(".admin-upload").css("display", "none");
    $(".admin-modify").css("display", "none");
    $(".admin-buscar").css("display", "none");
    $(".admin-boletin").css("display", "none");
    $(".admin-delete").fadeIn(200);
    $(".admin-activar").css("display", "none");
  });
  $("#admin-menu-activar").click(function(){
    $("#admin-menu-registro").removeClass("activo");
    $("#admin-menu-matricula").removeClass("activo");
    $("#admin-menu-modificar").removeClass("activo");
    $("#admin-menu-buscar").removeClass("activo");
    $("#admin-menu-boletas").removeClass("activo");
    $("#admin-menu-delete").removeClass("activo");
    $("#admin-menu-activar").addClass("activo");
    $("#admin-titulo1").css("display", "none");
    $("#admin-titulo2").css("display", "none");
    $("#admin-titulo3").css("display", "none");
    $("#admin-titulo4").css("display", "none");
    $("#admin-titulo5").css("display", "none");
    $("#admin-titulo6").css("display", "none");
    $("#admin-titulo7").fadeIn(200);
    $(".admin-registros").css("display", "none");
    $(".admin-upload").css("display", "none");
    $(".admin-modify").css("display", "none");
    $(".admin-buscar").css("display", "none");
    $(".admin-boletin").css("display", "none");
    $(".admin-delete").css("display", "none");
    $(".admin-activar").fadeIn(200);
  });

   //Modificar matricula
  $('#privilegio_add').change(function() {
      if ($('#privilegio_add').val() == "A-") {
          $("#seccion").fadeOut(500).val("A");
          $("#lista").fadeOut(500).val("1");
          $("#grado").fadeOut(500).val("1");
          $('#option').val("");
      } else if ($('#privilegio_add').val() == "P-") {
          $("#seccion").fadeOut(500).val("A");
          $("#lista").fadeOut(500).val("1");
          $("#grado").fadeOut(500).val("1");
          $('#option').val("");
      } else {
          $('#modify_password').fadeIn(500).val("");
          $('#modify_name').fadeIn(500).val("");
          $("#seccion").fadeIn(500).val("");
          $("#lista").fadeIn(500).val("");
          $("#grado").fadeIn(500).val("");
          $('#option').val("");
      }
  });
  $('#option').change(function() {
      if ($('#option').val() == "DELETE" && $('#privilegio_add').val() == "V-") {
          $('#modify_password').fadeOut(500).val("none");
          $('#modify_name').fadeOut(500).val("none");
          $("#seccion").fadeOut(500).val("A");
          $("#lista").fadeOut(500).val("1");
          $("#grado").fadeOut(500).val("1");
      } else if ($('#option').val() == "UPDATE" && $('#privilegio_add').val() == "V-") {
          $('#modify_password').fadeOut(500).val("none");
          $('#modify_name').fadeIn(500).val("");
          $("#seccion").fadeIn(500).val("");
          $("#lista").fadeIn(500).val("");
          $("#grado").fadeIn(500).val("");
      } else if ($('#option').val() == "INSERT" && $('#privilegio_add').val() == "V-") {
          $('#modify_name').fadeIn(500).val("");
          $('#modify_password').fadeIn(500).val("");
          $("#seccion").fadeIn(500).val("");
          $("#lista").fadeIn(500).val("");
          $("#grado").fadeIn(500).val("");
      } else if ($('#option').val() == "" && $('#privilegio_add').val() == "V-") {
          $('#modify_name').fadeIn(500).val("");
          $('#modify_password').fadeIn(500).val("");
          $("#seccion").fadeIn(500).val("");
          $("#lista").fadeIn(500).val("");
          $("#grado").fadeIn(500).val("");
      } else if ($('#option').val() == "UPDATE") {
          $('#modify_password').fadeOut(500).val("none");
          $('#modify_name').fadeIn(500).val("");
      } else if ($('#option').val() == "DELETE") {
          $('#modify_password').fadeOut(500).val("none");
          $('#modify_name').fadeOut(500).val("none");
      } else {
          $('#modify_name').fadeIn(500).val("");
          $('#modify_password').fadeIn(500).val("");
      }
  });

  //Selec menu modify
  $("#menu-modify-select").change(function(){
    if ($(this).val() == "user") {
      $("#modify_user").fadeIn(200);
      $("#modify_block").css("display", "none");
      $("#modify_prof").css("display", "none");
    }else if ($(this).val() == "block") {
      $("#modify_user").css("display", "none");
      $("#modify_block").fadeIn(200);
      $("#modify_prof").css("display", "none");
    }else if ($(this).val() == "prof") {
      $("#modify_user").css("display", "none");
      $("#modify_block").css("display", "none");
      $("#modify_prof").fadeIn(200);
    }
  });

  //Select menu delete
  $("#admin-delete-select").change(function() {
    if ($(this).val() == "sec") {
      $("#delete-seccion").fadeIn(200);
      $("#delete-boletas").css("display", "none");
    }else if ($(this).val() == "bol"){
      $("#delete-seccion").css("display", "none");
      $("#delete-boletas").fadeIn(200);
    }
  });

  //Select menu activar
  $("#admin-activar-select").change(function() {
    if ($(this).val() == "estu") {
      $("#admin-activar-estu").fadeIn(200);
      $("#admin-activar-sec").css("display", "none");
    }else if ($(this).val() == "sec"){
      $("#admin-activar-estu").css("display", "none");
      $("#admin-activar-sec").fadeIn(200);
    }
  });

  //Fix menu mobil
  $( window ).resize(function() {
    if ($(window).width() > 720) {
      $(".fix-slideToggle").css("display", "block");
    }else {
      $(".fix-slideToggle").css("display", "none");
    }
  });

  //Activar subir matricula
  $("#archivo_matricula").change(function() {
    $("#matricula").prop("disabled", $("#archivo_matricula")[0].files.length == 0);
  });

  //Activar subir boletin
  $('#archivo_boletin').change(function() {
        $("#ok_boletin").prop("disabled", $("#archivo_boletin")[0].files.length == 0);
    });

  //Popad de datos
  $(".admin-registros-datos").on("click", ".c_dato", function(){
    if ($(this).css("color") == "rgb(0, 116, 217)") {
      if ($(this).data("curso") && $(".registro_accion").is(":hidden")) {
        var cedula = $(this).data("cedula");
        var user = $(this).data("name");
        var curso = $(this).data("curso");
        var seccion = $(this).data("seccion");
        var pg = $(this).data("pg");
        var fecha = $(this).data("fecha");
        var accion = $(this).data("accion");
        $("#popad").fadeIn(200).css("display", "flex");
        var text = "Cedula: " + cedula +
        "<br>Usuario: " + user +
        "<br>Curso: " + curso +
        "<br>Sección: " + seccion +
        "<br>Profesor Guia: " + pg +
        "<br>fechass: " + fecha +
        "<br>Acción: " + accion;
      }else if (!$(this).data("curso")) {
          var cedula = $(this).data("cedula");
          var user = $(this).data("name");
          var fecha = $(this).data("fecha");
          var accion = $(this).data("accion");
          $("#popad").fadeIn(200).css("display", "flex");
          var text = "Cedula: " + cedula +
          "<br>Usuario: " + user +
          "<br>Fecha: " + fecha +
          "<br>Acción: " + accion;
      }else if ($(this).data("curso") && $(".registro_accion").is(":visible")) {
        var cedula = $(this).data("cedula");
        var user = $(this).data("name");
        var curso = $(this).data("curso");
        var seccion = $(this).data("seccion");
        var pg = $(this).data("pg");
        var lista = $(this).data("lista");
        $("#popad").fadeIn(200).css("display", "flex");
        var text = "Cedula: " + cedula +
        "<br>Usuario: " + user +
        "<br>Curso: " + curso +
        "<br>Sección: " + seccion +
        "<br>N° lista: " + lista +
        "<br>Profesor Guia: " + pg;
      }
      //Popad
      $("#popad").fadeIn(200).css("display", "flex");
      $("#popad-text").text("DATOS!");
      $("#info").html(text);
    }
    //Cerrar Popad
    $("#popad-cerrar").on("click", function(){
        cerrar_ventana();
    });
  });

  //Fix enter in buscar input
  $("#search-admin").on("submit", function(event){
    event.preventDefault();
  });
});