$(document).ready(function(){
	//Esconder iconos del panel
	$(".titulo-panel").on("click", function(){
		var selector = $(this).data("selector");
		$("#panel-content"+selector).toggle(400);
		if ($(this).data("open") == ">"){
			$(this).animate({
				opacity: 1
			}, 200);
			$(this).find("span").toggleClass("icon-chevron-left");
			$(this).find("span").toggleClass("icon-chevron-right");
			$(this).data("open", "<");
		}else {
			$(this).animate({
				opacity: 0.7
			}, 200);
			$(this).find("span").toggleClass("icon-chevron-left");
			$(this).find("span").toggleClass("icon-chevron-right");
			$(this).data("open", ">");
		}
	});

	//Ocultar panel
	var contador=0;
	$("#button_panel").on("click", function() {
		if (contador == 0) {
			$("#panel").animate({
				left: "-252px"
			}, 400, function() {
				contador=1;
			});
			$("#contenido").animate({
				marginLeft: "18px"
			}, 400);
		}else {
			$("#panel").animate({
				left: "0px"
			}, 400, function() {
				contador=0;
			});
			if ($(window).width() > 720) {
				$("#contenido").animate({
					marginLeft: "272px"
				}, 400);
			}
		}
	});
	
	if ($(window).width() <= 720) {
		contador=1;
	}

	//Rellenar div Content
	$(".item-panel").on("click", function() {
		var archivo = $(this).data("content");
		$("#contenido").find(".c-caja").hide();
		$("#contenido").find("span#c-titulo-"+archivo+", div#c-contenido-"+archivo).fadeIn(300);
		if ($(window).width() <= 720) {
			$("#button_panel").click();
		}
	});

	//Cerrar popad
  $("#popad-cerrar").on("click", function() {
    cerrar_ventana();
  });
});