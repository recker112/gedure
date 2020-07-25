const verifyErrorCustom = (InputsArray, errorInfo, type) => {
	let errorStatus = false;
	//Verificar datos
	InputsArray.map(input => {
		if (input.value.length === 0) {
			//Empty
			errorInfo(input.name, 'Campo obligatorio', type);
			errorStatus = true;
		} else if (input.minValue && input.value.length < input.minValue) {
			//No valid cédula
			errorInfo(input.name, 'No válido', type);
			errorStatus = true;
		}
		return null;
	});
	
	return errorStatus;
}


export default verifyErrorCustom;