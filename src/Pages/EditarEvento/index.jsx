import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./style.css"

const EditarEvento = () => {
    const navigate = useNavigate();
    
    const location = useLocation();
    const id = location.state?.id;

    const [chave_convite, setChaveConvite] = useState('');
    const [nome_do_evento, setNomeEvento] = useState('');
    const [data, setData] = useState('');
    const [informacoes, setInfo] = useState('');
    const [local, setLocal] = useState('');

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })


    const editEvento = async (e) => {
        e.preventDefault();
        //console.log(nomeEvento)

        await fetch('http://localhost/api_p2/editarEvento.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, chave_convite, nome_do_evento, data, informacoes, local})
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
                mensagem: 'Produto não editado com sucesso, tente mais tarde.'
            })
        });

        navigate(-1)
    }

    useEffect(() => {
        const getEvento = async () => {
            await fetch('http://localhost/api_p2/visualizarEvento.php?id=' + id)
            .then((res) => res.json())
            .then((resJson) => {
                console.log(resJson)
                setChaveConvite(resJson.evento.chave_convite);
                setNomeEvento(resJson.evento.nome_do_evento);
                setData(resJson.evento.data);
                setInfo(resJson.evento.informacoes);
                setLocal(resJson.evento.local);
            });
        }
        getEvento();
    },[id]);

    return(
        <>
        <Header />
        <h1>EDITAR</h1>

            {status.type === 'error'? <p>{status.mensagem}</p> : ""}
            {status.type === 'sucess'? <p>{status.mensagem}</p> : ""}
            <div className="container_form2">
            <form className="formulario_container2" onSubmit={editEvento}>
                <div className="formulario2">
                <label htmlFor="chave_convite">Chave Convite</label>
                <br />
                <input 
                type="text"
                placeholder="Somente NÚMEROS"
                name="chave_convite"
                maxLength={10}
                value={chave_convite}
                onChange={e => setChaveConvite(e.target.value)}
                />
                <br />
                
                </div>
                <div className="formulario2">
                <label htmlFor="nome_do_evento">Nome do Evento:</label>
                <br />
                <input 
                type="text"
                placeholder="Digite aqui o nome do evento"
                name="nome_do_evento"
                value={nome_do_evento}
                onChange={e => setNomeEvento(e.target.value)}
                />
                <br />
                </div>
                <div className="formulario2">
                <label  htmlFor="data">Data do evento:</label>
                <br />
                <input 
                type="date"
                placeholder=""
                name="data"
                value={data}
                onChange={e => setData(e.target.value)}
                />
                <br />
                </div>
                <div className="formulario2">
                <label htmlFor="informacoes">Informações do Evento:</label>
                <br />
                <input 
                name="informacoes" 
                type="text"
                placeholder="Digite as informações necessarias para o evento"
                value={informacoes}
                onChange={e => setInfo(e.target.value)}
                />
                <br />
                </div>
                <div className="formulario2">
                <label htmlFor="local">Local</label>
                <br />
                <input 
                type="text"
                placeholder="Digite aqui o local do evento"
                name="local"
                value={local}
                onChange={e => setLocal(e.target.value)}
                />
                </div>
                <button type="submit">Editar Evento</button>
                
            </form>
            </div>
        <Footer />
        </>
    )
}

export default EditarEvento