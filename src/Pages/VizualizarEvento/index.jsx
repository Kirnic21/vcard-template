import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FlipCard from "../Components/FlipCard";
import { verificaLogin } from "../../Utils/Utils";
import "./styles.css"

const VisualizarEvento = () => {
  const location = useLocation();
  const id = location.state?.id;
  const navigate = useNavigate();
  const [dataCards, setDataCards] = useState([]);
  const [data, setData] = useState([]);
  
  const cards = [
    {
      id: "1",
      variant: "hover",
      front: "Hover",
      back: "Back",
    },
    {
      id: "2",
      variant: "click",
      front: "Click",
      back: "Back",
    },
    {
      id: "3",
      variant: "focus",
      front: "Focus",
      back: "Back",
    },
  ];


  const getEvento = async () => {
    await fetch("http://localhost/api_p2/visualizarEvento.php?id=" + id)
      .then((res) => res.json())
      .then((resJson) => {
        //console.log(resJson)
        setData(resJson.evento);
      });
  };


  const getVcards = async () => {
    fetch("http://localhost/api_p2/vcards.php")
      .then((res) => res.json())
      .then((resJson) => {
        //console.log(resJson)
        setDataCards(resJson);
      });
  };

  useEffect(() => {
    getEvento();
    getVcards();
  }, []);

  const apagarEvento = async (idEvento) => {
    //console.log(idEvento)
    await fetch("http://localhost/api_p2/apagarEvento.php?id=" + idEvento)
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
      })
      .catch(() => {
        console.log("Erro: Evento não apagado com sucesso, tente mais tarde");
      });
    navigate("/home");
  };
  //dentro do flip card, os props sao:titulo, descricao, imgsrc, dados, url, 
  
  return (
    <>
      <Header />

      <h3>VCards já cadastrados nesse evento</h3>
      <div className="visualizareventos">
      {Object.values(dataCards).map((Vcards) => (
        <>
        {Vcards.fk_evento_id == data.id && (
      <FlipCard card={cards[1]} titulo = {[Vcards.titulo]} descricao = {Vcards.descritivo} dados = {Vcards.data} url = {Vcards.urls} categoria= {Vcards.categoria}></FlipCard>
        )}
      </>
      ))}
</div>
      <hr />
        <div className="infoevento">
      <h3>Informações do Evento</h3>

      <p>
        <b>Id:</b> <br />
        {data.id}
      </p>
      <p>
        <b>Chave Convite:</b>
        <br />
        {data.chave_convite}
      </p>
      <p>
        <b>Nome do evento:</b>
        <br /> {data.nome_do_evento}
      </p>
      <p>
        <b>Data do evento:</b>
        <br /> {data.data}
      </p>
      <p>
        <b>Informações do Evento:</b>
        <br /> {data.informacoes}
      </p>
      <p>
        <b>Local do evento:</b>
        <br /> {data.local}
      </p>
      </div>
      <div className="botoesevento">
      {(verificaLogin() == 1 || verificaLogin() == 2) && (
          <>
            <Link to={"/editarevento/" + data.id} state={{ id: data.id }}>
              <button>Editar Evento</button>
            </Link>

            <Link state={{ id: data.id }}>
              <button onClick={() => apagarEvento(data.id)}>
                Excluir Evento
              </button>
            </Link>
          </>
        )}
      </div>
      <Link className="homevoltar" to="/home">
        <button>Voltar para a pagina inicial</button>
      </Link>
      {(verificaLogin() == 2 || verificaLogin() == 3) && (
      <Link to={"/cadastrovcard"}>
        <button>Criar VCARD</button>
      </Link>
      
      )}
      <Footer />
    </>
  );
};

export default VisualizarEvento;
