import React from 'react'
import { useState, useEffect } from 'react'
import AddTipoAlojamiento from '../components/addTipoAlojamiento/AddTipoAlojamiento'
import "../pages/AddProp.css";

const AddProp = () => {
    const [descripcion, setDescripcion] = useState("")
    const [descripcionAdd, setDescripcionAdd] = useState("")
    const [alojamientos, setAlojamientos] = useState([])

    useEffect(() => {
        getTiposAlojamiento();
    }, []);


    const editar = async (e,idTipoAlojamiento) => {
        e.preventDefault()
        const jsonDatos = {
            Descripcion: descripcion
        }
        console.log(jsonDatos);
        try {
            const response = await fetch(`http://localhost:3001/tiposAlojamiento/putTipoAlojamiento/${idTipoAlojamiento}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(jsonDatos)
            })
            console.log(response)

            if (response.ok) {
                alert("editaste ok")
                getTiposAlojamiento()
            } else {
                console.error("ERROR: al editar alojamiento")
            }

        } catch (error) {
            console.log("ERROR: ", error)
        }
        e.target.reset()
    }


    const submit = async (e) => {
        e.preventDefault()
        const jsonDatos = {
            Descripcion: descripcionAdd
        }
        setDescripcionAdd("")

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
                alert("eliminaste ok")
                getTiposAlojamiento()
            } else {
                console.error("ERROR: al eliminar alojamiento")
            }

        } catch (error) {
            console.log("ERROR: ", error)
        }
    }


    return (
        <div className='containerAdmin '>
            <h1 className='AddPropTitulo'>Administracion de alojamientos</h1>
            <div className='AddPropBox'>
                <AddTipoAlojamiento
                    submit={submit}
                    descripcion={descripcionAdd}
                    onChange={(e) => setDescripcionAdd(e.target.value)}
                    />
                <div className='tabla'>

                <table className="table">
                    <thead >
                        <tr>
                            <th scope="col" className="border-0 text-center">Id</th>
                            <th scope="col" className="border-0 text-center"> Tipo de alojamiento</th> 
                            <th scope="col" className="border-0 text-center">Editar Alojamiento</th>
                            <th scope="col" className="border-0 text-center">Eliminar Alojamiento</th>
                        </tr>
                    </thead>
                    {alojamientos.map((aloj) => (
                        <>  
                            <tbody key={aloj.idTipoAlojamiento} >
                                <tr className='AddTipoAdd2'>
                                    <th scope="row" className="border-0">{aloj.idTipoAlojamiento}</th>
                                    <td className="border-0 ">{aloj.Descripcion}</td>
                                    <td className="border-0">
                                    <form onSubmit={(e)=> editar(e, aloj.idTipoAlojamiento)} className='AddTipoAdd'>
                                        <label htmlFor='Descripcion'></label>
                                        <input
                                        name='Descripcion'
                                        type='text'
                                        id='Descripcion'
                                        placeholder="Ingrese el nuevo alojamiento"
                                        onChange={(e)=>setDescripcion(e.target.value)} className='AddTipoInput2'
                                        >
                                        </input>
                                        <button type='submit'className="btn-secondary AddTipoBtn">Editar</button>
                                    </form>
                                    </td>
                                    <td className="border-0"><button onClick={() => deleteTipoAlojamiento(aloj.idTipoAlojamiento)} className="btn-secondary AddTipoBtn">Eliminar</button></td>
                                </tr>
                            </tbody>
                        </>
                        ))}
                </table>
                </div>
            </div>
        </div>
    )
}

export default AddProp

