import React, { useState } from "react";
import { Row, Col, Card, Table, InputGroup, FormControl } from 'react-bootstrap';
import { useFetch } from "../../hooks/useSWR";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
const Orders = () => {
  const { GetOrders } = useFetch();
  const { data: Orders } = GetOrders();
  const [search, setSearch] = useState('');

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="Search  by Name" aria-label="search" aria-describedby="basic-addon1"  onChange={(e) => setSearch(e.target.value)} />
              </InputGroup>
              <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-success mb-3"
                    table="table-to-xls"
                    filename={`ORDERS AS OF ${new Date().toISOString().split("T")[0]}`}
                    sheet="tablexls"
                    buttonText="Export Data to Excel Sheet"/>
            </Card.Header>
            <Card.Body>
              <Table responsive hover id="table-to-xls">
                <thead>
                  <tr>
                    <th>Product <br />Name</th>
                    <th>Quantity</th>
                    <th>Unique <br />Items</th>
                    <th>Total <br />Amount(/= UGX) </th>
                    <th>Product <br />Price(/= UGX)</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                {Orders?.filter((order) => {
                return search.toLowerCase() === ''
                  ? order
                  : order.name.toLowerCase().includes(search);
              })
              .map((order, index) => (
                  <tr className="unread" key={index}>
                  <td>{order.items.map((items, index) => {
                        return (
                          <div key={index}>
                          {items.name}
                          </div>
                        );
                      })}
                  </td>
                    <td>{order.items.map((items, index) => {
                          return (
                            <div key={index}>
                           {items.unit} <strong>(x{items.quantity})</strong>
                            </div>
                          );
                        })}
                    </td>
                    <td>{order.totalUniqueItems}</td>
                    <td>{order.total}</td>
                    <td>{order.items.map((items, index) => {
                          return (
                            <div key={index}>
                            {items.itemTotal}<br/>
                            </div>
                          );
                        })}
                    </td>
                    <td>{order.created_at}</td>

                  </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Orders;
