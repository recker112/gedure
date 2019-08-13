function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function cerrar_ventana() {
	$("#popad").fadeOut(200);
}

// Adapatado de http://www.quirksmode.org/js/cookies.html#script
function readCookie(name) {
  var nameEQ = name + "="; 
  var ca = document.cookie.split(';');

  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) {
      return decodeURIComponent( c.substring(nameEQ.length,c.length) );
    }
  }
  return null;
}

$(document).ready(function() {

  //Info en el popad sobre las cookies
  $("span.cookie_link").on("click", function() {
    //Titulo popad
    $("#popad-titulo").text("Cookies");

    //Mensaje del popad
    var message = "<h1 style='font-size: 30px; color: #31387a; margin-bottom: 10px'>¿Qué son las cookies?</h1>"+
    "<p style='text-align: justify; margin: 0px 15px'>Cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.</p>"+
    "<h2 style='font-size: 30px; color: #e05eba; margin-bottom: 10px'>¿Qué tipo de cookies usa esta página web?</h2>"+
    "<p style='text-align: justify; margin: 0px 15px'>Esta página web utiliza solo cookies personalizadas con el fin de mejorar la experiencia del usuario. Esta web no usa cookies de terceros o algún otro tipo de cookies.<br/></p>"+
    "<h3 style='font-size: 30px; color: #dd2829; margin-bottom: 10px'>Desactivar las cookies</h3>"+
    "<p style='text-align: justify; margin: 0px 15px'>El Usuario puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador. En la mayoría de los navegadores web se ofrece la posibilidad de permitir, bloquear o eliminar las cookies instaladas en su equipo. A continuación puedes acceder a la configuración de los navegadores webs más frecuentes para aceptar, instalar o desactivar las cookies:</br></br>"+
    "<a href='https://support.google.com/chrome/answer/95647?hl=es'>Configuracion de cookies en Google Chrome</a></br><a href='https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias?redirectlocale=es&redirectslug=habilitar-y-deshabilitar-cookies-que-los-sitios-we'>Configuracion de cookies en Mozilla Firefox</a></p>"+
    "<h4 style='font-size: 30px; margin-bottom: 10px'>Advertencia sobre eliminar cookies</h4>"+
    "<p style='text-align: justify; margin: 0px 15px'>Usted puede eliminar y bloquear todas las cookies de este sitio, pero parte del sitio puede llegar a no funcionar correctamente.</p></br>";

    //Popad Info
    $("#popad-info").html(message);

    //Mostrar popad
    $("#popad").fadeIn(200).css("display", "flex");
  });
});