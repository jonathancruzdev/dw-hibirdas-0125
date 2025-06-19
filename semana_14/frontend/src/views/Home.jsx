import { useState } from 'react'


function Home (){
    // Estado
    const [ usuario, setUsuario ] = useState({ name: 'Juan', age: 27 });

    function cambiarNombre (){
        // const objTemp = { ...usuario,  name: 'Sofia' };
        setUsuario({ ...usuario, name: 'Sofia' });
    }
  

    return (
        <>
            <h2> Inicio.</h2>
            <h4> Bienvenido { usuario.name }</h4>
            <p>edad: { usuario.age }</p>
            <button onClick={ cambiarNombre } type='button'>Cambiar Nombre</button>
            <hr />
        
        </>
    )
}

export default Home