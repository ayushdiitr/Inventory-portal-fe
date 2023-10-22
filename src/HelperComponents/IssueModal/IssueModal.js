import styles from "./IssueModal.module.css";

function IssueModal( {setOpenModal}) {
    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                <div className={styles.titleCloseBtn}>
                    <button onClick={() =>{
                        setOpenModal(false);
                    }}>
                        X
                    </button>
                </div>
                <div className={styles.title}>
                    <h3>Issue Form</h3>
                </div>
                <div className={styles.body}>
                    <form>
                        <input type="text" placeholder="Enter Item Name" />
                    </form><form>
                        <input type="text" placeholder="Enter Quantity" />
                    </form><form>
                        <input type="text" placeholder="Enter Holder Name" />
                    </form><form>
                        <input type="text" placeholder="Enter Issue Date" />
                    </form><form>
                        <input type="text" placeholder="Enter Project Name" />
                    </form><form>
                        <input type="text" placeholder="Enter Description" />
                    </form><form>
                        <input type="text" placeholder="Enter Contact No." />
                    </form>
                </div>
                <div className={styles.footer} >
                    <button>ISSUE</button>
                </div>
            </div>

        </div>
    );
}

export default IssueModal;