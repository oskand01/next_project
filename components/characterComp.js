import Image from "next/dist/client/image";
import styles from "../styles/Home.module.css";
export default function characterComp(props) {
  
  return (
    <div className={styles.characterCard}>
      <div className={styles.cardInfoBox}>
        <p className={styles.cardName}>{props.name}</p>
      </div>
      <div
        className={styles.imageHolder}
        style={
          props.charImage === "/../public/avatar.jpg"
            ? { border: "1px solid rgb(44, 45, 46)" }
            : { border: "none" }
        }
      >
        <Image
          onClick={() => {
            props.openCharInfo(props.id);
          }}
          className={styles.characterImage}
          layout={"fill"}
          objectFit={"cover"}
          alt="test"
          src={props.charImage}
        />
        <p className={styles.price}>{props.price}:-</p>
      </div>

      <button
        className={styles.hireButton}
        onClick={() => {
          props.addToCart(props.id);
        }}
      >
        HIRE
      </button>
    </div>
  );
}
