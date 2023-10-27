import { useState } from "react"
import ReactFlipCard from 'reactjs-flip-card'
import Frente from "./Frente"
import Verso from "./Verso"
const VCard = ()=>{
    //mudar states
    let [virado,setVirado] = useState(false)
    const trocar = ()=>{
        setVirado(!virado)
    }
    const styles = {
        card: {
           width: '100%',
           height:"100vh"
        },
    }
    
    return(
        //se virado e falso, renderizar frente 
        <div className="pagina">
        <ReactFlipCard
        flipTrigger={'onClick'}
        containerStyle={styles.card}
       
        frontStyle={styles.card}
        backStyle={styles.card}
        frontComponent={<Frente></Frente>}
        backComponent={<Verso></Verso>}
        >

        </ReactFlipCard>
        </div>
    )
}
export default VCard