import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';



function UserUpdate (){
    const API_URL = 'http://127.0.0.1:5000/api'
    const [ user, setUser] = useState({_id: '',name: '', email: '', password: ''})
    const {id} = useParams();

    const navigate = useNavigate();

    async function getUserById(){
        try {
            const response = await fetch(`${API_URL}/users/${id}`);
            if( !response.ok){
                alert('Error al solicitar wl usuarios')
                return
            } 
            const {data} = await response.json();
            setUser( data );
            
            console.log(data);
    
        } catch (error) {
            console.error(error);
            alert('Upss tenemos un error en el servidor');
        }
    }
    useEffect(  () => {
       
        getUserById();

    }, [] )




    function handlerChange ( e) {
        setUser({ ...user, [e.target.name]: e.target.value})
    }

    async function putUser( event){
        event.preventDefault();
        console.log(user);
        const opciones = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }

        try {
            const response = await fetch(`${API_URL}/users/${id}`, opciones);
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
            <h2> Actualizar Usuario {id}</h2>
            <hr />

            <form onSubmit={ putUser }>
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

export default UserUpdate