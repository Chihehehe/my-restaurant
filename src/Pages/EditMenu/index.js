import React, { useState, useEffect } from 'react';
import { Space, Typography, Table, Button } from "antd";
import { getMenu } from "../../API";


//
// function EditMenu() {
//     const [dataSource, setDataSource] = useState([]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         setLoading(true)
//         getMenu().then((res) => {
//             setDataSource(res.products);
//             setLoading(false);
//         })
//     }, [])
// }

// function ProductList(loading, dataSource) {
//     return (
//         <Space size={20} direction='vertical'>
//             <Typography.Title level={4}>Menu</Typography.Title>
//             <Table
//                 columns={[
//                 {
//                     title: "Title",
//                     dataIndex: "title",
//                 },
//                 {
//                     title: "Description",
//                     dataIndex: "description",
//                 },
//                 {
//                     title: "Price",
//                     dataIndex: "price",
//                 },
//                 {
//                     title: "Category",
//                     dataIndex: "category",
//                 },
//                 ]}
//                 loading={loading}
//                 dataSource={dataSource}
//                 pagination={{
//                     pageSize:3,
//                 }}
//             ></Table>
//         </Space>
//     );
// }

function EditMenu() {
    const [content, setContent] = useState(<MenuList showForm={showForm} />);

    function showList() {
        setContent(<MenuList showForm={showForm} />);
    }

    function showForm() {
        setContent(<MenuForm showList={showList} />);
    }

    return (
        <Space direction='vertical'>
            {content}
        </Space>
    );
}

function MenuList(props) {
    const [products, setProducts] = useState([]);

    function fetchProducts() {
        fetch("http://localhost:3004/products'")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unexpected Server Response");
                }
                return response.json()
            })
            .then((data) => {
                //console.log(data)
                setProducts(data)
            })
            .catch((error) => console.log("Error: ", error));
    }

    useEffect(() => fetchProducts(), []);

    return (
        <Space direction='vertical'>
            <Typography.Title level={3}>List of food</Typography.Title>
            {/* <Button onClick = {() => props.showForm()} type="primary">Create</Button> */}
            <button type='button' className='btn btn-primary me-2'>Create</button>
            <Space>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th></th>
                            <th>Name</th>
                        </tr>
                    </thead>

                </table>
            </Space>
        </Space>
    );
}

function MenuForm(props) {
    return (
        <Space>
            <Typography.Title level={3}>Add more items</Typography.Title>
            <Button onClick={() => props.showList()} type="primary">Cancel</Button>
        </Space>
    );
}

export default EditMenu;