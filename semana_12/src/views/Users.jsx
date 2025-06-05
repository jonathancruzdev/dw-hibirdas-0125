import { useState, useEffect } from 'react'



function Users (){
    const host = 'http://127.0.0.1:5000/api'
    const [ users, setUsers] = useState([]);
    const [ user, setUser] = useState({_id: '',name: '', email: '', password: ''})
    async function getUser(){
        try {
            const response = await fetch(`${host}/users`);
            if( !response.ok){
                alert('Error al solicitar los usuarios')
                return
            } 
            const {data} = await response.json();
            setUsers( data );
            
            console.table(data);
    
        } catch (error) {
            console.error(error);
            alert('Upss tenemos un error en el servidor');
        }
    
    }


    useEffect(  () => {
       
        getUser();

    }, [] )





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
            const response = await fetch(`${host}/users`, opciones);
            if( !response.ok){
                alert('Error al registrar el usuario')
                return
            } 
            const data = await response.json();
           
            setUser({...user, name: ''});


            
            console.table(data);
            getUser();
        } catch (error) {
            console.error(error);
            alert('Upss tenemos un error en el servidor');
        }

    }

    return (
        <>
            <h2> Lista de Usuarios</h2>
            <hr />
            <table>
                <thead>
                    <tr>
                        <td>Nombre</td>
                        <td>Email</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map( user => <tr key={user._id}><td>{user.name}</td> <td>{user.email}</td> </tr> )
                    }
                </tbody> 
            </table>
            <form onSubmit={ postUser }>
                <label htmlFor="name">Nombre</label>
                <input 
                    value={user.name}
                    type="text" 
                    onChange={ (e) => setUser( {... user, name: e.target.value })}
                />

                <label htmlFor="email">Email</label>
                <input 
                    value={user.email}
                    onChange={ (e) => setUser( {...user, email: e.target.value})}
                    type="email" 
                />

                <label htmlFor="password">Contraseña</label>
                <input 
                    value={user.password}
                    onChange={ (e) => setUser({...user, password: e.target.value})}
                    type="password" 
                />

                <button type='submit'>Guardar</button>
            </form>
        
        </>
    )
}

export default Users