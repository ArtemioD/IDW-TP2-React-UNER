import { useState, useEffect } from 'react'


const GetAllAlojamientos = ({ getIdEdiTAlojamiento}) => {

    const [selectedAlojamiento, setSelectedAlojamiento] = useState('');
    const [alojamientos, setAlojamientos] = useState([])
    const [tipoAlojamientos, setTipoAlojamientos] = useState([])
    const [alojamiento, setAlojamiento] = useState({ idAlojamiento: '' });
    const [alojamientoEditar, setAlojamientoEditar] = useState({
        Titulo: '',
        Descripcion: '',
        TipoAlojamiento: '',
        idTipoAlojamiento: '',
        Latitud: '',
        Longitud: '',
        PrecioPorDia: '',
        CantidadDormitorios: '',
        CantidadBanios: '',
        Estado: ''
    });

    useEffect(() => {
        getAlojamientos();
    }, []);

    useEffect(() => {
        console.log(alojamientoEditar);
    }, [alojamientoEditar]);

    const handleChange = (event) => {
        setAlojamiento({ ...alojamiento, [event.target.name]: event.target.value });
        setSelectedAlojamiento(event.target.value);
    };

    const handleDelete = () => {
        deleteAlojamiento(alojamiento.idAlojamiento);
    };

    const handleEdit = () => {
        const num = Number(alojamiento.idAlojamiento);
        let al = alojamientos.find(aloj => aloj.idAlojamiento === num)
        setAlojamientoEditar({ ...al })
        getTiposAlojamiento();
        //getIdEdiTAlojamiento(alojamiento.idAlojamiento);
        //editar(alojamiento.idAlojamiento)
    };

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
                setTipoAlojamientos(data)
            } else {
                console.error("ERROR: al obteber alojamientos", response.body)
            }
        } catch (error) {
            console.log("ERROR: ", error)
        }
    }

    const getAlojamientos = async () => {
        try {
            const response = await fetch("http://localhost:3001/alojamiento/getAlojamientos", {
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

    const deleteAlojamiento = async (id) => {
        //console.log(id)
        try {
            const response = await fetch(`http://localhost:3001/alojamiento/deleteAlojamiento/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                }
            })
            console.log(response)

            if (response.ok) {
                alert("eliminaste ok")
                getAlojamientos()
            } else {
                console.error("ERROR: al eliminar alojamiento")
            }

        } catch (error) {
            console.log("ERROR: ", error)
        }
    }

    return (
        <div>
            <select
                name="idAlojamiento"
                id="idAlojamiento"
                value={alojamiento.idAlojamiento}
                onChange={handleChange}
                required
            >
                <option value="" key="vacio">Seleccione una opción</option>
                {alojamientos.map((aloj) => (
                    <option value={aloj.idAlojamiento} key={aloj.idAlojamiento}>
                        {aloj.Titulo}
                    </option>
                ))}
            </select>

            <button
                type="button"
                onClick={handleEdit}
                className="btn-secondary AddTipoBtn"
                disabled={!selectedAlojamiento}
            >Eligir para editar</button>

            <button
                type="button"
                onClick={handleDelete}
                className="btn-secondary AddTipoBtn"
                disabled={!selectedAlojamiento}
            >Eliminar</button>

            <div>
                <form className='AdminAloj-form'  >
                    <label htmlFor='Titulo'>Titulo</label>
                    <input
                        key="Titulo"
                        name="Titulo"
                        type="text"
                        onChange={ald => ald}
                        value={alojamientoEditar.Titulo}
                        required />

                    <label htmlFor='Descripcion'>Descripcion</label>
                    <input
                        key="Descripcion"
                        id="Descripcion"
                        name="Descripcion"
                        type="text"
                        value={alojamientoEditar.Descripcion}
                        onChange={ald => ald}
                        placeholder='Descripcion'
                        required />

                    <p>Ubicacion:</p>
                    <label htmlFor='Latitud'>Latitud</label>
                    <input
                        key="Latitud"
                        id="Latitud"
                        name="Latitud"
                        value={alojamientoEditar.Latitud}
                        onChange={ald => ald}
                        type="number"
                        placeholder='Latitud'
                        required />
                    <label htmlFor='Longitud'>Longitud</label>
                    <input
                        key="Longitud"
                        id="Longitud"
                        name="Longitud"
                        value={alojamientoEditar.Longitud}
                        onChange={ald => ald}
                        type="number"
                        placeholder='Longitud'
                        required />
                    <label htmlFor='PrecioPorDia'>Precio por dia</label>
                    <input
                        key="PrecioPorDia"
                        id="PrecioPorDia"
                        name="PrecioPorDia"
                        type="number"
                        value={alojamientoEditar.PrecioPorDia}
                        onChange={ald => ald}
                        placeholder='PrecioPorDia'
                        required />
                    <label htmlFor='CantidadDormitorios'>Cantidad de dormitorios</label>
                    <input
                        key="CantidadDormitorios"
                        id="CantidadDormitorios"
                        name="CantidadDormitorios"
                        type="number"
                        value={alojamientoEditar.CantidadDormitorios}
                        onChange={ald => ald}
                        placeholder='CantidadDormitorios'
                        required />
                    <label htmlFor='CantidadBanios'>Cantidad de baños</label>
                    <input
                        key="CantidadBanios"
                        id="CantidadBanios"
                        name="CantidadBanios"
                        type="number"
                        value={alojamientoEditar.CantidadBanios}
                        onChange={ald => ald}
                        placeholder='CantidadBanios'
                        required />

                    <fieldset>
                        <p>Estado:</p>
                        <label htmlFor='Disponible'>Disponible</label>
                        <input
                            id="Disponible"
                            key="Disponible"
                            name="Estado"
                            type="radio"
                            value="Disponible"
                            checked={alojamientoEditar.Estado === 'Disponible'}
                            onChange={ald => ald}
                            required />
                        <label htmlFor='Reservado'>Reservado</label>
                        <input
                            key="Reservado"
                            id="Reservado"
                            name="Estado"
                            type="radio"
                            value="Reservado"
                            checked={alojamientoEditar.Estado === 'Reservado'}
                            onChange={ald => ald}
                            required />
                    </fieldset>
                    <p>Tipo de alojamiento</p>

                    <select name="TipoAlojamiento" id="TipoAlojamiento" value={alojamientoEditar.TipoAlojamiento} onChange={ald => ald} required>
                        <option value="" key="vacio">Seleccione una opción</option>
                        {tipoAlojamientos.map((aloj) => (
                            <option value={aloj.idTipoAlojamiento} key={aloj.Descripcion} >{aloj.Descripcion}</option>))}
                    </select>
                    

                    <button type='submit'>Editar</button>
                </form>
            </div>
        </div>
    )

}

export default GetAllAlojamientos

/*
falta hacer el boton de editar y cuando se crea nuevo alojaminto actualizar array de los ajojamintos
 */
