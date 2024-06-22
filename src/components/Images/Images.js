import React from 'react'
import { useState, useEffect } from 'react'
import "./Images.css"

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

    const deleteImage = async (id) => {
        // console.log(id)
        try {
            const response = await fetch(`http://localhost:3001/imagen/deleteImagen/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                }
            })
            console.log(response)

            if (response.ok) {
                alert("eliminaste ok")
                getAllImagenes()
            } else {
                console.error("ERROR: al eliminar imagen")
            }

        } catch (error) {
            console.log("ERROR: ", error)
        }
    }

    console.log(imagenes);
  return (
    <div>Administracion de imagenes
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
            <div className='containerImage'>
                {
                    imagenes.map(imagen=>(
                    <div className="card imageCard">
                        <img src={imagen.RutaArchivo} className="card-img-top" alt="..."/>
                        <div class="card-body">
                            <p class="card-text d-inline p-3">Id Imagen: {imagen.idImagen}</p>
                            <p class="card-text d-inline p-3">Id Alojamiento: {imagen.idAlojamiento}</p>
                            <button className="btn-secondary AddTipoBtn " onClick={() => deleteImage(imagen.idImagen)}>Eliminar</button>
                        </div>
                    </div>
                    ))
                }
                
            </div>
    </div>
  )
}

export default Images