$(document).ready(function(){
	var contador = 1;
	$(".m-boton").on("click", function(){
		if (contador == 1) {
			$("div.caja-menu").animate({
				left: "0"
			}, 400, function (){
				$(".m-boton").removeClass("icon-menu").addClass("icon-cross");
			});
			contador=0;
		}else if (contador == 0) {
			$("div.caja-menu").animate({
				left: "-100%"
			}, 400, function(){
				$(".m-boton").removeClass("icon-cross").addClass("icon-menu");
			});
			contador=1;
		}
	});
});