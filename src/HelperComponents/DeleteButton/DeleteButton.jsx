import styles from "./deleteButton.module.css";
import { Button } from "antd";

const DeleteButton = () => {
    return (
        <Button type="primary" className={styles.delBtn}>
            DELETE
        </Button>
    )

}

export default DeleteButton;