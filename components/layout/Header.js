import styles from "../../styles/Header.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <header>
      <nav className={styles.header}>
        <div>
          <Link href="/" passHref>
            <h1 className={styles.title}>HARRY HORDER</h1>
          </Link>
        </div>
        <div>
          {router.asPath !== "/shopping-cart" && (
            <Link href="/shopping-cart" passHref>
              <a>
                <AiOutlineShoppingCart className={styles.cart} />
              </a>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
