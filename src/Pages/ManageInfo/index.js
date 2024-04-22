import React, { useState, useEffect } from 'react';
import { DollarCircleOutlined, ShoppingCartOutlined, StarOutlined } from "@ant-design/icons";
import { Card, Space, Statistic, Typography, Table } from "antd";
import { getOrders } from "../../API";

function ManageInfo() {
    return (
        <Space size={20} direction='vertical'>
            <Typography.Title level={4}>General Information</Typography.Title>
            <Space direction="horizontal">
                <DashboardCard
                    icon={
                        <ShoppingCartOutlined style={{
                            color: "blue",
                            backgroundColor: "rgba(0,255,255,0.25)",
                            borderRadius: 20,
                            fontSize: 24,
                            padding: 8,
                        }}
                        />}
                    title={"Orders"}
                    value={12345}
                />
                <DashboardCard
                    icon={<StarOutlined style={{
                        color: "purple",
                        backgroundColor: "rgba(255,255,0,0.5)",
                        borderRadius: 20,
                        fontSize: 24,
                        padding: 8,
                    }} />}
                    title={"Rating"}
                    value={4}
                />
                <DashboardCard
                    icon={<DollarCircleOutlined style={{
                        color: "red",
                        backgroundColor: "rgba(255,0,0,0.20)",
                        borderRadius: 20,
                        fontSize: 24,
                        padding: 8,
                    }} />}
                    title={"Revenue"}
                    value={12345}
                />
            </Space>
            <RecentOrders />
        </Space>
    );
}

function DashboardCard({ title, value, icon}) {
    return (
        <Card>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
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
        <Typography.Text>Recent Orders</Typography.Text>
        <Table
            columns={[
                {
                    title: "Title",
                    dataIndex: "title"
                },
                {
                    title: "Quantity",
                    dataIndex: "quantity"
                },
                {
                    title: "Price",
                    dataIndex: "discountedPrice"
                },
            ]}
            loading={loading}
            dataSource={dataSource}
            pagination={false}
        ></Table>
        </>
    );
}

export default ManageInfo;