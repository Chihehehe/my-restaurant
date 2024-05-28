import React, { useState, useEffect } from 'react';
import { Space, Typography } from "antd";
import axios from 'axios';


function EditMenu({ id }) {
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
    const [food, setfood] = useState([]);

    useEffect(() => {
        const fetchAllFood = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/editmenu/110`)
                console.log(res.data)
                setfood(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllFood()
    }, []);


    //handle delete
    const handleDelete = async (idmenu) => {
        try {
            await axios.delete(`http://localhost:8800/editmenu/110/${idmenu}`)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Typography.Title level={3}>List of food</Typography.Title>

            <button onClick={() => props.showForm()} type='button' className='btn btn-primary me-2'>Create</button>

            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        food.map((food, index) => {
                            return (
                                <tr key={index.idmenu}>
                                    <td>{food.foodName}</td>
                                    <td>{food.desc}</td>
                                    <td>{food.price}$</td>
                                    <td>{food.image && <img src={food.image} alt="" width="150" height="90" />}</td>
                                    <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                                        <button type='button' className='btn btn-danger btn-sm' onClick={() => handleDelete(food.idmenu)}>Delete</button>
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
    const {id} = props;
    const [food, setfood] = useState({
        foodName: "",
        desc: "",
        price: null,
        image: ""
    });

    const handleChange = (e) => {
        setfood(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    //click "save" button to post the data, make api request
    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8800/editmenu/add/110", food)
            console.log(id)
            alert("Adding food successfully")
        } catch (error) {
            console.log(error)
        }
    }

    console.log(food);

    return (
        <>
            <Typography.Title level={3}>Create new food</Typography.Title>

            <div className='row'>
                <div className='col-lg-6-mx-auto'>
                    <form>
                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>Name</label>
                            <div className='col-sm-8'>
                                <input className='form-control' name="foodName" onChange={handleChange} />
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>Description</label>
                            <div className='col-sm-8'>
                                <input className='form-control' name="desc" onChange={handleChange} />
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>Price</label>
                            <div className='col-sm-8'>
                                <input className='form-control' name="price" onChange={handleChange} />
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>Image</label>
                            <div className='col-sm-8'>
                                <input className='form-control' name="image" onChange={handleChange} />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-sm-4 d-grid'>
                                <button onClick={() => props.showList()} type='button' className='btn btn-secondary me-3'>Back</button>
                            </div>

                            <div className='offset-sm-4 col-sm-4 d-grid'>
                                <button type="submit" className='btn btn-primary btn-sm me-2' onClick={handleClick}>Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditMenu;