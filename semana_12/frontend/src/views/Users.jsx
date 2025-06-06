import { useState, useEffect } from 'react'



function Users (){
    const API_URL = 'http://127.0.0.1:5000/api'
    const [ users, setUsers] = useState([]);
   
    async function getUser(){
        try {
            const response = await fetch(`${API_URL}/users`);
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



    async function deleteUser( id ){
        const opciones = {
            method: 'DELETE'
        }

        try {
            const response = await fetch(`${API_URL}/users/${id}`, opciones);
            if( !response.ok){
                alert('Error al eliminar el usuario')
                return
            } 
            const data = await response.json();
           
            alert( data.msg);

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
                        <td colSpan={2}>Acciones</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map( user => 
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td> 
                                <td>
                                    <button>E</button>
                                </td>
                                <td>
                                    <button
                                        type='button'
                                        onClick={ () => { deleteUser(user._id)} }
                                    >D</button>
                                </td>
                            </tr> )
                    }
                </tbody> 
            </table>

        
        </>
    )
}

export default Users