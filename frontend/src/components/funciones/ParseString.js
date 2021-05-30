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
	let moneyText = float.toString();
	moneyText = moneyText.split('.');
	let decimals = moneyText[1] || '00';
	let amount = moneyText[0].split('');
	moneyText = '';
	let negative = false;
	
	if (amount[0] === '-') {
		negative = true;
		amount.splice(0,1);
	}
	for(let i = 1; amount.length >= i; i++) {
		if (i % 3 === 0) {
			moneyText = `${amount[i] ? '.' : ''}${amount[amount.length - i]}${moneyText}`;
		}else {
			moneyText = `${amount[amount.length - i]}${moneyText}`;
		}
	}
	moneyText = `${negative ? '-' : ''}${moneyText}`;
	moneyText = `Bs/S ${moneyText},${decimals}`;

	return moneyText;
}