import { Image, Typography, Space, Badge } from "antd";
import { BellFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";


function AppHeader({id}) {
    console.log(id)
    const [user, setUser] = useState(null);


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


    return (
        <div className="AppHeader">
            <Image width={60} src={require('./logo.PNG')} />
            <Typography.Title>Hello KFC</Typography.Title>
            <Space>
                <Badge count = {2}>
                    <BellFilled style={{ fontSize: 20 }} />
                </Badge>
            </Space>
        </div>
    );
}
export default AppHeader