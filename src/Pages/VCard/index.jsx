import { useState } from "react";

import FlipCard from "../Components/FlipCard";
import imgwpp from "../../assets/wpp.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles.scss";
import add from "../../assets/add.png";
import email from "../../assets/email.png";
import { DarkModeToggle } from "../../Toggle";


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
  //mudar states
  let [virado, setVirado] = useState(false);
  const trocar = () => {
    setVirado(!virado);
  };

  //Lembrar:colocar a fonte da logo de email no readme
  return (
    <div>
      <div className="botoes">
        <div className="botaoadd">
          <img className="wpp" src={imgwpp} />
          <img className="wpp" src={add} />
          <img className="wpp" src={email} />
        </div>
      </div>
      <div className="pagina">
        <FlipCard card={cards[1]}></FlipCard>
      </div>
      <div className="toggle">
        <DarkModeToggle></DarkModeToggle>
      </div>
    </div>
  );
};
export default VCard;
