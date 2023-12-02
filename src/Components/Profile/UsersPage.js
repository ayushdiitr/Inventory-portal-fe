import Sidebar from "../Sidebar/Sidebar";
import styles from  "../Dashboard/Table/Table.module.css"
import { Table, Tag } from "antd";
import { useEffect, useState } from "react";
import api from "../../https/api";
import { useCookies } from "react-cookie";
import Header from "../Header/Header";

const ManageUsers = () => {

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
            title: 'Role',
            dataIndex: 'roles',
            key: 'role',
            render: (roles)=>(
                <>
                        <Tag color="green" key={roles}>
                            {roles.role}
                        </Tag>
                        
                </>
                    
            )
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
        },
        
    ]
        
    
    const [data, setData] = useState([]);
    const [cookie] = useCookies();

    // console.log(data);  
    useEffect(() => {
        (async () => {
            const data = await api.get("/app/v1/auth/getAllUsers", {
                headers: {
                    Authorization: `Bearer ${cookie.token}`,
                },
            });
            console.log(data.data.data.users);
            setData(data.data.data.users);
        })();
    }, []);

    return (
        <div>
            {/* <Header /> */}
            {/* <div className={styles.headingUser}>Manage Users</div > */}
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default ManageUsers;