import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { verificaLogin } from "../../Utils/Utils";
import { useNavigate } from "react-router-dom";

const CaddastroVcard = () => {
    const navigate = useNavigate();
    const[data, setData] = useState([]);
    const[evento, setEvento] = useState([]);

    const [vcard, setVcard] = useState({
        titulo: '',
        descritivo: '',
        categoria: '',
        urls: '',
        data: '',
        fk_usuarios_id: '',
        fk_evento_id: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valorInput = (e) => setVcard({
            ...vcard, [e.target.name]: e.target.value
        })

    const cadVcard = async (e) => {
        e.preventDefault();
        //console.log(adm.nome)
        await fetch("http://localhost/api_p2/cadastroVcard.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({vcard})
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
                mensagem: 'Vcard não cadastro com sucesso, tente mais tarde'
            })
        })
    }

    const getEventos = async () => {
        fetch("http://localhost/api_p2/eventos.php")
          .then((res) => res.json())
          .then((resJson) =>
            //console.log(resJson.records)
            setEvento(resJson.records)
          );
      };    

    const getUser = async () => {
        fetch("http://localhost/api_p2/users.php")
        .then((res) => res.json())
        .then((resJson) => {
            //console.log(resJson)
            setData(resJson)
        });
    };
    

    useEffect(() => {
        if(verificaLogin() == 2 || verificaLogin() == 3){
            getUser();
            getEventos();
        } else {
            navigate("/")
        }}, []);

    return(
        <>
            <Header />
            <h1>Cadastre seu vcard</h1>
            <hr />
            {status.type === 'erro'? <p>{status.mensagem}</p> : ""}
            {status.type === 'sucess'? <p>{status.mensagem}</p> : ""}
                <form className="formulario_container2" onSubmit={cadVcard}>
                    <label htmlFor="titulo">Titulo do VCARD</label>
                    <br />
                    <input
                     type="text" 
                     name="titulo" 
                     onChange={valorInput}
                     />
                    <br />
                    <label htmlFor="descritivo">Descritivo</label>
                    <br />
                    <input 
                    type="text"  
                    name="descritivo"
                    onChange={valorInput}
                    />
                    <br />
                    <label htmlFor="categoria">Categoria</label>
                    <br />
                    <select 
                    type="text"  
                    name="categoria"
                    onChange={valorInput}
                    >
                        <option value="categoria" selected disabled>Selecione a categoria do seu vcard</option>
                        <option value="Educação">Educação</option>
                        <option value="Conhecimentos gerais">Conhecimentos Gerais</option>
                        <option value="Atualidades">Atualidades</option>
                        <option value="Politica">Politica</option>
                        <option value="Institucional">Institucional</option>
                        <option value="Tecnologia">Tecnologia</option>

                    </select>
                    <br />
                    <label htmlFor="urls">Link das Midias sociais/Conteudos:</label>
                    <br />
                    <input 
                    type="text"  
                    name="urls"
                    onChange={valorInput}
                    />
                    <br />
                    <label htmlFor="data">Data da exposição</label>
                    <br />
                    <input 
                    type="date" 
                    name="data"
                    onChange={valorInput}
                    />
                    <br />
                    <label htmlFor="fk_usuarios_id">Expositor:</label>
                    <br />
                    <select 
                    name="fk_usuarios_id" 
                    onChange={valorInput}
                    >
                        <option value="selecione" selected disabled>Selecione seu nome</option>
                        {Object.values(data).map(exp => (
                            <>
                            {exp.permissao == 3 && (
                        <option value={exp.id}>{exp.nome} {exp.sobrenome}</option>
                            )}
                            </>
                        ))}
                    </select>
                    <br />

                    <label htmlFor="fk_evento_id">Evento:</label>
                    <br />
                    <select 
                    name="fk_evento_id" 
                    onChange={valorInput}
                    >   
                        <option value="selecione" selected disabled>Selecione o evento da exposição</option>
                        {Object.values(evento).map(exp => (
                        <option value={exp.id}>{exp.nome_do_evento} {exp.nome}</option>
                        ))}
                    </select>
                    <br />
                    <button type="submit">Cadastrar</button>
                </form>


            <Footer />
        </>
    )
}

export default CaddastroVcard