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
          if (resultado.status == "error") {
            $("#popad-titulo").text("Registros");
            if (resultado.description == "internal_error") {
              $("#popad-info").text("Error: Ex000003");
            }else if (resultado.description == "token"){
              $("#popad-info").text("Error: Ex000001");
            }
            $("#popad").fadeIn(200).css("display", "flex");
          }
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
      		$("#popad-titulo").text("PETICION FALLIDA");
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

	//Modificar
	$("#c-contenido-modificar").on("click", "form button",function(event){
    event.preventDefault();//Evitar comportamiento normal de form
    var cedula = $("#m_cedula_"+$(this).data("modificar")).val();
    var pass = $("#m_pass_"+$(this).data("modificar")).val();
    var name = $("#m_name_"+$(this).data("modificar")).val();
    var privilegio = $("#m_selector_user").val();
	    if (cedula != "" && cedula != " " && pass != "" && pass != " " && name != "" && name != " ") {
        var datos = $("#form_modificar_"+$(this).data("modificar")).serialize();
        var button = $(this);
        $.ajax("assets/php/ajax_modificar.php", {
          type: "POST",
          dataType: "html",
          data: datos,
          cache: false,
          beforeSend: function() {
            //Efecto loading
            $(button).hide();
            $("#m_loading_"+$(button).data("modificar")).fadeIn(450);
          },
	        success: function (respuesta) {
            //Efecto loading inverso
            $("#m_loading_"+$(button).data("modificar")).hide();
            $(button).fadeIn(450);

            //JSON
            var resultado = JSON.parse(respuesta);

            //Titulo popad
            $("#popad-titulo").text("Modificar");
            //Mensaje popad
	            if (resultado.status == "error") {
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
	            }else if (resultado.status == "ok") {
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
            error: function (jqXHR, textStatus, errorThrown) {
              $("#popad").fadeIn(200).css("display", "flex");
              $("#popad-titulo").text("PETICION FALLIDA");
              $("#popad-info").html("El servidor arroja los siguientes datos: <br>jqXHR: "+ jqXHR.statusText +".</br>Type Error: "+ textStatus +".");               
            }
	        });
	  }else {
	    $("#popad-titulo").text("Modificar");
	    $("#popad-info").text("Debe rellenar todos los campos.");
	    $("#popad").fadeIn(200).css("display", "flex");
	  }
	});

	//Matricula
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
			var datos = new FormData();
			datos.append("archivo", $("#matri_archivo")[0].files[0]);
			datos.append("curso", curso);
			datos.append("seccion", seccion);
			$.ajax("assets/php/ajax_matricula.php", {
				type: "POST",
				dataType: "html",
				data: datos,
				cache: false,
				contentType: false,
				processData: false,
				beforeSend: function(event) {
					//Efecto loading
					$(button).hide();
					$("#matri_loading").fadeIn(300);
				},
				success: function(respuesta) {
					//Efecto loading invertir
					$("#matri_loading").hide().val("0");
					$(button).fadeIn(300);
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
				error: function (jqXHR, textStatus, errorThrown) {
          $("#popad").fadeIn(200).css("display", "flex");
          $("#popad-titulo").text("PETICION FALLIDA");
          $("#popad-info").html("El servidor arroja los siguientes datos: <br>jqXHR: "+ jqXHR.statusText +".</br>Type Error: "+ textStatus +".");               
        }
			});
		}else {
			$("#popad-titulo").text("Matricula");
	    $("#popad-info").text("Debe rellenar todos los campos.");
	    $("#popad").fadeIn(200).css("display", "flex");
		}
	});

	//Boletas
	$("#c-contenido-boletas").on("click", "#b_boton", function(e) {
		e.preventDefault();
		//Titulo popad
		$("#popad-titulo").text("Boletas");
		//Clear popad
		$("#popad-info").html("");

		var file = $("#b_archivo").val();
		var curso = $("#b_grado").val();
		var seccion = $("#b_seccion").val();

		if (file != "" && curso != "" && seccion != "") {
			var datos = new FormData();
			if ($("#b_archivo")[0].files.length > 20) {
				var sobrante = $("#b_archivo")[0].files.length - 20;
				for (var i = 0; i < 20; i++) {
					datos.append("archivo" + i, $("#b_archivo")[0].files[i]);
				}
				datos.append("lote", "1");
			}else {
				var total = $("#b_archivo")[0].files.length;
				for (var i = 0; i < total; i++) {
					datos.append("archivo" + i, $("#b_archivo")[0].files[i]);
				}
			}
			datos.append("archivo_cantidad", $("#b_archivo")[0].files.length);
			datos.append("curso", curso);
			datos.append("seccion", seccion);
			$.ajax("assets/php/ajax_boletin.php",{
				type: "POST",
				dataType: "html",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function() {
        	if (sobrante) {
        		//Efecto loading
	        	$("#b_boton").hide();
	        	$("#b_loading").fadeIn(300);
	        	$("#b_status").text("1/2").fadeIn(300);
        	}else {
        		//Efecto loading
		      	$("#b_boton").hide();
		      	$("#b_loading").fadeIn(300);
        	}
        },
        success: function(respuesta1) {
        	if (sobrante) {
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

        		var datos2 = new FormData();
	        	for (var i = 1; i <= sobrante; i++) {
							datos2.append("archivo" + (i+19), $("#b_archivo")[0].files[i+19]);
						}
						datos2.append("curso", curso);
						datos2.append("seccion", seccion);
						datos2.append("lote", "2");
						datos2.append("archivo_cantidad", $("#b_archivo")[0].files.length);
						$.ajax("assets/php/ajax_boletin.php", {
							type: "POST",
							dataType: "html",
							data: datos2,
							cache: false,
			        contentType: false,
			        processData: false,
			        beforeSend: function() {
			        	//Efecto loading
			        	$("#b_status").text("2/2");
			        },
			        success: function(respuesta2) {
			        	//Efecto loading inverso
	        			$("#b_loading").hide();
	        			$("#b_status").hide();
	        			$("#b_boton").fadeIn(300);
	        			var resultado2 = JSON.parse(respuesta2);

	        			//Message lote 2
	        			var message;
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
			        }
						});
        	}else {
        		//Efecto loading inverso
	        	$("#b_loading").hide();
	        	$("#b_boton").fadeIn(300);
	        	var resultado = JSON.parse(respuesta1);

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
        error: function (jqXHR, textStatus, errorThrown) {
          $("#popad").fadeIn(200).css("display", "flex");
          $("#popad-titulo").text("PETICION FALLIDA");
          $("#popad-info").html("El servidor arroja los siguientes datos: <br>jqXHR: "+ jqXHR.statusText +".</br>Type Error: "+ textStatus +".");               
        }
			});
		}else {
	    $("#popad-info").text("Debe rellenar todos los campos.");
	    $("#popad").fadeIn(200).css("display", "flex");
		}
	});

	//Cerrar popad
	$("#popad-cerrar").on("click", function() {
		cerrar_ventana();
	});
});