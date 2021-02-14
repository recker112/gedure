export default function conveterCursorCode(code) {
	if (typeof code === 'string') {
		const grado = code.substring(1,2);
		const number = code.substring(0,1);
		
		if (grado === 'G') {
			return `${number} grado`;
		}else {
			return `${number} año`;
		}
	}
}