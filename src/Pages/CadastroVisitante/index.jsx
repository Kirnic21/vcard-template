import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import "./style.css";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

const CadastroVisitante = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        senha: '',
        contato: '',
        interesses: '',
        data: '',
        permissao: '',
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })


    const valorInput = (e) => setUsuarios({
            ...usuarios, [e.target.name]: e.target.value
        })

    const cadUsuarios = async (e) => {
        e.preventDefault();
        //console.log(adm.nome)
        await fetch("http://localhost/api_p2/cadastroVisitante.php", {
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
                    
                }, navigate('/'));
            
            }else{
                setStatus({
                    type:'sucess',
                    mensagem: resJson.messagem
                })
            }
        }).catch(() => {
            setStatus({
                type:'erro',
                mensagem: 'Visitante não cadastro com sucesso, tente mais tarde'
            })
        })
    }
  return (
    <div className="container_cadastro">
      <Header />
      <h1 className="cadastro">Cadastre-se para ter acesso a plataforma</h1>
            {status.type === 'erro'? <p>{status.mensagem}</p> : ""}
            {status.type === 'sucess'? <p>{status.mensagem}</p> : ""}
      <form className="formulario_container" onSubmit={cadUsuarios}>
        <div className="formularioDiv">
          <div className="Formulario">
            <label htmlFor="nome">Nome</label>
            <input
             type="text"  
             name="nome" 
             onChange={valorInput}  
             />
          </div>
          <div className="Formulario">
            <label htmlFor="sobrenome">Sobrenome</label>
            <input 
            type="text" 
            name="sobrenome"
             onChange={valorInput}  />
          </div>
          <div className="Formulario">
            <label htmlFor="email">E-mail</label>
            <input 
            ype="email"  
            name="email" 
            onChange={valorInput}  />
          </div>
          <div className="Formulario">
            <label htmlFor="senha">Senha</label>
            <input 
            type="password" 
            name="senha" 
            onChange={valorInput}  />
          </div>
          <div className="Formulario">
            <label htmlFor="contato">Contato(numero de celular)</label>
            <input 
            type="number"  
            name="contato" 
            onChange={valorInput}  />
          </div>
          <div className="Formulario">
            <label htmlFor="interesse">Interesse</label>
            <input 
            type="text"  
            name="interesse"
            onChange={valorInput}  />
          </div>
          <div className="Formulario">
            <label htmlFor="interesse">Data de cadastro</label>
            <input 
            type="date"  
            name="data" 
            onChange={valorInput}  />
          </div>
            <select name="permissao" onChange={valorInput}>
                <option value="0" selected disabled>Selecione</option>
                <option value="4">Visitante</option>
            </select>
          <div className="btn_enviar">
            <button type="submit">Cadastrar</button>
          </div>
        </div>
      </form>

      <Footer />
    </div>
  );
};

export default CadastroVisitante;
