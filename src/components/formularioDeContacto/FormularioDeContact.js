import "../../pages/Contacto.css"

const FormularioDeContact = ({htmlFor, vista, type,placeholder,e, onChange} ) =>{
    return(
        <div className="form-group">
                <label htmlFor={htmlFor}> {vista} </label>
                <input
                  type={type}
                  className="form-control"
                  id={htmlFor}
                  placeholder={placeholder}
                  value={e}
                  onChange={onChange}
                />
        </div>
    )
}

export default FormularioDeContact;