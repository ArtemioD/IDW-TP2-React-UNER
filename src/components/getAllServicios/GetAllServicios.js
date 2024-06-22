import React from 'react'
import { useState, useEffect } from 'react'
import "../../pages/AddProp.css"

const GetAllServicio = () =>{
    const [servicio, setServicio] = useState("")
    const [servicios, setServicios] = useState([])

    useEffect(() => {
        getServicios();
    }, []);

    const getServicios = async () => {
        try {
            const response = await fetch("http://localhost:3001/servicio/getAllServicios", {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                }
            })

            if (response.ok) {
                const data = await response.json()
                setServicios(data)
            } else {
                console.error("ERROR: al obteber alojamientos", response.body)
            }

        } catch (error) {
            console.log("ERROR: ", error)
        }
    }

    const editar = async (e,idServicio) => {
        e.preventDefault()
        const jsonDatos = {
            Nombre: servicio
        }
        console.log(jsonDatos);
        try {
            const response = await fetch(`http://localhost:3001/servicio/updateServicio/${idServicio}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(jsonDatos)
            })
            console.log(response)

            if (response.ok) {
                alert("editaste ok")
                getServicios()
            } else {
                console.error("ERROR: al editar alojamiento")
            }

        } catch (error) {
            console.log("ERROR: ", error)
        }
        e.target.reset()
    }

    const deleteServicio = async (id) => {
        console.log(id)
        try {
            const response = await fetch(`http://localhost:3001/servicio/deleteServicio/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                }
            })
            console.log(response)

            if (response.ok) {
                alert("eliminaste ok")
                getServicios()
            } else {
                console.error("ERROR: al eliminar servicio")
            }

        } catch (error) {
            console.log("ERROR: ", error)
        }
    }

    return(
        
        <table className="table">
                    <thead >
                        <tr>
                            <th scope="col" className="border-0 text-center">Id</th>
                            <th scope="col" className="border-0 text-center">Tipo Servicios</th> 
                            <th scope="col" className="border-0 text-center">Editar Servicios</th>
                            <th scope="col" className="border-0 text-center">Eliminar Servicios</th>
                        </tr>
                    </thead>
                    {servicios.map((ser) => (
                        <>  
                            <tbody key={ser.idServicio} >
                                <tr className='AddTipoAdd2'>
                                    <th scope="row" className="border-0">{ser.idServicio}</th>
                                    <td className="border-0 ">{ser.Nombre}</td>
                                    <td className="border-0">
                                      
                                    <form onSubmit={(e)=> editar(e, ser.idServicio)} className='AddTipoAdd'>
                                        <label htmlFor='Descripcion'></label>
                                        <input
                                        name='Descripcion'
                                        type='text'
                                        id='Descripcion'
                                        placeholder="Ingrese el nuevo servicio"
                                        onChange={(e)=>setServicio(e.target.value)} className='AddTipoInput2'
                                        >
                                        </input>
                                        <button type='submit'className="btn-secondary AddTipoBtn">Editar</button>
                                    </form>
                                    </td>
                                    
                                    <td className="border-0"><button onClick={() => deleteServicio(ser.idServicio)} className="btn-secondary AddTipoBtn">Eliminar</button></td>
                                
                                </tr>
                            </tbody>
                        </>
                        ))}
                </table>
    )
}

export default GetAllServicio