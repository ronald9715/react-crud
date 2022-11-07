import logo from './logo.svg';
import './App.css';
import { Container, Row, Col, Button } from 'reactstrap';
import ListOrders from './components/ListOrders';
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormOrder from './components/FormOrder';
import { Routes, Route, Link, Navigate } from "react-router-dom";

function App() {
  const [orders, setOrders] = useState([]);
  const [oldOrder, setOrder] = useState(null);
  const readOrders = () => {
    axios.get('http://localhost:8080/orders')
      .then(({ data }) => {
        setOrders(data);
        console.log(data)
      })
      .catch(console.error());
  }
  useEffect(readOrders, []);
  return (
    <div>
      
      <Container>
        <Row >
          <Routes>
            <Route path="/" element={<Navigate to="/my-orders" />}/>
            <Route path="/my-orders" element={<ListOrders orders={orders} readOrders={readOrders} onEdit={(value)=>setOrder(value)}/>  } />
            <Route path="/add-edit-order" element={<FormOrder oldOrder={oldOrder} onEdit={(value)=>setOrder(value)} readOrders={readOrders} />} />
          </Routes>
        </Row>

      </Container>
    </div>
  );
}

export default App;
