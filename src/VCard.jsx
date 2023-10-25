import { useState } from "react"
import Frente from "./Frente"
import Verso from "./Verso"
const VCard = ()=>{
    //mudar states
    let [virado,setVirado] = useState(false)
    const trocar = ()=>{
        setVirado(!virado)
    }
    return(
        //se virado e falso, renderizar frente 
        <div onClick={trocar}>
        
        {!virado && <Frente ></Frente>}
        {virado && <Verso></Verso>}
        </div>
    )
}
export default VCard