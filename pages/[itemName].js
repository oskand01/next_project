import Image from "next/image";
import styles from "../styles/Item.module.css";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../components/context/ThemeProvider";

export async function getStaticPaths() {
  const res = await fetch("http://hp-api.herokuapp.com/api/characters");
  const data = await res.json();

  const paths = data.map((item) => {
    return {
      params: {
        itemName: item.name,
      },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const name = params.itemName;
  const res = await fetch(`http://hp-api.herokuapp.com/api/characters/`);
  const data = await res.json();

  const character = data.filter((char) => char.name === name);
  if (character[0].image === "") character[0].image = "/avatar.jpg";

  return {
    props: { char: character[0] },
  };
}

export default function Item({ char }) {
  const themeContext = useContext(ThemeContext);
  const [price, setPrice] = useState("");

  useEffect(() => {
    const character = themeContext.allChars.allChars.filter(
      (product) => product.name === char.name
    );
    char.price = character[0].price;
    setPrice(char.price);
  }, []);

  function addToCart() {
    themeContext.shoppingCart.shoppingCartDispatch(char);
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.imageHolder}>
          <Image
            layout={"fill"}
            src={char.image}
            objectFit={"cover"}
            alt={char.name}
          />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.info}>
            <h2>{char.name}</h2>
            <p>
              <b>Gender: </b>
              {char.gender}
            </p>
            <p>
              <b>House: </b>
              {char.house}
            </p>
            <p>
              <b>Born: </b>
              {char.dateOfBirth}
            </p>

            <p>
              <b>Eye Colour: </b>
              {char.eyeColour}
            </p>
            <p>
              <b>Hair Colour: </b>
              {char.hairColour}
            </p>
            <p>
              <b>Ancestry: </b>
              {char.ancestry}
            </p>
            <p>
              <b>Price: </b>
              {price && price}:-
            </p>
          </div>

          <button className={styles.button} onClick={addToCart}>
            Add in cart
          </button>
        </div>
      </div>
    </div>
  );
}
