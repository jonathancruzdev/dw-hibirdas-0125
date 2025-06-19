import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login (){
    const API_URL = 'http://127.0.0.1:5000/api';

    const [ user, setUser] = useState({email:'', password:''})

    const navigate = useNavigate();
    const { login } = useContext( AuthContext);
    function handlerForm( event ){
        event.preventDefault();

        loginUser();
    }

    function handlerChange ( e ) {
        const value = e.target.value;
        const key = e.target.name;
        setUser( {...user, [key]: value});
    }


    async function loginUser( ){
        const opciones = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }

        try {
            const response = await fetch(`${API_URL}/users/auth`, opciones);
            if( !response.ok){
                const d = await response.json();
                const { msg }=d;  
                alert('Error al loguear el usuario: ' + msg)
                return
            } 



            const data = await response.json();
           
            console.log(data);
            if( data.token){
                login('user', data.token);
                // Navegación 
                navigate('/users');
            }

            
        } catch (error) {
            console.error(error);
            alert('Upss tenemos un error en el servidor');
        }

    }

    return (
        <>
            <h2> Login</h2>
            <form onSubmit={ handlerForm }>
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email"
                    value={ user.email}
                    onChange={ handlerChange }    
                />
                <label htmlFor="password">Contraseña</label>
                <input 
                    type="password" 
                    name="password"
                    value={ user.password}
                    onChange={ handlerChange }
                    />
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login