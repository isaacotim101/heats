import React, { useState } from "react";
import { Row, Col, Card, Table, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFetch } from "../../hooks/useSWR";

const Txns = () => {
  const { GetTxns } = useFetch();
  const { data: Txns } = GetTxns();

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Customer Details</th>
                    <th>Transactions</th>
                    <th>Txn ID/ Reference</th>
                  </tr>
                </thead>
                <tbody>
                {Txns?.filter(item => item.orders === 'dispatched').map((txn, index) => (
                  <tr className="unread" key={index}>
                    <td>
                      <h6 className="mb-1"><sup>Customer Names</sup><br/>{txn.name}</h6>
                      <sup>Customer Mobile</sup><br/><p>{txn.phone_number}</p>
                      <sup>Customer Email</sup><br/><p>{txn.email}</p>
                      <sup>Customer Address</sup><br/><p>{txn.address}</p>
                    </td>
                    <td>
                    <sup>Transaction Status</sup><br/><Link to="#" className="label theme-bg text-white f-12">
                      {txn.status}
                      </Link><br/>
                      <p className="mb-1"><sup>Amount</sup><br/>{txn.amount} /= {txn.currency}</p>
                      <p className="m-0"><sup>Amount Settled</sup><br/>{txn.amount_settled} /= {txn.currency}</p>
                      <p className="m-0"><sup>Amount Charged</sup><br/>{txn.charged_amount} /= {txn.currency}</p>
                    </td>
                    <td>
                      <sup>Order Status</sup><br/><Link to={`/orderdetails?id=${txn._id}&key=${txn.amount}`} className="label theme-bg2 text-white f-12">
                      {txn.orders}
                      </Link><br/>
                      <p className="m-0"><sup>Transaction Type</sup><br/>{txn.type}</p>
                    <sup>Created At</sup><br/><h6 className="text-muted">
                        {txn.created_at}
                      </h6>
                    <p className="m-0"><sup>Transaction Reference</sup><br/>{txn.tx_ref}</p>
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
