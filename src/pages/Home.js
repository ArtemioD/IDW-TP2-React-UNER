import Cards from "../components/cards/Cards"
import titulo from "../img/titulo.png";
import "./Home.css"

const Home = ({ valor }) => {

    return (
        <div className="contenedor">
            <div className="titulo">
                <img src={titulo} alt="Titulo" />
            </div>
            <Cards valorBuscado={valor}/>
        </div>
        
    )
}

export default Home