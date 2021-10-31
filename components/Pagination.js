import Character from "./Character";
import { useEffect, useState } from "react";
import styles from "../styles/Pagination.module.css";
import { GrNext, GrPrevious } from "react-icons/gr";

export default function Pagination({
  data,
  length,
  pageLimit,
  dataLimit,
  addToCart,
}) {
  const [pages, setPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
    setPages(Math.ceil(length / dataLimit));
  }, [data]);

  const goToNextPage = () => {
    if (currentPage != pages) {
      setCurrentPage((page) => page + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage != 1) {
      setCurrentPage((page) => page - 1);
    }
  };

  const changePage = (e) => {
    const pageNumber = Number(e.target.textContent);
    setCurrentPage(pageNumber);
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, i) => start + i + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.characterWindow}>
        {getPaginatedData().map((character) => (
          <Character
            name={character.name}
            charImage={character.image}
            price={character.price}
            id={character.id}
            key={character.id}
            addToCart={addToCart}
          />
        ))}
      </div>
      <div className={styles.paginationContainer}>
        <button
          className={styles.previous}
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          <GrPrevious />
        </button>
        <div className={styles.pages}>
          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              disabled={pages < item}
              className={
                item !== currentPage ? styles.pageNum : styles.pageNumActive
              }
            >
              <span>{item}</span>
            </button>
          ))}
        </div>

        <button
          className={styles.next}
          onClick={goToNextPage}
          disabled={currentPage === pages}
        >
          <GrNext />
        </button>
      </div>
    </div>
  );
}
