import React, { useState, useEffect } from "react";
import { Form, Col, Button, Row, InputGroup } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { Get, Save } from "../../Services/UserServices";
import Users from "./Users";

const UserAddEdit = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const history = useHistory();
  const params = useParams();

  const userData = {
    fName: firstName,
    lName: lastName,
    email: email,
  };

  console.log(params);

  const child = async () => {
    const ans = await Get(params.id);
    console.log(ans, "edit");
    setFirstName(ans.first_name);
    setLastName(ans.last_name);
    setEmail(ans.email);
  };

  useEffect(() => {
    if (params.id) {
      child();
    }
  }, [params.id]);

  const submitHandler = async () => {
    const ans = await Save(userData, params.id);
    console.log(ans, "ans");
    if (ans) history.push("/");
  };

  return (
    <Row>
      <Col md="12">
        <h6>First Name</h6>
        <InputGroup className="m-3">
          <Form.Control
            placeholder="First Name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
          />
        </InputGroup>
      </Col>
      <Col md="12">
        <h6>Last Name</h6>
        <InputGroup className="m-3">
          <Form.Control
            placeholder="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
          />
        </InputGroup>
      </Col>
      <Col md="12">
        <h6>Email</h6>
        <InputGroup className="m-3">
          <Form.Control
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </InputGroup>
      </Col>
      <Col md="12">
        <Button onClick={submitHandler}>Submit</Button>
      </Col>
    </Row>
  );
};

export default UserAddEdit;
