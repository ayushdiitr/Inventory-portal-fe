import { Button, Checkbox, Form, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import api from "../../https/api";

const ReturnForm = ({ handleSubmit, handleTransfer }) => {
    const [check, setCheck] = useState(true);
    const [labName, setLabName] = useState("");
    const [labList, setLabList] = useState([]);

    useEffect(() => {
        const getLabList = async () => {
            const res = await api.get("app/v1/lab/getLabs");
            console.log(res.data.data);
            setLabList(res.data.data);
        };
        getLabList();
    }, [check]);

    console.log(labName);
    return (
        <div className={styles.form}>
            <Checkbox
                checked={check}
                onChange={(e) => setCheck(e.target.checked)}
            >
                Return Default
            </Checkbox>
            {
                !check ? (
                    <div className={styles.ReturnForm}>
                        <div className={styles.returnFormHeading}>

                            Transfer to Lab
                        </div>
                        <div className={styles.returnSelect}>
                            <select
                                name="holderName"
                                className={styles.item}
                                value={labName}
                                onChange={(e) => setLabName(e.target.value)}
                            >
                                {labList.map((data) => {
                                    return (
                                        <>
                                            <option value="" disabled selected hidden>Select Lab</option>
                                            <option value={data._id}>{data.name}</option>
                                        </>
                                    )
                                    // <option value={data.name}>{data.name}</option>;
                                })}
                            </select>
                        </div>
                        <Tooltip zIndex={10000} placement="bottom" title="Transfer to selected lab">
                            <Button onClick={() => handleTransfer(labName)} type="primary" danger>
                                Return
                            </Button>
                        </Tooltip>
                    </div>
                ) : (
                    <>
                        <Tooltip zIndex={10000} title="Return to its origin, from where it was issued">
                            <Button onClick={() => handleSubmit()} type="primary" danger>
                                Return
                            </Button>
                        </Tooltip>
                    </>
                )
            }
        </div>
    )
}

export default ReturnForm;