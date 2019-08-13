$(document).ready(function() {
	/*BUSCADOR*/

	//FocusOUT en el buscador
	$("#search_estudi").on("focusout", function() {
		$("#search_status").slideUp(400);
	});

	//FocusIN en el buscador
	$("#search_estudi").on("focusin", function() {
		if ($(this).val() != "" && $(this).val() != " ") {
			$("#search_status").slideToggle(400);
		}
	});

	//Algoritmos del buscador al precionar una tecla
	$("#search_estudi").keyup(function() {
		//Verificiar campo vacio
		if ($(this).val() != "" && $(this).val() != " ") {

			//Datos transofrmados en un FormData()
			var datos = new FormData();
			datos.append("buscar", $("#search_estudi").val());

			//Ajax
			$.ajax("assets/php/ajax_search_panel.php",{
				//Parametros estandar
				type: "POST",
				dataType: "html",
				data: datos,
				contentType: false,
				processData: false,
				cache: false,

				//Algoritmos al tener respuesta del XHR
				success: function(respuesta) {

					//Transformar resultado en JSON
					var resultado = JSON.parse(respuesta);

					//Vaciar caja de resultados
					$("#search_status").html("");

					//Variables
					var user;
					var cedula;
					var user_ban;
					var estudiante;
					var curso;
					var seccion;
					var lista;

					//Verificar si existe algún resultado
					if (resultado[0]){	

						//bucle para mostrar todos los resultados
						for (var i = 0; i < resultado.rows; i++) {

							//Asignación de variables
							user = resultado[i].user;
							cedula = resultado[i].cedula;
							user_ban = resultado[i].user_ban;
							estudiante = resultado[i].estu;

							//Verificar si es estudiante
							if (estudiante) {

								//Variables extras
								curso = resultado[i].curso;
								seccion = resultado[i].seccion;
								lista = resultado[i].lista;

								//Texto a insertar en el DOM
								$("#search_status").append("<span class='datos' data-user='"+user+"' data-cedula='"+cedula+"' data-user_ban='"+user_ban+"' data-estu='"+estudiante+"' data-curso='"+curso+"' data-seccion='"+seccion+"' data-lista='"+lista+"'><span id='user1-nombre'>"+user+"</span><span id='user1-cedula'>"+cedula+"</span></span>");
							}else {

								//Texto a insertar en el DOM
								$("#search_status").append("<span class='datos' data-user='"+user+"' data-cedula='"+cedula+"' data-user_ban='"+user_ban+"' data-estu='"+estudiante+"'><span id='user1-nombre'>"+user+"</span><span id='user1-cedula'>"+cedula+"</span></span>");
							}
						}

						//Mostrar search_status
						$("#search_status").slideDown(400);
					}else {

						//Texto a insertar en el DOM si no existen resultados
						$("#search_status").html("<span class='datos' id='user1'><span id='user1-nombre'>No resultados</span><span id='user1-cedula'></span></span>");

						//Mostrar search_status
						$("#search_status").slideDown(400);
					}
				}
			});
		}else {

			//Ocultar search_status
			$("#search_status").slideUp(400);
		}
	});	

	//Obtener datos del item en el search_status
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
				$("#popad-info #options").append("<button id='pOpt-desbloquear' data-cedula='"+m_cedula+"'>Desbloquear</button>");
			}

			//Añadir boton para modificar
			$("#popad-info #options").append("<button id='pOpt-modificar'>Modificar</button>");

			//Añadir boton para generar nueva contraseña
			$("#popad-info #options").append("<button id='pOpt-generar_contraseña' data-cedula='"+m_cedula+"' data-privilegio='"+privilegio+"'>Generar contraseña</button>");

			//Algoritmos del boton modificar
			$("#popad-info").on("click", "#pOpt-modificar", function() {
				//Fix del menú al realizar click en el boton de modificar
				var contador;//Fix contador separado del archivo base
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

			//Mostrar popad
			$("#popad").fadeIn(200).css("display", "flex");
		}
	});

	/*BOTON DESBLOQUEAR*/
	$("#popad-info").on("click", "#pOpt-desbloquear", function() {
		//Variables
		var m_cedula = $(this).data("cedula");

		//Datos transformados con FormData()
		var datos = new FormData();
		datos.append("cedula", m_cedula);

		//Ajax
		$.ajax("assets/php/ajax_desbloquear.php",{
			//Parametros estandar
			type: "POST",
			dataType: "html",
			data: datos,
			contentType: false,
			processData: false,
			cache: false,

			//Animación de espera
			beforeSend:function() {
				$("#popad-info").html("<img id='m_loading_user' src='assets/img/loading.svg' height='32' alt='imagen de carga' /></br>Realizando cambios, por favor espere....");
				$("#popad-info").css("display", "none");
				$("#popad-info").fadeIn(200);
			},

			//Algoritmos al tener respuesta del XHR
			success:function(respuesta) {
				//Transformar respuesta en JSON
				var resultado = JSON.parse(respuesta);

				//Verificar si el resultado es correcto
				if (resultado.message == "ok") {
					$("#popad-info").html("La cedula "+m_cedula+" fue desbloqueada.");
				}else {
					$("#popad-info").html("La cedula "+m_cedula+" no está bloqueada actualmente.");
				}

				//Mostrar popad-info con una animación
				$("#popad-info").css("display", "none");
				$("#popad-info").fadeIn(200);
			}
		})
	});

	/*BOTON CAMBIAR CONTRASEÑA*/

	//Click en generar contraseña
	$("#popad-info").on("click", "#pOpt-generar_contraseña", function() {
		//Obtener datos
		var m_cedula = $(this).data("cedula");
		var privilegio = $(this).data("privilegio");
		var text_temp = $("#popad-info").html();//Guardar html en variable temporal

		//Efecto slow view y texto a insertar
		$("#popad-info").css("display", "none");
		$("#popad-info").html("Al generar una contraseña se perderá la contraseña anterior, reemplazandola por la generada a continuación. </br>¿Está seguro de realizar esta acción?</br><div id='options'><button id='GenNewPass_ok' data-cedula='"+m_cedula+"' data-privilegio='"+privilegio+"'>Si</button><button id='GenNewPass_nel' data-nel='"+text_temp+"'>No</button></div>");
		$("#popad-info").fadeIn(200);				
	});

	//NEL
	$("#popad-info").on("click", "#GenNewPass_nel", function() {
		$("#popad-info").html($(this).data("nel"));
		$("#popad-info").css("display", "none");
		$("#popad-info").fadeIn(200);
	});

	//Ajax cambiar contraseña
	$("#popad-info").on("click", "#GenNewPass_ok", function() {
		//Datos transformados con FormData()
		var m_cedula = $(this).data("cedula");
		var privilegio = $(this).data("privilegio");
		var datos = new FormData();
		datos.append("cedula", m_cedula);
		datos.append("privilegio", privilegio);

		//Ajax
		$.ajax("assets/php/ajax_buscador_password.php",{
			//Parametros estandar
			type: "POST",
			dataType: "html",
			data: datos,
			contentType: false,
			processData: false,
			cache: false,

			//Animación de espera
			beforeSend: function() {
				$("#popad-info").html("<img id='m_loading_user' src='assets/img/loading.svg' height='32' alt='imagen de carga' /></br>Realizando cambios, por favor espere....");
				$("#popad-info").css("display", "none");
				$("#popad-info").fadeIn(200);
			},

			//Algoritmos al responder el servidor
			success: function(respuesta) {
				$("#popad-info").css("display", "none");
				$("#popad-info").fadeIn(200);
				$("#popad-info").text(respuesta);
			}
		});
	});
});