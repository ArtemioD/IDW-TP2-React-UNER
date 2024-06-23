import React from 'react'
import "../pages/AdminAloj.css";
import { useState, useEffect, useRef } from 'react'
import GetAllAlojamientos from '../components/getAllAlojamientos/getAllAlojamientos';

const AdminAloj = () => {

    const [showForm, setShowForm] = useState(false);
    const childRef = useRef();
    const [alojamientos, setAlojamientos] = useState([])
    const [formData, setFormData] = useState({
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
        getTiposAlojamiento();
    }, []);

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const submit = async (e) => {
        e.preventDefault();
        const jsonDatos = {
            Titulo: formData.Titulo,
            Descripcion: formData.Descripcion,
            TipoAlojamiento: formData.TipoAlojamiento,
            Latitud: formData.Latitud,
            Longitud: formData.Longitud,
            PrecioPorDia: formData.PrecioPorDia,
            CantidadDormitorios: formData.CantidadDormitorios,
            CantidadBanios: formData.CantidadBanios,
            Estado: formData.Estado
        };

        try {
            const response = await fetch("http://localhost:3001/alojamiento/createAlojamiento", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonDatos)
            });

            if (response.ok) {
                alert("OK: Se creó alojamiento nuevo!");
                setFormData({
                    Titulo: '',
                    Descripcion: '',
                    TipoAlojamiento: '',
                    Latitud: '',
                    Longitud: '',
                    PrecioPorDia: '',
                    CantidadDormitorios: '',
                    CantidadBanios: '',
                    Estado: ''
                });
                childRef.current.getAlojamientos()
                setShowForm(false)
                //getTiposAlojamiento();
            } else {
                const errorData = await response.json();
                console.error("ERROR: al crear alojamiento", errorData);
                alert("Error: Pruebe mañana");
            }
        } catch (error) {
            console.log("ERROR: ", error);
        }
    };

    return (
        <div className='containerAdmin '>
            <button type='submit' className="btn-secondary AddTipoBtn" onClick={() => { setShowForm(!showForm) }}>Cargar nuevo Alojamiento</button>
            <GetAllAlojamientos ref={childRef} />
            <div>
                {showForm && <form className='AdminAloj-form' onSubmit={submit} >
                    <label htmlFor='Titulo'>Titulo</label>
                    <input
                        key="Titulo"
                        name="Titulo"
                        type="text"
                        value={formData.Titulo}
                        onChange={handleChange}
                        placeholder='Nombre del alojamiento'
                        required />
                    <label htmlFor='Descripcion'>Descripcion</label>
                    <input
                        key="Descripcion"
                        id="Descripcion"
                        name="Descripcion"
                        type="text"
                        value={formData.Descripcion}
                        onChange={handleChange}
                        placeholder='Descripcion'
                        required />
                    <p>Ubicacion:</p>
                    <label htmlFor='Latitud'>Latitud</label>
                    <input
                        key="Latitud"
                        id="Latitud"
                        name="Latitud"
                        value={formData.Latitud}
                        onChange={handleChange}
                        type="number"
                        placeholder='Latitud'
                        required />
                    <label htmlFor='Longitud'>Longitud</label>
                    <input
                        key="Longitud"
                        id="Longitud"
                        name="Longitud"
                        value={formData.Longitud}
                        onChange={handleChange}
                        type="number"
                        placeholder='Longitud'
                        required />
                    <label htmlFor='PrecioPorDia'>Precio por dia</label>
                    <input
                        key="PrecioPorDia"
                        id="PrecioPorDia"
                        name="PrecioPorDia"
                        type="number"
                        value={formData.PrecioPorDia}
                        onChange={handleChange}
                        placeholder='PrecioPorDia'
                        required />
                    <label htmlFor='CantidadDormitorios'>Cantidad de dormitorios</label>
                    <input
                        key="CantidadDormitorios"
                        id="CantidadDormitorios"
                        name="CantidadDormitorios"
                        type="number"
                        value={formData.CantidadDormitorios}
                        onChange={handleChange}
                        placeholder='CantidadDormitorios'
                        required />
                    <label htmlFor='CantidadBanios'>Cantidad de baños</label>
                    <input
                        key="CantidadBanios"
                        id="CantidadBanios"
                        name="CantidadBanios"
                        type="number"
                        value={formData.CantidadBanios}
                        onChange={handleChange}
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
                            checked={formData.Estado === 'Disponible'}
                            onChange={handleChange}
                            required />
                        <label htmlFor='Reservado'>Reservado</label>
                        <input
                            key="Reservado"
                            id="Reservado"
                            name="Estado"
                            type="radio"
                            value="Reservado"
                            checked={formData.Estado === 'Reservado'}
                            onChange={handleChange}
                            required />
                    </fieldset>
                    <p>Tipo de alojamiento</p>
                    <select name="TipoAlojamiento" id="TipoAlojamiento" value={formData.TipoAlojamiento} onChange={handleChange} required>
                        <option value="" key="vacio">Seleccione una opción</option>
                        {alojamientos.map((aloj) => (
                            <option value={aloj.idTipoAlojamiento} key={aloj.Descripcion} >{aloj.Descripcion}</option>))}
                    </select>
                    <button type='submit'>Agregar</button>
                </form>}
                
            </div>
        </div>
    )
}

export default AdminAloj

