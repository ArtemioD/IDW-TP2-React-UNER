import React from 'react'
import "../pages/AdminAloj.css";
import { useState, useEffect } from 'react'

const AdminAloj = () => {
    
    const [alojamientos, setAlojamientos] = useState([])


    useEffect(() => {
        getTiposAlojamiento();
    }, []);
    // console.log(alojamientos);

    const getTiposAlojamiento = async () => {
        try {
            const response = await fetch("http://localhost:3001/tiposAlojamiento/getTiposAlojamiento", {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                }
            })
            if (response.ok) {
                const data = await response.json()
                setAlojamientos(data)
            } else {
                console.error("ERROR: al obteber alojamientos", response.body)
            }
        } catch (error) {
            console.log("ERROR: ", error)
        }
    }

    return (
        <div className='containerAdmin '>
            <div>
                <form className='AdminAloj-form'>
                    <label htmlFor='name'>Titulo</label>
                    <input 
                        id="name" 
                        name="name" 
                        type="text"
                        placeholder='Nombre del alojamiento'
                        required />
                    <label htmlFor='Descripcion'>Descripcion</label>
                    <input 
                        id="Descripcion" 
                        name="Descripcion" 
                        type="text"
                        placeholder='Descripcion'
                        required />
                    <p>Ubicacion:</p>
                    <label htmlFor='Latitud'>Latitud</label>
                    <input 
                        id="Latitud" 
                        name="Latitud" 
                        type="number"
                        placeholder='Latitud'
                        required />
                    <label htmlFor='Longitud'>Longitud</label>
                    <input 
                        id="Longitud" 
                        name="Longitud" 
                        type="number"
                        placeholder='Longitud'
                        required />
                    <label htmlFor='PrecioPorDia'>Precio por dia</label>
                    <input 
                        id="PrecioPorDia" 
                        name="PrecioPorDia" 
                        type="number"
                        placeholder='PrecioPorDia'
                        required />
                    <label htmlFor='CantidadDormitorios'>Cantidad de dormitorios</label>
                    <input 
                        id="CantidadDormitorios" 
                        name="CantidadDormitorios" 
                        type="number"
                        placeholder='CantidadDormitorios'
                        required />
                    <label htmlFor='CantidadBanios'>Cantidad de baños</label>
                    <input 
                        id="CantidadBanios" 
                        name="CantidadBanios" 
                        type="number"
                        placeholder='CantidadBanios'
                        required />
                    <fieldset>
                    <p>Estado: </p>
                    <label htmlFor='Estado'>Disponible</label>
                    <input 
                        id="Estado" 
                        name="Estado" 
                        type="radio"
                        value="Disponible"
                        required />
                    <label htmlFor='Estado'>Reservado</label>
                    <input 
                        id="Estado" 
                        name="Estado" 
                        type="radio"
                        value="Reservado"
                        required />
                    </fieldset>
                    <p>Tipo de alojamiento</p>
                    <select name="TipoAlojamiento" id="TipoAlojamiento">
                        {
                            alojamientos.map( (aloj) =>(
                                <option value={aloj.idTipoAlojamiento} >{aloj.Descripcion}</option>
                            ))
                        }
                        
                    </select>
                </form>
                <button type='submit'>Edit</button>
            </div>
        </div>
    )
}

export default AdminAloj

