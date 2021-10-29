import { useState, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import styles from "../styles/Cart.module.css";
import Link from "next/link";
import CartItem from "../components/CartItem";
import { useContext } from "react";
import {
  ThemeContext,
  THEME_ACTIONS,
} from "../components/context/ThemeProvider";
import ConfirmOrder from "./ConfirmOrder";

export default function Store() {
  const [total, setTotal] = useState();
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState(false);
  const themeContext = useContext(ThemeContext);
  let items = [];

  if (products.length > 0) {
    items = products.map((item, index) => (
      <CartItem key={index} item={item} productsHandler={productsHandler} />
    ));
  }

  useEffect(() => {
    themeContext.shoppingCart.shoppingCart &&
      setProducts(themeContext.shoppingCart.shoppingCart);
  });

  useEffect(() => {
    let price = 0;

    products.length > 0 &&
      products.forEach((item) => {
        price += item.price;
      });
    setTotal(price);
  }, [products]);

  function productsHandler(item) {
    themeContext.shoppingCart.shoppingCartDispatch({
      type: THEME_ACTIONS.REMOVE_FROM_CART,
      item: themeContext.shoppingCart.shoppingCart.filter(
        (product) => product !== item
      ),
    });
    setProducts(themeContext.shoppingCart.shoppingCart);
  }

  function confirmOrder() {
    setOrder(true);
  }

  function resetCart() {
    themeContext.shoppingCart.shoppingCartDispatch({
      type: THEME_ACTIONS.REMOVE_FROM_CART,
      item: [],
    });

    setOrder(false);
  }

  return order ? (
    <ConfirmOrder
      products={themeContext.shoppingCart.shoppingCart}
      total={total}
      resetOrder={resetCart}
    />
  ) : (
    <div className={styles.store}>
      <div className={styles.sheader}>
        <AiOutlineShoppingCart className={styles.icon} />
        <h4>Shopping Cart</h4>
        <div></div>
      </div>
      <div className={styles.itemList}>
        {products.length > 0 ? (
          items
        ) : (
          <div className={styles.empty}>
            <h1>The cart is empty</h1>
          </div>
        )}
      </div>
      <div className={styles.sfooter}>
        <h3 className={styles.total}>Total: {total}:-</h3>
        {products.length > 0 ? (
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
