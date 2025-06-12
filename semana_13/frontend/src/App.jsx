import './App.css'

import { AuthProvider} from './context/AuthContext'

import PrivateRoute from './utils/PrivateRoute'

import Home from './views/Home'
import Products from './views/Products'
import Contact from './views/Contact'
import NotFound from './views/NotFound'
import Users from './views/Users'
import UserNew from './views/UserNew'
import UserUpdate from './views/UserUpdate'
import Login from './views/Login'
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
            <NavLink to='/users'>ABM Usuarios</NavLink>
          </li>
          <li>
            <NavLink to='/login'>Login</NavLink>
          </li>

          <li>
            <NavLink to='/contact'>Contactos </NavLink>
          </li>
        </ul>
      </nav>

      {/*  En está sección vamos a mostrar las vista */ }
      <AuthProvider>
        <Routes>
          <Route path='/'  element={ <Home />} />
          <Route path='/products' element={ <Products />} />
          <Route path='/contact' element={ <Contact />} />
          {/* Ruta Privada */}
          <Route path='/users' element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          } />
          <Route path='/usernew' element={ <UserNew/> } />
          <Route path='/userupdate/:id' element={ <UserUpdate/> } />
          <Route path='/login' element={ <Login />} />
          <Route path='*' element={ <NotFound />} />
        </Routes>
      </AuthProvider>

      
    </>
  )
}

export default App
