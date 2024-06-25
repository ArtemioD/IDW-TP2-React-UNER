import { useEffect, useState } from 'react'
import "./Cards.css"
import { Link as LinkRouter } from 'react-router-dom'


const Cards = ({ valorBuscado }) => {
    
    const [hoteles, setHoteles] = useState([]);
    const [imagenes, setImagenes] = useState([]);
    // const [filtro, setFiltro] = useState([])

    useEffect(() => {
        getAlojamientos();
        getImagenes();
    }, []);

    const getAlojamientos = async () => {
        try {
            const response = await fetch("http://localhost:3001/alojamiento/getAlojamientos", {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                }
            });
            if (response.ok) {
                const data = await response.json();
                setHoteles(data);
            } else {
                console.error("ERROR: al obtener alojamientos", response.body);
            }
        } catch (error) {
            console.log("ERROR: ", error);
        }
    };

    const getImagenes = async () => {
        try {
            const response = await fetch("http://localhost:3001/imagen/getAllImagenes", {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                }
            });
            if (response.ok) {
                const data = await response.json();
                setImagenes(data);
            } else {
                console.error("ERROR: al obtener imágenes", response.body);
            }
        } catch (error) {
            console.log("ERROR: ", error);
        }
    };

    console.log(hoteles);
    console.log(imagenes);

    const filteredAlojamientos = hoteles.filter(aloj => aloj.Titulo.toLowerCase().startsWith(valorBuscado.toLowerCase()));

    // const imagenesFiltradasla = []

    // function imagenesFiltradasla(id) {
    //     imagenes.filter(imag => imag.idAlojamiento == id)
    //     setFiltro(imagenes)
    // }

    return (
        <div className="containers">
            {filteredAlojamientos.length === 0 && valorBuscado !== "" ? (
                <div>No se encontraron alojamientos con el título "{valorBuscado}"</div>
            ) : (
                filteredAlojamientos.map((alojamiento) => (
                    <div className="cards" key={alojamiento.id}>
                        <LinkRouter to={`/details/${alojamiento.idAlojamiento}`} className="text-decoration-none text-dark textCard">
                            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" data-bs-interval="9000">
                                <div className="carousel-inner">
                                    {imagenes.filter(imag => imag.idAlojamiento === alojamiento.idAlojamiento).map((imag, index) => (
                                        <div key={imag.idImagen} className={`carousel-item ${index === 0 ? 'active' : ''} imgCard`}>
                                            <img src={imag.RutaArchivo} className="d-block w-100 borderImg" alt={imag.idImagen} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <h3 className="h3Card">{alojamiento.Titulo}</h3>
                            <p className="p1Card">{alojamiento.Descripcion}</p>
                            <p className="p2Card">{alojamiento.PrecioPorDia}</p>
                        </LinkRouter>
                    </div>
                ))
            )}
        </div>
    );
};

export default Cards