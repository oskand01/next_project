import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { RiDeleteBinLine } from "react-icons/ri";

export default function CartItem(props) {
  const deleteItem = () => {
    props.productsHandler(props.item);
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.main}>
        <div className={styles.imageHolder}>
          <Image
            layout={"fill"}
            src={props.item.image}
            objectFit={"cover"}
            alt={props.item.name}
          />
        </div>
        <div className={styles.info}>
          <h2>{props.item.name}</h2>
          <p>
            <b>Gender: </b>
            {props.item.gender}
          </p>
          <p>
            <b>House: </b>
            {props.item.house}
          </p>
          <p>
            <b>Born: </b>
            {props.item.dateOfBirth}
          </p>
        </div>
      </div>

      <div className={styles.sidebar}>
        <button className={styles.delete} onClick={deleteItem}>
          <RiDeleteBinLine />
        </button>
        <h3>{props.item.price}:-</h3>
      </div>
    </div>
  );
}
