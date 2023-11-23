import { useState } from "react"; 
import cn from "classnames";
import Verso from "../Verso";
import Frente from "../Frente";
import fatec from'/image/fatec.png'


function FlipCard( card ) {
  const [showBack, setShowBack] = useState(false); 

  function handleClick() { 
    if (card.variant === "click") { 
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
          "hover-trigger": card.variant === "hover"
        })}
      >
        <div className="card front">
          <div className="card-body d-flex justify-content-center align-items-center">
            <div className="card-text fs-1 fw-bold"><Frente
            titulo = "Curso Ciencia de dados"
            descricao = 'Curso para tecnologia'
            imgsrc={fatec}></Frente></div>
          </div>
        </div>
        <div className="card back">
          <div className="card-body d-flex justify-content-center align-items-center">
            <div className="card-text fs-1 fw-bold"><Verso
            categoria = "Tecnologia"
            url='xxxxxxxxxx'
            dados = 'xxxxxxxx'></Verso></div>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default FlipCard;