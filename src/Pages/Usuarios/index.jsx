import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { verificaLogin } from "../../Utils/Utils";
import { useNavigate } from "react-router-dom";

const Usuarios = () => {
    const[data, setData] = useState([]);
    const navigate = useNavigate();
    const getUsers = async () => {
        fetch("http://localhost/api_p2/users.php")
        .then((res) => res.json())
        .then((resJson) => {
            //console.log(resJson.records)
            setData(resJson)
        });
    };

    useEffect(() => {
        if(verificaLogin() == 1){
            getUsers();
        } else {
            navigate("/")
        }}, []);
    return(
        <>
        <Header />
        <h1>Usuários</h1>
        <hr />
        {Object.values(data).map(user => (
            <>
        <label><b>Nome:</b></label>
        <br />
        <p>{user.nome}</p>
        <br />
        
        <label><b>Sobrenome:</b></label>
        <br />
        <p>{user.sobrenome}</p>
        <br />

        <label><b>E-mail:</b></label>
        <br />
        <p>{user.email}</p>
        <br />

        <label><b>Contato:</b></label>
        <br />
        <p>{user.contato}</p>
        <br />
        {user.permissao == 3 && (
            <>
        <label><b>Tema exposto:</b></label>
        <br />
        <p>{user.expo}</p>
        <br />
        </>
        )}
        {user.permissao == 4 && (
        <>
        <label><b>Interesses:</b></label>
        <br />
        <p>{user.interesses}</p>
        <br />
        </>
        )}
        <label><b>Data de cadastro:</b></label>
        <br />
        <p>{user.data}</p>
        <br />
        {user.permissao == 1 && (
        <>   
        <label><b>Tipo de usuário:</b></label>
        <br />
        <p>Administrador</p>
        <br />
        </>
        )}
        {user.permissao == 2 && (
        <>   
        <label><b>Tipo de usuário:</b></label>
        <br />
        <p>Organizador</p>
        <br />
        </>
        )}
        {user.permissao == 3 && (
        <>   
        <label><b>Tipo de usuário:</b></label>
        <br />
        <p>Expositor</p>
        <br />
        </>
        )}
        {user.permissao == 4 && (
        <>   
        <label><b>Tipo de usuário:</b></label>
        <br />
        <p>Usuario</p>
        <br />
        </>
        )}
        <hr />
        </>
        ))}
        <Footer/>
        </>
    )
}

export default Usuarios