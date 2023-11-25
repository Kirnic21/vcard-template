import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import fatec from "/image/fatec.png";
import { verificaLogin } from "../../Utils/utils";

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

  useEffect(() => {
    getVcards();
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

      {Object.values(data).map((cards) => (
        <>
          <img src={fatec} alt="fatec" />
          <p>
            <b>Id:</b> <br />
            {cards.id}
          </p>
          <p>
            <b>Titulo do VCard:</b>
            <br />
            {cards.titulo}
          </p>
          <p>
            <b>Descritivo</b>
            <br /> {cards.descritivo}
          </p>
          <p>
            <b>Categoria</b>
            <br /> {cards.categoria}
          </p>
          <p>
            <b>Links das Midias sociais:</b>
            <br />
            {cards.urls}
          </p>
          <p>
            <b>Data da exposição</b>
            <br />
            {cards.data}
          </p>
          <p>
            <b>Registros</b>
            <br />
            {cards.registros}
          </p>
          <p>
            <b>Visualizações</b>
            <br />
            {cards.visualizacoes}
          </p>
          <p>
            <b>Expositor responsável:</b>
            <br />
            {cards.fk_expositores_id}
          </p>

          {(verificaLogin() == 1 || verificaLogin() == 3) && (
            <>
              <Link to={"/editarvcard/" + cards.id} state={{ id: cards.id }}>
                <button>Editar VCard</button>
              </Link>

              <Link state={{ id: cards.id }}>
                <button onClick={() => apagarVcard(cards.id)}>
                  Excluir VCard
                </button>
              </Link>
            </>
          )}
          <hr />
        </>
      ))}
      <Link to="/home">
        <button>Voltar para a pagina inicial</button>
      </Link>
      <Footer />
    </>
  );
};

export default VisualizarVcards;
