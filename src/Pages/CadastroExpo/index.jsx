import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./styles.css"

const CadastroExpo = () => {

    const [expositor, setExpositor] = useState({
        nome: '',
        e_mail: '',
        senha: '',
        tema: '',
        contato: '',
        data: '',
        fk_evento_id: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valorInput = (e) => setExpositor({
            ...expositor, [e.target.name]: e.target.value
        })

    const cadExp = async (e) => {
        e.preventDefault();
        //console.log(adm.nome)
        await fetch("http://localhost/api_p2/cadastroExpositor.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({expositor})
        })
        .then((res) => res.json())
        .then((resJson) => {
            console.log(resJson)
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
                mensagem: 'Expositor não cadastro com sucesso, tente mais tarde'
            })
        })
    }

    return(
        <>
        <Header />
        <h1>Cadastro de Expositor</h1>
        <hr />
        {status.type === "erro" ? <p>{status.mensagem}</p> : ""}
        {status.type === "sucess" ? <p>{status.mensagem}</p> : ""}
        <form className="formulario_container2" onSubmit={cadExp}>
            <label htmlFor="nome"><b>Nome:</b></label>
            <br />
            <input 
            type="text"
            name="nome"
            onChange={valorInput}
            />
            <br />
            <label htmlFor="e_mail"><b>E-mail:</b></label>
            <br />
            <input 
            type="text"
            name="e_mail"
            onChange={valorInput}
            />
            <br />
            <label htmlFor="senha"><b>Senha:</b></label>
            <br />
            <input 
            type="password"
            name="senha"
            onChange={valorInput}
            />
            <br />
            <label htmlFor="tema"><b>Assunto à expor:</b></label>
            <br />
            <input 
            type="text"
            name="tema"
            onChange={valorInput}
            />
            <br />
            <label htmlFor="contato"><b>Contato:</b></label>
            <br />
            <input 
            type="text"
            name="contato"
            maxLength={12}
            onChange={valorInput}
            />
            <br />
            <label htmlFor="data"><b>Data da exposição:</b></label>
            <br />
            <input 
            type="date"
            name="data"
            onChange={valorInput}
            />
            <br />
            <label htmlFor="nome"><b>Evento da exposição:</b></label>
            <br />
            <select name="fk_evento_id" onChange={valorInput}>
                <option value="Selecione">Selecione o evento...</option>
                {Object.values(data).map(evento => (
                    <option value={evento.id} key={evento.id}>{evento.nome_do_evento}</option>
                ))}
            </select>
            <br />
            <button type="submit">Cadastrar</button>
        </form>
        <Footer />
        </>
    )
}

export default CadastroExpo