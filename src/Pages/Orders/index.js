import React, { useState, useEffect } from 'react';
import { Card, Space, Statistic, Typography, Table } from "antd";
import { getOrders } from "../../API";

function Orders() {
    return (
        <Space size={20} direction='vertical'>
            <Typography.Title level={4}>Orders</Typography.Title>
        <RecentOrders />
        </Space>
    );
}

function RecentOrders() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        getOrders().then((res) => {
            setDataSource(res.products);
            setLoading(false);
        })
    }, [])

    return (
        <>
        <Typography.Text>Orders</Typography.Text>
        <Table
            columns={[
                {
                    title: "Name",
                    dataIndex: "title"
                },
                {
                    title: "Price",
                    dataIndex: "discountedPrice"
                },
                {
                    title: "Status",
                    dataIndex: "quantity"
                },
            ]}
            loading={loading}
            dataSource={dataSource}
            pagination={false}
        ></Table>
        </>
    );
}
export default Orders;