import Cards from "../components/cards/Cards"
import titulo from "../img/titulo.png";
import "./Home.css"

const Home = () => {
    return (
        <div className="contenedor">
            <div className="titulo">
                <img src={titulo} alt="Titulo" />
            </div>
            <Cards/>
        </div>
        
    )
}

export default Home