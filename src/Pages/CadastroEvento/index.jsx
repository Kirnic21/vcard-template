import React, { useState, useEffect } from "react"
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import { Link, useNavigate } from "react-router-dom"
import "./style.css"
import { verificaLogin } from "../../Utils/Utils"

const CadastroEvento = () => {
    const navigate = useNavigate();

    const [eventos, setEventos] =useState({
        chave_convite: '',
        nome_do_evento: '',
        data: '',
        informacoes: '',
        local: '',
        fk_organizadores_id: ''	
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valorInput = e => setEventos({
        ...eventos, [e.target.name]: e.target.value
    })

    const cadEvento = async e => {
        e.preventDefault();
        //console.log(eventos.nome_do_evento)

        await fetch("http://localhost/api_p2/cadastroEvento.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({eventos})
        })
        .then((res) => res.json())
        .then((resJson) => {
            //console.log(resJson)
            if(resJson.erro){
                setStatus({
                    type:'erro',
                    mensagem: resJson.messagem
                });
            }else{
                setStatus({
                    type:'sucess',
                    mensagem: resJson.messagem
                })
            }
        }).catch(() => {
            setStatus({
                type:'erro',
                mensagem: 'Evento não cadastro com sucesso, tente mais tarde'
            })
        })
    }

    useEffect(() => {
        if(verificaLogin() == 2){
            cadEvento();
        } else {
            navigate("/")
        }}, []);

    return(
        <>
        <Header />
        <h1 className="head">Cadastro de Eventos</h1>
        <div className="container_form">
            {status.type === 'erro'? <p>{status.mensagem}</p> : ""}
            {status.type === 'sucess'? <p>{status.mensagem}</p> : ""}
            
            <form className="form" onSubmit={cadEvento}>
                <div className="formulario_container">
                <div className="formulario">
                <label htmlFor="chave_convite">Chave Convite</label>
             
                <input 
                type="text"
                placeholder="Somente NÚMEROS"
                name="chave_convite"
                maxLength={10}
                onChange={valorInput}
                />
           
                </div>
                <div className="formulario">
                <label className="label" htmlFor="nome_do_evento">Nome do Evento:</label>
                
                <input 
                type="text"
                placeholder="Digite aqui o nome do evento"
                name="nome_do_evento"
                onChange={valorInput}
                />
             
                </div>
                <div className="formulario">
                <label className="label"  htmlFor="data">Data do evento:</label>
               
                <input 
                type="date"
                placeholder=""
                name="data"
                onChange={valorInput}
                />
               
                </div>
                <div className="formulario">
                <label className="label" htmlFor="informacoes">Informações do Evento:</label>
              
                <input 
                name="informacoes" 
                type="text"
                placeholder="Digite as informações necessarias para o evento"
                onChange={valorInput}
                />
              
                </div>
                <div className="formulario">
                <label className="label" htmlFor="local">Local</label>
             
                <input 
                type="text"
                placeholder="Digite aqui o local do evento"
                name="local"
                onChange={valorInput}
                />
                
                </div>
                <div className="submit_container">
                <button className = "submit" type="submit">Cadastrar</button>
                </div>
                </div>
            </form>
            <Link className="voltar_container" to="/home"><button className="voltar">Voltar para a pagina inicial</button></Link>
        </div>
        <Footer />
        </>
    )
}

export default CadastroEvento