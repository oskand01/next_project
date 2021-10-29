import { useState, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import styles from "../styles/Cart.module.css";
import Link from "next/link";
import CartItem from "../components/CartItem";
import {useContext} from "react";
import{
  ThemeContext,
  THEME_ACTIONS,
} from "../components/context/ThemeProvider";
import ConfirmOrder from "./ConfirmOrder";

export default function Store() {
  const [total, setTotal] = useState();
  const themeContext = useContext(ThemeContext);
  const [order, setOrder] = useState(false);
  

  let items = false;
  
  useEffect(() => {
    if(themeContext.shoppingCart != false){
      updateCart()
    }
   
  }, []);
  
  
  useEffect(() => {
    let price = 0;

    themeContext.shoppingCart.shoppingCart.forEach((item) => {
      price += item.price;
    });
    setTotal(price);
  });
 
  useEffect(() => {
    updateCart();
  },themeContext.shoppingCart);
 
 function updateCart(){
  items = themeContext.shoppingCart.shoppingCart.map((item) => (
    <CartItem
     key={item.name + Math.random().toString()}
     item={item}
     productsHandler={productsHandler}
    />
));

 }
  
  function productsHandler(name) {
    themeContext.shoppingCart.shoppingCartDispatch( {type: THEME_ACTIONS.REMOVE_FROM_CART,item:themeContext.shoppingCart.shoppingCart.filter((product) => product.name !== name)});
  }

  function confirmOrder() {
    setOrder(true);
  }

  function resetCart() {
    themeContext.shoppingCart.shoppingCartDispatch( {type: THEME_ACTIONS.REMOVE_FROM_CART,item:[]});
    
    //setContext when it´s done
    setOrder(false);
  }

  return order ? (
    <ConfirmOrder products={themeContext.shoppingCart.shoppingCart} total={total} resetOrder={resetCart} />
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
