import { useState } from "react"

import Frente from "./Frente"
import Verso from "./Verso"
import FlipCard from "./FlipCard";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";
import { DarkModeToggle } from "./Toggle";
const cards = [
    {
      id: "1",
      variant: "hover",
      front: "Hover",
      back: "Back"
    },
    {
      id: "2",
      variant: "click",
      front: "Click",
      back: "Back"
    },
    {
      id: "3",
      variant: "focus",
      front: "Focus",
      back: "Back"
    }
  ];
  
const VCard = ()=>{
    //mudar states
    let [virado,setVirado] = useState(false)
    const trocar = ()=>{
        setVirado(!virado)
    }
   
    
    return(
       <div>
        <div className="pagina">
      <FlipCard card={cards[1]}></FlipCard>
     
        </div>
        <div className="toggle">
         <DarkModeToggle></DarkModeToggle>
         </div>
         </div>
    )
}
export default VCard