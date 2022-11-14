
import { useEffect, useState } from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'
import axios from 'axios';
import { Link, Navigate, Route, useNavigate} from "react-router-dom";

const FormOrder = ({ oldOrder, onEdit, readOrders }) => {
    const navigate = useNavigate();
    var newDate = new Date();
    var current_date = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-"+ newDate.getDate();
    const [date, setDate] = useState(current_date);
    const [product, setProduct] = useState('0');
    const [price, setPrice] = useState(0);
    const [idOrder, setIdOrder] = useState()

    useEffect(() => {
        if (oldOrder) {
            setProduct(oldOrder.idProduct);
            setPrice(oldOrder.finalPrice);
            setIdOrder(oldOrder.idOrder);
        }
    }, [oldOrder]);

    const handleProduct = (e) => {
        setProduct(e.target.value);
    }
    const handlePrice = (e) => {
        setPrice(e.target.value);
    }

    const resetForm = () => {
        setProduct('0');
        setPrice(0);
    }
    const createOrder = (values) => {
        console.log("Valor que llega", values);
        axios.post('http://localhost:8080/orders', values)
            .then(response => {
                console.log("Respuesta", response);
                //readStudents();

            })
            .catch(console.error())
    }
    const editOrder = (values) => {
        console.log(values);
        axios.put('http://localhost:8080/orders', values)
            .then((response) => {
                onEdit();
                console.log(response);
                
            })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(oldOrder){
            const formData = {
                "idOrder":idOrder,
                "localDate": date,
                "idProduct": product,
                "finalPrice": price
            }
            editOrder(formData);
            resetForm();
            readOrders();
            navigate('/my-orders');
        }else{
            const formData = {
                "localDate": date,
                "idProduct": product,
                "finalPrice": price
            }
            createOrder(formData);
            readOrders();
            resetForm();
            navigate('/my-orders');
        }
        
    }


    return (
        <>
            <h3 className="mb-3 p-3">{oldOrder ? 'Edit' : 'Add'} Order</h3>
            <Form onSubmit={handleSubmit}>
                <FormGroup floating>
                    <Input
                        id="date"
                        name="date"
                        placeholder="Date"
                        type="text"
                        disabled
                        value={date}
                    //onChange={handleProduct}
                    />
                    <Label for="name">
                        Date
                    </Label>
                </FormGroup>
                <FormGroup >
                    <Label for="product">
                        Select Product
                    </Label>
                    <Input
                        id="product"
                        name="product"
                        type="select"
                        value={product}
                        onChange={handleProduct}
                    >
                        <option value={"0"}>
                            Choose....
                        </option>
                        <option value={"A12"}>
                            Procesador Core i7
                        </option>
                        <option value={"B13"}>
                            Monitor LG
                        </option>
                        <option value={"C14"}>
                            PC Gamer
                        </option>
                    </Input>
                </FormGroup>

                <FormGroup floating>
                    <Input
                        id="price"
                        name="price"
                        placeholder="Price"
                        type="text"
                        value={price}
                        onChange={handlePrice}
                    />
                    <Label for="name">
                        Final Price
                    </Label>
                </FormGroup>

                <div className="text-end">
                    <Button color="primary">
                        {oldOrder ? 'Edit' : 'Add'} Order
                    </Button>
                </div>

            </Form>
        </>
    )
}
export default FormOrder;