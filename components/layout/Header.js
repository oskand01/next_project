import styles from "../../styles/Header.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoCartSharp } from "react-icons/io"
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

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
                <AiOutlineShoppingCart className={styles.cart} />
              </i>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
