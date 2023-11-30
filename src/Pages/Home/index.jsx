import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./home.css";
import fatec from "/image/fatec.png";
import { verificaLogin } from "../../Utils/Utils";

const Home = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const getEventos = async () => {
    fetch("http://localhost/api_p2/eventos.php")
      .then((res) => res.json())
      .then((resJson) =>
        //console.log(resJson),
        setData(resJson.records)
      );
  };

  useEffect(() => {
        getEventos();
  }, []);

  return (
    <>
      <Header />

      <h1>EVENTOS</h1>
      {(verificaLogin() == 1 || verificaLogin() == 2) && (
      <Link to={"/cadastroevento"}>
        <button>Cadastrar Evento</button>
      </Link>
      )}
      {Object.values(data).map((eventos) => (
        <>
          <div className="eventos">
            <div className="eventos-img">
              <img className="fatecimage" src={fatec} alt="imagem evento" />
            </div>
            <div className="eventos-info" key={eventos.id}>
              <h3>{eventos.nome_do_evento}</h3>
              <div className="data">
                <label>
                  <b>Data do evento:</b>
                </label>
                <p>{eventos.data}</p>
              </div>
              <div className="info">
                <label>
                  <b>Informações:</b>
                </label>
                <p>{eventos.informacoes}</p>
              </div>
              <div className="local">
                <label>
                  <b>Local:</b>
                </label>
                <p>{eventos.local}</p>
              </div>
              <Link
                to={"/visualizarevento/" + eventos.id}
                state={{ id: eventos.id }}
              >
                <button>Visualizar Evento</button>
              </Link>
            </div>
          </div>
        </>
      ))}
      <p></p>
      <p></p>
      <Footer />
    </>
  );
};

export default Home;
