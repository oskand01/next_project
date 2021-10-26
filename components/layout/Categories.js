import styles from "../../styles/Categories.module.css";
import { useEffect, useState } from 'react';

export default function Categories() {

    const categories = ["Students", "Teachers", "Male", "Female"]
    const [inputValue, setInputValue] = useState("") 

    const handleClick = (e) => {
        console.log(e.target)
    }

    const searchInput = (e) => {
        //Do what we wish to do with the search
        setInputValue(e.target.value)

        //Temporary, change this. 
        if(inputValue.length === 10) {
            setInputValue("")
        }
    }

  return (
      <div className={styles.container}>
        <div className={styles.categories}>
          {categories.map((category, i) => 
          <div key ={i} className={styles.category} onClick={handleClick}>{category}</div>
          )}
      </div>
      <div className={styles.search}>
        <input type="text" value={inputValue} placeholder="Search.." onChange={searchInput} />
      </div>
    </div>
  );
}
