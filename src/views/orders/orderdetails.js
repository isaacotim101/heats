import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFetch } from "../../hooks/useSWR";
import axios from "axios";
import { NumericFormat } from 'react-number-format';
const Txns = () => {
  const [id, setId] = useState('');
  const [fare, setFare] = useState('');
  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const ids = queryParameters.get("id");
    const fee = queryParameters.get("key");
    setFare(fee);
    setId(ids);
  }, [])
  const { GetTxns } = useFetch();
  const { data: Txns } = GetTxns();
  const { GetOrders } = useFetch();
  const { data: Orders } = GetOrders();
  console.log("Txns", Txns);

  const [orderStatus, setsetOrderStatus] = useState('');

  const handleSubmit = event => {
    event.preventDefault(); 
    
    const userData = {
    orders: orderStatus
    }
    
    var config = {
    method: 'put',
    baseURL: `https://african-hearts-api.vercel.app/api/v1/txns/${id}`,
    headers: { 
        Accept: '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
      'Content-Type': 'application/json'},
    data: userData,
    };
    
    axios(config)
    .then(function (response) {
    window.location.href = "/";
     
    })
    .catch(function (error) {
    });
    setsetOrderStatus('');
    
    
    };


  return (
    <React.Fragment>
      <Row>
        <Col>
        <Card>
            <Card.Header>
              <Card.Title as="h5">Customer Details</Card.Title></Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Mobile Number</th>
                    <th>Email</th>
                    <th>Delivery Address</th>
                  </tr>
                </thead>
                <tbody>
                {Txns?.filter(item => item._id === id).map((txn, index) => (
                  <tr className="unread" key={index}>
                    <td>
                      <h6 className="mb-1">{txn.name}</h6>
                    </td>
                    <td>0{txn.phone_number}
                    </td>
                    <td><h6 className="text-muted">
                    {txn.email}
                      </h6>
                    </td>
                    <td><h6 className="text-muted">
                    {txn.address}
                      </h6>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Order Details</Card.Title></Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Amount Ugx</th>
                    <th>Txn Status</th>
                    <th>Order Status</th>
                    <th>Txn Reference</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                {Txns?.filter(item => item._id === id).map((txn, index) => (
                  <tr className="unread" key={index}>
                    <td>
                      <h6 className="mb-1"><NumericFormat value={txn.amount} displayType={'text'} thousandSeparator={true} suffix={txn.currency} /></h6>
                    </td>
                    <td><Link to="#" className="label theme-bg text-white f-12">
                      {txn.status}
                      </Link></td>
                    <td><Link to="#" className="label theme-bg2 text-white f-12">
                      {txn.orders}
                      </Link>
                      </td>
                      <td>{txn.tx_ref}</td>
                    <td>{txn.created_at}</td>
                  </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Order Items</Card.Title></Card.Header>
            <Card.Body>
            <Table responsive hover>
                <thead>
                  <tr>
                    <th>Total Amount</th>
                    <th>Total Uniques Items</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                {Orders?.map((order, index) => (
                  <tr className="unread" key={index}>
                    <td>
                      <NumericFormat value={order.total} displayType={'text'} thousandSeparator={true} suffix={'UGX'} />
                      </td>
                      <td>{order.totalUniqueItems}</td>
                    <td>{order.created_at}</td>
                  </tr>
                  ))}
                </tbody>
              </Table>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Img</th>
                    <th>Product</th>
                    <th>Unit</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                  </tr>
                </thead>
              <tbody>
                {Orders?.filter(item => item.total === fare).map((order, index) => (
                  <tr className="unread" key={index}>
                    <td>{order.items.map((items, index) => {
                          return (
                            <div key={index}>
                            <img style={{ width: '20px' }}  src={items.image_original} />
                            </div>
                          );
                        })}
                        </td>
                    <td>{order.items.map((items, index) => {
                          return (
                            <div key={index}>
                            {items.name}</div>
                          );
                        })}
                        </td>
                    <td>{order.items.map((items, index) => {
                          return (
                            <div key={index}>
                            {items.unit}
                            </div>
                          );
                        })}
                        </td>
                  <td>{order.items.map((items, index) => {
                        return (
                          <div key={index}>
                          {items.quantity}
                          </div>
                        );
                      })}
                      </td>
                    <td>{order.items.map((items, index) => {
                          return (
                            <div key={index}>
                              <NumericFormat value={items.itemTotal} displayType={'text'} thousandSeparator={true} suffix={'UGX'} />

                            </div>
                          );
                        })}
                        </td>
                  </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Update Order Status</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                  <Form   onSubmit={handleSubmit} >
                  <Form.Group>
                    <Form.Label>Update Order Status</Form.Label>
                    <Form.Control as="select"  name='orders'  onChange={event => setsetOrderStatus(event.target.value)}>
                      <option >Select Order Status</option>
                      <option value="dispatched">Dispatched</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="pending">Pending</option>
                    </Form.Control>
                  </Form.Group>
                    <Button variant="primary" type = "submit">Update</Button>
                </Form>
                </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Txns;
