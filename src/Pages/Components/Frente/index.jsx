import React, { useEffect, useState }  from 'react';
import ss from '../../../assets/ss.jpeg';



const Frente = (props) => {
  return (
      <div className="frente">
        <img className="imagem" src={props.imgsrc}></img>
        <div className='texto'>
        <h2 h2 className="titulo">{props.titulo}</h2>
        <p className='descricao'>
     {props.descricao}</p>
</div>
</div>
  );
}

export default Frente;
