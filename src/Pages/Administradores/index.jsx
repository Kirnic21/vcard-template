import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const VisuAdm = () => {
    const navigate = useNavigate();

    const[data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const getAdms = async () => {
        fetch("http://localhost/api_p2/administradores.php")
        .then((res) => res.json())
        .then((resJson) => {
            //console.log(resJson.records)
            setData(resJson)
        });
    };
    
    const apagarAdm = async (idAdm) => {
        //console.log(idEvento)
        await fetch("http://localhost/api_p2/apagarAdm.php?id=" + idAdm)
        .then((res) => res.json())
        .then((resJson) => {
            console.log(resJson);
        }).catch(() => {
            console.log("Erro: Administrador não apagado com sucesso, tente mais tarde")
        });
        window.location.reload();
        alert('Administrador excluido com sucesso!')
    }
    useEffect(() => {
        getAdms();
    },[]);
    return(
        <>
        <Header />
            <h1>Administradores</h1>
            <Link to={'/cadastroadm'}>
            <button>Cadastrar Administrador</button>
            </Link>
            <hr />
            {Object.values(data).map(adm => (
                <>
            <label htmlFor="id"><b>Id:</b></label>
            <p>{adm.id}</p>
            <label htmlFor="id"><b>Nome:</b></label>
            <p>{adm.nome}</p>
            <label htmlFor="id"><b>Sobrenome:</b></label>
            <p>{adm.sobrenome}</p>
            <label htmlFor="id"><b>Email:</b></label>
            <p>{adm.email}</p>
            <label htmlFor="id"><b>Senha:</b></label>
            <p>{adm.senha}</p>
            <Link 
            to={"/editaradm/" + adm.id}
            state={{ id: adm.id}}
            >
            <button>Editar administrador</button>
            </Link>
            <button onClick={() => apagarAdm(adm.id)}>Excluir administrador</button>
            
            <hr />
            </>
            ))}
            <Footer />
        </>
    )
}

export default VisuAdm