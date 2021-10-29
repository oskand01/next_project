import { useState, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import styles from "../styles/Cart.module.css";
import Link from "next/link";
import CartItem from "../components/CartItem";
import {useContext} from "react";
import{ThemeContext} from "../components/context/ThemeProvider";

export default function Store(props) {
  const [total, setTotal] = useState();
  const themeContext = useContext(ThemeContext);
  let currentCart = themeContext.shoppingCart;
  console.log(themeContext.shoppingCart);

  let items = false;
  if(currentCart != false){
    updateCart()
  }
  useEffect(() => {
    let price = 0;

    currentCart.forEach((item) => {
      price += item.price;
    });
    setTotal(price);
  });
 
  useEffect(() => {
    console.log("in use effect");
    updateCart();
  },currentCart);
 
 function updateCart(){
  items = currentCart.map((item) => (
    <CartItem
     key={item.name + Math.random().toString()}
     item={item}
     productsHandler={productsHandler}
    />
));
 }
  
  function productsHandler(name) {
    themeContext.shoppingCartDispatch(currentCart.filter((product) => product.name !== name));
  }

  function clearProducts() {
    setProducts([]);
  }

  return (
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
          <button className={styles.confirm} onClick={clearProducts}>
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
