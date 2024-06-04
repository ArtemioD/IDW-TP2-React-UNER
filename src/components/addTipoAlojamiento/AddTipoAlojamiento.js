import React from 'react'


const AddTipoAlojamiento = ( { submit, descripcion, onChange } ) => {
    return (
            <form onSubmit={submit}  className='d-flex g-1 AddTipoAdd'>
                <label htmlFor='desc' className='fw-medium'>Descripcion:</label>
                <input
                    type='text'
                    id='desc'
                    value={descripcion}
                    onChange={onChange}
                    className='AddTipoInput'
                    placeholder='Ingrese alojamiento'/>
                <button className="btn-secondary AddTipoBtn" type='submit'>Agregar</button>
            </form>
    )
}

export default AddTipoAlojamiento
