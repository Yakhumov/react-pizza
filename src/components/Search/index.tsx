import { debounce } from "debounce";
import React, { useCallback, useContext } from "react";
import { SearchContext } from "../../App";
import styles from "./Search.module.scss";

const Search: React.FC  = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);      

  const inputDebounce = useCallback( debounce(()=>{
  }, 1000),        
  []  
  )
  const inputChangeValue = (e: React.ChangeEvent <HTMLInputElement>) =>{ 
    setSearchValue(e.target.value)  
    inputDebounce()
  }

  return (
    <div>
      <input
        value={searchValue}
        onChange={inputChangeValue}
        className={styles.input}
        placeholder="Поиск пиццы"
      />
    </div>
  );
};

export default Search;
