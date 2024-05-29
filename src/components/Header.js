import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contacto from "../pages/Contacto";
import NavBar from "./navbar/NavBar";
import AddProp from "../pages/AddProp";

const Header = () => {
    return (
        <div>
            <BrowserRouter >
                <NavBar />
                <Routes>
                    <Route index path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/addpropiedad" element={<AddProp />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Header