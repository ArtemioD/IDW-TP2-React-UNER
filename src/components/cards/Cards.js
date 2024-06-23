import { useEffect, useState } from 'react'
import "./Cards.css"
import { Link as LinkRouter} from 'react-router-dom'


function Cards() {

        const [hoteles, setHoteles] = useState([])
    
        useEffect(()=>{
            fetch("json/alojamientos.json")
            .then(response => response.json())
            .then(datos => {
                setHoteles(datos)
            })
        },[])
        
    
    
  return (
    <div className="containers">
        {
            hoteles.map((alojamiento=>(
                <div className="cards" key={alojamiento.id}>
                    <LinkRouter to={`/details/${alojamiento.id}`} className="text-decoration-none text-dark textCard">
                    <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" data-bs-interval="9000">
                        <div className="carousel-inner">
                            <div className="carousel-item active imgCard">
                                <img src={alojamiento.imagen1} className="d-block w-100 borderImg" alt={alojamiento.nombre_hotel}/>
                            </div>
                            <div className="carousel-item imgCard">
                                <img src={alojamiento.imagen2}  className="d-block w-100 borderImg" alt={alojamiento.nombre_hotel}/>
                            </div>
                            <div className="carousel-item imgCard">
                                <img src={alojamiento.imagen3}  className="d-block w-100 borderImg" alt={alojamiento.nombre_hotel}/>
                            </div>
                        </div>
                    </div>
                        <h3 className="h3Card">{alojamiento.nombre_hotel}</h3>
                        <p className="p1Card">{alojamiento.descripcion}</p>
                        <p className="p2Card">{alojamiento.precio}</p>
                    </LinkRouter>
                </div>
            )
            ))
        }
        
    </div>
  )
}

export default Cards