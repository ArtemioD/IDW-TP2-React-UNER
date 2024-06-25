
import Footer from "./components/footer/footer.js";
import NavBar from "./components/navbar/NavBar.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from 'react';
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Contacto from "./pages/Contacto.js";
import AddProp from "./pages/AddProp.js"
import AdminAloj from "./pages/AdminAloj.js"
import Details from "./pages/Details.js";

function App() {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term)
};

  return (
    <div>
      <BrowserRouter>
        <NavBar onSearch={handleSearch} />
        <Routes>
          <Route index path="/" element={<Home valor={searchTerm} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/addpropiedad" element={<AddProp />} />
          <Route path="/adminaloj" element={<AdminAloj />} />
          <Route path="/details/:id" element={<Details/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
