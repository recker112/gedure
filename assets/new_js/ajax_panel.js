$(document).ready(function() {
	//Registros
	$("#panel").on("click", ".item-panel", function() {
		if ($(this).data("content") == "registros") {
			$.ajax("assets/php/ajax_registros.php",{
				type: "POST",
				dataType: "html",
            	cache: false,
            	beforeSend: function() {
            		$("#console #cedula, #console #accion").html("");
            		$("#console #cedula").append("<span class='datos'>Cargando...</span>");
            		$("#console #accion").append("<span class='datos'>Cargando...</span>");	
            	},
            	success: function(respuesta) {
            		var resultado = JSON.parse(respuesta);
            		console.log(resultado);
            		var cedula;
            		var user;
            		var fecha;
            		var accion;
            		var attemps;
            		var locks;
            		var text1;
            		var text2;
            		$("#console #cedula, #console #accion").html("");
            		for (var i = 0; i < resultado.cantidad; i++) {
            			cedula = resultado[i].log_cedula;
            			user = resultado[i].log_user;
            			fecha = resultado[i].log_fecha;
            			accion = resultado[i].log_accion;
            			text1 = "<span class='cedula datos' data-cedula='"+cedula+
            				"' data-user='"+user+
            				"' data-fecha='"+fecha+
            				"' data-accion='"+accion;
            			if (resultado[i].log_usuario) {
            				console.log("USUARIO");
            				curso = resultado[i].log_curso;
            				seccion = resultado[i].log_seccion;
            				pg = resultado[i].log_pg;
            				lista = resultado[i].log_lista;  
            				text1 += "' data-curso='"+curso+
            				"' data-seccion='"+seccion+
            				"' data-pg='"+pg+
            				"' data-lista='"+lista;
            			}
            			if (resultado[i].log_bans) {	
            				attemps = resultado[i].log_attemps;
            				locks = resultado[i].log_locks; 
            				text1 += "' data-attemps='"+attemps+
            				"' data-locks='"+locks;
            			}
            			text1 += "'>"+cedula+"</span>";
            			var	text2 = "<span class='datos'>"+accion+"</span>";
            			$("#console #cedula").append(text1);
            			$("#console #accion").append(text2);
            		}
            	},
            	error: function (jqXHR, textStatus, errorThrown) {
                    $("#popad").fadeIn(200).css("display", "flex");
            		$("#popad-titulo").text("PETICION FALLIDA!");
           			$("#popad-info").html("El servidor arroja los siguientes datos: <br>jqXHR: "+ jqXHR.statusText +".</br>Type Error: "+ textStatus +".");            	
           		}
			});
		}
	});

	//Registros Popad
	$("#console").on("click", "span.cedula", function() {
		$("#popad").fadeIn(200).css("display", "flex");
		$("#popad-titulo").text("Datos.");
		var cedula = $(this).data("cedula");
		var user = $(this).data("user");
		var fecha = $(this).data("fecha");
		var accion = $(this).data("accion");
		var html ="Cedula: "+cedula+
		"</br>Usuario: "+user+
		"</br>Fecha: "+fecha+
		"</br>Accion: "+accion;
		if ($(this).data("curso")) {
			var curso = $(this).data("curso");
			var seccion = $(this).data("seccion");
			var lista = $(this).data("lista");
			var pg = $(this).data("pg");
			html += "</br>Curso: "+curso+
			"</br>Seccion: "+seccion+
			"</br>N° lista: "+lista+
			"</br>Profesor Guia: "+pg;
		}
		if ($(this).data("attemps") > 0 && $(this).data("locks") > 0) {
			var errores = $(this).data("attemps");
			var locks = $(this).data("locks");
			html += "</br>Errores: "+errores+
			"</br>Bloqueos: "+locks;
		}
		$("#popad-info").html(html);
	});

	//Cerrar popad
	$("#popad-cerrar").on("click", function() {
		cerrar_ventana();
	});
});