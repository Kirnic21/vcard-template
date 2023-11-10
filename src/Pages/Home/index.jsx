import React from "react"
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import "./home.css"
import fatec from "/image/fatec.png"

const Home = () => {

    return(
        <>
        <Header />

        <h1> EVENTOS</h1>

        <div className="eventos">
            <div className="eventos-img">
                <img src={fatec} alt="imagem evento" />
            </div>
            <div className="eventos-info">
                <h3>Natal</h3>
                <div className="data">
                    <label><b>Data e hora do evento:</b></label>
                    <p>Início as 14:00 - 25/12/2023</p>
                </div>
                <div className="info">
                    <label><b>Informações:</b></label>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                    Ab mollitia expedita perferendis quis! Ab, expedita facilis ducimus 
                    facere tenetur quibusdam cupiditate sequi harum accusamus, 
                    recusandae adipisci! Non eum quo rem!</p>
                </div>
                <div className="local">    
                    <label><b>Local:</b></label>
                    <p>Av. União dos Ferroviários, 1760 - Centro, Jundiaí - SP, 13201-160</p>
                </div>
            </div>
        </div>
        <p></p>
        <p></p>
        <Footer />
        </>
    )
}

export default Home