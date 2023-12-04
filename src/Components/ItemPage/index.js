import React from 'react';
import { Avatar, Card, Col, Divider, Row, Skeleton, Space, Typography } from 'antd';
import Sidebar from '../Sidebar/Sidebar';
import { useEffect } from 'react';
import { useState } from 'react';
import api from '../../https/api';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router';
import labImg from "./laboratory.svg";


const ItemPage = () => {
    const { Title } = Typography;
    const { Meta } = Card;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cookie] = useCookies();
    const id = window.location.pathname.split('/')[2];

    useEffect(() => {
        (async () => {
            const data = await api.get(`/app/v1/item/getitem/${id}`, {
                headers: {
                    Authorization: `Bearer ${cookie.token}`,
                },
            });
            setData(data);
            setLoading(false);
        })();
    }, [cookie.token, id])
    return (
        <div>
            {/* <Sidebar  /> */}
            <div style={{ marginLeft: '12%', padding: '2rem' }}>
                <Row>
                    <Col span={24}>
                        <Title  style={{ display: 'flex', justifyContent:'center' , alignItems:'center'}} level={2}>Item Details
                            <Avatar src={labImg} />
                        </Title>
                    </Col>
                </Row>

                <Divider />

                <Skeleton loading={loading} active>

                    <Space direction="vertical" size="middle" loading={loading} style={{ display: 'flex' }}>
                        <Card title="Item Name" bordered={false} >
                            <p>{data?.data?.data?.itemName}</p>
                        </Card>
                        <Card title="Item Type" bordered={false} >
                            <span>{data?.data?.data?.itemType}</span>
                        </Card>
                    </Space>
                </Skeleton>

                <Skeleton loading={loading} active>

                    <Space direction="horizontal" size="middle" style={{ display: 'flex' }}>
                        <Card title="Quantity" style={{ width: '30vw', margin: '0.8rem 0' }} bordered={true} >
                            <span>{data?.data?.data?.quantity}{" "}{data?.data?.data.unit} </span>
                        </Card>

                        <Card title="Limit" style={{ width: '30vw', margin: '0.8rem 0' }} bordered={true} >
                            <span>{data?.data?.data?.limit} </span>
                        </Card>
                    </Space>
                </Skeleton>

                <Skeleton loading={loading} active>
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>

                        <Card title="Lab Details" >
                            <p>Name: {data?.data?.labName} </p>
                            <span> Lab Id: {data?.data?.data?.lab} </span>
                        </Card>
                    </Space>
                </Skeleton>

            </div>
        </div>
    )
}

export default ItemPage;

// "_id": "656ab86b6946df918832bbe1",
// "itemName": "item1",
// "quantity": 90,
// "unit": "units",
// "itemType": "issuable",
// "limit": 2,
// "isSTC": false,
// "owners": {},
// "lab": "656ab78cc8dfb35dbee180f6",