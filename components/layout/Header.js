import styles from "../../styles/Header.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeProvider";

export default function Header() {
  const [merch, setMerch] = useState(false);
  const router = useRouter();
  const context = useContext(ThemeContext);

  useEffect(() => {
    if (context.shoppingCart.shoppingCart.length > 0) {
      setMerch(true);
    } else {
      setMerch(false);
    }
  });

  return (
    <header>
      <nav className={styles.header}>
        <div>
          <Link href="/" passHref>
            <h1 className={styles.title}>HARRY FOR HIRE</h1>
          </Link>
        </div>
        <div>
          {router.asPath !== "/shopping-cart" && (
            <Link href="/shopping-cart" passHref>
              <i>
                {merch ? (
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
