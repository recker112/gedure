import React from 'react';

// Components
import AjaxBox from '../../../../components/AjaxBox';

function StepDataPersonal() {
	return (
		<AjaxBox 
			title='Creación terminada'
			content='El usuario fue creado satisfactoriamente. Recuerde que puede editar los datos en la secciรณn principal.'
			form={null}
			disableButton={true}
		/>
	);
}

export default StepDataPersonal;