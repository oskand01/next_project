import styles from "../styles/Cart.module.css";
import Link from "next/dist/client/link";

export default function ConfirmOrder({products, total, resetOrder}) {
  return (
    <div className={styles.confirmContainer}>
      <div className={styles.confirmBox}>
        <div>
          <h1>Thank you for your order!</h1>
        </div>
        <div className={styles.confirmList}>
          <ul className={styles.ul}>
            {products.map((item) => (
              <li className={styles.listItem} key={item.name + Math.random().toString()}><p>{item.name}</p><p>{item.price}:-</p></li>
            ))}

          </ul>
              <p className={styles.confirmTotal}>Total: {total}:-</p>
        </div>
        <div className={styles.confirmBtnHolder}><Link href={"/"} >
            <button className={styles.confirm} onClick={resetOrder} >GO BACK</button>
          </Link></div>
      </div>
    </div>
  );
}
