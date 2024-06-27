import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Details.css";

function Details() {
  const { id } = useParams();

  const [imagen, setImagen] = useState([]);
  const [alojamiento, setAlojamiento] = useState([]);
  const [alojamientoServicio, setAlojamientoServicio] = useState([]);
  const [servicios, setServicios] = useState([])

  useEffect(() => {
    getAllImagenes();
    getAlojamiento(id);
    getAlojamientoServicio(id);
    getServicios()
  }, [id]);

  const imagenesFiltradas = imagen.filter(imag => imag.idAlojamiento ==id)

  const getAllImagenes = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/imagen/getAllImagenes`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setImagen(data);
      } else {
        console.error("ERROR: al obteber imagenes", response.body);
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const getAlojamiento = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/alojamiento/getAlojamiento/${id}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAlojamiento(data);
      } else {
        console.error("ERROR: al obtener alojamiento", response.body);
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const getAlojamientoServicio = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/alojamientosServicios/getAllAlojamientoServicios?idAlojamiento=${id}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAlojamientoServicio(data);
      } else {
        console.error("ERROR: al obtener Alojamiento/Servicios", response.body);
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

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

const aloj =[]
alojamientoServicio.filter(imag => aloj.push(imag.idServicio))

const serviciosFiltrados = servicios.filter(servicios => aloj.includes(servicios.idServicio))
  
  return (
    <div className="">
      <h1 className="DetailsTitulo1">{alojamiento.Titulo}</h1>
      <div className="container cardDetails">
        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide "
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {imagenesFiltradas.map((imag) => (
              <div className="carousel-item active" key={imag.RutaArchivo}>
                <img
                  src={imag.RutaArchivo}
                  className="d-block w-100 DelailsImg"
                  alt={imag.RutaArchivo}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="DetailsDatos">
          <p className="DetailsDescripcion">{alojamiento.Descripcion}</p>
          <p>
            Ubicacion: {alojamiento.Latitud} - {" "}
            {alojamiento.Longitud}
          </p>
          <p>Precio por dia: ${alojamiento.PrecioPorDia}</p>
          <p>Cant. Dormitorios: {alojamiento.CantidadDormitorios}</p>
          <p>Cant. baños: {alojamiento.CantidadBanios}</p>
          <div className="d-flex"><p>
            Servicios:
          </p>
          <div className="d-flex ms-2">
            {
              serviciosFiltrados.map((serv)=>(
                <p className="ms-2" key={serv.idServicio}>{serv.Nombre} / </p>
              ))
            }
            </div>
          </div>
          <p className="DetailsEstado">{alojamiento.Estado}</p>
        </div>
      </div>
    </div>
  );
}

export default Details;
