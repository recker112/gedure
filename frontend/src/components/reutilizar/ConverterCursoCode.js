function ConverterCursoCode(code) {
  const grado = code.substring(1, 2);
  if (grado === 'G') {
    return `${code.substring(0, 1)} grado`;
  }
  else {
    return `${code.substring(0, 1)} año`;
  }
}
