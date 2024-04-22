import { Image, Typography, Space, Badge } from "antd";
import { BellFilled } from "@ant-design/icons";

function AppHeader() {
    return (
        <div className="AppHeader">
            <Image width={60} src={require('./logo.PNG')} />
            <Typography.Title>Hello restaurant</Typography.Title>
            <Space>
                <Badge count = {2}>
                    <BellFilled style={{ fontSize: 20 }} />
                </Badge>
            </Space>
        </div>
    );
}
export default AppHeader