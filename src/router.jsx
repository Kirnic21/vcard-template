import React from "react"
import{
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import CadastroEvento from "./Pages/CadastroEvento"
import VisualizarEvento from "./Pages/VizualizarEvento"
import VCard from "./Pages/VCard"
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Conta from "./Pages/Conta"
import CadastroAdmin from "./Pages/CadastroAdmin"
import EditarEvento from "./Pages/EditarEvento"


const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route
                exact
                path="/"
                element={<Login/>}>
                </Route> ~

                <Route
                path="/home"
                element={<Home/>}
                >
                </Route>

                <Route
                path="/conta"
                element={<Conta/>}
                >

                </Route>
                <Route
                path="/vcard"
                element={<VCard/>}
                />
                
                <Route
                path="/cadastroadm"
                element={<CadastroAdmin/>}      
                /> 

                <Route
                path="/cadastroevento"
                element={<CadastroEvento />}
                />    

                <Route
                path="/visualizarevento/:id"
                element={<VisualizarEvento />}  
                /> 

                <Route
                path="/editarevento/:id"
                element={<EditarEvento />}  
                />   
            </Routes>
        </BrowserRouter>
    )
}

export default Router