export function generatePassword(size) {
	let charset = "ABCDEFGHIJKMNOPQRSTUVWXYZ0123456789";
	let password = "";
	for (var i = 0, n = charset.length; i < size; ++i) {
			password += charset.charAt(Math.floor(Math.random() * n));
	}
	return password;
}