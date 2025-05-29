import './App.css'
import { useState } from 'react'

import Header from './components/Header'
import Card from './components/Card'
import ProductsContainer from './components/ProductsContainer'


function App() {

  // Estado
  const [ usuario, setUsuario ] = useState({ name: 'Juan', age: 27 });
  const [ products, setProducts ] = useState( [
    { id:1, name: 'Celular Samsung', description: 'Celular Samsung A16 Dual Sim', price: 50000 },
    { id:2, name: 'Celular Motorola', description: 'Celular Motorola G15 Dual Sim', price: 75000 },
    { id:3, name: 'Mouse', description: 'Mouse gamer', price: 10000 }
  ])
  
  function cambiarNombre (){
    // const objTemp = { ...usuario,  name: 'Sofia' };
    setUsuario({ ...usuario, name: 'Sofia' });
  }
  
  function nuevoProducto(){
    const id = products.length + 1
    const nuevo =  { id, name: 'Pendrive', description: '...', price: 200 };
    setProducts( [...products, nuevo] );
  }

  function addCar(name){
    alert('Padre ' +  name);
  }

  return (
    <>
      <Header title="To Do" />
      <h4> Bienvenido { usuario.name }</h4>
      <p>edad: { usuario.age }</p>
      <button onClick={ cambiarNombre } type='button'>Cambiar Nombre</button>

      <button onClick={ nuevoProducto } type='button'>Nuevo Producto</button>


      <hr />
      <p>otra forma</p>

      

      <ProductsContainer >
        {
          products.map( product =>  (
            <Card
              key={ product.id}
              addFn={ addCar } 
              name={product.name} 
              description={product.description} 
              price={product.price}
              />) 
            )
        }
   
      </ProductsContainer>
      
    </>
  )
}

export default App
