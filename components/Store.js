import { useState, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import styles from "../styles/Cart.module.css";
import Link from "next/link";
import CartItem from "../components/CartItem";
import ConfirmOrder from "./ConfirmOrder";

export default function Store(props) {
  const [total, setTotal] = useState();
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState(false);

  const items = products.map((item) => (
    <CartItem
      key={item.name + Math.random().toString()}
      item={item}
      productsHandler={productsHandler}
    />
  ));

  useEffect(() => {
    setProducts(props.items);
  }, []);

  useEffect(() => {
    let price = 0;

    products.forEach((item) => {
      price += item.price;
    });
    setTotal(price);
  }, [products]);

  function productsHandler(item) {
    setProducts(products.filter((product) => product !== item));
  }

  function confirmOrder() {
    setOrder(true);
  }

  function resetCart() {
    setProducts([]);
    //setContext when it´s done
    setOrder(false);
  }

  return order ? (
    <ConfirmOrder products={products} total={total} resetOrder={resetCart} />
  ) : (
    <div className={styles.store}>
      <div className={styles.sheader}>
        <AiOutlineShoppingCart className={styles.icon} />
        <h4>Shopping Cart</h4>
        <div></div>
      </div>
      <div className={styles.itemList}>
        {total > 0 ? (
          items
        ) : (
          <div className={styles.empty}>
            <h1>The cart is empty</h1>
          </div>
        )}
      </div>
      <div className={styles.sfooter}>
        <h3 className={styles.total}>Total: {total}:-</h3>
        {total > 0 ? (
          <button className={styles.confirm} onClick={confirmOrder}>
            CONFIRM ORDER
          </button>
        ) : (
          <Link href={"/"}>
            <button className={styles.confirm}>GO BACK</button>
          </Link>
        )}
      </div>
    </div>
  );
}
