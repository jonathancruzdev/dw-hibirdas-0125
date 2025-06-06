import ProductsContainer from '../components/ProductsContainer'
import Card from '../components/Card'

import { useState } from 'react'



function Products (){
    const [ product, setProduct] = useState({
        name: '',
        price: '',
        description: ''
    })

    const [ products, setProducts ] = useState(() => {
        console.log('Se inicio el estado');
        const list = readLocal();
        return list;
    })

    function saveLocal(list){
        localStorage.setItem( 'products', JSON.stringify( list));
    }
    
    
    function readLocal(){
        const data = JSON.parse( localStorage.getItem('products') );
        return data ? data : [];
    }
    function addCar(name){
        alert('Padre ' +  name);
    }
    
    function nuevoProducto(event){
        event.preventDefault();
        const id = products.length + 1;
        const name = product.name;
        const description = product.description;
        const price = product.price;
        const nuevo =  { id, name, description, price};
    
        setProducts( [...products, nuevo] );
        saveLocal(products);
    
        //product.name = '';
        //product.price = '';
    
        //setProduct( {...product, product  })
        
        // Fetch del tipo POST
        setProduct( {...product, name: '', price: '', description: ''  })
      
    }
    return (
        <>
            <h2> Productos</h2>
            <hr />
            <form onSubmit={ nuevoProducto}>
        <label htmlFor="">Nombre</label>
        <input 
          value={product.name} 
          type="text" 
          placeholder='Nombre de Producto'
          onChange={ (e) => setProduct( { ...product, name: e.target.value}) }
        />

        <label htmlFor="">Precio</label>
        <input 
          value={product.price} 
          type="number" 
          placeholder='$'
          onChange={ (e) => setProduct( {...product, price: e.target.value}  )}
        />

        <label htmlFor="">Descripción</label>
        <input 
          value={product.description}
          type="text"
          placeholder='detalle'
          onChange={ (e) => setProduct({ ...product,  description: e.target.value})}
        />

        <button type='submit'>Guardar</button>
      </form>
      <hr />    
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

export default Products