import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroEvento from "./Pages/CadastroEvento";
import VisualizarEvento from "./Pages/VizualizarEvento";
import VCard from "./Pages/VCard";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Conta from "./Pages/Conta";
import CadastroAdm from "./Pages/CadastroAdm";
import EditarEvento from "./Pages/EditarEvento";
import CadastroOrg from "./Pages/CadastroOrg";
import CadastroExpo from "./Pages/CadastroExpo";
import CaddastroVcard from "./Pages/CadastroVcard";
import VisualizarVcards from "./Pages/VisualizarVcards";
import EditarVcard from "./Pages/EditarVcard";
import CadastroVisitante from "./Pages/CadastroVisitante";
import EditarConta from "./Pages/EditarConta";
import Usuarios from "./Pages/Usuarios";

const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />}></Route> ~
        <Route path="/home" element={<Home />}></Route>
        <Route path="/conta/:id" element={<Conta />}></Route>
        <Route path="/vcard/:id" element={<VCard />} />
        <Route path="/cadastroadm" element={<CadastroAdm />} />
        <Route path="/cadastroevento" element={<CadastroEvento />} />
        <Route path="/visualizarevento/:id" element={<VisualizarEvento />} />
        <Route path="/editarevento/:id" element={<EditarEvento />} />
        <Route path="/cadastroorg" element={<CadastroOrg />} />
        <Route path="/cadastroexpositor" element={<CadastroExpo />} />
        <Route path="/cadastrovcard" element={<CaddastroVcard />} />
        <Route path="/visualizarvcards" element={<VisualizarVcards />} />
        <Route path="/editarvcard/:id" element={<EditarVcard />} />
        <Route path="/cadastrovisitante" element={<CadastroVisitante />} />
        <Route path="/editarconta/:id" element={<EditarConta />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
