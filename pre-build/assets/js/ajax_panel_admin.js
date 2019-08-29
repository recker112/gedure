$(document).ready(function() {
	/*REGISTROS*/
	$("#panel").on("click", ".item-panel", function() {

		//Verificar el item seleccionado
		if ($(this).data("content") == "registros") {

			//Ajax
			$.ajax("assets/php/ajax_registros.php",{
				//Parametros estandar
				type: "POST",
				dataType: "html",
      	cache: false,

      	//Animación de espera
      	beforeSend: function() {
      		$("#console #cedula, #console #accion").html("");
      		$("#console #cedula").append("<span class='datos'>Cargando...</span>");
      		$("#console #accion").append("<span class='datos'>Cargando...</span>");	
      	},

      	//Algoritmos al tener respuesta del XHR
      	success: function(respuesta) {

      		//Transformar respuesta al JSON
      		var resultado = JSON.parse(respuesta);

      		//Verificar respuesta del servidor
          if (resultado.status == "error") {
            $("#popad-titulo").text("Registros");
            if (resultado.description == "internal_error") {
              $("#popad-info").text("Error: Ex000003");
            }else if (resultado.description == "token"){
              $("#popad-info").text("Error: Ex000001");
            }

            //Mostrar popad
            $("#popad").fadeIn(200).css("display", "flex");
          }

          //Variables
      		var cedula;
      		var user;
      		var fecha;
      		var accion;
      		var attemps;
      		var locks;
      		var text1;
      		var text2;

      		//Vaciar caja de cedula y acciones
      		$("#console #cedula, #console #accion").html("");

      		//Bucle para insertar los datos obtenidos
      		for (var i = 0; i < resultado.cantidad; i++) {

      			//Asiganción de variables
      			cedula = resultado[i].log_cedula;
      			user = resultado[i].log_user;
      			fecha = resultado[i].log_fecha;
      			accion = resultado[i].log_accion;

      			//Texto
      			text1 = "<span class='cedula datos' data-cedula='"+cedula+
      				"' data-user='"+user+
      				"' data-fecha='"+fecha+
      				"' data-accion='"+accion;

      			//Verificiar si el usuario es estudiante
      			if (resultado[i].log_usuario) {
      				//Variables extras
      				curso = resultado[i].log_curso;
      				seccion = resultado[i].log_seccion;
      				pg = resultado[i].log_pg;
      				lista = resultado[i].log_lista;  

      				//Texto añadido
      				text1 += "' data-curso='"+curso+
      				"' data-seccion='"+seccion+
      				"' data-pg='"+pg+
      				"' data-lista='"+lista;
      			}

      			//Verificar si el usuario tiene algún BANGARANG
      			if (resultado[i].log_bans) {	

      				//Variables extras
      				attemps = resultado[i].log_attemps;
      				locks = resultado[i].log_locks; 

      				//Texto añadidos
      				text1 += "' data-attemps='"+attemps+
      				"' data-locks='"+locks;
      			}

      			//Fin del texto
      			text1 += "'>"+cedula+"</span>";

      			//Texto accion
      			var	text2 = "<span class='datos'>"+accion+"</span>";

      			//Insertar textos
      			$("#console #cedula").append(text1);
      			$("#console #accion").append(text2);
      		}
      	},

      	//XHR Error
      	error: function (jqXHR, textStatus, errorThrown) {
              $("#popad").fadeIn(200).css("display", "flex");
      		$("#popad-titulo").text("PETICION FALLIDA");
     			$("#popad-info").html("El servidor arroja los siguientes datos: <br>jqXHR: "+ jqXHR.statusText +".</br>Type Error: "+ textStatus +".");            	
     		}
			});
		}
	});

	//Popad de registros
	$("#console").on("click", "span.cedula", function() {

		//Mostrar popad
		$("#popad").fadeIn(200).css("display", "flex");

		//Titulo del popad
		$("#popad-titulo").text("Datos.");

		//Variables
		var cedula = $(this).data("cedula");
		var user = $(this).data("user");
		var fecha = $(this).data("fecha");
		var accion = $(this).data("accion");

		//Texto a insertar
		var html ="Cedula: "+cedula+
		"</br>Usuario: "+user+
		"</br>Fecha: "+fecha+
		"</br>Accion: "+accion;

		//Verificar si el usuario es estudiante
		if ($(this).data("curso")) {

			//Variables
			var curso = $(this).data("curso");
			var seccion = $(this).data("seccion");
			var lista = $(this).data("lista");
			var pg = $(this).data("pg");

			//Texto a añadir
			html += "</br>Curso: "+curso+
			"</br>Seccion: "+seccion+
			"</br>N° lista: "+lista+
			"</br>Profesor Guia: "+pg;
		}

		//Verificar si el usuario tiene errores
		if ($(this).data("attemps") > 0) {

			//Variables
			var errores = $(this).data("attemps");
			var locks = $(this).data("locks");

			//Texto a añadir
			html += "</br>Errores: "+errores+
			"</br>Bloqueos: "+locks;
		}

		//Insertar Texto
		$("#popad-info").html(html);
	});

	/*MODIFICAR*/
	$("#c-contenido-modificar").on("click", "form button",function(event){
    event.preventDefault();//Evitar comportamiento normal de form
    //Datos del formulario

    //Datos a enviar en la petición ajax mediante serialize()
    var datos = $("#form_modificar_"+$(this).data("modificar")).serialize();

    //Titulo popad
		$("#popad-titulo").text("Modificar");

		//Verificar si se está realizando una modificación de usuario
    if ($(this).data("modificar") == "user") {

    	//Variables
    	var cedula = $("#m_cedula_"+$(this).data("modificar")).val();
	    var pass = $("#m_pass_"+$(this).data("modificar")).val();
	    var name = $("#m_name_"+$(this).data("modificar")).val();
	    var privilegio = $("#m_selector_user").val();

	    //Verificar variables vacias
    	if (cedula != "" && cedula != " " && pass != "" && pass != " " && name != "" && name != " ") {

    			//Objeto boton
	        var button = $(this);

	        //Ajax
	        $.ajax("assets/php/ajax_modificar.php", {
	        	//Parametros estandar
	          type: "POST",
	          dataType: "html",
	          data: datos,
	          cache: false,

	          //Animación de espera
	          beforeSend: function() {
	            //Efecto loading
	            $(button).hide();
	            $("#m_loading_"+$(button).data("modificar")).fadeIn(450);
	          },

	          //Algoritmos al tener respuesta del XHR
		        success: function (respuesta) {
	            //Efecto loading inverso
	            $("#m_loading_"+$(button).data("modificar")).hide();
	            $(button).fadeIn(450);

	            //Transformar respuesta a JSON
	            var resultado = JSON.parse(respuesta);

	            //Mensaje enviado por el servidor
		            if (resultado.status == "error") {//Mensajes de error
		              if (resultado.description == "no_curso") {
		                $("#popad-info").text("Debe rellenar todos los campos.");
		              }else if (resultado.description == "insert_error") {
		              	$("#popad-info").text("No se puede añadir la cédula "+privilegio+cedula+" porque ya existe en la base de datos.");
		              }else if (resultado.description == "update_error") {
		                $("#popad-info").text("No se puede actualizar los datos de la cédula "+privilegio+cedula+" porque no existe en la base de datos.");
		              }else if (resultado.description == "delete_error") {
		                $("#popad-info").text("No se puede borrar la cédula "+privilegio+cedula+" porque no existe en la base de datos.");
		              }else if (resultado.description == "token") {
		                $("#popad-info").text("Error: Ex000001");
		              }else if (resultado.description == "consult_error") {
	                  $("#popad-info").text("Error: Ex000002");
		              }else if (resultado.description == "internal_error") {
	                  $("#popad-info").text("Error: Ex000003");
		              }
		            }else if (resultado.status == "ok") {//Mensajes de todo OC
		              if (resultado.description == "insert_ok") {
		                $("#popad-info").text("Se añadio la cédula "+privilegio+cedula+" correctamente a la base de datos.");
		              }else if (resultado.description == "update_ok") {
		                $("#popad-info").text("Se actualizaron correctamente los datos de la cédula "+privilegio+cedula+" en la base de datos.");
		              }else if (resultado.description == "delete_ok") {
		                $("#popad-info").text("Se eliminaron correctamente los datos de la cédula "+privilegio+cedula+" en la base de datos.");
		              }
		            }

		            //Mostrar popad
		            $("#popad").fadeIn(200).css("display", "flex");
		          },

		          //XHR Error
	            error: function (jqXHR, textStatus, errorThrown) {
	            	//Efecto loading inverso
            		$("#m_loading_"+$(button).data("modificar")).hide();
            		$(button).fadeIn(450);
	              $("#popad").fadeIn(200).css("display", "flex");
	              $("#popad-titulo").text("PETICION FALLIDA");
	              $("#popad-info").html("El servidor arroja los siguientes datos: <br>jqXHR: "+ jqXHR.statusText +".</br>Type Error: "+ textStatus +".");               
	            }
		        });
		  }else {

		  	//Mensaje de campos vacios
		    $("#popad-info").text("Debe rellenar todos los campos.");
		    $("#popad").fadeIn(200).css("display", "flex");
		  }
    }else if ($(this).data("modificar") == "prof") {

    	//Variables
    	var nombre = $("#m_name_prof").val();
    	var curso = $("#m_curso_prof").val();
    	var seccion = $("#m_seccion_prof").val();

    	//Verificar variables vacias
    	if (nombre != "" && curso != "" && seccion != "") {
    		//Variable boton
    		var button = $(this);

    		//Ajax
    		$.ajax("assets/php/ajax_profesores.php", {
    			//Parametros estandar
    			type: "POST",
    			dataType: "html",
    			data: datos,
    			cache: false,

    			//Animación de espera
    			beforeSend: function() {
            //Efecto loading
            $(button).hide();
            $("#m_loading_"+$(button).data("modificar")).fadeIn(450);
          },

          //Algoritmos al tener respuesta del XHR
	        success: function (respuesta) {
            //Efecto loading inverso
            $("#m_loading_"+$(button).data("modificar")).hide();
            $(button).fadeIn(450);

            //Variable de mensajes vacia
            var message="";

            //Transforar respuesta a JSON
            var resultado = JSON.parse(respuesta);

            //Respuesta del servidor
            if (resultado.message == "token") {
            	message = "Error: Ex000001";
            }else if (resultado.message == "consult_error") {
            	message = "Error: Ex000002";
            }else if (resultado.message == "no_found_seccion") {
            	message = "La seccion seleccionada no está registrada en la base de datos.";
            }else if (resultado.message == "no_change") {
            	message = "No se han realizado cambios.";
            }else if (resultado.message == "ok") {
            	message = "Se actualizó el nombre del profesor correctamente.";
            }else {
            	message = "Error: Ex000003";
            }

            //Texto popad
            $("#popad-info").text(message);

            //Mostrar popad
	          $("#popad").fadeIn(200).css("display", "flex");
          },

          //XHR Error
          error: function (jqXHR, textStatus, errorThrown) {
          	//Efecto loading inverso
            $("#m_loading_"+$(button).data("modificar")).hide();
            $(button).fadeIn(450);
            $("#popad").fadeIn(200).css("display", "flex");
            $("#popad-titulo").text("PETICION FALLIDA");
          	$("#popad-info").html("El servidor arroja los siguientes datos: <br>jqXHR: "+ jqXHR.statusText +".</br>Type Error: "+ textStatus +".");               
          }
    		})
    	}else {

    		//Mensaje de campos vacios
		    $("#popad-info").text("Debe rellenar todos los campos.");
		    $("#popad").fadeIn(200).css("display", "flex");
    	}
    }else {

    	//Variables
    	var privilegio = $("#m_selector_block").val();
    	var cedula = $("#m_cedula_block").val();

    	//Verificar variabels vacias
    	if (privilegio != "" && cedula != "") {

    		//Variable boton
    		var button = $(this);

    		//Ajax
    		$.ajax("assets/php/ajax_desbloquear.php", {
    			//Parametros estandar
    			type: "POST",
    			dataType: "html",
    			data: datos,
    			cache: false,

    			//Animación de espera
    			beforeSend: function() {
            //Efecto loading
            $(button).hide();
            $("#m_loading_"+$(button).data("modificar")).fadeIn(450);
          },

          //Algoritmos al tener respuesta del XHR
	        success: function (respuesta) {
            //Efecto loading inverso
            $("#m_loading_"+$(button).data("modificar")).hide();
            $(button).fadeIn(450);
            var message="";

            //Transformar respuesta a JSON
            var resultado = JSON.parse(respuesta);

            //Respuesta del servidor
            if (resultado.message == "token") {
            	message = "Error: Ex000001";
            }else if (resultado.message == "no_register") {
            	message = "La cuenta con la cédula "+privilegio+cedula+" no se encuentra bloqueada.";
            }else if (resultado.message == "ok") {
            	message = "La cuenta con la cédula "+privilegio+cedula+" fue desbloqueada."
            }else {
            	message = "Error: Ex000003";
            }

            //Texto popad
            $("#popad-info").text(message);

            //Mostrar popad
	          $("#popad").fadeIn(200).css("display", "flex");
          },

          //XHR Error
          error: function (jqXHR, textStatus, errorThrown) {
          	//Efecto loading inverso
            $("#m_loading_"+$(button).data("modificar")).hide();
            $(button).fadeIn(450);
            $("#popad").fadeIn(200).css("display", "flex");
            $("#popad-titulo").text("PETICION FALLIDA");
          	$("#popad-info").html("El servidor arroja los siguientes datos: <br>jqXHR: "+ jqXHR.statusText +".</br>Type Error: "+ textStatus +".");               
          }
    		})
    	}else{

    		//Mensaje de campos vacios
		    $("#popad-info").text("Debe rellenar todos los campos.");
		    $("#popad").fadeIn(200).css("display", "flex");
    	}
    }
	});

	/*MATRICULA*/
	$("#c-contenido-matricula").on("click", "#matri_boton", function(e) {
		e.preventDefault();
		//Titulo popad
		$("#popad-titulo").text("Matricula");

		//Parametros
		var file = $("#matri_archivo").val();
		var curso = $("#matri_curso").val();
		var seccion = $("#matri_seccion").val();
		var button = $(this);

		//Scripts
		if (file != "" && curso != "" && seccion != "") {

			//Variables que contiene los datos del formulario mediante FormData()
			var datos = new FormData();

			//Datos a insertar
			datos.append("archivo", $("#matri_archivo")[0].files[0]);
			datos.append("curso", curso);
			datos.append("seccion", seccion);

			//Ajax
			$.ajax("assets/php/ajax_matricula.php", {
				//Parametros estandar
				type: "POST",
				dataType: "html",
				data: datos,
				cache: false,
				contentType: false,
				processData: false,

				//Animación de espera
				beforeSend: function(event) {
					//Efecto loading
					$(button).hide();
					$("#matri_loading").fadeIn(300);
				},

				//Algoritmos para cuando el servidor responda
				success: function(respuesta) {
					//Efecto loading invertir
					$("#matri_loading").hide().val("0");
					$(button).fadeIn(300);

					//Variable transformada a JSON
					var resultado = JSON.parse(respuesta);

          //Mensaje popad
					if (resultado.menssage == "token") {
						$("#popad-info").text("Error: Ex000001");
					}else if (resultado.message == "no_found_file"){
						$("#popad-info").text("No se pudo encontrar el archivo a subir, por favor intente de nuevo.");
					}else if (resultado.message == "no_format_file"){
						$("#popad-info").text("Solo se pueden subir archivos con la extención .csv, por favor verifique el archivo que está cargando.");
					}else if (resultado.message == "no_size"){
						$("#popad-info").text("El archivo que está subiendo tiene un peso mayor a 10KB, por favor reduzca el peso del archivo.");
					}else if (resultado.message == "no_upload"){
						$("#popad-info").text("No se pudo cargar el archivo al servidor, por favor intente de nuevo.");
					}else if (resultado.message == "update_ok"){
						$("#popad-info").html("Matricula cargada correctamente</br>Insertados: "+resultado.insert+".</br>Actualizados: "+resultado.update+".</br>Errores: "+resultado.error+".");
					}else {
						$("#popad-info").text("Error: Ex000003");
					}

					//Mostrar popad
					$("#popad").fadeIn(200).css("display", "flex");
				},

				//Error XHR
				error: function (jqXHR, textStatus, errorThrown) {
          $("#popad").fadeIn(200).css("display", "flex");
          $("#popad-titulo").text("PETICION FALLIDA");
          $("#popad-info").html("El servidor arroja los siguientes datos: <br>jqXHR: "+ jqXHR.statusText +".</br>Type Error: "+ textStatus +".");               
        }
			});
		}else {

			//Mensaje de error en los campos vacios
			$("#popad-titulo").text("Matricula");
	    $("#popad-info").text("Debe rellenar todos los campos.");
	    $("#popad").fadeIn(200).css("display", "flex");
		}
	});

	/*BOLETAS*/
	$("#c-contenido-boletas").on("click", "#b_boton", function(e) {
		e.preventDefault();

		//Titulo popad
		$("#popad-titulo").text("Boletas");

		//Clear popad
		$("#popad-info").html("");

		//Variables
		var file = $("#b_archivo").val();
		var curso = $("#b_grado").val();
		var seccion = $("#b_seccion").val();

		//Verificar que las variables no estén vacias
		if (file != "" && curso != "" && seccion != "") {

			//Variable que contiene los datos mediante FormData()
			var datos = new FormData();

			//Verificar si se están cargando mas de 20 archivos para dividir la lista
			if ($("#b_archivo")[0].files.length > 20) {

				//Variable de la cantidad de archivos sobrantes (después de 20)
				var sobrante = $("#b_archivo")[0].files.length - 20;

				//Bucle para insertar los 20 archivos
				for (var i = 0; i < 20; i++) {
					datos.append("archivo" + i, $("#b_archivo")[0].files[i]);
				}

				//Selector de lotes
				datos.append("lote", "1");
			}else {

				//Variable de archvios (si hay menos o igual a 20)
				var total = $("#b_archivo")[0].files.length;

				//Bucle para insertar archivos
				for (var i = 0; i < total; i++) {
					datos.append("archivo" + i, $("#b_archivo")[0].files[i]);
				}
			}

			//Variables
			datos.append("archivo_cantidad", $("#b_archivo")[0].files.length);
			datos.append("curso", curso);
			datos.append("seccion", seccion);

			//Ajax
			$.ajax("assets/php/ajax_boletin.php",{
				//Parametros estandar
				type: "POST",
				dataType: "html",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,

        //Animación de espera
        beforeSend: function() {

        	//Verificar si hay sobrante
        	if (sobrante) {
        		//Efecto loading
	        	$("#b_boton").hide();
	        	$("#b_loading").fadeIn(300);

	        	//Mostrar lote
	        	$("#b_status").text("1/2").fadeIn(300);
        	}else {
        		//Efecto loading
		      	$("#b_boton").hide();
		      	$("#b_loading").fadeIn(300);
        	}
        },

        //Algoritmos al responder el servidor
        success: function(respuesta1) {

        	//Verificar si hay sobrante
        	if (sobrante) {

        		//Respuesta transformada a JSON
        		var resultado1 = JSON.parse(respuesta1);

	        	//Message lote 1
	        	var message;
	        	for (var i = 0; i < 20; i++) {
	        		if (resultado1[i].message == "token") {
		        		message = "Error: Ex000001.";
		        	}else if (resultado1[i].message == "error_upload") {
		        		message = "Estado: No se ha podido cargar el archivo al servidor.";
		        	}else if (resultado1[i].message == "no_size") {
		        		message = "Estado: El archivo tiene un tamaño mayor a 2MB.";
		        	}else if (resultado1[i].message == "no_format") {
		        		message = "Estado: El archivo no está en formato pdf.";
		        	}else if (resultado1[i].message == "no_move") {
		        		message = "Estado: No se ha podido mover el archivo al servidor.";
		        	}else if (resultado1[i].message == "ok") {
		        		message = "Estado: El archivo se cargó correctamente.";
		        	}else {
		        		message = "Error: Ex000003.";
		        	}
	        		$("#popad-info").append("Nombre: "+resultado1[i].name+".</br>"+message+"</br></br>");
	        	}

	        	//Variable del segundo lote a enviar
        		var datos2 = new FormData();

        		//Bucle para insertar los sobrantes
	        	for (var i = 1; i <= sobrante; i++) {
							datos2.append("archivo" + (i+19), $("#b_archivo")[0].files[i+19]);
						}

						//Variables del formulario
						datos2.append("curso", curso);
						datos2.append("seccion", seccion);
						datos2.append("lote", "2");
						datos2.append("archivo_cantidad", $("#b_archivo")[0].files.length);

						//Ajax lote 2
						$.ajax("assets/php/ajax_boletin.php", {
							//Parametros estandar
							type: "POST",
							dataType: "html",
							data: datos2,
							cache: false,
			        contentType: false,
			        processData: false,

			        //Animación de espera
			        beforeSend: function() {
			        	//Efecto loading
			        	$("#b_status").text("2/2");
			        },

			        //Algoritmos al tener respuesta del servidor
			        success: function(respuesta2) {
			        	//Efecto loading inverso
	        			$("#b_loading").hide();
	        			$("#b_status").hide();
	        			$("#b_boton").fadeIn(300);

	        			//Respuesta transformada a JSON
	        			var resultado2 = JSON.parse(respuesta2);

	        			//Variable
	        			var message;

	        			//Mensajes de respuesta.
			        	for (var i = 0; i < resultado2.archivos_total - 20; i++) {
			        		if (resultado2[i].message == "token") {
				        		message = "Error: Ex000001.";
				        	}else if (resultado2[i].message == "error_upload") {
				        		message = "Estado: No se ha podido cargar el archivo al servidor.";
				        	}else if (resultado2[i].message == "no_size") {
				        		message = "Estado: El archivo tiene un tamaño mayor a 2MB.";
				        	}else if (resultado2[i].message == "no_format") {
				        		message = "Estado: El archivo no está en formato pdf.";
				        	}else if (resultado2[i].message == "no_move") {
				        		message = "Estado: No se ha podido mover el archivo al servidor.";
				        	}else if (resultado2[i].message == "ok") {
				        		message = "Estado: El archivo se cargó correctamente.";
				        	}else {
				        		message = "Error: Ex000003.";
				        	}
			        		$("#popad-info").append("Nombre: "+resultado2[i].name+".</br>"+message+"</br></br>");
			        	}
			        	//Mostrar popad
	        			$("#popad").fadeIn(200).css("display", "flex");
			        },

			        //Error XHR del Ajax 2
			        error: function (jqXHR, textStatus, errorThrown) {
			          $("#popad").fadeIn(200).css("display", "flex");
			          $("#popad-titulo").text("PETICION FALLIDA");
			          $("#popad-info").html("El servidor arroja los siguientes datos: <br>jqXHR: "+ jqXHR.statusText +".</br>Type Error: "+ textStatus +".");               
			        }
						});
        	}else {
        		//Efecto loading inverso
	        	$("#b_loading").hide();
	        	$("#b_boton").fadeIn(300);

	        	//Respuesta transformada a JSON
	        	var resultado = JSON.parse(respuesta1);

	        	//Mensajes de respuesta
	        	var message;
	        	for (var i = 0; i < resultado.archivos_total; i++) {
	        		if (resultado[i].message == "token") {
		        		message = "Error: Ex000001.";
		        	}else if (resultado[i].message == "error_upload") {
		        		message = "Estado: No se ha podido cargar el archivo al servidor.";
		        	}else if (resultado[i].message == "no_size") {
		        		message = "Estado: El archivo tiene un tamaño mayor a 2MB.";
		        	}else if (resultado[i].message == "no_format") {
		        		message = "Estado: El archivo no está en formato pdf.";
		        	}else if (resultado[i].message == "no_move") {
		        		message = "Estado: No se ha podido mover el archivo al servidor.";
		        	}else if (resultado[i].message == "ok") {
		        		message = "Estado: El archivo se cargó correctamente.";
		        	}else {
		        		message = "Error: Ex000003.";
		        	}
	        		$("#popad-info").append("Nombre: "+resultado[i].name+".</br>"+message+"</br></br>");
	        	}

	        	//Mostrar popad
	        	$("#popad").fadeIn(200).css("display", "flex");
        	}
        },

        //Error XHR
        error: function (jqXHR, textStatus, errorThrown) {
          $("#popad").fadeIn(200).css("display", "flex");
          $("#popad-titulo").text("PETICION FALLIDA");
          $("#popad-info").html("El servidor arroja los siguientes datos: <br>jqXHR: "+ jqXHR.statusText +".</br>Type Error: "+ textStatus +".");               
        }
			});
		}else {

			//Mensaje de campos vacios
	    $("#popad-info").text("Debe rellenar todos los campos.");
	    $("#popad").fadeIn(200).css("display", "flex");
		}
	});

	/*CONFIGURACION*/
	$("#c-contenido-configuracion").on("click", "#n_boton", function(e) {
		//Evitar comportamiento pre-determinado
		e.preventDefault();

		//Cambiar nombre del titulo en el popad
		$("#popad-titulo").text("Notas");

		//Variable de datos capturados con serialize()
		var datos = $("#form_configuracion").serialize();

		//Ajax
		$.ajax("assets/php/ajax_notas.php", {
			//Parametros estandar
			type: "POST",
			dataType: "html",
			data: datos,
			cache: false,

			//Animación de espera
			beforeSend: function() {
				//Efecto loading
				$("#n_loading").fadeIn(200);
				$("#n_boton").hide();
			},

			//Algoritmos de respuesta del servidor
			success: function(respuesta) {
				//Efecto loading invertido
				$("#n_boton").fadeIn(200);
				$("#n_loading").hide();

				//Variable
				var message;

				//Respuesta transformada a JSON
				var resultado = JSON.parse(respuesta);

				//Mensajes del servidor
				if (resultado.message == "token") {
					message = "Error: Ex000001.";
				}else if (resultado.message == "consult_error"){
					message = "Error: Ex000002";
				}else if (resultado.message == "empty") {
					message = "Debe rellenar todos los campos.";
				}else	if (resultado.message == "no_found_sec") {
					message = "La sección seleccionada no existe.";
				}else if (resultado.message == "no_found_user") {
					message = "El usuario no está registrado en la base datos.";
				}else if (resultado.message == "no_changes"){
					message = "No se han realizado cambios.";
				}else if (resultado.message == "ok") {
					message = "Se han cargado los cambios al servidor exitosamente.";
				}else {
					message = "Error: Ex000003";
				}

				//Mensajes
				$("#popad-info").text(message);        

				//Mostrar popad
				$("#popad").fadeIn(200).css("display", "flex");
			},

			//Error XHR
			error: function (jqXHR, textStatus, errorThrown) {
        $("#popad").fadeIn(200).css("display", "flex");
        $("#popad-titulo").text("PETICION FALLIDA");
        $("#popad-info").html("El servidor arroja los siguientes datos: <br>jqXHR: "+ jqXHR.statusText +".</br>Type Error: "+ textStatus +".");               
      }
		});
	});

	/*BORRAR*/
	$("#contenido").on("click", "#borr_boton", function(e) {
		e.preventDefault();

		//Titulo popad
		$("#popad-titulo").text("Borrar");

		//clear fix
		$("#popad-info").html("");

		//Variables
		var select = $("#borr_selec").val();
		var curso = $("#borr_curso").val();
		var seccion = $("#borr_seccion").val();

		//Verificar variables vacias
		if (select != "" && curso != "" && seccion != "") {
			var datos = $("#form_borrar").serialize();
			$.ajax("assets/php/ajax_borrar.php", {
				type: "POST",
				dataType: "html",
				data: datos,
				cache: false,
				beforeSend: function() {
					//Efecto loading
					$("#borr_boton").hide();
					$("#borr_loading").fadeIn(200);
				},
				success: function(respuesta) {
					//Efecto loading invertido
					$("#borr_loading").hide();
					$("#borr_boton").fadeIn(200);
					var resultado = JSON.parse(respuesta);

					var message="";

					//Scripts
					if (resultado.message == "token") {
						message = "Error: Ex000001";
					}else if (resultado.message == "no_delete_sec"){
						message = "No hay estudiantes que borrar en esa sección";
					}else if (resultado.message == "ok_sec") {
						message = "Se han borrado "+resultado.borrados+" estudiantes.";
					}else if (resultado.borrados) {
						for (var i = 0; i < resultado.borrados; i++) {
							message += "Archivo: "+resultado[i].name+"</br>Estado: "+resultado[i].message+"</br></br>";
						}
						message += "Número total de boletas borradas: "+resultado.borrados;
					}else if (resultado.no_borrados) {
						message = "No hay boletas que borrar.";
					}else {
						message = "Error: Ex000003";
					}

					//Mensaje
					$("#popad-info").html(message);    

					//Mostrar popad
					$("#popad").fadeIn(200).css("display", "flex");
				},

				//Error XHR
				error: function (jqXHR, textStatus, errorThrown) {
	        $("#popad").fadeIn(200).css("display", "flex");
	        $("#popad-titulo").text("PETICION FALLIDA");
	        $("#popad-info").html("El servidor arroja los siguientes datos: <br>jqXHR: "+ jqXHR.statusText +".</br>Type Error: "+ textStatus +".");               
      	}
			});
		}else {

			//Mensaje de campos vacios
			$("#popad-info").text("Debe rellenar todos los campos.");
	    $("#popad").fadeIn(200).css("display", "flex");
		}
	});
});