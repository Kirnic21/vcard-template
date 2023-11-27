import Header from "../Components/Header"
import Footer from "../Components/Footer"
import "./conta.css"
import React, { useEffect, useState } from "react"
import dados from "/image/Dados.png"
import { verificaLogin } from "../../Utils/Utils"
import { verificaId } from "../../Utils/Id"
import { Link, useNavigate } from "react-router-dom"



const Conta = () => {
    const navigate = useNavigate('');
    const [data, setData] = useState('');

    const  userId = verificaId();

    function logoutSubmit(){
        document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "permission=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    const getUser = async () => {
        await fetch("http://localhost/api_p2/usuarios.php?id=" + userId)
          .then((res) => res.json())
          .then((resJson) => {
            console.log(resJson)
            setData(resJson.user);
          });
      };
      const apagarEvento = async (idUsuario) => {
        //console.log(idEvento)
        await fetch("http://localhost/api_p2/apagarUsuario.php?id=" + idUsuario)
          .then((res) => res.json())
          .then((resJson) => {
            console.log(resJson);
            logoutSubmit();
          })
          .catch(() => {
            console.log("Erro: Evento não apagado com sucesso, tente mais tarde");
          });
        navigate("/home");
      };

      useEffect(() => {
        if(verificaLogin() == null){
            navigate("/")
        } else {
            getUser();
            verificaLogin();
            verificaId();
        }}, []);


    return(
        <div className="containerconta">
        <Header />

            <div className="container-geral">
                
                <div className="container-form">
                    <div className="title">
                        <h3>Seus dados</h3>
                    </div>
                    <div className="name">
                        <label htmlFor="name"><b>Nome</b></label>
                        <p>{data.nome}</p>
                    </div>
                    <div className="email">
                        <label htmlFor="email"><b>Sobrenome:</b></label>
                        <p>{data.sobrenome}</p>
                    </div>
                    <div className="expo">
                        <label htmlFor="expor"><b>E-mail:</b></label>
                        <p>{data.email}</p>
                    </div>
                    <div className="number">
                        <label htmlFor="number"><b>Contato:</b></label>
                        <p>{data.contato}</p>
                    </div>

                    {verificaLogin() == 3 && (
                    <div className="number">
                        <label htmlFor="number"><b>Tema da exposição:</b></label>
                        <p>{data.expo}</p>
                    </div>
                    )}

                    {verificaLogin() == 4 && (
                    <div className="number">
                        <label htmlFor="number"><b>Interesses:</b></label>
                        <p>{data.interesses}</p>
                    </div>
                    )}

                    <div className="number">
                        <label htmlFor="number"><b>Data:</b></label>
                        <p>{data.data}</p>
                    </div>

                    {verificaLogin() == 1 && (
                        <>
                        <label htmlFor="cad_org"><b>Link para cadastro de organizador:</b></label>
                        <p>http://localhost:5173/cadastroorg</p>
                        <label htmlFor="cad_org"><b>Link para cadastro de administrador:</b></label>
                        <p>http://localhost:5173/cadastroadm</p>
                        </>
                    )}

                    {verificaLogin() == 2 && (
                        <>
                        <label htmlFor="cad_org"><b>Link para cadastro de expositor:</b></label>
                        <p>http://localhost:5173/cadastroexpositor</p>
                        </>
                    )}

                    {verificaLogin() == 3 && (
                        <>
                            <Link to={'/cadastrovcard'}>
                                <button>
                                    Cadastrar seu VCARD
                                </button>
                            </Link>
                        </>
                    )}
                    {verificaLogin() == 3 && (
                        <>
                            <Link to={'/vcard'}>
                                <button>
                                    Visualizar VCARD
                                </button>
                            </Link>
                        </>
                    )}
                    <Link to={'/editarconta/' + userId} state={{ id: userId}}>
                        <button className="">
                            Alterar seus dados
                        </button>
                    </Link>

                    <Link state={{ id: userId }}>
                        <button onClick={() => apagarEvento(data.id)} >
                            Excluir Conta
                        </button>
                    </Link>
                </div>
            <div className="img-dados">
                <img src={dados} alt="proteção de dados" />
            </div>
        </div>
    <Footer />
</div>
)
}

export default Conta