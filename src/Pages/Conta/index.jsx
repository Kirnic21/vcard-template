import Header from "../Components/Header"
import Footer from "../Components/Footer"
import "./conta.css"
import React from "react"
import dados from "/image/Dados.png"


const Conta = () => {

    return(
        <>
        <Header />

            <div className="container-geral">
                <div className="container-form">
                    <div className="title">
                        <h3>Seus dados</h3>
                    </div>
                    <div className="name">
                        <label htmlFor="name"><b>Nome:</b></label>
                        <p>Vinícius Rotondo Silva</p>
                    </div>
                    <div className="email">
                        <label htmlFor="email"><b>E-mail:</b></label>
                        <p>viniciusrotondo.bi@gmail.com</p>
                    </div>
                    <div className="expo">
                        <label htmlFor="expor"><b>Exposição:</b></label>
                        <p>Plataforma VCARD - Cartões Virtuais</p>
                    </div>
                    <div className="number">
                        <label htmlFor="number"><b>Contato:</b></label>
                        <p>(11)9.7148-9495</p>
                    </div>
                    <button type="submit" className="">
                        Alterar seus dados
                    </button>
                </div>
                    <div className="img-dados">
                        <img src={dados} alt="proteção de dados" />
                    </div>
            </div>
        <Footer />
        </>
    )
}

export default Conta