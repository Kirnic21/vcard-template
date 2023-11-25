import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./style.css"
import { verificaLogin } from "../../Utils/utils";

const CadastroAdmin = () => {
    const navigate = useNavigate();
    
    const [administrador, setAdministrador] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        senha: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valorInput = (e) => setAdministrador({
            ...administrador, [e.target.name]: e.target.value
        })

    const cadAdm = async (e) => {
        e.preventDefault();
        //console.log(adm.nome)
        await fetch("http://localhost/api_p2/cadastroAdm.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({administrador})
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
                mensagem: 'Administrador não cadastro com sucesso, tente mais tarde'
            })
        })
    }
    
    useEffect(() => {
        if(verificaLogin() == 1){
            cadAdm();
        } else {
            navigate("/")
        }}, []);
    return(
        <>
        <Header />
        <h1>Cadastrar Administrador</h1>
            {status.type === 'erro'? <p>{status.mensagem}</p> : ""}
            {status.type === 'sucess'? <p>{status.mensagem}</p> : ""}
        <form className = "formulario_container2" onSubmit={cadAdm}>
        <div>
          <label htmlFor="nome">Nome</label>
          <br />
          <input 
          type="text" 
          name="nome" 
          onChange={valorInput}
          />
        </div>
        <div>
          <label htmlFor="sobrenome">Sobrenome</label>
          <br />
          <input 
          type="text" 
          name="sobrenome" 
          onChange={valorInput}
          />
        </div>
        <div>
          <label htmlFor="email">E-mail</label>
          <br />
          <input
          type="text" 
          name="email"
          onChange={valorInput}
        />
        </div>
        <div>
          <label htmlFor="number">Senha</label>
          <br />
          <input 
          type="semha"  
          name="senha"
          onChange={valorInput}
          />
        </div>
        <br />
        <button>Cadastrar</button>
      </form>
    <Footer />
    </>
  );
};

        
    


export default CadastroAdmin;