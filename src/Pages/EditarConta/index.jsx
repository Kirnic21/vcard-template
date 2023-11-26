import React, { useEffect, useState }  from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { verificaLogin } from "../../Utils/utils";
import { verificaId } from "../../Utils/Id";
import { useNavigate } from "react-router-dom";

const EditarConta = () => {
    const navigate = useNavigate();

    const  id = verificaId();

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [contato, setContato] = useState('');
    const [expo, setExpo] = useState('');
    const [interesses, setInteresses] = useState('');

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })
    

    const editUser = async (e) => {
        e.preventDefault();
        //console.log(nome)

        await fetch("http://localhost/api_p2/editarUsuario.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, nome, sobrenome, email, senha, contato, expo, interesses})
        }).then((res) => res.json())
        .then((resJson) => {
            //console.log(resJson);
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
                mensagem: 'Usuário não editado com sucesso, tente mais tarde.'
            })
        });
        navigate(-1)
    }
    
    const setFields = (data) => {
        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setSenha(data.senha);
        setContato(data.contato);
        setExpo(data.expo);
        setInteresses(data.interesses);
      };

    const getUser = async () => {
        try {
            await fetch('http://localhost/api_p2/users.php?id=' + id)
            .then((res) => {
                return res.json();
            }).then(data => {
                //console.log('id', id)
                //console.log('data', data)
                const userData = data.find(item => item.id == id);
                //console.log('admData', userData)
                if(userData){
                    setFields(userData)
                }
            })
        } catch (error) {
            console.error('Erro na requisição ', error)
        }
    }

    useEffect(() => {
        getUser();
        verificaLogin();
        verificaId();
    }, [])
    return(
        <>
            <Header />
            <h1>Edite seus dados</h1>
            <hr />
            <form onSubmit={editUser}>
                <label htmlFor="nome">Nome:</label>
                <br />
                <input
                type="text"
                name="nome"
                value={nome} 
                onChange={e => setNome(e.target.value)}
                />
                <br />
                
                <label htmlFor="sobrenome">Sobrenome:</label>
                <br />
                <input
                type="text" 
                name="sobrenome" 
                value={sobrenome} 
                onChange={e => setSobrenome(e.target.value)}
                />
                <br />

                <label htmlFor="email">E-mail:</label>
                <br />
                <input
                type="text" 
                name="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                />
                <br />

                <label htmlFor="senha">Senha:</label>
                <br />
                <input
                type="password" 
                name="senha" 
                value={senha} 
                onChange={e => setSenha(e.target.value)}
                />
                <br />

                <label htmlFor="contato">Contato:</label>
                <br />
                <input 
                type="text" 
                name="contato"
                value={contato} 
                onChange={e => setContato(e.target.value)} 
                />
                <br />
                {verificaLogin() == 3 && (
                    <>
                <label htmlFor="expo">Tema exposto:</label>
                <br />
                <input 
                type="text" 
                name="expo"
                value={expo} 
                onChange={e => setExpo(e.target.value)} 
                />
                <br />
                </>
                )}
                {verificaLogin() == 4 && (
                    <>
                <label htmlFor="interesses">Interesses:</label>
                <br />
                <input 
                type="text" 
                name="interesses"
                value={interesses} 
                onChange={e => setInteresses(e.target.value)}
                 />
                <br />
                </>
                )}

                <button>Editar</button>
            </form>
            <Footer />
        </>
    )
}

export default EditarConta