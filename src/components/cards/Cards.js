import { useEffect, useState } from 'react'
import "./Cards.css"
import { Link as LinkRouter} from 'react-router-dom'


function Cards() {

        const [hoteles, setHoteles] = useState([])
        const [imagenes, setImagenes] = useState([])

    
        useEffect(()=>{
            getAlojamientos()
            getImagenes()
        },[])
        
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
                    setHoteles(data)
                } else {
                    console.error("ERROR: al obtener alojamientos", response.body)
                }
            } catch (error) {
                console.log("ERROR: ", error)
            }
        }
    
        const getImagenes = async (id) => {
            try {
                const response = await fetch(`http://localhost:3001/imagen/getAllImagenes?idAlojamiento=${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                    }
                })
                if (response.ok) {
                    const data = await response.json()
                    setImagenes(data)
                } else {
                    console.error("ERROR: al obteber imagenes", response.body)
                }
            } catch (error) {
                console.log("ERROR: ", error)
            }
        }

        console.log(hoteles);
        console.log(imagenes);

  return (
    <div className="containers">
        {
            
            hoteles.map((alojamiento=>(
                <div className="cards" key={alojamiento.id}>
                    <LinkRouter to={`/details/${alojamiento.idAlojamiento}`} className="text-decoration-none text-dark textCard">
                    <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" data-bs-interval="9000">
                        <div className="carousel-inner">
                            
                            {
                                
                                imagenes.map((imag)=>(
                                    <div className="carousel-item active imgCard">
                                        <img src={imag.RutaArchivo} className="d-block w-100 borderImg" alt={imag.idImagen}/>
                                    </div>
                                    
                                ))
                            }
                            
                        </div>
                    </div>
                        <h3 className="h3Card">{alojamiento.Titulo}</h3>
                        <p className="p1Card">{alojamiento.Descripcion}</p>
                        <p className="p2Card">{alojamiento.PrecioPorDia}</p>
                    </LinkRouter>
                </div>
            )
            ))
        }
        
    </div>
  )
}

export default Cards