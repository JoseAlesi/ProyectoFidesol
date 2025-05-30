// TarjetaPais.js
import React from 'react';

export default function TarjetaPais({ pais }) {
  if (!pais || !pais.flags || !pais.name) {
    return console.log("ERROR"); // o un mensaje de error
  }

  return (
    <div className="tarjeta">
      <img src={pais.flags.svg} alt={pais.name.common} />
      <p align="center"><strong>{pais.name.common}</strong></p>
      <p><strong>Población:</strong> {pais.population.toLocaleString('es-ES')}</p>
      <p><strong>Capital:</strong> {pais.capital ? pais.capital[0] : 'No existe'}</p>
      <p><strong>Región:</strong> {pais.region}</p>
      <p><strong>Subregión:</strong> {pais.subregion || 'No existe'}</p>
      <p><strong>Área:</strong> {pais.area.toLocaleString('es-ES')} m²</p>
    </div>
  );
}

