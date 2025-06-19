import './App.css'

import { AuthProvider} from './context/AuthContext'

import PrivateRoute from './utils/PrivateRoute'
import Nav from './components/Nav'
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
      <AuthProvider>
        <Nav></Nav>

      {/*  En está sección vamos a mostrar las vista */ }
   
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
