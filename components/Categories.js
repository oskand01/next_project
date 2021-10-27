import styles from "../styles/Categories.module.css";
import { useState } from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Categories({onSearch, onClick, clearFilter, filter}) {

    const categories = ["Male", "Female", "Gryffindor", "Ravenclaw", "Slytherin", "Hufflepuff"]
    const [inputValue, setInputValue] = useState("") 

    const searchInput = (e) => {
        setInputValue(e.target.value)
    }

    const handleKeyDown = (e) => {
      if(e.key === 'Enter'){
        onSearch(inputValue)
        setInputValue("")
      }
    }

  return (
      <div className={styles.container}>
        <div className={styles.categories}>
          {categories.map((category, i) => 
          <div key ={i} className={styles.category} onClick={(e) => onClick(e)}>{category}</div>
          )}
      </div>
      <div className={styles.search}>
      {filter && <AiOutlineCloseCircle className={styles.filterIcon} onClick={clearFilter} />}
        <input type="text" value={inputValue} placeholder="Search.." onChange={searchInput} onKeyDown={handleKeyDown} />
      </div>
    </div>
  );
}
