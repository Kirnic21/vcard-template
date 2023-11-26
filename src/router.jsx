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
import Administradores from "./Pages/Administradores";
import EditarAdm from "./Pages/EditarAdm";
import CadastroOrg from "./Pages/CadastroOrg";
import Organizadores from "./Pages/Organizadores";
import EditarOrg from "./Pages/EditarOrg";
import Expositores from "./Pages/Expositores";
import CadastroExpo from "./Pages/CadastroExpo";
import EditarExpo from "./Pages/EditarExpo";
import CaddastroVcard from "./Pages/CadastroVcard";
import VisualizarVcards from "./Pages/VisualizarVcards";
import EditarVcard from "./Pages/EditarVcard";
import CadastroVisitante from "./Pages/CadastroVisitante";
import EditarConta from "./Pages/EditarConta";

const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />}></Route> ~
        <Route path="/home" element={<Home />}></Route>
        <Route path="/conta/:id" element={<Conta />}></Route>
        <Route path="/vcard" element={<VCard />} />
        <Route path="/cadastroadm" element={<CadastroAdm />} />
        <Route path="/cadastroevento" element={<CadastroEvento />} />
        <Route path="/visualizarevento/:id" element={<VisualizarEvento />} />
        <Route path="/editarevento/:id" element={<EditarEvento />} />
        <Route path="/visualizaradms" element={<Administradores />} />
        <Route path="/editaradm/:id" element={<EditarAdm />} />
        <Route path="/cadastroorg" element={<CadastroOrg />} />
        <Route path="/organizadores" element={<Organizadores />} />
        <Route path="/editarorg/:id" element={<EditarOrg />} />
        <Route path="/expositores" element={<Expositores />} />
        <Route path="/cadastroexpositor" element={<CadastroExpo />} />
        <Route path="/editarexpo/:id" element={<EditarExpo />} />
        <Route path="/cadastrovcard" element={<CaddastroVcard />} />
        <Route path="/visualizarvcards" element={<VisualizarVcards />} />
        <Route path="/editarvcard/:id" element={<EditarVcard />} />
        <Route path="/cadastrovisitante" element={<CadastroVisitante />} />
        <Route path="/editarconta/:id" element={<EditarConta />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
