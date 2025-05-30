// Filtros.js
import React from 'react';

export default function Filtros({ filtros, setFiltros, idiomas }) {
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className='Filtros'>
      <h4><strong>Filtros de búsqueda:</strong></h4>
      <input 
        type="text" 
        name="nombre" 
        placeholder="Buscar por nombre" 
        value={filtros.nombre} 
        onChange={manejarCambio} 
      />

      <select name="region" value={filtros.region} onChange={manejarCambio}>
        <option value="">Todas las regiones</option>
        <option value="Europe">Europa</option>
        <option value="Americas">América</option>
        <option value="Asia">Asia</option>
        <option value="Africa">África</option>
        <option value="Oceania">Oceanía</option>
        <option value="Antarctic">Antártida</option>
      </select>

      <input 
        type="number" 
        name="poblacionMin" 
        placeholder="Población mínima" 
        value={filtros.poblacionMin} 
        onChange={manejarCambio} 
      />

      <input 
        type="number" 
        name="poblacionMax" 
        placeholder="Población máxima" 
        value={filtros.poblacionMax} 
        onChange={manejarCambio} 
      />

      <select name="idioma" value={filtros.idioma} onChange={manejarCambio}>
        <option value="">Todos los idiomas</option>
        {idiomas.map(idioma => (
          <option key={idioma} value={idioma}>{idioma}</option>
        ))}
      </select>
    </div>
  );
}
