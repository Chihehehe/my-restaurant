import { Menu } from "antd"
import { EditOutlined, FieldTimeOutlined, ShopOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

function SideMenu( {id} ) {
    const navigate = useNavigate()
    return (
        <div className="SideMenu">
            <Menu
                className="SideMenuVertical"
                mode="vertical"
                onClick={(item) => {
                    navigate(item.key);
                }}
                items={[{
                    label: "Orders",
                    icon: <FieldTimeOutlined />,
                    key: `/${id}`
                },
                {
                    label: "Edit menu",
                    icon: <EditOutlined />,
                    key: `/${id}/editmenu`
                },
                {
                    label: "Manage Information",
                    icon: <ShopOutlined />,
                    key: `/${id}/manageinfo`
                },
                ]} >

            </Menu>
        </div>
    )
}
export default SideMenu