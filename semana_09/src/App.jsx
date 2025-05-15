import foto from '/mujer.png';
import './App.css'

function App() {
  let nombre = 'Julieta';
  let nacimiento = 2001;
  let emplado = true;
  const titulo = <h2> Soy un título</h2>;

  return (
    <>
      <h1 className='color'>Semana 09</h1>
      <img src={foto} alt={ `Foto de ${nombre}`} />
       { titulo }
      <p>Hola { nombre.toUpperCase() } | { calcularEdad(nacimiento)}</p>
    </>

  )

  function calcularEdad(nacimiento){
    let actual = new Date().getFullYear();
    return actual - nacimiento;
  }
}

export default App
