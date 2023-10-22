import React from "react";
import styles from "./AvailableButton.module.css";

const AvailableButton = ({index}) =>{
    return(
        <div>
            {
            index === 1 ? (<button className={styles.availableButton}>AVAILABLE</button>)
            : index === 0 ? (<button className={styles.notAvailableButton}>NOT AVAILABLE</button>)
            : (<button />)
          }
        </div>
    );
};

export default AvailableButton;
