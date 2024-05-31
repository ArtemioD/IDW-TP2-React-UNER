
import "./about.css"
import img1 from "../img/about_1.jpg"
import img2 from "../img/about_2.jpg"
import img3 from "../img/about_3.jpg"
import img4 from "../img/about_4.jpg"
import img5 from "../img/about_5.jpg"


const About = () => {
    return (
        <div className="about-us" style={ { minHeight:'90vh'}}>
            <h1>Nuestra historia</h1>
            <p><strong>Viajes y Descubrimientos S.A.</strong> es una empresa de turismo con sede en Buenos Aires,
                Argentina, que se dedica a ofrecer experiencias de viaje inolvidables. Fundada en 1995 por dos
                apasionados viajeros, hemos crecido de ser una pequeña agencia local a una empresa de turismo reconocida
                a nivel nacional.</p>
            <p>Nuestra historia comenzó cuando nuestros fundadores, Juan Pérez y María González, decidieron compartir su
                amor por los viajes con el mundo. Comenzaron alquilando una pequeña oficina en el centro de Buenos Aires
                y ofreciendo tours personalizados a los destinos más populares de Argentina.</p>
            <p>Con el tiempo, ampliamos nuestros servicios para incluir el alquiler de propiedades vacacionales. Hoy,
                contamos con una amplia gama de propiedades en alquiler, desde acogedores apartamentos en la ciudad
                hasta lujosas villas en la costa.</p>
            <p>Nuestro objetivo siempre ha sido hacer que los viajes sean accesibles y agradables para todos. Creemos
                que cada viaje es una oportunidad para descubrir, aprender y crecer. Por eso, nos esforzamos por ofrecer
                un servicio excepcional y experiencias de viaje personalizadas que superen las expectativas de nuestros
                clientes.</p>
            <p>A lo largo de los años, hemos ayudado a miles de personas a explorar el mundo, y estamos orgullosos de
                las relaciones duraderas que hemos construido con nuestros clientes. A medida que miramos hacia el
                futuro, estamos emocionados de continuar nuestra misión de hacer que los viajes sean una experiencia
                inolvidable para todos.</p>

                <div className="imagen-about">
                    <img src={img1} />
                    <img src={img2} />
                    <img src={img3} />
                    <img src={img4} />
                    <img src={img5} />
                </div>
        </div>
    )
}

export default About