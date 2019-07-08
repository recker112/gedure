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
		$.ajax("assets/paginas/panel_admin/"+archivo+".html",{
			type: "POST",
			success: function(respuesta) {
				$("#contenido").html(respuesta);
				$("#contenido").find("div, span").hide().fadeIn(300);
			}
		});
	});

	//Botones de selección
	$("#contenido").on("change", "#m_selector_id",function() {
		var opcion = $("#m_selector_id").val();
	});
});