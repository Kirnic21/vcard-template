import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useNavigate, useLocation } from "react-router-dom";

const EditarVcard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const id = location.state?.id;

    const [titulo, setTitulo] = useState('');
    const [descritivo, setDescritivo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [urls, setUrls] = useState('');
    const [data, setData] = useState('');

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const editVcard = async (e) => {
        e.preventDefault();
        //console.log(nome)

        await fetch("http://localhost/api_p2/editarVcard.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, titulo, descritivo, categoria, urls, data})
        }).then((res) => res.json())
        .then((resJson) => {
            console.log(resJson);
            if(resJson.erro){
                setStatus({
                    type: 'error',
                    mensagem: resJson.mensagem
                })
            }else{
                setStatus({
                    type: 'sucess',
                    mensagem: resJson.mensagem
                })
            }
        }).catch(() => {
            setStatus({
                type: 'error',
                mensagem: 'Organizador não editado com sucesso, tente mais tarde.'
            })
        });

        navigate(-1)
    }

    const setFields = (data) => {
      setTitulo(data.titulo);
      setDescritivo(data.descritivo);
      setCategoria(data.categoria);
      setUrls(data.urls);
      setData(data.data);
    };

    

    const getVcard = async () => {
        try {
            await fetch('http://localhost/api_p2/vcards.php?id=' + id)
            .then((res) => {
                return res.json();
            }).then(data => {
                console.log('id', id)
                console.log('data', data)
                const vcardData = data.find(item => item.id == id);
                console.log('admData', vcardData)
                if(vcardData){
                    setFields(vcardData)
                }
            })
        } catch (error) {
            console.error('Erro na requisição ', error)
        }
    }

    useEffect(() => {
        console.log('location.state?.id', location.state?.id); 
    },[]);


    useEffect(() => {
        getVcard(); 
    },[]);

    return(
        <>
        <Header />
        <h1>Editar VCARD</h1>
        <hr />
        <form className="formulario_container2" onSubmit={editVcard}>
                    <label htmlFor="titulo">Titulo do VCARD</label>
                    <br />
                    <input
                     type="text" 
                     name="titulo" 
                     onChange={e => setTitulo(e.target.value)}
                     value={titulo} 
                     />
                    <br />
                    <label htmlFor="descritivo">Descritivo</label>
                    <br />
                    <input 
                    type="text"  
                    name="descritivo"
                    onChange={e => setDescritivo(e.target.value)}
                    value={descritivo} 
                    />
                    <br />
                    <label htmlFor="categoria">Categoria</label>
                    <br />
                    <input 
                    type="text"  
                    name="categoria"
                    onChange={e => setCategoria(e.target.value)}
                    value={categoria} 
                    />
                    <br />
                    <label htmlFor="urls">Link das Midias sociais/Conteudos:</label>
                    <br />
                    <input 
                    type="text"  
                    name="urls"
                    onChange={e => setUrls(e.target.value)}
                    value={urls} 
                    />
                    <br />
                    <label htmlFor="data">Data da exposição</label>
                    <br />
                    <input 
                    type="date" 
                    name="data"
                    onChange={e => setData(e.target.value)}
                    value={data} 
                    />
                    <br />
                    <button type="submit">Editar</button>
                </form>
        <Footer />
        </>
    )
}

export default EditarVcard