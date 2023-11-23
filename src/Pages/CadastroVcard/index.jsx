import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const CaddastroVcard = () => {

    const[data, setData] = useState([]);

    const [vcard, setVcard] = useState({
        titulo: '',
        descritivo: '',
        categoria: '',
        urls: '',
        data: '',
        fk_expositores_id: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valorInput = (e) => setVcard({
            ...vcard, [e.target.name]: e.target.value
        })

    const cadVcard = async (e) => {
        e.preventDefault();
        //console.log(adm.nome)
        await fetch("http://localhost/api_p2/cadastroVcard.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({vcard})
        })
        .then((res) => res.json())
        .then((resJson) => {
            console.log(resJson)
            if(resJson.erro){
                setStatus({
                    type:'erro',
                    mensagem: resJson.messagem
                });
            }else{
                setStatus({
                    type:'sucess',
                    mensagem: resJson.messagem
                })
            }
        }).catch(() => {
            setStatus({
                type:'erro',
                mensagem: 'Vcard não cadastro com sucesso, tente mais tarde'
            })
        })
    }

    const getExpo = async () => {
        fetch("http://localhost/api_p2/expositores.php")
        .then((res) => res.json())
        .then((resJson) => {
            //console.log(resJson.records)
            setData(resJson)
        });
    };
    

    useEffect(() => {
        getExpo();
    },[]);

    return(
        <>
            <Header />
            <h1>Cadastre seu vcard</h1>
            <hr />
            {status.type === 'erro'? <p>{status.mensagem}</p> : ""}
            {status.type === 'sucess'? <p>{status.mensagem}</p> : ""}
                <form className="formulario_container2" onSubmit={cadVcard}>
                    <label htmlFor="titulo">Titulo do VCARD</label>
                    <br />
                    <input
                     type="text" 
                     name="titulo" 
                     onChange={valorInput}
                     />
                    <br />
                    <label htmlFor="descritivo">Descritivo</label>
                    <br />
                    <input 
                    type="text"  
                    name="descritivo"
                    onChange={valorInput}
                    />
                    <br />
                    <label htmlFor="categoria">Categoria</label>
                    <br />
                    <input 
                    type="text"  
                    name="categoria"
                    onChange={valorInput}
                    />
                    <br />
                    <label htmlFor="urls">Link das Midias sociais/Conteudos:</label>
                    <br />
                    <input 
                    type="text"  
                    name="urls"
                    onChange={valorInput}
                    />
                    <br />
                    <label htmlFor="data">Data da exposição</label>
                    <br />
                    <input 
                    type="date" 
                    name="data"
                    onChange={valorInput}
                    />
                    <br />
                    <label htmlFor="fk_expositores_id">Expositor:</label>
                    <br />
                    <select 
                    name="fk_expositores_id" 
                    onChange={valorInput}
                    >
                        {Object.values(data).map(exp => (
                        <option value={exp.id}>{exp.nome}</option>
                        ))}
                    </select>
                    <br />
                    <button type="submit">Cadastrar</button>
                </form>


            <Footer />
        </>
    )
}

export default CaddastroVcard