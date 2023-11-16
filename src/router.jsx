import React from "react"
import{
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import Cadastro from "./Pages/Cadastro"
import VCard from "./Pages/Vcard"
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Conta from "./Pages/Conta"


const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route
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
                path="/cadastro"
                element={<Cadastro/>}      
                />         
            </Routes>
        </BrowserRouter>
    )
}

export default Router