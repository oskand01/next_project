import styles from "../styles/Home.module.css";
import Pagination from "../components/Pagination";
import Categories from "../components/Categories";
import { useEffect, useState } from "react";
import arrayShuffle from "array-shuffle";
import { useContext } from "react";
import { ThemeContext } from "../components/context/ThemeProvider";

export default function Home({ charProducts }) {
  const themeContext = useContext(ThemeContext);
  const initialState = charProducts;
  const [characterDisplay, setCharacterDisplay] = useState(initialState);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    !themeContext.allChars.allChars &&
      themeContext.allChars.setAllChars(charProducts);
  }, []);

  function addToCart(id) {
    themeContext.shoppingCart.shoppingCartDispatch(
      charProducts.find((char) => char.id === id)
    );
  }

  useEffect(() => {
    if (characterDisplay.length < 1) {
      setFilter(false);
      setCharacterDisplay(initialState);
    }
  }, [characterDisplay]);

  const handleSearch = (e) => {
    const query = e.toLowerCase();
    setCharacterDisplay(
      initialState.filter((character) => {
        if (character.name.toLowerCase().includes(query)) {
          return character;
        }
      })
    );
    setFilter(true);
  };

  const handleSelection = (e) => {
    const query = e.target.textContent;
    setCharacterDisplay(
      initialState.filter((character) => {
        if (character.gender === query.toLowerCase()) {
          return character;
        }
        if (character.house === query) {
          return character;
        }
      })
    );
    setFilter(true);
  };

  const clearFilter = () => {
    setFilter(false);
    setCharacterDisplay(initialState);
  };

  return (
    <div>
      <Categories
        filter={filter}
        onSearch={handleSearch}
        onClick={handleSelection}
        clearFilter={clearFilter}
      />
      <div className={styles.container}>
        <Pagination
          addToCart={addToCart}
          data={characterDisplay}
          length={characterDisplay.length}
          pageLimit={5}
          dataLimit={12}
        />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://hp-api.herokuapp.com/api/characters");
  const data = await res.json();

  for (let i = 0; i < data.length; i++) {
    data[i].id = i;
    data[i].price = generatePrice();
    if (data[i].image === "") {
      data[i].image = "/avatar.jpg";
    }
  }
  const withPic = data.filter((item) => item.image !== "/avatar.jpg");
  const noPic = data.filter((item) => item.image === "/avatar.jpg");
  const shuffledWithPic = arrayShuffle(withPic);
  const shuffledNoPic = arrayShuffle(noPic);

  return { props: { charProducts: [...shuffledWithPic, ...shuffledNoPic] } };
}

function generatePrice() {
  const maxPrice = 10000;
  const price = Math.floor(Math.random() * maxPrice).toString();
  return parseInt(price.substr(0, price.length - 1) + "9");
}
