import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Header from './components/Header'
import Card from './components/Card'
import ProductsContainer from './components/ProductsContainer'

function App() {

  let logueado = false;
  const products = [
    { id:1, name: 'Celular Samsung', description: 'Celular Samsung A16 Dual Sim', price: 50000 },
    { id:2, name: 'Celular Motorola', description: 'Celular Motorola G15 Dual Sim', price: 75000 },
    { id:3, name: 'Mouse', description: 'Mouse gamer', price: 10000 }
  ]

  function saludar(){
    alert('Hola!');
  }

  function addCar(name){
    alert('Padre ' +  name);
  }

  return (
    <>
      <Header title="To Do" />
      
      <button onClick={ saludar} type='button'>Saludar</button>

      {
        logueado ? ( 
          <h4>Bienvendio</h4> 
        )  : (
          <h4>Visitante</h4> 
        )
      }
      <hr />
      <p>otra forma</p>
      {
        logueado && <h2>Bienvenido</h2>
      }

      

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
