//Importar clase
import {insertTextHTML} from './class/classBoletas';
//Importar jquery
import $ from 'jquery';
//Alertas
import {alerts} from './../exports/alerts';
//Ajax
import {consultAjax, loadingAnimation} from './../exports/ajaxPromise';
//VerifyVar
import {verifyVar} from './../exports/funciones/verifyVar';
/*
Funciones boletas
*/
const btnBoletas = document.getElementById('b_boton');
const loadingBoneltas = document.getElementById('b_loading');
const statusBoletas = document.getElementById('b_status');
btnBoletas.addEventListener('click', async e => {
  e.preventDefault();

  //Fomr
  const filesBoletas = document.getElementById('b_archivo');

  //Variables
  let file = document.getElementById('b_archivo').value;
  let curso = document.getElementById('b_grado').value;
  let seccion = document.getElementById('b_seccion').value;

  //Verificar que las variables no estén vacias
  if (verifyVar(file, curso, seccion)) {
    //Animación
    loadingAnimation($, btnBoletas, loadingBoneltas);

    //Data
    const datos = new FormData();

    //Verificar si se están cargando mas de 20 archivos para dividir la lista
    if (filesBoletas.files.length > 20) {
      //Añadir animación extra
      statusBoletas.innerText = '1/2';

      //Variable de la cantidad de archivos sobrantes (después de 20)
      var sobrante = filesBoletas.files.length - 20;

      //Bucle para insertar los 20 archivos
      for (let i = 0; i < 20; i++) {
        datos.append("archivo" + i, filesBoletas.files[i]);
      }

      //Selector de lotes
      datos.append("lote", "1");
    }else {
      //Eliminar animación extra
      statusBoletas.innerText = '';

      //Variable de archvios (si hay menos o igual a 20)
      let total = filesBoletas.files.length;

      //Bucle para insertar archivos
      for (let i = 0; i < total; i++) {
        datos.append("archivo" + i, filesBoletas.files[i]);
      }
    }

    //Variables
    datos.append("archivo_cantidad", filesBoletas.files.length);
    datos.append("curso", curso);
    datos.append("seccion", seccion);

    //Consulta 1
    let res = await consultAjax('assets/php/consults/ajax_boletin.php', datos);

    if (res !== 'no_connect_file_php') {
      if (sobrante) {
        //Añadir animación extra
        statusBoletas.innerText = '2/2';

        //Mensajes
        if (res.message === 'token') {
          alerts('<strong>Error:</strong> Ex000001', 'danger');
        }else if (res.message === 'internal_error') {
          alerts('<strong>Error:</strong> Ex000003', 'danger');
        }else {
          let text = '';
          text = new insertTextHTML(res, text).formatText();

          //Datos lote 2
          const datos2 = new FormData();
        
          //Bucle para insertar los sobrantes
          for (let i=0; i < sobrante; i++) {
            datos2.append("archivo" + (i+20), filesBoletas.files[i+20]);
          }
          
          //Variables
          datos2.append("archivo_cantidad", filesBoletas.files.length);
          datos2.append("lote", "2");
          datos2.append("curso", curso);
          datos2.append("seccion", seccion);
          
          //Consulta 2
          let res2 = await consultAjax('assets/php/consults/ajax_boletin.php', datos2);

          if (res2 !== 'no_connect_file_php') {
            //Animación
            loadingAnimation($, btnBoletas, loadingBoneltas, 'inverse');

            //Mensajes
            if (res.message === 'token') {
              alerts('<strong>Error:</strong> Ex000001', 'danger');
            }else if (res.message === 'internal_error') {
              alerts('<strong>Error:</strong> Ex000003', 'danger');
            }else {
              //Insertar sobrantes
              text += new insertTextHTML(res2, text).formatText(true, true);

              //Mostrar popad
              document.getElementById('popad-titulo').innerHTML = 'Boletas';
              document.getElementById('popad-info').innerHTML = text;
              $("#popad").fadeIn(200).css("display", "flex");
            }
            //Eliminar animación extra
            statusBoletas.innerText = '';
          }else {
            //Mostrar popad
            document.getElementById('popad-titulo').innerHTML = 'Boletas';
            document.getElementById('popad-info').innerHTML = text;
            $("#popad").fadeIn(200).css("display", "flex");

            //Animación
            loadingAnimation($, btnBoletas, loadingBoneltas, 'inverse');
            //Eliminar animación extra
            statusBoletas.innerText = '';
            //Alert
            alerts('Error al connectar para cargar el segundo lote!', 'danger');
          }

          //Text Popad
          document.getElementById('popad-titulo').innerHTML = 'Boletas';
          //Mensage Popad
          document.getElementById('popad-info').innerHTML = text;
          //Mostrar popad
          $("#popad").fadeIn(200).css("display", "flex");
        }
      }else {
        //Animación
        loadingAnimation($, btnBoletas, loadingBoneltas, 'inverse');

        //Mensajes
        if (res.message === 'token') {
          alerts('<strong>Error:</strong> Ex000001', 'danger');
        }else if (res.message === 'internal_error') {
          alerts('<strong>Error:</strong> Ex000003', 'danger');
        }else {
          let text = '';
          text = new insertTextHTML(res, text).formatText(true);

          //Text Popad
          document.getElementById('popad-titulo').innerHTML = 'Boletas';
          //Mensage Popad
          document.getElementById('popad-info').innerHTML = text;
          //Mostrar popad
          $("#popad").fadeIn(200).css("display", "flex");
        } 
      }
    }else {
      //Animación
      loadingAnimation($, btnBoletas, loadingBoneltas, 'inverse');
      //Alert
      alerts('Error al conectar con el servidor!', 'danger');
    }
  }else {
    //Campos vacios
    alerts('Debe rellenar todos los campos!', 'warning');
  }
});

//Bceto de multi lotes (Automatizado)
// const archivos = 47;
// if (archivos > 20) {
//   let i=0;
//   let lote=1;
//   let o=1;
//   while (i < archivos) {
//     if (o > 20) {
//       o=1;
//       lote++;
//     }
//     console.log(`lote${lote}Archivo${i}`);
//     o++;
//     i++;
//   }
//   console.log(lote, i);
// }