import { useEffect, useState } from 'react'
import "./Cards.css"
import { Link as LinkRouter } from 'react-router-dom'


function Cards({ valorBuscado }) {


    const [hoteles, setHoteles] = useState([])
    const [imagenes, setImagenes] = useState([])
    // const [filtro, setFiltro] = useState([])

    useEffect(() => {
        getAlojamientos()
        getImagenes()
    }, [])

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

    const alojamientoEncontrado = hoteles.find(aloj => aloj.Titulo.toLowerCase() === valorBuscado.toLowerCase());
    
    // const imagenesFiltradasla = []

    // function imagenesFiltradasla(id) {
    //     imagenes.filter(imag => imag.idAlojamiento == id)
    //     setFiltro(imagenes)
    // }
    
    return (
        <div className="containers">
            {valorBuscado === "" ? (
                hoteles.map((alojamiento => (
                    <div className="cards" key={alojamiento.id}>
                        <LinkRouter to={`/details/${alojamiento.idAlojamiento}`} className="text-decoration-none text-dark textCard">
                            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" data-bs-interval="9000">
                                <div className="carousel-inner">

                                    {
                                        imagenes.filter(imag => imag.idAlojamiento == alojamiento.idAlojamiento)
                                        .map((imag) => (
                                            <div className="carousel-item active imgCard">
                                                <img src={imag.RutaArchivo} className="d-block w-100 borderImg" alt={imag.idImagen} />
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
                ))) :
                (
                    alojamientoEncontrado ? (
                        <div className="cards">
                            <LinkRouter to={`/details/${alojamientoEncontrado.idAlojamiento}`} className="text-decoration-none text-dark textCard">
                                <h3 className="h3Card">{alojamientoEncontrado.Titulo}</h3>
                                <p className="p1Card">{alojamientoEncontrado.Descripcion}</p>
                                <p className="p2Card">{alojamientoEncontrado.PrecioPorDia}</p>
                            </LinkRouter>
                        </div>
                    ) : (
                        <div>No se encontró alojamiento con el título "{valorBuscado}"</div>
                    )
                
                )
            }

        </div>
    )
}

export default Cards