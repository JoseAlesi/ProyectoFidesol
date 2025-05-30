// ListaPaises.js
import React from 'react';
import TarjetaPais from './TarjetaPais';

export default function ListaPaises({ paises }) {
  if (!paises.length) {
    return (
      <div style={{ textAlign: 'center' }}>
        <img src="equis.png" alt="No hay resultados" style={{ maxWidth: 300, margin: '0 auto' }} />
        <p><strong>No hay paises que mostrar con las especificaciones dadas</strong></p>
      </div>
    );
  }

  return (
    <div className="lista-paises">
      {paises.map(pais => (
        <TarjetaPais key={pais.cca3} pais={pais} />
      ))}
    </div>
  );
}

