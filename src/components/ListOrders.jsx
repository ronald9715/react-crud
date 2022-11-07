import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Table, Row, Col, Button } from "reactstrap";
import { Link, Navigate, Route, useNavigate} from "react-router-dom";
import axios from "axios";

const ListOrders = ({ orders, readOrders, onEdit }) => {
    const navigate = useNavigate();
    const deleteOrder = (id) => {
        console.log("ID Order", id);
        axios.delete(`http://localhost:8080/orders/${id}`)
            .then(() => readOrders())
            .catch(console.error());
    }
    const editOrder =(value)=>{
        console.log(value);
        onEdit(value);
        navigate('/add-edit-order');
    }
    return (
        <div>
            <Row>
                <Col>
                    <Button color="info" className="mb-3 p-3"><Link className='link-button' to="/add-edit-order">Add Order</Link>  </Button>
                </Col>

            </Row>
            <h3 className="mb-3 p-3" >List Orders</h3>
            <Table bordered className="p-5">
                <thead>
                    <tr>
                        <th># Order</th>
                        <th>Date</th>
                        <th>Id Product</th>
                        <th>Final Price</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(order =>



                            <tr key={order.idOrder}>
                                <th scope="row">{order.idOrder}</th>
                                <td scope="row">{order.localDate}</td>
                                <td scope="row">{order.idProduct}</td>
                                <td scope="row"> {order.finalPrice}</td>
                                <td scope="row"><FontAwesomeIcon icon={faEdit} className="cursor-pointer" color="grey" size="lg" onClick={() => editOrder(order)} /> {" "}
                                    <FontAwesomeIcon icon={faTrash} className="cursor-pointer ms-2" color="Tomato" size="lg" onClick={() =>deleteOrder(order.idOrder)} /></td>
                            </tr>









                            /*<div className="mb-3 border rounded p-3" key={order.idOrder}>
                                <div className="d-flex justify-content-between mb-1">
                                    <div>
                                    <Row><div className="fw-bold" >{order.localDate} {order.idProduct}</div></Row>
                                    
                                    </div>
                                    <div className="text-muted">
                                        <FontAwesomeIcon icon={faEdit} className="cursor-pointer" onClick={()=>{}} />
                                        <FontAwesomeIcon icon={faTrash} className="cursor-pointer ms-2" onClick={()=>{}}/>
                                    </div>
                                </div>
                                
                            </div>*/
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}
export default ListOrders;