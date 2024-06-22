import React from 'react'
import { useState, useEffect } from 'react'

function Images() {

    const [imagenes, setImagenes] = useState([])
    const [imagen, setImagen] = useState({
        idAlojamiento: "",
        RutaArchivo: ""
    })

    useEffect(() => {
        getAllImagenes();
    }, []);

    const handleInput = (e)=>{
        setImagen({
            ...imagen,
            [e.target.name] : e.target.value
        })
        console.log(imagen)
    }

    const submit = async (e) => {
        e.preventDefault()
        const jsonDatos = {
            idAlojamiento: imagen.idAlojamiento,
            RutaArchivo: imagen.RutaArchivo
        }

        try {
            const response = await fetch("http://localhost:3001/imagen/createImagen", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(jsonDatos)
            })

            if (response.ok) {
                alert("OK: Se Creo imagen nueva!", response)
                getAllImagenes()
            } else {
                console.error("ERROR: al crear imagen")
                alert("Error: Pruebe mañana")
            }
        } catch (error) {
            console.log("ERROR: ", error)
        }
    }
    const getAllImagenes = async () => {
        try {
            const response = await fetch("http://localhost:3001/imagen/getAllImagenes", {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                }
            })
            if (response.ok) {
                const data = await response.json()
                setImagenes(data)
            } else {
                console.error("ERROR: al obteber alojamientos", response.body)
            }
        } catch (error) {
            console.log("ERROR: ", error)
        }
    }

    console.log(imagenes);
  return (
    <div>Administracionde imagenes
        <form  className='d-flex g-1 AddTipoAdd'onSubmit={submit}>
                <label htmlFor='RutaArchivo' className='fw-medium'>Nueva Imagen: </label>
                <input
                    type='text'
                    id='RutaArchivo'
                    name='RutaArchivo'
                    onChange={handleInput}
                    className='AddTipoInput'
                    placeholder='Ingrese url de la imagen'/>
                <label htmlFor='idAlojamiento' className='fw-medium'>Id del Alojamiento: </label>
                <input
                    type='number'
                    id='idAlojamiento'
                    name='idAlojamiento'
                    onChange={handleInput}
                    className='AddTipoInput'
                    placeholder='Ingrese el id'/>
                <button className="btn-secondary AddTipoBtn" type='submit'>Agregar</button>
            </form>
    </div>
  )
}

export default Images