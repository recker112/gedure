import React from 'react';

//React Route
import { useHistory } from "react-router-dom";

//Material-UI
import { IconButton, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

//Redux
import { connect } from 'react-redux';
import updateInputValue from '../../../../actions/updateInputValue';

function UserModify({ data, updateInputValue }) {
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
					updateInputValue(MakeData, 'MODIFY_EXTERNO');
				}
				break;
			case 'A-':
				{
					const MakeData = {
						cedula: data.cedula,
						name: data.name,
						privilegio: data.privilegio
					};
					updateInputValue(MakeData, 'MODIFY_EXTERNO');
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
					updateInputValue(MakeData, 'MODIFY_EXTERNO');
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
				updateInputValue(MakeData, 'MODIFY_EXTERNO');
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
	updateInputValue
};

export default connect(null, mapDispatchToProps)(UserModify);