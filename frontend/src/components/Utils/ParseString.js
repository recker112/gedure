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

export function parseFloatToMoneyString(number = 0, prefix = 'Bs. ', decPlaces = 2, thouSeparator = '.', decSeparator = ',') {
	if (isNaN(number)) return prefix + '0';
	
  const negative = number < 0 ? '-' : '';
  let enteros = parseInt((number = Math.abs(+number || 0).toFixed(decPlaces))) + '';
  // eslint-disable-next-line no-use-before-define
  let divider = enteros.length;
	divider = divider > 3 ? divider % 3 : 0;
	
	let part1 = divider ? enteros.substr(0, divider) + thouSeparator : '';
	let part2 = enteros.substr(divider).replace(/(\d{3})(?=\d)/g, '$1' + thouSeparator);
	let part3 = decPlaces ? decSeparator + Math.abs(number - enteros).toFixed(decPlaces).slice(2) : '';
  return (prefix + negative + part1 + part2 + part3);
}