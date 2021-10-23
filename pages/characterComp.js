import Image from "next/dist/client/image"
import styles from '../styles/Home.module.css'
export default function characterComp(props){
  const activeImage = (props.charImage === "" ? "data:image/jpeg;base64,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" : props.charImage) ;
    return(
       <div className = {styles.characterCard}>
           
           
                <Image onClick={() => {
                  props.openCharInfo(props.id)
                }}  className={styles.characterImage} width={120} height={90} alt="test" src={activeImage} />
                
                <div className = {styles.cardInfoBox}>
                  <p className = {styles.cardName}>{props.name}</p>
                   
                  <p className ={styles.price}>{props.price} kr</p>    
                   <button className={styles.hireButton} onClick =  {() => {
                  props.addToCart(props.id);
                }}>hire</button>
                </div>
         </div>
       
      
        
    )
}

