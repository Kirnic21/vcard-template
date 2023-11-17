import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link, useLocation, useParams } from "react-router-dom";

const VisualizarEvento = () => {
    const location = useLocation();
    const id = location.state?.id;

    const [data, setData] = useState([]);
    useEffect(() => {
        const getEvento = async () => {
            await fetch('http://localhost/api_p2/visualizarEvento.php?id=' + id)
            .then((res) => res.json())
            .then((resJson) => {
                //console.log(resJson)
                setData(resJson.evento);
            });
        }
        getEvento();
    },[id]);
    return(
        <>
            <Header />
            <p><b>Id:</b> <br />{data.id}</p>
            <p><b>Chave Convite:</b><br />{data.chave_convite}</p>
            <p><b>Nome do evento:</b><br /> {data.nome_do_evento}</p>
            <p><b>Data do evento:</b><br /> {data.data}</p>
            <p><b>Informações do Evento:</b><br /> {data.informacoes}</p>
            <p><b>Local do evento:</b><br /> {data.local}</p> 
            <Link
             to={'/editarevento/' + data.id} 
             state={{ id : data.id }}
             >
                <button>Editar Evento</button>
             </Link>
             <Link to="/home"><button>Voltar para a pagina inicial</button></Link>
            <Footer />
        </>
    )
}

export default VisualizarEvento