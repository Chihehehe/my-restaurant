import React, { useState, useEffect } from 'react';
import { Card, Space, Statistic, Typography, Table } from "antd";
import { getMenu } from "../../API";
//gjejgdf

function EditMenu() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        getMenu().then((res) => {
            setDataSource(res.products);
            setLoading(false);
        })
    }, [])

    return (
        <Space size={20} direction='vertical'>
            <Typography.Title level={4}>Menu</Typography.Title>
            <Table
                columns={[
                {
                    title: "Title",
                    dataIndex: "title",
                },
                {
                    title: "Description",
                    dataIndex: "description",
                },
                {
                    title: "Price",
                    dataIndex: "rating",
                },
                {
                    title: "Category",
                    dataIndex: "category",
                },
                ]}
                loading={loading}
                dataSource={dataSource}
                pagination={{
                    pageSize:6,
                }}
            ></Table>
        </Space>
    );
}


export default EditMenu;