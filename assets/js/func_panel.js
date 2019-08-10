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
					var user_ban;
					var estudiante;
					var curso;
					var seccion;
					var lista;
					if (resultado[0]){	
						for (var i = 0; i < resultado.rows; i++) {
							user = resultado[i].user;
							cedula = resultado[i].cedula;
							user_ban = resultado[i].user_ban;
							estudiante = resultado[i].estu;
							if (estudiante) {
								curso = resultado[i].curso;
								seccion = resultado[i].seccion;
								lista = resultado[i].lista;
								$("#search_status").append("<span class='datos' data-user='"+user+"' data-cedula='"+cedula+"' data-user_ban='"+user_ban+"' data-estu='"+estudiante+"' data-curso='"+curso+"' data-seccion='"+seccion+"' data-lista='"+lista+"'><span id='user1-nombre'>"+user+"</span><span id='user1-cedula'>"+cedula+"</span></span>");
							}else {
								$("#search_status").append("<span class='datos' data-user='"+user+"' data-cedula='"+cedula+"' data-user_ban='"+user_ban+"' data-estu='"+estudiante+"'><span id='user1-nombre'>"+user+"</span><span id='user1-cedula'>"+cedula+"</span></span>");
							}
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
		//Seleccionar variable privilegio
		if ($(this).data("cedula")[2] != "-") {
			//Variable para los NO CR-
			var privilegio = $(this).data("cedula")[0]+$(this).data("cedula")[1];
		}else {
			//Variable para los CR-
			var privilegio = $(this).data("cedula")[0]+$(this).data("cedula")[1]+$(this).data("cedula")[2];
		}

		//Algoritmos del popad-view
		if ($(this).data("user")) {
			//Titulo popad
			$("#popad-titulo").text("Buscar");

			//Estructura principal
			var message = "Nombre: "+$(this).data("user")+".<br/>"+
			"Cédula: "+$(this).data("cedula")+".</br>";

			//Variables para el boton modificar
			var m_cedula = $(this).data("cedula");
			var m_user = $(this).data("user");

			if ($(this).data("estu")) {
				message += "Curso: "+$(this).data("curso")+".</br>";
				message += "Seccion: "+$(this).data("seccion")+".</br>";
				message += "N° lista: "+$(this).data("lista")+".</br>";

				//Variables para el boton modificar
				var m_curso = $(this).data("curso");
				var m_seccion = $(this).data("seccion");
				var m_lista = $(this).data("lista");
			}

			message += "<div id='options'></div>";
			

			//Popad Info texto
			$("#popad-info").html(message);

			//Añadir boton para desbloquear
			if ($(this).data("user_ban")) {
				$("#popad-info #options").append("<button id='pOpt-desbloquear'>Desbloquear</button>");
			}

			//Añadir boton para modificar
			$("#popad-info #options").append("<button id='pOpt-modificar'>Modificar</button>");

			//Añadir boton para generar nueva contraseña
			$("#popad-info #options").append("<button id='pOpt-generar_contraseña'>Generar contraseña</button>");

			//Algoritmos del boton desbloquear
			$("#popad-info").on("click", "#pOpt-desbloquear", function() {
				var datos = new FormData();
				datos.append("cedula", m_cedula);
				$.ajax("assets/php/ajax_desbloquear.php",{
					type: "POST",
					dataType: "html",
					data: datos,
					contentType: false,
					processData: false,
					cache: false,
					beforeSend:function() {
						$("#popad-info").html("<img id='m_loading_user' src='assets/img/loading.svg' height='32' alt='imagen de carga' /></br>Realizando cambios, por favor espere....");
						$("#popad-info").css("display", "none");
						$("#popad-info").fadeIn(200);
					},
					success:function(respuesta) {
						var resultado = JSON.parse(respuesta);
						if (resultado.message == "ok") {
							$("#popad-info").html("La cedula "+m_cedula+" fue desbloqueada.");
						}else {
							$("#popad-info").html("La cedula "+m_cedula+" no está bloqueada actualmente.");
						}
						$("#popad-info").css("display", "none");
						$("#popad-info").fadeIn(200);
					}
				})
			});

			//Algoritmos del boton modificar
			$("#popad-info").on("click", "#pOpt-modificar", function() {
				//Fix del menú al realizar click en el boton de modificar
				if (contador == 1) {
					contador = 0;
				}else {
					contador = 0;
				}

				//Cerrar ventana popad
				cerrar_ventana();

				//Click en el panel (el item modificar)
				$("#nav_modificar").click();

				//Cambiar valor del selector de usuario
				$("#contenido #m_selector_user").val(privilegio);
				$("#contenido #m_selector_user").change();//Ejecutar evento change
				$("#contenido .m-options #m_option_user").val("UPDATE");
				$("#contenido .m-options #m_option_user").change();//Ejecutar evento change

				//Cambiar valores de los inputs
				$("#contenido #m_cedula_user").val(m_cedula);
				$("#contenido #m_name_user").val(m_user);

				//Cambiar valores extras si el usuario es estudiante
				if (privilegio == "V-") {
					//Arreglar texto en la variable curso
					if (m_curso[2] == "g") {
						var fix_curso = m_curso[0]+"G";
					}else {
						var fix_curso = m_curso[0];
					}
					$("#contenido .m-options #m_grado_user").val(fix_curso);
					$("#contenido .m-options #m_seccion_user").val(m_seccion);
					$("#contenido .m-options #m_lista_user").val(m_lista);
				}
			});

			//Algoritmos boton generar contraseña
			var text_temp = $("#popad-info").html();//Guardar html en variable temporal
			$("#popad-info").on("click", "#pOpt-generar_contraseña", function() {
				//Efecto slow view y texto a insertar
				$("#popad-info").css("display", "none");
				$("#popad-info").html("Al generar una contraseña se perderá la contraseña anterior, reemplazandola por la generada a continuación. </br>¿Está seguro de realizar esta acción?</br><div id='options'><button id='GenNewPass_ok'>Si</button><button id='GenNewPass_nel'>No</button></div>");
				$("#popad-info").fadeIn(200);

				//Confirmación
				$("#popad-info").on("click", "#GenNewPass_ok", function() {
					$("#popad-info").html("<img id='m_loading_user' src='assets/img/loading.svg' height='32' alt='imagen de carga' /></br>Realizando cambios, por favor espere....");
					$("#popad-info").css("display", "none");
					$("#popad-info").fadeIn(200);
				});
				$("#popad-info").on("click", "#GenNewPass_nel", function() {
					$("#popad-info").html(text_temp);
					$("#popad-info").css("display", "none");
					$("#popad-info").fadeIn(200);
				});
			});

			//Mostrar popad
			$("#popad").fadeIn(200).css("display", "flex");
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

	//Botones de selección modificar
	$("#contenido").on("change", "#m_selector_id",function() {
		$("#c-contenido-modificar").find("form").hide();
		$("form#form_modificar_"+$(this).val()).fadeIn(300);
	});

	$("#contenido").on("change", "#m_selector_user", function() {
		if ($(this).val() == "A-"){
			$("#form_modificar_user .m-options select").not("select#m_option_user").val("1").fadeOut(300);
			//Fix selector modificar
			$(".m-options select#m_option_user").val("INSERT");
			$("#m_pass_user").val("").fadeIn(300);
			$("#m_name_user").val("").fadeIn(300);
		}else if ($(this).val() == "CR-") {
			$("#form_modificar_user .m-options select").not("select#m_option_user").val("1").fadeOut(300);
			//Fix selector modificar
			$(".m-options select#m_option_user").val("INSERT");
			$("#m_pass_user").val("").fadeIn(300);
			$("#m_name_user").val("").fadeIn(300);
		}else if ($(this).val() == "V-") {
			$("#form_modificar_user .m-options select").val("").fadeIn(300);
			//Fix selector modificar
			$(".m-options select#m_option_user").val("INSERT");
			$("#m_pass_user").val("").fadeIn(300);
			$("#m_name_user").val("").fadeIn(300);
		}
	});

	//Options User
	$("#contenido").on("change", ".m-options #m_option_user", function() {
		if ($(this).val() == "UPDATE" && $("#m_selector_user").val() == "V-") {
			$("#m_pass_user").val("none").fadeOut(300);
			$("#m_name_user").val("").fadeIn(300);
			$("#form_modificar_user .m-options select").not("select#m_option_user").val("").fadeIn(300);
		}else if ($(this).val() == "DELETE" && $("#m_selector_user").val() == "V-") {
			$("#m_pass_user").val("1234").fadeOut(300);
			$("#m_name_user").val("none").fadeOut(300);
			$("#form_modificar_user .m-options select").not("select#m_option_user").val("1").fadeOut(300);
		}else if ($(this).val() == "INSERT" && $("#m_selector_user").val() == "V-") {
			$("#m_pass_user").val("").fadeIn(300);
			$("#m_name_user").val("").fadeIn(300);
			$("#form_modificar_user .m-options select").not("select#m_option_user").val("").fadeIn(300);
		}else if ($(this).val() == "UPDATE") {
			$("#m_pass_user").val("1234").fadeOut(300);
			$("#m_name_user").val("").fadeIn(300);
		}else if ($(this).val() == "DELETE") {
			$("#m_pass_user").val("1234").fadeOut(300);
			$("#m_name_user").val("none").fadeOut(300);
		}else if ($(this).val() == "INSERT") {
			$("#m_pass_user").val("").fadeIn(300);
			$("#m_name_user").val("").fadeIn(300);
		}
	});

	//Select configuracioon
	$("#contenido").on("change", "#conf_selector", function() {
		var option = $(this).val();
		if (option == "sec") {
			$("#n_user").hide().val("");
			$("#n_grado").fadeIn(200);
			$("#n_seccion").fadeIn(200);
			$("#n_hidden").val("sec");
		}else {
			$("#n_grado").hide().val("");
			$("#n_seccion").hide().val("");
			$("#n_user").fadeIn(200);
			$("#n_hidden").val("estu");
		}
	});

	//FIX FLEX!!! !Hace que las cajas regresen a flex con la funcion fadeIn y no a block, como lo hace normalmente
	$("#form_modificar_prof, #form_modificar_block").hide();

	//Fix selector modificar
	$("#m_selector_id").val("user");
});