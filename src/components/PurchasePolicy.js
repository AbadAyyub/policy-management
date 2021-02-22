import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

import NavBar from "./NavBar";
import styles from "../app.module.css";
class PurchasePolicy extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="purchasepolicy">
        <Row className={styles.policyLabel}>
          <Col>
            <Form.Group controlId="policyTpe">
              <Form.Label>Policy Type</Form.Label>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="policyTpeDD">
              <Form.Control as="select" ref="policytype">
                <option>Life</option>
                <option>Annutiy</option>
                <option>Whole Life</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className={styles.policyLabel}>
          <Col>
            <Form.Group controlId="policyAmount">
              <Form.Label>Policy Amount</Form.Label>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="policyAmountVal">
              <Form.Control
                type="text"
                ref="policyamount"
                // value={this.state.policyAmount}
                // onChange={this.handleChange}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* <div className="form-group text-left">
            <label htmlFor="exampleInputName1">policyAmount</label>
            <input
              type="text"
              value={this.state.policyAmount}
              className="form-control"
              id="policyAmountVal"
              onChange={this.handleChange}
            />
          </div> */}

        <Row className={styles.policyLabel}>
          <Col>
            <Form.Group controlId="effDate">
              <Form.Label>Date of Active</Form.Label>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="effDate">
              <Form.Control
                type="date"
                ref="effectivedate"
                // value={this.state.dateofactive}
                // onChange={this.handleChange}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className={styles.policyLabel}>
          <Col>
            <Form.Group controlId="policyDuration">
              <Form.Label>Policy Duration</Form.Label>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="policyDurationDD">
              <Form.Control
                as="select"
                ref="policyduration"
                // value={this.state.policyDuration}
                // onChange={this.handleChange}
              >
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mx-auto">
          <Button
            onClick={() => this.props.onSubmit(this.refs)}
            variant="primary"
            style={{ margin: "auto" }}
            size="lg"
            active
          >
            Purchase Policy
          </Button>
        </Row>
      </div>
    );
  }
}

export default PurchasePolicy;
