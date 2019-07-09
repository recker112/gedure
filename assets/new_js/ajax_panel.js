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

	//Cerrar popad
	$("#popad-cerrar").on("click", function() {
		cerrar_ventana();
	});
});