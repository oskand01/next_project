import Image from "next/image";
import styles from "../styles/Item.module.css";
import Link from "next/link";

export async function getStaticPaths(){
  const res = await fetch("http://hp-api.herokuapp.com/api/characters")
  const data = await res.json();

  const paths = data.map((item) =>{
    return{
      params: {
        itemName : item.name
      },
    };
  });

  return{
    paths : paths,
    fallback : false
  };
}

export async function getStaticProps({params}){
  const name = params.itemName;
  const res = await fetch(`http://hp-api.herokuapp.com/api/characters/`);
  const data = await res.json();

  const character = data.filter((char) => char.name === name);
  
  return{
    props: {char : character[0],
    },
  };
}

export default function Item ({char}){
    console.log(char.name);  
    console.log(char);  
    return (
      <div className={styles.cartItem}>
        <div className={styles.main}>
          <div className={styles.imageHolder}>
            <Image
              layout={"fill"}
              src={char.image}
              objectFit={"cover"}
              alt={char.name}
            />
          </div>
          <div className={styles.info}>
            <h2>{char.name}</h2>
            <p>
              <b>Gender: </b>
              {char.gender}
            </p>
            <p>
              <b>House: </b>
              {char.house}
            </p>
            <p>
              <b>Born: </b>
              {char.dateOfBirth}
            </p>
          </div>
        </div>
  
        <div className={styles.sidebar}>
         <Link href={"/"}>
          <button > Back </button>
          </Link>
          
        </div>
      </div>
    );
  }