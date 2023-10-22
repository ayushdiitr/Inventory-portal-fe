import React from 'react';
import tick from './assets/checkmark.png'
import styles from './statusModal.module.css'

const StatusModal = ({index}) => {
    

    return (
        <div className={styles.container}>
            <img src={tick} alt="" className={styles.btn}/>
            {index === 0 ? (<h3 className={styles.text}>ITEM ADDED</h3>)
            : index === 1 ? (<h3 className={styles.text} >ITEM ISSUED</h3>)
            : index === 2 ? (<h3 className={styles.text}>ITEM RETURNED</h3>)
        : (<h3></h3>)}
        </div>
    );
};

export default StatusModal;