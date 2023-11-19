import Header from "../Components/Header"
import Formulario from "../Components/Formulario"
import "./style.css"
import Footer from "../Components/Footer"
const CadastroExpositor = ()=>{
   return(
       <div className = "container_cadastro">
           <Header></Header>
           <h1 className="cadastro">Cadastra-se</h1>
           <form className="formulario_container">
               <div className="formularioDiv">
               <div className="Formulario">
               <label htmlFor="nome">Nome</label>
               <input type="text" id="nome" name="nome" />
               </div>
               
               <div className="Formulario">
               <label htmlFor="email">E-mail</label>
               <input type="email" id="email" name="email" />
               </div>
               <div className="Formulario">
               <label htmlFor="senha">Senha</label>
               <input type="text" id="senha" name="senha" />
               </div>
               <div className="Formulario">
               <label htmlFor="contato">Contato(numero de celular)</label>
               <input type="number" id="contato" name="contato" />
               </div>
        
               <div className="Formulario">
               <label htmlFor="temas">Temas</label>
               <input type="text" id="temas" name="temas" />
               </div>
               <div className="Formulario">
               <label htmlFor="data">Data</label>
               <input type="date" id="" name="interesse" />
               </div>
               <div className="botoes">
               <div className="botao">
                   <span className="circulo " > </span>
                   <label className="label">Visitante</label>
                   </div>
                   <div className="botao">
                   <span className="circulo current"> </span>
                   <label className="label">Expositor</label>
                   </div>
                   <div className="botao">
                   <span className="circulo"> </span>
                   <label className="label">Organizador</label>
                   </div>
               <div className="btn_enviar">
               <input className="enviar" type="submit" value="Criar Cadastro" />
               </div>
               </div>
               </div>
           </form>
           
           <a className="admnistrador">Sou Admnistrador</a>
           <Footer></Footer>
       </div>
   )}
   
export default CadastroExpositor