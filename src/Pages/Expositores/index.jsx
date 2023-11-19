import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link, useNavigate, useLocation } from "react-router-dom";


const Expositores = () => {
    const[data, setData] = useState([])

    const getExp = async () => {
        fetch("http://localhost/api_p2/expositores.php")
        .then((res) => res.json())
        .then((resJson) => {
            //console.log(resJson)
            setData(resJson)
        });
    };
    
    const apagarAdm = async (idExp) => {
        //console.log(idExp)
        await fetch("http://localhost/api_p2/apagarExp.php?id=" + idExp)
        .then((res) => res.json())
        .then((resJson) => {
            console.log(resJson);
        }).catch(() => {
            console.log("Erro: Expositor não apagado com sucesso, tente mais tarde")
        });
        window.location.reload();
        alert('Expositor excluido com sucesso!')
    }

    useEffect(() => {
        getExp();
    },[]);
    return (
        <>
        <Header />
        <h1>Expositores</h1>
        <Link to={'/cadastroexpositor'}>
            <button>Cadastrar Expositor</button>
        </Link>
        <hr />
        {Object.values(data).map(exp => (
            <>
            <label><b>Id:</b></label>
            <p>{exp.id}</p>
            <label><b>Nome do Expositor:</b></label>
            <p>{exp.nome}</p>
            <label><b>E-mail:</b></label>
            <p>{exp.e_mail}</p>
            <label><b>Senha:</b></label>
            <p>********</p>
            <label><b>Assunto da exposição:</b></label>
            <p>{exp.tema}</p>
            <label><b>Contato:</b></label>
            <p>{exp.contato}</p>
            <label><b>data:</b></label>
            <p>{exp.data}</p>
            <Link 
            to={"/editarexpo/" + exp.id}
            state={{ id: exp.id}}
            >
            <button>Editar expositor</button>
            </Link>
            <button onClick={() => apagarAdm(exp.id)}>Excluir expositor</button>
            <hr />
            </>
        ))}

            
            <hr />
        <Footer />
        </>
    )
}

export default Expositores