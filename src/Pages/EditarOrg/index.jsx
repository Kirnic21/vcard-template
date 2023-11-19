import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";     
import { useNavigate, useLocation } from "react-router-dom"; 

const EditarOrg = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const id = location.state?.id;

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const editOrg = async (e) => {
        e.preventDefault();
        //console.log(nome)

        await fetch("http://localhost/api_p2/editarorg.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, nome, sobrenome, email, senha})
        }).then((res) => res.json())
        .then((resJson) => {
            console.log(resJson);
            if(resJson.erro){
                setStatus({
                    type: 'error',
                    mensagem: resJson.mensagem
                })
            }else{
                setStatus({
                    type: 'sucess',
                    mensagem: resJson.mensagem
                })
            }
        }).catch(() => {
            setStatus({
                type: 'error',
                mensagem: 'Organizador não editado com sucesso, tente mais tarde.'
            })
        });

        navigate(-1)
    }

    const setFields = (data) => {
      setNome(data.nome);
      setSobrenome(data.sobrenome);
      setEmail(data.email);
      setSenha(data.senha);
    };

    

    const getOrg = async () => {
        try {
            await fetch('http://localhost/api_p2/organizadores.php?id=' + id)
            .then((res) => {
                return res.json();
            }).then(data => {
                console.log('id', id)
                console.log('data.records', data)
                const orgData = data.find(item => item.id == id);
                console.log('admData', orgData)
                if(orgData){
                    setFields(orgData)
                }
            })
        } catch (error) {
            console.error('Erro na requisição ', error)
        }
    }

    useEffect(() => {
        console.log('location.state?.id', location.state?.id); 
    },[]);


    useEffect(() => {
        getOrg(); 
    },[]);


    return(
        <>
        <Header />
        <h1>Editar Organizador</h1>
        <hr />
        <form onSubmit={editOrg}>
        <div>
          <label htmlFor="nome">Nome</label>
          <br />
          <input 
          type="text" 
          name="nome"
          value={nome} 
          onChange={e => setNome(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sobrenome">Sobrenome</label>
          <br />
          <input 
          type="text" 
          name="sobrenome"
          value={sobrenome} 
          onChange={e => setSobrenome(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">E-mail</label>
          <br />
          <input
          type="text" 
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        </div>
        <div>
          <label htmlFor="number">Senha</label>
          <br />
          <input 
          type="senha"  
          name="senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          />
        </div>
        <br />
        <button type="submit">Editar</button>
      </form>
        <Footer />
        </>
    )
}

export default EditarOrg