import { createSlice } from "@reduxjs/toolkit";

//Verificar si ya existe el almacenamiento local de la variable
//theme para evitar reescribirla
if (!localStorage.getItem('gd-theme')) {
	localStorage.setItem('gd-theme', 'light');
}

if (!localStorage.getItem('gd-tour')) {
	localStorage.setItem('gd-tour', JSON.stringify({}));
}

const initialState = {
  tema: localStorage.getItem('gd-theme') || 'light',
  drawer: false,
  tour: {
		home: JSON.parse(localStorage.getItem('gd-tour')).home_v1,
		registros: JSON.parse(localStorage.getItem('gd-tour')).registros_v1,
		usuarios: JSON.parse(localStorage.getItem('gd-tour')).usuarios_v1,
		ver_usuarios: JSON.parse(localStorage.getItem('gd-tour')).ver_usuarios_v1,
		publicaciones: JSON.parse(localStorage.getItem('gd-tour')).publicaciones_v1,
		publicaciones_create: JSON.parse(localStorage.getItem('gd-tour')).publicaciones_create_v1,
		publicaciones_edit: JSON.parse(localStorage.getItem('gd-tour')).publicaciones_edit_v1,
		boletas_admin: JSON.parse(localStorage.getItem('gd-tour')).boletas_admin_v1,
		gedure: JSON.parse(localStorage.getItem('gd-tour')).gedure_v1,
		cuenta: JSON.parse(localStorage.getItem('gd-tour')).cuenta_v1,
		soli_contacto: JSON.parse(localStorage.getItem('gd-tour')).soli_contacto_v1,
		monedero: JSON.parse(localStorage.getItem('gd-tour')).monedero_v1,
		verify_pay: JSON.parse(localStorage.getItem('gd-tour')).verify_pay_v1,
	},
};

export const configsSlices = createSlice({
  name: "configs",
  initialState,
  reducers: {
    updateTema: state => {
      state.tema = state.tema === 'light' ? 'dark' : 'light';

      localStorage.setItem('gd-theme', state.tema);
    },
    updateDrawer: (state, action) => {
      state.drawer = action.payload;
    },
    updateTour: (state, action) => {
      const { open, tour, version } = action.payload;
			const selected = `${tour}_${version}`;
			
			let tours = JSON.parse(localStorage.getItem('gd-tour'));
			tours[selected] = open;
			localStorage.setItem('gd-tour', JSON.stringify(tours));

      state.tour = {...state.tour, [tour]: open};
    },
    resetTours: (state, action) => {
      localStorage.setItem('gd-tour', JSON.stringify({}));
			
			let tours = state.tour;
			let resetTours = {};
			
			for(const key in tours) {
				resetTours[key] = false;
			}

      state.tour = resetTours;
    }
  },
});

export default configsSlices.reducer;

export const { updateTema, updateDrawer, updateTour, resetTours } = configsSlices.actions;