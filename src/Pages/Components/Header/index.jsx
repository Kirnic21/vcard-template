import Vcard from "/image/VCARD.png"
import "../Header/header.css"
import { Link } from "react-router-dom"

const Header = () => {

    return(
        <>
        <div className="cabecalho">
            <div className="cabecalho-menu">
            <img src={Vcard}alt="Logo" />
                <ul className="menu">
                    <li className="menu-item"><Link to='/home'>Eventos</Link></li>
                    <li className="menu-item"><Link to='/visualizaradms'>Administradores</Link></li>
                    <li className="menu-item"><Link to='/organizadores'>Organizadores</Link></li>
                    <li className="menu-item"><Link to='/expositores'>Expositores</Link></li>
                </ul>
            </div>

            <ul className="menu-conta">
            <li><Link to='/conta'>Minha Conta</Link></li>
            <li><Link>Sair</Link></li>
            </ul>
        </div>
        </>
    )
}

export default Header