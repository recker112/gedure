$(document).ready(function(){
	//Esconder iconos del panel
	$(".titulo-panel").on("click", function(){
		var selector = $(this).data("selector");
		$("#panel-content"+selector).toggle(400);
		if ($(this).data("open") == ">"){
			$(this).text($(this).data("name") + " <").animate({
				opacity: 1
			}, 400);
			$(this).data("open", "<");
		}else {
			$(this).text($(this).data("name") + " >").animate({
				opacity: 0.7
			}, 400);
			$(this).data("open", ">");
		}
	});

	//Buscador
	$("#search_estudi").on("focusout", function() {
		$("#search_status").slideUp(400);
	});

	$("#search_estudi").on("focusin", function() {
		if ($(this).val() != "" && $(this).val() != " ") {
			$("#search_status").slideToggle(400);
		}
	});

	$("#search_estudi").keyup(function() {
		if ($(this).val() != "" && $(this).val() != " ") {
			var datos = new FormData();
			datos.append("buscar", $("#search_estudi").val());
			$.ajax("assets/php/ajax_search_panel.php",{
				type: "POST",
				dataType: "html",
				data: datos,
				contentType: false,
				processData: false,
				cache: false,
				success: function(respuesta) {
					var resultado = JSON.parse(respuesta);
					$("#search_status").html("");
					var user;
					var cedula;
					if (resultado){	
						for (var i = 0; i < 5; i++) {
							user = resultado[i].user;
							cedula = resultado[i].cedula;
							$("#search_status").append("<span class='datos' data-user='"+user+"' data-cedula='"+cedula+"'><span id='user1-nombre'>"+user+"</span><span id='user1-cedula'>"+cedula+"</span></span>");
						}
						$("#search_status").slideDown(400);
					}else {
						$("#search_status").html("<span class='datos' id='user1'><span id='user1-nombre'>No resultados</span><span id='user1-cedula'></span></span>");
						$("#search_status").slideDown(400);
					}
				}
			});
		}else {
			$("#search_status").slideUp(400);
		}
	});	

	//Obtener datos del item
	$("#search_status").on("click", "span.datos", function() {
		console.log($(this).data("user"));
	})

	//Ocultar panel
	var contador=0;
	$("#button_panel").on("click", function() {
		if (contador == 0) {
			$("#panel").animate({
				left: "-250px"
			}, 400, function() {
				contador=1;
			});
			$("#contenido").animate({
				marginLeft: "20px"
			}, 400);
		}else {
			$("#panel").animate({
				left: "0px"
			}, 400, function() {
				contador=0;
			});
			$("#contenido").animate({
				marginLeft: "270px"
			}, 400);
		}
	});

	//Rellenar div Content
	$(".item-panel").on("click", function() {
		var archivo = $(this).data("content");
		$("#contenido").find(".c-caja").hide();
		$("#contenido").find("span#c-titulo-"+archivo+", div#c-contenido-"+archivo).fadeIn(300);
	});

	//Botones de selección modificar
	$("#contenido").on("change", "#m_selector_id",function() {
		$("#c-contenido-modificar").find("form").hide();
		$("form#form_modificar_"+$(this).val()).fadeIn(300);
	});

	$("#contenido").on("change", "#m_selector_user", function() {
		if ($(this).val() == "A-"){
			$("#form_modificar_user .m-options select").not("select#option").fadeOut(300);
			//Fix selector modificar
			$(".m-options select#option").val("INSERT");
			$("#m_pass_id").val("").fadeIn(300);
			$("#m_name_id").val("").fadeIn(300);
		}else if ($(this).val() == "CR-") {
			$("#form_modificar_user .m-options select").not("select#option").fadeOut(300);
			//Fix selector modificar
			$(".m-options select#option").val("INSERT");
			$("#m_pass_id").val("").fadeIn(300);
			$("#m_name_id").val("").fadeIn(300);
		}else if ($(this).val() == "V-") {
			$("#form_modificar_user .m-options select").fadeIn(300);
			//Fix selector modificar
			$(".m-options select#option").val("INSERT");
			$("#m_pass_id").val("").fadeIn(300);
			$("#m_name_id").val("").fadeIn(300);
			$("#form_modificar_user .m-options select").not("select#option").fadeIn(300);
		}
	});

	$("#contenido").on("change", ".m-options #option", function() {
		if ($(this).val() == "UPDATE" && $("#m_selector_user").val() == "V-") {
			$("#m_pass_id").val("1234").fadeOut(300);
			$("#m_name_id").val("").fadeIn(300);
			$("#form_modificar_user .m-options select").not("select#option").fadeIn(300);
		}else if ($(this).val() == "DELETE" && $("#m_selector_user").val() == "V-") {
			$("#m_pass_id").val("1234").fadeOut(300);
			$("#m_name_id").val("none").fadeOut(300);
			$("#form_modificar_user .m-options select").not("select#option").fadeOut(300);
		}else if ($(this).val() == "INSERT" && $("#m_selector_user").val() == "V-") {
			$("#m_pass_id").val("").fadeIn(300);
			$("#m_name_id").val("").fadeIn(300);
			$("#form_modificar_user .m-options select").not("select#option").fadeIn(300);
		}else if ($(this).val() == "UPDATE") {
			$("#m_pass_id").val("1234").fadeOut(300);
			$("#m_name_id").val("").fadeIn(300);
		}else if ($(this).val() == "DELETE") {
			$("#m_pass_id").val("1234").fadeOut(300);
			$("#m_name_id").val("none").fadeOut(300);
		}else if ($(this).val() == "INSERT") {
			$("#m_pass_id").val("").fadeIn(300);
			$("#m_name_id").val("").fadeIn(300);
		}
	});

	//FIX FLEX!!! !Hace que las cajas regresen a flex con la funcion fadeIn y no a block, como lo hace normalmente
	$("#form_modificar_prof, #form_modificar_block").hide();

	//Fix selector modificar
	$("#m_selector_id").val("user");
});