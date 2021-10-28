import CharacterComp from "./characterComp";
import { useEffect, useState } from "react";
import styles from "../styles/Pagination.module.css";

export default function Pagination({ data, length, pageLimit, dataLimit }) {
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
    <div>
      <div className={styles.characterWindow}>
        {getPaginatedData().map((character) => (
          <CharacterComp
            name={character.name}
            charImage={character.image}
            price={character.price}
            id={character.id}
            key={character.id}
          />
        ))}
      </div>
      <div>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>Prev</button>
        {getPaginationGroup().map((item, index) => (
          <button key={index} onClick={changePage} disabled={pages <= index} className={styles.pageNum}>
            <span>{item}</span>
          </button>
        ))}
        <button onClick={goToNextPage} disabled={currentPage === pages}>Next</button>
      </div>
    </div>
  );
}
