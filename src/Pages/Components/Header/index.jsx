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
                        <li className="menu-item"><Link to='/usuarios'>Usuários</Link></li>
                        </>
                    )}
                    <li className="menu-item"><Link to='/visualizarvcards'>Vcards</Link></li>
                </ul>
            </div>

            <ul className="menu-conta">
            {verificaLogin() != null && (
                <>
            <li><Link to={'/conta/' + userId} state={{ id: userId }}>Minha Conta</Link></li>
            <li onClick={logoutSubmit}><Link >Sair</Link></li>
                </>
            )}
                       {verificaLogin() == null && (
                <>
            <li><Link to={'/cadastrovisitante'}>Cadastrar-se</Link></li>
            <li><Link to={'/'}>Login</Link></li>
                </>
            )}
            </ul>
        </div>
        </>
    )
}

export default Header