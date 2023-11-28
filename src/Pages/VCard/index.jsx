import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import FlipCard from "../Components/FlipCard";
import imgwpp from "../../assets/wpp.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles.scss";
import add from "../../assets/add.png";
import email from "../../assets/email.png";
import { DarkModeToggle } from "../../Toggle";
import { verificaLogin } from "../../Utils/Utils";


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

const VCard = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const id = location.state?.id;

  const getVcards = async () => {
    await fetch("http://localhost/api_p2/visualizarVcard.php?id=" + id)
      .then((res) => res.json())
      .then((resJson) => {
        //console.log(resJson)
        setData(resJson.vcard);
      });
  };
  //mudar states
  let [virado, setVirado] = useState(false);
  const trocar = () => {
    setVirado(!virado);
  };

  useEffect(() => {
    getVcards()
  }, [])
  //Lembrar:colocar a fonte da logo de email no readme
  return (
      <>
    <div>
      <div className="botoes">
        <div className="botaoadd">
          <Link to="whatsapp://send?%0a%0ahttp://localhost:5173/vcard">
            <img className="wpp" src={imgwpp} />
          </Link>
          
          <img className="wpp" src={add} />
          <Link to={"mailto://send?%0a%0a&body=http://localhost:5173/vcard"}>
            <img className="wpp" src={email} />
          </Link>
        </div>
      </div>
      <div className="pagina">
        <>
        <FlipCard card={cards[1]} titulo = {data.titulo} descricao = {data.descritivo} categoria = {data.categoria} url = {data.urls} dados = {data.data}></FlipCard>
        </>
      </div>
      <div className="toggle">
        <DarkModeToggle></DarkModeToggle>
      </div>
      {(verificaLogin() == null) && (
      <Link to={'/cadastrovisitante'}>
        Cadastre-se
      </Link>
      )}

      {(verificaLogin() == 4) && (
      <Link to={'/home'}>
        Ver todos eventos
      </Link>
      )}
    </div>
    </>
  );
};
export default VCard;
