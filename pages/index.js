import styles from "../styles/Home.module.css";
import Pagination from "../components/Pagination";
import Categories from "../components/Categories";
import { useEffect, useState } from "react";
import arrayShuffle from "array-shuffle";

export default function Home({ charProducts }) {
  const initialState = charProducts;

  const [characterDisplay, setCharacterDisplay] = useState(initialState);
  const [filter, setFilter] = useState(false)

  useEffect(() => {
    if (characterDisplay.length < 1) {
      setFilter(false)
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
    setFilter(true)
  };

  const handleSelection = (e) => {
    const query = e.target.textContent
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
    setFilter(true)
  };

  const clearFilter = () => {
    setFilter(false)
    setCharacterDisplay(initialState)
  }

  return (
    <div>
      <Categories filter={filter} onSearch={handleSearch} onClick={handleSelection} clearFilter={clearFilter} />
      <div className={styles.container}>
          <Pagination data={characterDisplay} length={characterDisplay.length} pageLimit={5} dataLimit={12} />
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

  return Math.floor(Math.random() * maxPrice);
}

function routeToCharacterInfo(id) {
  console.log(id);
}

function addToCart(id) {
  console.log(id);
}
