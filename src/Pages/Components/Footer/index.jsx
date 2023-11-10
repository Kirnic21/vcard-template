import Vcard from "/image/VCARD.png";
import "../Footer/footer.css";


const Footer = () => {

    return(
        <>
        <div className="footer">
            <img src={Vcard} alt="logotipo" />
            <p>Av. União dos Ferroviários, 1760 - Centro, Jundiaí - SP, 13201-160</p>
        </div>
        </>

    )
}

export default Footer