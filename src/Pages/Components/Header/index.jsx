import Vcard from "/image/VCARD.png"
import "../Header/header.css"
import { Link, useNavigate } from "react-router-dom"
import { verificaLogin } from "../../../Utils/utils"
import { verificaId } from "../../../Utils/Id"

const Header = () => {
    const navigate = useNavigate();

    function logoutSubmit(){
        document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "permission=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate('/')
    }
    const  userId = verificaId();

    return(
        <>
        <div className="cabecalho">
            <div className="cabecalho-menu">
            <img src={Vcard}alt="Logo" />
                <ul className="menu">
                    <li className="menu-item"><Link to='/home'>Eventos</Link></li>

                    {verificaLogin() == 1 && (
                        <>
                        <li className="menu-item"><Link to='/visualizaradms'>Administradores</Link></li>
                        <li className="menu-item"><Link to='/organizadores'>Organizadores</Link></li>
                        </>
                    )}

                    {(verificaLogin() == 1 || verificaLogin() == 2) && (
                       <li className="menu-item"><Link to='/expositores'>Expositores</Link></li>
                    )}
                    
                    <li className="menu-item"><Link to='/visualizarvcards'>Vcards</Link></li>
                </ul>
            </div>

            <ul className="menu-conta">
            <li><Link to={'/conta/' + userId} state={{ id: userId }}>Minha Conta</Link></li>
            <li onClick={logoutSubmit}><Link >Sair</Link></li>
            </ul>
        </div>
        </>
    )
}

export default Header