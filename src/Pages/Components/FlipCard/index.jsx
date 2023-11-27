import { useState } from "react"; 
import cn from "classnames";
import Verso from "../Verso";
import Frente from "../Frente";
import fatec from'/image/fatec.png'


function FlipCard( props ) {
  const [showBack, setShowBack] = useState(false); 

  function handleClick() { 
    if (props.card.variant === "click") { 
      setShowBack(!showBack); 
    } 
  } 

  return (
    <div
      className="flip-card-outer"
      onClick={handleClick} 
    >
      <div
        className={cn("flip-card-inner", {
          showBack, 
          "hover-trigger": props.card.variant === "hover"
        })}
      >
        <div className="card front">
          <div className="card-body d-flex justify-content-center align-items-center">
            <div className="card-text fs-1 fw-bold"><Frente
            titulo = {props.titulo}
            descricao = {props.descricao}
            imgsrc={fatec}></Frente></div>
          </div>
        </div>
        <div className="card back">
          <div className="card-body d-flex justify-content-center align-items-center">
            <div className="card-text fs-1 fw-bold"><Verso
            categoria = {props.catogoria}
            url= {props.url}
            dados = {props.dados}></Verso></div>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default FlipCard;