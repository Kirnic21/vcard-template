import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useNavigate, useLocation } from "react-router-dom";

const EditarExpo = () => {
    const[records, setRecords] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const id = location.state?.id;

    const [nome, setNome] = useState('');
    const [e_mail, setE_mail] = useState('');
    const [senha, setSenha] = useState('');
    const [tema, setTema] = useState('');
    const [contato, setContato] = useState('');
    const [data, setData] = useState('');
    const [fk_evento_id, setFk_evento_id] = useState('');

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })
    

    const editExp = async (e) => {
        e.preventDefault();
        //console.log(nome)

        await fetch("http://localhost/api_p2/editarExpositor.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, nome, e_mail, senha, tema, contato, data, fk_evento_id})
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
                mensagem: 'Expositor não editado com sucesso, tente mais tarde.'
            })
        });
        navigate(-1)
    }
    
    const setFields = (data) => {
        setNome(data.nome);
        setE_mail(data.e_mail);
        setSenha(data.senha);
        setTema(data.tema);
        setContato(data.contato);
        setData(data.data);
        setFk_evento_id(data.fk_evento_id);
      };

    const getExp = async () => {
        try {
            await fetch('http://localhost/api_p2/expositores.php?id=' + id)
            .then((res) => {
                return res.json();
            }).then(data => {
                //console.log('id', id)
                //console.log('data', data)
                const expoData = data.find(item => item.id == id);
               // console.log('admData', expoData)
                if(expoData){
                    setFields(expoData)
                }
            })
        } catch (error) {
            console.error('Erro na requisição ', error)
        }
    }

    const getEventos = async () => {
        fetch("http://localhost/api_p2/eventos.php")
        .then((res) => res.json())
        .then((resJson) => {
            //console.log(resJson)
            setRecords(resJson.records)
        });
    };

    useEffect(() => {
        getEventos();
        getExp();
    },[]);

    return(
        <>
        <Header />
        <h1>Editando Expositor</h1>
        <hr />
        <form onSubmit={editExp}>
            <label htmlFor="nome"><b>Nome:</b></label>
            <br />
            <input 
            type="text" 
            name="nome"
            value={nome} 
            onChange={e => setNome(e.target.value)}
            />
            <br />
            
            <label htmlFor="e_mail"><b>E-mail:</b></label>
            <br />
            <input 
            type="text" 
            name="e_mail"
            value={e_mail} 
            onChange={e => setE_mail(e.target.value)}
            />
            <br />
                       
            <label htmlFor="senha"><b>Senha:</b></label>
            <br />
            <input 
            type="password" 
            name="senha"
            value={senha} 
            onChange={e => setSenha(e.target.value)}
            />
            <br />
            
            <label htmlFor="tema"><b>Tema da exposição:</b></label>
            <br />
            <input 
            type="text" 
            name="tema"
            value={tema} 
            onChange={e => setTema(e.target.value)}
            />
            <br />
            
            <label htmlFor="contato"><b>Contato:</b></label>
            <br />
            <input 
            type="text" 
            name="contato"
            value={contato} 
            onChange={e => setContato(e.target.value)}
            />
            <br />
            
            <label htmlFor="data"><b>Data da exposição:</b></label>
            <br />
            <input 
            type="date" 
            name="data"
            value={data} 
            onChange={e => setData(e.target.value)}
            />
            <br />
            
            <label htmlFor="fk_evento_id"><b>Evento da exposição:</b></label>
            <br />
            <select
             name="fk_evento_id" 
             onChange={e => setFk_evento_id(e.target.value)}
             >
                <option value="">Selecione</option>
                {Object.values(records).map(evento => (
                    <option value={evento.id} key={evento.id}>{evento.nome_do_evento}</option>
                ))}
            </select>
            <br />
            <button type="submit">Editar</button>
        </form>
        <Footer />
        </>
    )
}

export default EditarExpo