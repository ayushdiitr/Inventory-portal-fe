import Sidebar from "../Sidebar/Sidebar";
import styles from  "../Dashboard/Table/Table.module.css"
import { Table, Tag } from "antd";
import { useEffect, useState } from "react";
import api from "../../https/api";
import { useCookies } from "react-cookie";
import Header from "../Header/Header";

const ManageItems = () => {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'contactNumber',
            key: 'contactNumber',
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            render: (department) => (
                <span>
                    {department.name}
                </span>
            )
        },
        
    ]
        
    
    const [data, setData] = useState([]);
    const [cookie] = useCookies();

    // console.log(data);  
    useEffect(() => {
        (async () => {
            const data = await api.get("/app/v1/lab/getLabs", {
                headers: {
                    Authorization: `Bearer ${cookie.token}`,
                },
            });
            console.log(data.data);
            setData(data.data.data);
        })();
    }, []);

    return (
        <div>
            {/* <div className={styles.headingUser}>Manage Users</div > */}
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default ManageItems;