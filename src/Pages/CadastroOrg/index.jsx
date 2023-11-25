import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { verificaLogin } from "../../Utils/utils";

const CadastroOrg = () => {
    const navigate = useNavigate();

    const[data, setData] = useState([]);

    const [organizador, setOrganizador] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        senha: '',
        fk_administradores_id: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valorInput = (e) => setOrganizador({
            ...organizador, [e.target.name]: e.target.value
        })

    const cadOrg = async (e) => {
        e.preventDefault();
        //console.log(adm.nome)
        await fetch("http://localhost/api_p2/cadastroOrg.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({organizador})
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
                mensagem: 'Organizador não cadastro com sucesso, tente mais tarde'
            })
        })
    }

    const getAdms = async () => {
        fetch("http://localhost/api_p2/administradores.php")
        .then((res) => res.json())
        .then((resJson) => {
            //console.log(resJson.records)
            setData(resJson)
        });
    };
    

    return(
        <>
            <Header />
            <h1>Cadastro de organizadores</h1>
            <hr />
            {status.type === 'erro'? <p>{status.mensagem}</p> : ""}
            {status.type === 'sucess'? <p>{status.mensagem}</p> : ""}
            <form className="formulario_container2" onSubmit={cadOrg}>  
                <label htmlFor="nome"><b>Nome</b></label>
                <br />
                <input 
                type="text"
                name="nome"
                onChange={valorInput} 
                />
                <br />
                <label htmlFor="sobrenome"><b>Sobrenome</b></label>
                <br />
                <input 
                type="text"
                name="sobrenome"
                onChange={valorInput}  
                />
                <br />
                <label htmlFor="email"><b>E-mail</b></label>
                <br />
                <input 
                type="text" 
                name="email"
                onChange={valorInput} 
                />
                <br />
                <label htmlFor="senha"><b>Senha</b></label>
                <br />
                <input 
                type="text"
                name="senha"
                onChange={valorInput}
                />
                <br />
                <label htmlFor="fk_administradores_id"><b>Administrador Responsável</b></label>
                <br />
                <select name="fk_administradores_id" onChange={valorInput}>
                    <option value="seleciona" selected disabled >Selecione</option>
                    {Object.values(data).map(adm => ( 
                    <option key={adm.id} value={adm.id}>{adm.nome} {adm.sobrenome}</option>
                    ))}
                </select>
                <br />
                <button>Cadastrar</button>
            </form>
            <Footer />
        </>
    )
}

export default CadastroOrg