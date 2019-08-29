export function verifyVar(...datos) {
  try {
    datos.map(element => {
      
      if (element === '' || element === ' ') {
        throw new Error('empty');
      }
    });
    return true;
  } catch (e) {
    if (e === 'empty') {
      return false;
    }
  }
}