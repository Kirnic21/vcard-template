import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";

const Organizadores = () => {
    const navigate = useNavigate();

    const[data, setData] = useState([]);

    const getOrgs = async () => {
        fetch("http://localhost/api_p2/organizadores.php")
        .then((res) => res.json())
        .then((resJson) => {
            //console.log(resJson)
            setData(resJson)
        });
    };
    
        const apagarOrg = async (idOrg) => {
        //console.log(idEvento)
        await fetch("http://localhost/api_p2/apagarOrg.php?id=" + idOrg)
        .then((res) => res.json())
        .then((resJson) => {
            console.log(resJson);
        }).catch(() => {
            console.log("Erro: Administrador não apagado com sucesso, tente mais tarde")
        });
        navigate('/home')
    } 
    useEffect(() => {
        getOrgs();
    },[]);

    return(
        <>
        <Header />
        <h1>Organizadores</h1>
        <hr />
        {Object.values(data).map(org => (
            <>
            <label htmlFor="id"><b>Id:</b></label>
            <p>{org.id}</p>
            <label htmlFor="id"><b>Nome:</b></label>
            <p>{org.nome}</p>
            <label htmlFor="id"><b>Sobrenome:</b></label>
            <p>{org.sobrenome}</p>
            <label htmlFor="id"><b>Email:</b></label>
            <p>{org.email}</p>
            <label htmlFor="id"><b>Senha:</b></label>
            <p>{org.senha}</p>
            <Link
            to={"/editarorg/" + org.id}
            state={{ id : org.id }} 
            >
            <button>Editar organizador</button>
            </Link>
            <button onClick={() => apagarOrg(org.id)}>Excluir organizador</button>
            
            <hr />
            </>
        ))}
        <Footer />
        </>
    )
}

export default Organizadores