import React from 'react';
import styles from "./SearchBox.module.css";
import button from "./assets/searchButton.png";

function SearchBox () {
  return(

          <div class={styles.box}>
            <input class={styles.searchBox} type="text" name="search" placeholder="Search..." />
            <div class={styles.space}></div>
            <button type="submit" class={styles.searchButton}>
              <img src={button} alt="" />
            </button>
          </div>

  )
}

export default SearchBox