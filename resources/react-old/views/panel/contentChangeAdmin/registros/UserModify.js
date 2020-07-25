import React from 'react';

//React Route
import { useHistory } from "react-router-dom";

//Material-UI
import { IconButton, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

//Redux
import { connect } from 'react-redux';
import updateValue from '../../../../actions/updateValue';

function UserModify({ data, updateValue }) {
	let history = useHistory();
	
	const Modify = () => {
		switch (data.privilegio) {
			case 'V-':
				{
					const MakeData = {
						cedula: data.cedula,
						name: data.name,
						privilegio: data.privilegio,
						curso: data.curso,
						seccion: data.seccion
					};
					updateValue(MakeData, 'MODIFY_EXTERNO');
				}
				break;
			case 'A-':
				{
					const MakeData = {
						cedula: data.cedula,
						name: data.name,
						privilegio: data.privilegio
					};
					updateValue(MakeData, 'MODIFY_EXTERNO');
				}
				break;
			case 'CR-':
				{
					const MakeData = {
						cedula: data.cedula,
						name: data.name,
						privilegio: data.privilegio,
						curso: '1',
						seccion: 'A'
					};
					updateValue(MakeData, 'MODIFY_EXTERNO');
				}
				break;
			default: {
				const MakeData = {
					cedula: '',
					name: '',
					privilegio: 'V-',
					curso: '',
					seccion: ''
				};
				updateValue(MakeData, 'MODIFY_EXTERNO');
			}
		}
		history.push("/panel?show=modify");
	}
	return (
		<Tooltip title="Editar" placement="right" enterDelay={500} leaveDelay={200} arrow>
			<IconButton onClick={Modify} color="primary">
				<EditIcon />
			</IconButton>
		</Tooltip>
	);
}

const mapDispatchToProps = {
	updateValue
};

export default connect(null, mapDispatchToProps)(UserModify);