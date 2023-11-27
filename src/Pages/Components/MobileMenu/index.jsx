import { forwardRef, useState } from "react";
import "./estilo.css"
import imagem from "../../../assets/buger.png"
import { Link, useNavigate } from "react-router-dom"
import Vcard from "/image/VCARD.png"
const Menu = (props) => {
    let [mobileOn,setMobile] = useState(false)
    const hide =()=>{
        setMobile(!mobileOn)
    }
    return (
      <div className="mobilemenu">
        <div className="mobile">
        <img src ={Vcard} className="image"></img>
        <img onClick={hide} src={imagem} className = "hamburger-image"></img>
        </div>
        
        {mobileOn &&
        <ul className = "navigation-list-hamburger ">
        <li className="navigate"><Link className="navigate2" to='/home'>Eventos</Link></li>
        <li className="navigate"><Link className="navigate2" to='/usuarios'>Usuários</Link></li>
        <li className="navigate"><Link className="navigate2" to='/visualizarvcards'>Vcards</Link></li>
       </ul>
        }
      </div>
    );
  }
export default Menu;