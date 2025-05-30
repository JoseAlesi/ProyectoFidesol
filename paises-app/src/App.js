// App.js
import React, { useEffect, useState } from 'react';
import Filtros from './Components/Filtros';
import ListaPaises from './Components/ListaPaises';

function App() {
  const [paises, setPaises] = useState([]);
  const [filtros, setFiltros] = useState({
    region: '',
    nombre: '',
    poblacionMin: '',
    poblacionMax: '',
    idioma: ''
  });

  const [idiomasDisponibles, setIdiomasDisponibles] = useState([]);
  const [paisesFiltrados, setPaisesFiltrados] = useState([]);

useEffect(() => {
  const obtenerPaises = async () => {
    try {
      const res = await fetch('https://restcountries.com/v3.1/all');
      const data = await res.json();
      setPaises(data);
      extraerIdiomas(data);
      setPaisesFiltrados(data);
    } catch (error) {
      console.error('Error al obtener los países:', error);
    }
  };
  obtenerPaises();
}, []);

  const extraerIdiomas = (listaPaises) => {
    const idiomas = new Set();
    listaPaises.forEach(pais => {
      if (pais.languages) {
        Object.values(pais.languages).forEach(idioma => idiomas.add(idioma));
      }
    });
    setIdiomasDisponibles(Array.from(idiomas).sort());
  };

  useEffect(() => {
    let resultado = paises;

    if (filtros.region) {
      resultado = resultado.filter(p => p.region === filtros.region);
    }

    if (filtros.nombre) {
      resultado = resultado.filter(p => p.name.common.toLowerCase().startsWith(filtros.nombre.toLowerCase()));
    }

    if (filtros.poblacionMin) {
      resultado = resultado.filter(p => p.population >= parseInt(filtros.poblacionMin));
    }

    if (filtros.poblacionMax) {
      resultado = resultado.filter(p => p.population <= parseInt(filtros.poblacionMax));
    }

    if (filtros.idioma) {
      resultado = resultado.filter(p => p.languages && Object.values(p.languages).includes(filtros.idioma));
    }

    setPaisesFiltrados(resultado);
  }, [filtros, paises]);

  return (
    <div>
      <h1 align="center">Países del Mundo</h1>
      <Filtros 
        filtros={filtros} 
        setFiltros={setFiltros} 
        idiomas={idiomasDisponibles} 
      />
      <ListaPaises paises={paisesFiltrados} />
    </div>
  );
}

export default App;



