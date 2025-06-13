import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import '../Alert.css'


function UserNew (){
    const API_URL = 'http://127.0.0.1:5000/api'
    const [ user, setUser] = useState({_id: '',name: '', email: '', password: ''})
    const [ msg, setMsg ] = useState({text: '', type: 'warning'})
    const navigate = useNavigate();

    function handlerChange ( e) {
        const value = e.target.value;
        const key = e.target.name;
        setUser( {...user, [key]: value});
        setMsg( {...msg, text: ''})
        //setUser({ ...user, [e.target.name]: e.target.value})
    }

    function handlerFocus(e){
        setMsg( {...msg, text: ''})
    }

    async function postUser( event){
        event.preventDefault();


        if( user.name.trim() === ''){
            setMsg( {...msg, text: 'Por favor, complear el nombre'});
            return;
        }

        if( user.name.trim().length < 3){
            setMsg( {...msg, text: 'El nombre debe ser de al menos tres carácteres'});
            return;
        }

        if( user.email.trim() == ''){
            setMsg( {...msg, text: 'Por favor, complear el Email'});
            return;
        }

        if( !user.email.trim().includes('@')){
            setMsg( {...msg, text: 'El formato del Email es invalido'});
            return;
        }
        
        if( user.password.trim() === ''){
            setMsg( {...msg, text: 'Por favor, complear la Contraseña'});
            return;
        }

        if( user.password.trim().length <= 6){
            setMsg( {...msg, text: 'La contraseña debe ser de más 6 carácteres'});
            return;
        }

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
                const { msg }=d;  
                setMsg({
                    ...msg, 
                    text: 'El email ya existe',
                    type: 'danger'
                });
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
            {
               msg.text === '' ?  
                <h4></h4> : 
                <h4 
                    className={ `alert ` +   msg.type }
                    >{ msg.text }
                </h4>
                             
            }
            <form onSubmit={ postUser }>
                <label htmlFor="name">Nombre</label>
                <input
                    name='name' 
                    value={user.name}
                    type="text" 
                    onChange={ handlerChange }
                    onFocus={ handlerFocus }
                />

                <label htmlFor="email">Email</label>
                <input 
                    name='email'
                    value={user.email}
                    onChange={ handlerChange }
                    onFocus={ handlerFocus }
                    type="email" 
                />

                <label htmlFor="password">Contraseña</label>
                <input 
                    name='password'
                    value={user.password}
                    onChange={ handlerChange }
                    onFocus={ handlerFocus }
                    type="password" 
                />

                <button type='submit'>Guardar</button>
            </form>
        
        </>
    )
}

export default UserNew