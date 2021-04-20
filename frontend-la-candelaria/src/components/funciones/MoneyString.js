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