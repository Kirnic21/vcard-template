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
                    <li><Link>Eventos</Link></li>
                    <li><Link>Minha Conta</Link></li>
                </ul>
            </div>

            <ul>
            <li><Link>Sair</Link></li>
            </ul>
        </div>
        </>
    )
}

export default Header