import React from "react";
import { useState, useEffect } from "react";
import AddTipoAlojamiento from "../components/addTipoAlojamiento/AddTipoAlojamiento";
import "../pages/AddProp.css";
import GetAllServicio from "../components/getAllServicios/GetAllServicios";
import Images from "../components/Images/Images";
import AlojamientoServicios from "../components/AlojamientoServicios/AlojamientoServicios";
import {useRef} from 'react';
import "../pages/AdminAloj"
import { Link,useLocation } from "react-router-dom";

const AddProp = () => {
  const [descripcion, setDescripcion] = useState("");
  const [descripcionAdd, setDescripcionAdd] = useState("");
  const [serviciosAdd, setServiciosAdd] = useState("");
  const [alojamientos, setAlojamientos] = useState([]);

  
  const childRef = useRef(); 

  useEffect(() => {
    getTiposAlojamiento();
  }, []);

  const editar = async (e, idTipoAlojamiento) => {
    e.preventDefault();
    const jsonDatos = {
      Descripcion: descripcion,
    };
    console.log(jsonDatos);
    try {
      const response = await fetch(
        `http://localhost:3001/tiposAlojamiento/putTipoAlojamiento/${idTipoAlojamiento}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(jsonDatos),
        }
      );
      console.log(response);

      if (response.ok) {
        alert("editaste ok");
        getTiposAlojamiento();
      } else {
        console.error("ERROR: al editar alojamiento");
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
    e.target.reset();
  };

  const submit = async (e) => {
    e.preventDefault();
    const jsonDatos = {
      Descripcion: descripcionAdd,
    };
    setDescripcionAdd("");

    try {
      const response = await fetch(
        "http://localhost:3001/tiposAlojamiento/createTipoAlojamiento",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(jsonDatos),
        }
      );

      if (response.ok) {
        alert("OK: Se Creo alojamiento nuevo!", response);
        getTiposAlojamiento();
      } else {
        console.error("ERROR: al crear alojamiento");
        alert("Error: Pruebe mañana");
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  //cambiar el submit
  const submitServicios = async (e) => {
    e.preventDefault();
    const jsonDatos = {
      Nombre: serviciosAdd,
    };
    setServiciosAdd("");

    try {
      const response = await fetch(
        "http://localhost:3001/servicio/createServicio",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(jsonDatos),
        }
      );

      if (response.ok) {
        alert("OK: Se Creo un nuevo servicio!", response);
        getTiposAlojamiento();
        childRef.current.getServicios()
      } else {
        console.error("ERROR: al crear servicio");
        alert("Error: Pruebe mas tarde");
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const getTiposAlojamiento = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/tiposAlojamiento/getTiposAlojamiento",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAlojamientos(data);
      } else {
        console.error("ERROR: al obteber alojamientos", response.body);
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const deleteTipoAlojamiento = async (id) => {
    console.log(id);
    try {
      const response = await fetch(
        `http://localhost:3001/tiposAlojamiento/deleteTipoAlojamiento/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      console.log(response);

      if (response.ok) {
        alert("eliminaste ok");
        getTiposAlojamiento();
      } else {
        console.error("ERROR: al eliminar alojamiento");
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  return (
    <div className="containerAdmin ">
      <h1 className="AddPropTitulo">Administracion de Alojamientos</h1>
        <Link className="boton-AddAlojamiento" to = "/adminaloj">Agregar Alojamiento</Link>
      <div className="AddPropBox">
      <h3 className="containerAdmin2">Administrar Tipo de Alojamiento</h3>
        <AddTipoAlojamiento
          placeholder={"Ingrese tipo alojamineto"}
          submit={submit}
          descripcion={descripcionAdd}
          onChange={(e) => setDescripcionAdd(e.target.value)}
          labelName={"Tipo de alojamiento"}
        />

        <div className="tabla">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="border-0 text-center">
                  Id
                </th>
                <th scope="col" className="border-0 text-center">
                  {" "}
                  Tipo de alojamiento
                </th>
                <th scope="col" className="border-0 text-center">
                  Editar Alojamiento
                </th>
                <th scope="col" className="border-0 text-center">
                  Eliminar Alojamiento
                </th>
              </tr>
            </thead>
            {alojamientos.map((aloj) => (
              <>
                <tbody key={aloj.idTipoAlojamiento}>
                  <tr className="AddTipoAdd2">
                    <th scope="row" className="border-0">
                      {aloj.idTipoAlojamiento}
                    </th>
                    <td className="border-0 ">{aloj.Descripcion}</td>
                    <td className="border-0">
                      <form
                        onSubmit={(e) => editar(e, aloj.idTipoAlojamiento)}
                        className="AddTipoAdd"
                      >
                        <label htmlFor="Descripcion"></label>
                        <input
                          name="Descripcion"
                          type="text"
                          id="Descripcion"
                          placeholder="Ingrese el nuevo alojamiento"
                          onChange={(e) => setDescripcion(e.target.value)}
                          className="AddTipoInput2"
                        ></input>
                        <button
                          type="submit"
                          className="btn-secondary AddTipoBtn"
                        >
                          Editar
                        </button>
                      </form>
                    </td>
                    <td className="border-0">
                      <button
                        onClick={() =>
                          deleteTipoAlojamiento(aloj.idTipoAlojamiento)
                        }
                        className="btn-secondary AddTipoBtn"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </>
            ))}
          </table>
        </div>
        <div className="containerAdmin2">
          <h3>Administrar Servicios</h3>

          <AddTipoAlojamiento
            placeholder={"Ingrese servicios"}
            submit={submitServicios}
            descripcion={serviciosAdd}
            onChange={(e) => setServiciosAdd(e.target.value)}
            labelName={"Servicio"}
          />
          <div className="tabla myTable">
            <GetAllServicio ref = {childRef} />
          </div>
          
        </div>
      </div>
      <AlojamientoServicios />
      <Images />
    </div>
  );
};

export default AddProp;
