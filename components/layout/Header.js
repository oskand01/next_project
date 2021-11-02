import styles from "../../styles/Header.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeProvider";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();
  const context = useContext(ThemeContext);

  useEffect(() => {
    context.shoppingCart.shoppingCart &&
      setCartCount(context.shoppingCart.shoppingCart.length);
  });

  return (
    <header>
      <nav className={styles.header}>
        <div>
          <Link href="/" passHref>
            <h1 className={styles.title}>HARRY FOR HIRE</h1>
          </Link>
        </div>
        <div className={styles.cartHolder}>
          {cartCount > 1 && (
            <span className={styles.cartCounter}>
              <p>{cartCount}</p>
            </span>
          )}
          {router.asPath !== "/shopping-cart" && (
            <Link href="/shopping-cart" passHref>
              <i>
                {cartCount > 0 ? (
                  <FaShoppingCart className={styles.cart2} />
                ) : (
                  <AiOutlineShoppingCart className={styles.cart} />
                )}
              </i>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
