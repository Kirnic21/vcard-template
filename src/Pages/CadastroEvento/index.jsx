import React, { useState } from "react"
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import { Link } from "react-router-dom"

const CadastroEvento = () => {

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

    return(
        <>
        <Header />
        <div>
            {status.type === 'erro'? <p>{status.mensagem}</p> : ""}
            {status.type === 'sucess'? <p>{status.mensagem}</p> : ""}
            <form onSubmit={cadEvento}>
                <label htmlFor="chave_convite">Chave Convite</label>
                <br />
                <input 
                type="text"
                placeholder="Somente NÚMEROS"
                name="chave_convite"
                maxLength={10}
                onChange={valorInput}
                />
                <br />
                <label htmlFor="nome_do_evento">Nome do Evento:</label>
                <br />
                <input 
                type="text"
                placeholder="Digite aqui o nome do evento"
                name="nome_do_evento"
                onChange={valorInput}
                />
                <br />
                <label  htmlFor="data">Data do evento:</label>
                <br />
                <input 
                type="date"
                placeholder=""
                name="data"
                onChange={valorInput}
                />
                <br />
                <label htmlFor="informacoes">Informações do Evento:</label>
                <br />
                <input 
                name="informacoes" 
                type="text"
                placeholder="Digite as informações necessarias para o evento"
                onChange={valorInput}
                />
                <br />
                <label htmlFor="local">Local</label>
                <br />
                <input 
                type="text"
                placeholder="Digite aqui o local do evento"
                name="local"
                onChange={valorInput}
                />

                <button type="submit">Cadastrar</button>
            </form>
            <Link to="/home"><button>Voltar para a pagina inicial</button></Link>
        </div>
        <Footer />
        </>
    )
}

export default CadastroEvento