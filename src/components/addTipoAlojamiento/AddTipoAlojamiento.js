import React from 'react'
import "./AddTipoAlojamiento.css"

const AddTipoAlojamiento = ( { submit, descripcion, onChange } ) => {
    return (
        <div>
            <h1 className='test'>Agregar Tipo de Alojamiento</h1>
            <form onSubmit={submit}>
                <div>
                    <label htmlFor='desc'>Descripcion:</label>
                    <input
                        type='text'
                        id='desc'
                        value={descripcion}
                        onChange={onChange}>
                    </input>
                </div>
                <button type='submit'>Agregar</button>
            </form>
        </div>
    )
}

export default AddTipoAlojamiento
