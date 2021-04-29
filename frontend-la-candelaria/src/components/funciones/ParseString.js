export function parseToAccountString(n_account) {
	let i = 0;
	let text = '';
	while(n_account[i]) {
		const extract = n_account[i];
		if (i % 4 === 0) {
			text = text + ' ' + extract
		}else {
			text = text + extract
		}
		i++;
	}
	return text;
}

export function parseFloatToMoneyString(float) {
	let moneyText = float;
	moneyText = moneyText.split('.');
	let decimals = moneyText[1];
	let amount = moneyText[0].split('');
	moneyText = '';

	for(let i = 1; amount.length >= i; i++) {
		if (i % 3 === 0) {
			moneyText = `.${amount[amount.length - i]}${moneyText}`;
		}else {
			moneyText = `${amount[amount.length - i]}${moneyText}`;
		}
	}
	moneyText = `Bs/S ${moneyText},${decimals}`;

	return moneyText;
}