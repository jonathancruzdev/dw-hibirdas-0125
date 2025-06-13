import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { AuthProvider, AuthContext } from "../context/AuthContext"

function Nav (){
    const { logout } = useContext( AuthContext);

    const navigate = useNavigate();

    const logoutHandler =  () =>{
        logout(); // Cierro la sesión
        navigate('/');
    }
    return (
        <>
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
                    <li>
                        <a onClick={ () => { logoutHandler() }} href="#">Logout</a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Nav