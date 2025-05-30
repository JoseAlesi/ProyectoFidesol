let paises = []

window.onload = async function () {
  await cargarDatosPaises();          
  cargarIdiomasDisponibles();         
};

async function cargarDatosPaises() {
    try{
        const url = await fetch("https://restcountries.com/v3.1/all")
        paises = await url.json()
    } catch(error){
        console.error("Código de error: ", error)
    }  
}

function mostrarPaises(paisesMostrar){
    const tarjetaResultado = document.getElementById("resultadoTarjeta")
    const errorImagen = document.getElementById("error");
    tarjetaResultado.innerHTML = "";

    if (!paisesMostrar || paisesMostrar.length === 0) {
    errorImagen.innerHTML = `
            <div>
                <img src="equis.png" alt="No hay resultados" style="max-width: 300px; display: block; margin: 0 auto;">
                <p align="center"><strong>No existen coincidencias</strong></p>
            </div>
        `;
    return errorImagen;
  }else{
    const nombres = paisesMostrar.map(crearTarjetaPais).join("\n");
  console.log(nombres);
  tarjetaResultado.innerHTML = nombres;
  }
}

function crearTarjetaPais(pais){
    const tarjeta = document.createElement("div")

  tarjeta.innerHTML = `
  <div class="tarjeta">
    <img src= ${pais.flags.svg} alt="${pais.name.common}" />
    <p align="center"> <strong> ${pais.name.common}</strong></p>
    <p> <strong>Población:</strong> ${pais.population.toLocaleString('es-ES')}</p>
    <p> <strong>Capital:</strong> ${pais.capital ? pais.capital[0] : "No existe"}</p>
    <p> <strong>Región:</strong> ${pais.region}</p>
    <p> <strong>Subregion:</strong> ${pais.subregion || "No existe"}</p>
    <p> <strong>Área:</strong> ${pais.area.toLocaleString('es-ES')} m²</p>
  </div>
  `;
  return tarjeta.innerHTML
  
}

function filtrar(){
  let valorRegion = document.getElementById("region").value
  let valorNombre = document.getElementById("país").value
  let valorPoblacionMin = document.getElementById("poblacionMinima").value
  let valorPoblacionMax = document.getElementById("poblacionMaxima").value
  let valorIdioma = document.getElementById("idioma").value

  let paisesFiltrados = paises;

  if(valorRegion){
    paisesFiltrados = paisesFiltrados.filter(regionDelPais => regionDelPais.region === valorRegion)
  }
  
  if(valorNombre){
    paisesFiltrados = paisesFiltrados.filter(nombreDelPais => nombreDelPais.name.common.toLowerCase().startsWith(valorNombre.toLowerCase())) 
  }
  

  if(valorPoblacionMax && valorPoblacionMin){
    paisesFiltrados = paisesFiltrados.filter(poblacion => poblacion.population > valorPoblacionMin && poblacion.population < valorPoblacionMax)
  }else if(valorPoblacionMax){
    paisesFiltrados = paisesFiltrados.filter(poblacion => poblacion.population < valorPoblacionMax)
  }else if(valorPoblacionMin){
    paisesFiltrados = paisesFiltrados.filter(poblacion => poblacion.population > valorPoblacionMin)
  }else{
    console.log("El número en la población introducida es errónea")
  }

  if(valorIdioma){
        paisesFiltrados = paisesFiltrados.filter(pais => {
          if (!pais.languages) return false;
          return Object.values(pais.languages).includes(valorIdioma);
  });
  }
  console.log(paisesFiltrados)
  mostrarPaises(paisesFiltrados)
}

function cargarIdiomasDisponibles() {
  const selectIdioma = document.getElementById("idioma");

  const idiomasOrdenados = [...new Set(
    paises
      .filter(pais => pais.languages)
      .flatMap(pais => Object.values(pais.languages))
  )].sort();

  selectIdioma.innerHTML = `<option value="">-- Selecciona un idioma --</option>` +
    idiomasOrdenados.map(idioma => 
      `<option value="${idioma}">${idioma}</option>`
    ).join("");
}
