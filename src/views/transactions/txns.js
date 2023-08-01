import React, { useState } from "react";
import { Row, Col, Card, Table, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFetch } from "../../hooks/useSWR";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
const Txns = () => {
  const { GetTxns } = useFetch();
  const { data: Txns } = GetTxns();
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
                    filename={`TRANSACTIONS OF ${new Date().toISOString().split("T")[0]}`}
                    sheet="tablexls"
                    buttonText="Export Data to Excel Sheet"/>
            </Card.Header>
            <Card.Body>
              <Table responsive hover id="table-to-xls">
                <thead>
                  <tr>
                    <th>Names</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Txn Status</th>
                    <th>Products Amount</th>
                    <th>Amount Settled</th>
                    <th>Amount Charged</th>
                    <th>Order Status</th>
                    <th>Txn Type</th>
                    <th>Created At</th>
                    <th>Txn Reference</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {Txns?.filter((txn) => {
                return search.toLowerCase() === ''
                  ? txn
                  : txn.name.toLowerCase().includes(search);
              })
              .map((txn, index) => (
                  <tr className="unread" key={index}>
                  <td>
                    {txn.name}
                  </td>
                  <td>
                    {txn.phone_number}
                  </td>
                  <td>{txn.email}
                  </td>
                  <td>{txn.address}
                  </td>
                  <td><Link to="#" className="label theme-bg text-white f-12">
                      {txn.status}
                      </Link>
                  </td>
                  <td>
                    {txn.amount} </td>
                  <td>
                    {txn.amount_settled} </td>
                  <td>
                    {txn.charged_amount} 
                    </td>
                    <td>
                      <Link to={`/orderdetails?id=${txn._id}&key=${txn.amount}`} className="label theme-bg2 text-white f-12">
                      {txn.orders}
                      </Link>
                      </td>
                    <td>
                      {txn.type}
                    </td>
                    <td>
                      {txn.created_at}
                    </td>
                    <td>
                      {txn.tx_ref}
                    </td>
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

export default Txns;
