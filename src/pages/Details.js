import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Details() {

  const {id} = useParams()

  const [imagen, setImagen] = useState([])
  const [alojamiento, setAlojamiento] = useState([])
  const [alojamientoServicio, setAlojamientoServicio] = useState([])
  
  useEffect(()=>{
    getAllImagenes(id)
    getAlojamiento(id)
    getAlojamientoServicio(id)
  },[id])
  // console.log(id);
  console.log(alojamiento);
  console.log(alojamientoServicio);

const getAllImagenes = async (id) => {
  try {
      const response = await fetch(`http://localhost:3001/imagen/getAllImagenes?idAlojamiento=${id}`, {
          method: 'GET',
          headers: {
              'Content-type': 'application/json',
          }
      })
      if (response.ok) {
          const data = await response.json()
          setImagen(data)
      } else {
          console.error("ERROR: al obteber imagenes", response.body)
      }
  } catch (error) {
      console.log("ERROR: ", error)
  }
}

const getAlojamiento = async (id) => {
  try {
      const response = await fetch(`http://localhost:3001/alojamiento/getAlojamiento/${id}`, {
          method: 'GET',
          headers: {
              'Content-type': 'application/json',
          }
      })
      if (response.ok) {
          const data = await response.json()
          setAlojamiento(data)
      } else {
          console.error("ERROR: al obtener alojamiento", response.body)
      }
  } catch (error) {
      console.log("ERROR: ", error)
  }
}

const getAlojamientoServicio = async (id) => {
  try {
      const response = await fetch(`http://localhost:3001/alojamientosServicios/getAllAlojamientoServicios?idAlojamiento=${id}`, {
          method: 'GET',
          headers: {
              'Content-type': 'application/json',
          }
      })
      if (response.ok) {
          const data = await response.json()
          setAlojamientoServicio(data)
      } else {
          console.error("ERROR: al obtener Alojamiento/Servicios", response.body)
      }
  } catch (error) {
      console.log("ERROR: ", error)
  }
}

console.log(imagen);
  return (
    <>
      <div>{alojamiento.Titulo}</div>
      <div>
        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            {
              imagen.map(imag =>(
                <div class="carousel-item active">
                    <img src={imag.RutaArchivo} class="d-block w-100" alt="..."/>
                </div>
              ))
            }
            
          </div>
        </div>
        <p>Nombre: {alojamiento.Titulo}</p>
        <p>Descripcion: {alojamiento.Descripcion}</p>
        <p>Ubicacion: Latitud: {alojamiento.Latitud} Longitud: {alojamiento.Longitud}</p>
        <p>Precio por dia: {alojamiento.PrecioPorDia}</p>
        <p>Cant. Dormitorios: {alojamiento.CantidadDormitorios}</p>
        <p>Cant. baños: {alojamiento.CantidadBanios}</p>
        <p>Estado: {alojamiento.Estado}</p>
      </div>
    </>
  )
}

export default Details