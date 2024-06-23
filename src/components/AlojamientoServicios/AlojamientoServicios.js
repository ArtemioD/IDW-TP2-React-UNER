import React, { useEffect, useState } from 'react'
import "./AlojamientoServicios.css"

function AlojamientoServicios() {

    const [alojamientoS, setAlojamientoS] = useState([])
    const [alojServicio, setAlojServicio] = useState({
        idAlojamiento: "",
        idServicio: ""
    })

    useEffect(() => {
        getAllAlojamientoS();
    }, []);

    const handleInput = (e)=>{
        setAlojServicio({
            ...alojServicio,
            [e.target.name] : e.target.value
        })
        console.log(alojServicio)
    }

    const getAllAlojamientoS = async () => {
        try {
            const response = await fetch("http://localhost:3001/alojamientosServicios/getAllAlojamientoServicios", {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                }
            })
            if (response.ok) {
                const data = await response.json()
                setAlojamientoS(data)
            } else {
                console.error("ERROR: al obtener Alojamiento/Servicios", response.body)
            }
        } catch (error) {
            console.log("ERROR: ", error)
        }
    }

    const submit = async (e) => {
        e.preventDefault()
        const jsonDatos = {
            idAlojamiento: alojServicio.idAlojamiento,
            idServicio: alojServicio.idServicio
        }
        try {
            const response = await fetch("http://localhost:3001/alojamientosServicios/createAlojamientoServicio", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(jsonDatos)
            })

            if (response.ok) {
                alert("OK: Se Creo Alojamiento/Servicio!", response)
                getAllAlojamientoS()
                e.target.reset()
            } else {
                console.error("ERROR: al crear Alojamiento/Servicio")
                alert("Error: Pruebe mañana")
            }
        } catch (error) {
            console.log("ERROR: ", error)
        }
    }
    console.log(alojamientoS);

return (
    <>
    <h3>Administrar Alojamiento/Servicios</h3>
    <form  className='d-flex g-1 AddTipoAdd' onSubmit={submit}>
                <label htmlFor='idAlojamiento' className='fw-medium'>Id del Alojamiento</label>
                <input
                    type='number'
                    id='idAlojamiento'
                    name='idAlojamiento'
                    onChange={handleInput}
                    className='AddTipoInput'
                    placeholder="Ingrese id"/>
                <label htmlFor='idServicio' className='fw-medium'>Id de servicio</label>
                <input
                    type='number'
                    id='idServicio'
                    name='idServicio'
                    onChange={handleInput}
                    className='AddTipoInput'
                    placeholder="Ingrese id"/>
                <button className="btn-secondary AddTipoBtn" type='submit'>Agregar</button>
            </form>
            <div className='tabla'>
                <table className="table">
                        <thead >
                            <tr>
                                <th scope="col" className="border-0 text-center">Id AlojamientoServicios</th>
                                <th scope="col" className="border-0 text-center"> Id Alojamiento</th> 
                                <th scope="col" className="border-0 text-center">Id Servicio</th>
                                <th scope="col" className="border-0 text-center">Editar Alojamiento</th>
                                <th scope="col" className="border-0 text-center">Eliminar </th>
                            </tr>
                        </thead>
                        {alojamientoS.map((aloj) => (
                            <>  
                                <tbody key={aloj.idAlojamientoServicio} >
                                    <tr className='AddTipoAdd2'>
                                        <th scope="row" className="border-0">{aloj.idAlojamientoServicio}</th>
                                        <td className="border-0 ">{aloj.idAlojamiento}</td>
                                        <td className="border-0">{aloj.idServicio}</td>
                                        <td className="border-0">
                                        <form 
                                        // onSubmit={(e)=> 
                                            // editar(e, aloj.idTipoAlojamiento)}
                                            className='AddTipoAdd'>
                                            <label htmlFor='Descripcion'></label>
                                            <input
                                            name='Descripcion'
                                            type='text'
                                            id='Descripcion'
                                            placeholder="Ingrese el nuevo alojamiento"
                                            // onChange={(e)=>setDescripcion(e.target.value)} 
                                            className='AddTipoInput2'
                                            >
                                            </input>
                                            <button type='submit'className="btn-secondary AddTipoBtn">Editar</button>
                                        </form>
                                        </td>
                                        <td className="border-0">aa
                                            {/* <button onClick={() => deleteTipoAlojamiento(aloj.idTipoAlojamiento)} className="btn-secondary AddTipoBtn">Eliminar</button> */}
                                            </td>
                                    </tr>
                                </tbody>
                            </>
                            ))}
                </table>
            </div>
    </>
  )
}

export default AlojamientoServicios