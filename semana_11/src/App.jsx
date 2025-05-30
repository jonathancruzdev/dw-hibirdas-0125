import './App.css'
import { useState } from 'react'

import Home from './views/Home'
import Products from './views/Products'
import Contact from './views/Contact'
import NotFound from './views/NotFound'


import Header from './components/Header'
import { Routes, Route, NavLink} from 'react-router-dom'

function App() {


  return (
    <>
      <Header title="Productos APP" />
     
      <nav>
        <ul>
          <li>
            <NavLink to='/'> Inicio</NavLink>
          </li>
          <li>
            <NavLink to='/products'> Productos</NavLink>
          </li>
          <li>
            <NavLink to='/contact'>Contactos </NavLink>
          </li>
        </ul>
      </nav>

      {/*  En está sección vamos a mostrar las vista */ }
      <Routes>
        <Route path='/'  element={ <Home />} />
        <Route path='/products' element={ <Products />} />
        <Route path='/contact' element={ <Contact />} />
        <Route path='*' element={ <NotFound />} />
      </Routes>
      
    </>
  )
}

export default App
