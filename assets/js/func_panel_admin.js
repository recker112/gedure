$(document).ready(function() {
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