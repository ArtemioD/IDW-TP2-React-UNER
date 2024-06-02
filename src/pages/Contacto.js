import "../pages/Contacto.css";
import FormularioDeContact from "../components/formularioDeContacto/FormularioDeContact";
import { useState } from "react";
import Swal from 'sweetalert2';

const Contacto = () => {
  const [name, setName] = useState("");
  const [num, setNum] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const submitDatos = (e) => {
      e.preventDefault();

      Swal.fire({
        title: `${name} </br> Quieres enviar este mensaje?`,
        html: `Numero de telefono: ${num}</br> Email: ${email}</br> Mensaje: ${mensaje}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Enviar"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Enviado",
            text: "Fue enviado con exito!",
            icon: "success"
          });
        } else {
          Swal.fire({
            title: "Cancelado",
            text: "El mensaje fue cancelado!",
            icon: "warning"
          });
        }
      });
    setName("")
    setNum("")
    setEmail("")
    setMensaje("")
  };

  return (
    <div style={{ minHeight: "90vh" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="text-center mb-4">Formulario de Contacto</h1>
            <form onSubmit={submitDatos}>
              <FormularioDeContact
                htmlFor={"nombre"}
                vista={"Nombre:"}
                type={"text"}
                placeholder={"Ingrese su nombre"}
                e={name}
                onChange={(value) => setName(value.target.value)}
              />

              <FormularioDeContact
                htmlFor={"telefono"}
                vista={"Teléfono:"}
                type={"text"}
                placeholder={"Ingrese su teléfono"}
                e={num}
                onChange={(value) => setNum(value.target.value)}
              />

              <FormularioDeContact
                htmlFor={"email"}
                vista={"Email:"}
                type={"email"}
                placeholder={"Ingrese su email"}
                e={email}
                onChange={(value) => setEmail(value.target.value)}
              />

              <div className="form-group">
                <label htmlFor="mensaje">Mensaje:</label>
                <textarea
                  className="form-control"
                  id="mensaje"
                  rows="5"
                  placeholder="Escriba su mensaje"
                  value={mensaje}
                  onChange={(value) => setMensaje(value.target.value)}
                ></textarea>
              </div>
              <div className="text-center my-4 d-grid gap-2 col-6 mx-auto">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-6">
            <div id="mapa" className="mapa">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d11702.410253923777!2d-58.38754203468884!3d-34.6072508529262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgoogle%20maps!5e0!3m2!1ses-419!2sar!4v1714685420738!5m2!1ses-419!2sar"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
