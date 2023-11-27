import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import fatec from "/image/fatec.png";
import "./style.css"
import { verificaLogin } from "../../Utils/Utils";
import FlipCard from "../Components/FlipCard";

const VisualizarVcards = () => {
  const [data, setData] = useState([]);

  const getVcards = async () => {
    fetch("http://localhost/api_p2/vcards.php")
      .then((res) => res.json())
      .then((resJson) => {
        //console.log(resJson)
        setData(resJson);
      });
  };

  const apagarVcard = async (idVcard) => {
    //console.log(idEvento)
    await fetch("http://localhost/api_p2/apagarVcard.php?id=" + idVcard)
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
      })
      .catch(() => {
        console.log("Erro: Vcard não apagado com sucesso, tente mais tarde");
      });
    navigate("/visualizarvcards");
  };
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
  useEffect(() => {
    getVcards();
  }, []);``
  
  return (
    <>
      <Header />
      <h1>Visualizar VCards</h1>

      {(verificaLogin() == 1 ||
        verificaLogin() == 2 ||
        verificaLogin() == 3) && (
        <Link to={"/cadastrovcard"}>
          <button>Cadastrar VCARD</button>
        </Link>
      )}
      <hr />
      <div className="vcards">
      {Object.values(data).map(vcard => (
        <>
        < div lassName="vcards2">
      <FlipCard card={cards[1]} titulo = {vcard.titulo} descricao = {vcard.descritivo} categoria = {vcard.categoria} url = {vcard.urls} dados = {vcard.data}></FlipCard>
          {(verificaLogin() == 1 || verificaLogin() == 3) && (
            <>
            <div className="botoesdovcard">
              <Link to={"/editarvcard/" + cards.id} state={{ id: cards.id }}>
                <button>Editar VCard</button>
              </Link>

              <Link state={{ id: cards.id }}>
                <button onClick={() => apagarVcard(cards.id)}>
                  Excluir VCard
                </button>
              </Link>
              </div>
            </>
            
          )}
          </div>
          </>
      ))}
      </div>
          <hr />
    
      
      <Link to="/home">
        <button>Voltar para a pagina inicial</button>
      </Link>
      <Footer />
    </>
  );
};

export default VisualizarVcards;
