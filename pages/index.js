import styles from "../styles/Home.module.css";
import CharacterComp from "../components/characterComp";
import { useEffect, useState, useContext } from "react";
import arrayShuffle from "array-shuffle";
import { CartContext } from "../components/context/CartProvider";

export default function Home({ charProducts }) {
  const cart = useContext(CartContext);

  function routeToCharacterInfo(id) {
    console.log(id);
  }

  function addToCart(product) {
    cart.setCart([...cart.cart, product]);
  }

  return (
    <div className={styles.container}>
      <div className={styles.characterWindow}>
        {charProducts.map((character) => (
          <CharacterComp
            this={character}
            name={character.name}
            charImage={character.image}
            price={character.price}
            id={character.id}
            key={character.id}
            openCharInfo={routeToCharacterInfo}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://hp-api.herokuapp.com/api/characters");
  const data = await res.json();
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    Object.assign(data[i], { id: i });
    +Object.assign(data[i], { price: generatePrice() });
    if (data[i].image === "") {
      data[i].image = "/../public/avatar.jpg";
    }
  }
  const withPic = data.filter((item) => item.image !== "/../public/avatar.jpg");
  const noPic = data.filter((item) => item.image === "/../public/avatar.jpg");
  const shuffledWithPic = arrayShuffle(withPic);
  const shuffledNoPic = arrayShuffle(noPic);

  return { props: { charProducts: [...shuffledWithPic, ...shuffledNoPic] } };
}

function generatePrice() {
  const maxPrice = 10000;

  return Math.floor(Math.random() * maxPrice);
}
