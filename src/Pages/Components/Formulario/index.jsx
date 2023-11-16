import React from "react";

const Formulario = () => {
 
  return (
    <>
      <form>
        <div>
          <label htmlFor="nome">Nome</label>
          <input type="text" id="nome" name="nome" />
        </div>
        <div>
          <label htmlFor="sobrenome">Sobrenome</label>
          <input type="text" id="sobrenome" name="sobrenome" />
        </div>
        <div>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="number">Número de celular</label>
          <input type="number" id="celular" name="number" />
        </div>
        <div>
          <label htmlFor="rg">RG</label>
          <input type="number" id="rg" name="rg" />
        </div>
        <div className="btn_enviar">
          <input type="submit" value="Criar Cadastro" />
        </div>
      </form>
    </>
  );
};

export default Formulario;
