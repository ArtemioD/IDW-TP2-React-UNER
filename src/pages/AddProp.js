import React from 'react'
import { useState, useEffect } from 'react'
import AddTipoAlojamiento from '../components/addTipoAlojamiento/AddTipoAlojamiento'

const AddProp = () => {
    const [descripcion, setDescripcion] = useState("")
    const [alojamientos, setAlojamientos] = useState([])

    useEffect(() => {
        getTiposAlojamiento();
    }, []);

    const submit = async (e) => {
        e.preventDefault()
        const jsonDatos = {
            Descripcion: descripcion
        }
        setDescripcion("")

        try {
            const response = await fetch("http://localhost:3001/tiposAlojamiento/createTipoAlojamiento", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(jsonDatos)
            })

            if (response.ok) {
                alert("OK: Se Creo alojamiento nuevo!", response)
                getTiposAlojamiento()
            } else {
                console.error("ERROR: al crear alojamiento")
                alert("Error: Pruebe mañana")
            }
        } catch (error) {
            console.log("ERROR: ", error)
        }
    }

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

    const deleteTipoAlojamiento = async (id) => {
        console.log(id)
        try {
            const response = await fetch(`http://localhost:3001/tiposAlojamiento/deleteTipoAlojamiento/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                }
            })
            console.log(response)

            if (response.ok) {
                alert("eleminaste ok")
                getTiposAlojamiento()
            } else {
                console.error("ERROR: al eliminar alojamiento")
            }

        } catch (error) {
            console.log("ERROR: ", error)
        }
    }


    return (
        <div>
            <AddTipoAlojamiento
                submit={submit}
                descripcion={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
            />

            <div >
                <ul>
                    {alojamientos.map((aloj) => (
                        <li key={aloj.idTipoAlojamiento}>
                            {aloj.idTipoAlojamiento} -
                            {aloj.Descripcion}
                            <button >Editar</button>
                            <button onClick={() => deleteTipoAlojamiento(aloj.idTipoAlojamiento)}>Eliminar</button>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    )
}

export default AddProp

