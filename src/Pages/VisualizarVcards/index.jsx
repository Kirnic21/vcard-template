import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import fatec from "/image/fatec.png";
import "./style.css"
import { verificaLogin } from "../../Utils/Utils";
import FlipCard from "../Components/FlipCard";
import QRCode from "react-qr-code";
import { rotaApi } from "../../config";


const VisualizarVcards = () => {
  const [data, setData] = useState([]);


  const gerarQRCode = (id) => {
    const url = rotaApi + 'vcard/' + id;
    console.log("url", url)
    return(url);
  }

  const getVcards = async () => {
    fetch(rotaApi + "api_p2/vcards.php")
      .then((res) => res.json())
      .then((resJson) => {
        //console.log(resJson)
        setData(resJson);
      });
  };

  const apagarVcard = async (idVcard) => {
    //console.log(idEvento)
    await fetch(rotaApi + "api_p2/apagarVcard.php?id=" + idVcard)
      .then((res) => res.json())
      .then((resJson) => {
        //console.log(resJson);
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
    gerarQRCode();
  }, []);
  
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
        < div className="vcards2" key={vcard.id}>
      <FlipCard card={cards[1]} titulo = {vcard.titulo} descricao = {vcard.descritivo} categoria = {vcard.categoria} url = {vcard.urls} dados = {vcard.data}></FlipCard>
          {(verificaLogin() == 1 || verificaLogin() == 3) && (
            <>
            <div className="botoesdovcard">
              <Link to={"/editarvcard/" + vcard.id} state={{ id: vcard.id }}>
                <button>Editar VCard</button>
              </Link>

              <Link state={{ id: vcard.id }}>
                <button onClick={() => apagarVcard(vcard.id)}>
                  Excluir VCard
                </button>
              </Link>
              <Link to={'/vcard/' + vcard.id} state={{ id: vcard.id }}>
                <button>Visualizar VV</button>
              </Link>
              </div>
            </>
            )}
            <QRCode value={gerarQRCode(vcard.id)}/>
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
