//React
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

//Material-UI
import { Backdrop, CircularProgress } from '@material-ui/core';

//redux
import { connect } from 'react-redux';
import updateDataUser from '../actions/login/updateDataUser';
import reloginSuccess from '../actions/login/reloginSuccess';

function ReloginVerify({
	auth,
	checkbox,
	loginSI,
	updateDataUser,
	reloginSuccess,
	redirect,
	children
}) {
	useEffect(() => {
		//Titulo
		document.title = 'La Candelaria - Panel';

		//Lugar de petición hacia el servidor
		const fetchData = async key => {
			//QUERY
			const query = true;
			if (query) {
				const dataTest = {
					cedula: 'A-28432441',
					cedulaSin: '28432441',
					name: 'José ortiz',
					curso: '',
					seccion: '',
					nota: '',
					horario: '',
					profeGuia: '',
					privilegio: 'A-',
					avatar: 'reckerSITO',
					token: 'testDATA47'
				};

				updateDataUser(dataTest);

				//Se le pasa el parámetro false para evitar que vuelva
				//a verificar la redirección si está activa. Así se
				//evita que la app revise el usuario 2 veces o más.
				reloginSuccess(false);
				return true;
			} else {
				return false;
			}
		};

		let CanselaSHION = false;

		if (!CanselaSHION) {
			//console.log('Contador los render');

			//Verificar login desde el FORM
			if (loginSI) {
				//Verificar checkbox para guardar datos.
				// console.log("KEY seteada");
				if (checkbox) {
					//Datos permanentes.
					localStorage.setItem('key', true);
					sessionStorage.setItem('key', true);
				} else {
					//Datos de SOLO sesión.
					sessionStorage.setItem('key', true);
				}
				//Verificar si no viene de una redirección de la misma app
				//y proviene entrando directamente al panel.
			} else if (!auth) {
				// console.log("verificando datos locales....");
				const keyL = JSON.parse(localStorage.getItem('key'));
				const keyS = JSON.parse(sessionStorage.getItem('key'));

				//Verificar primero si existe key local.
				if (keyL === true) {
					fetchData(keyL);
				} else if (keyS === true) {
					fetchData(keyS);
				} else {
					//Redirecciona al usuario al LOGIN al no estar auth
					//por la web y al no tener datos locales guardados.
					document.getElementById('redirectToLogin').click();
				}
			} else if (auth) {
				//Verificar la redirección SIN datos seteados.
				if (redirect) {
					//keys
					const keyL = JSON.parse(localStorage.getItem('key'));
					const keyS = JSON.parse(sessionStorage.getItem('key'));

					//Verificar primero si existe key local.
					if (keyL === true) {
						fetchData(keyL);
					} else if (keyS === true) {
						fetchData(keyS);
					}
				}
				//El checkeo de la redirección es obligatorio si no se
				//quiere que el programa entre en bucle. xD
			}
		}

		//Al desmontar componente
		return () => {
			CanselaSHION = true;
		};
	});

	//Verificar auth
	if (auth) {
		//Renderizar contenido
		return (
			<React.Fragment>
				{ children }
			</React.Fragment>
		);
	}

	//Al no estar verificado.
	return <LoadingVerifyRelogin />;
}

function LoadingVerifyRelogin() {
	return (
		<Backdrop open={true}>
			<div className="VerifyReloginDiv">
				<h1>Cargando</h1>
				<CircularProgress color="inherit" />
				<p>
					Si tarda mucho es posible que haya ocurrido algún fallo en el sistema de login. Puede
					solucionar este inconveniente dando click{' '}
					<Link id="redirectToLogin" onClick={clearAllData} to="/">
						aquí
					</Link>{' '}
					y reintentar su login.
				</p>
			</div>
		</Backdrop>
	);
}

export function clearAllData() {
	//Limpiar toda la data para solventar errores.
	const theme = localStorage.getItem('theme');

	localStorage.clear();
	sessionStorage.clear();

	//Para mantener la configuración del usuario.
	localStorage.setItem('theme', theme);
}

//REDUX
const mapStateToProps = state => ({
	auth: state.loginStatus.auth,
	checkbox: state.dataLogin.checkbox,
	loginSI: state.loginStatus.loginSI,
	redirect: state.loginStatus.redirect
});

const mapDispatchToProps = {
	updateDataUser,
	reloginSuccess
};

export default connect(mapStateToProps, mapDispatchToProps)(ReloginVerify);