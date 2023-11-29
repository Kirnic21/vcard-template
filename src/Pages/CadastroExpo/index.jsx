import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./styles.css"
import { useNavigate } from "react-router-dom";

const CadastroExpo = () => {
    const navigate = useNavigate();
    const[data, setData] = useState([]);
    const [usuarios, setUsuarios] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        senha: '',
        contato: '',
        expo: '',
        data: '',
        permissao: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valorInput = (e) => setUsuarios({
            ...usuarios, [e.target.name]: e.target.value
        })

    const cadExp = async (e) => {
        e.preventDefault();
        //console.log(adm.nome)
        await fetch("http://localhost/api_p2/cadastroExpositor.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({usuarios})
        })
        .then((res) => res.json())
        .then((resJson) => {
            console.log(resJson)
            if(resJson.erro){
                setStatus({
                    type:'erro',
                    mensagem: resJson.messagem
                });
            }
            else{
                setStatus({
                    type:'sucess',
                    mensagem: resJson.messagem
                })
            }navigate('/')
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
        <div className="formulario3232">
        <form className="formulario_container3" onSubmit={cadExp}>
            <label htmlFor="nome"><b>Nome:</b></label>
            <br />
            <input 
            type="text"
            name="nome"
            onChange={valorInput}
            />
            <br />
            <label htmlFor="nome"><b>Sobrenome:</b></label>
            <br />
            <input 
            type="text"
            name="sobrenome"
            onChange={valorInput}
            />
            <br />

            <label htmlFor="email"><b>E-mail:</b></label>
            <br />
            <input 
            type="text"
            name="email"
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

            <label htmlFor="contato"><b>Contato:</b></label>
            <br />
            <input 
            type="text"
            name="contato"
            maxLength={12}
            onChange={valorInput}
            />

            <br />

            <label htmlFor="expo"><b>Assunto à expor:</b></label>

            <br />
            <input 
            type="text"
            name="expo"
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

            <label htmlFor="permissao"><b>Evento da exposição:</b></label>
            <br />
            <select name="permissao" onChange={valorInput}>
                <option value="Selecione" disabled selected>Selecione o expositor...</option>
                    <option value={3}>Expositor</option>
            </select>
            <br />
            <button type="submit">Cadastrar</button>
        </form>
        </div>
        <Footer />
        </>
    )
}

export default CadastroExpo