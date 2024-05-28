import React, { useState, useEffect } from 'react';
import { DollarCircleOutlined, ShoppingCartOutlined, StarOutlined } from "@ant-design/icons";
import { Card, Space, Statistic, Typography, Table } from "antd";
import { getOrders } from "../../API";
import classes from './ManageInfo.module.css'
import axios from 'axios';

function ManageInfo({ id }) {
    console.log(id)
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        restName: '',
        gmail: '',
        addressRes: '',
        image: '',
        category: '',
        gmail: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8800/restPage/${id}`)
            .then((res) => {
                if (res.data.length > 0) {
                    setUser(res.data[0]);
                    console.log(res.data)
                } else {
                    console.log('No restaurant found');
                }
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        axios
            .put(`http://localhost:8800/restpage/${id}`, formData)
            .then((res) => {
                alert('Profile updated successfully!');
                setUser(formData);
            })
            .catch(err => console.log(err));
    };

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
                    value={2}
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
                    value={109}
                />
            </Space>
            <Space>
                <div className={classes.profileContainer}>
                    {user ? (
                        <div className={classes.profileDetails}>
                            <h3>Profile for {user.restName}</h3>
                            <div className={classes.profileField}>
                                <label>Restaurant name  </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.restName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={classes.profileField}>
                                <label>Gmail  </label>
                                <input
                                    type="gmail"
                                    name="gmail"
                                    value={formData.gmail}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={classes.profileField}>
                                <label>Category  </label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={classes.profileField}>
                                <label>Add image address  </label>
                                <input
                                    type="text"
                                    name="addressRes"
                                    value={formData.addressRes}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button className={classes.saveButton} onClick={handleSave}>
                                Save
                            </button>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </Space>
        </Space>
    );
}

function DashboardCard({ title, value, icon }) {
    return (
        <Card>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
}



export default ManageInfo;