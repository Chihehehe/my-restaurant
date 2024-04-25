import React, { useState, useEffect } from 'react';
import { Space, Typography, Table, Button } from "antd";
import { fetchProducts } from "../../API";


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

    useEffect(() => fetchProducts(setProducts), []);

    return (
        <>
            <Typography.Title level={3}>List of food</Typography.Title>

            <button onClick={() => props.showForm()} type='button' className='btn btn-primary me-2'>Create</button>

            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>{product.title}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}$</td>
                                    <td>{product.category}</td>
                                    <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                                        <button type='button' className='btn btn-primary btn-sm me 2'>Edit</button>
                                        <button type='button' className='btn btn-danger btn-sm'>Delete</button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>

            </table>
        </>
    );
}

function MenuForm(props) {
    return (
        <>
            <Typography.Title level={3}>Create new products</Typography.Title>
            <button onClick={() => props.showList()} type='button' className='btn btn-primary me-2'>Create</button>
        </>
    );
}

export default EditMenu;