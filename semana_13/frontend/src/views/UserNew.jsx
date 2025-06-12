import { useState } from 'react'
import { useNavigate } from 'react-router-dom';



function UserNew (){
    const API_URL = 'http://127.0.0.1:5000/api'
    const [ user, setUser] = useState({_id: '',name: '', email: '', password: ''})

    const navigate = useNavigate();

    function handlerChange ( e) {
        const value = e.target.value;
        const key = e.target.name;
        setUser( {...user, [key]: value});
        //setUser({ ...user, [e.target.name]: e.target.value})
    }
    async function postUser( event){
        event.preventDefault();
        console.log(user);
        const opciones = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }

        try {
            const response = await fetch(`${API_URL}/users`, opciones);
            if( !response.ok){
                const d = await response.json();
                const { msg}=d;  
                alert('Error al registrar el usuario: ' + msg)
                return
            } 



            const data = await response.json();
           
            setUser({...user, name: ''});
            // Navegación 
            navigate('/users');
            
        } catch (error) {
            console.error(error);
            alert('Upss tenemos un error en el servidor');
        }

    }


    return (
        <>
            <h2> Crear Usuario</h2>
            <hr />

            <form onSubmit={ postUser }>
                <label htmlFor="name">Nombre</label>
                <input
                    name='name' 
                    value={user.name}
                    type="text" 
                    onChange={ handlerChange }
                />

                <label htmlFor="email">Email</label>
                <input 
                    name='email'
                    value={user.email}
                    onChange={ handlerChange }
                    type="email" 
                />

                <label htmlFor="password">Contraseña</label>
                <input 
                    name='password'
                    value={user.password}
                    onChange={ handlerChange }
                    type="password" 
                />

                <button type='submit'>Guardar</button>
            </form>
        
        </>
    )
}

export default UserNew