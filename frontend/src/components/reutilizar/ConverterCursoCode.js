import React from 'react'

function ConverterCursoCode({code}) {
  const grado = code.substring(1,2);
  const number = code.substring(0,1);
  if (grado === "G") {
    return <span>{`${number} grado`}</span>
  }else {
    return <span>{`${number} año`}</span>
  }
}

export default ConverterCursoCode;