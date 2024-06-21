
import Footer from "./components/footer/footer.js";
import NavBar from "./components/navbar/NavBar.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Contacto from "./pages/Contacto.js";
import AddProp from "./pages/AddProp.js"
import AdminAloj from "./pages/AdminAloj.js"

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/addpropiedad" element={<AddProp />} />
          <Route path="/adminaloj" element={<AdminAloj />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
