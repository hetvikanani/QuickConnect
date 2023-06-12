import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Image,
  Row,
  Table,
  Button,
  Pagination,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import UserFilter from "./UserFilter";
import { List, Delete } from "../../Services/UserServices";
import UserAddEdit from "./UserAddEdit";

const Users = (props) => {
  const [tableData, setTableData] = useState([]);
  const [pages, setPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  //   console.log(props.location.pathname);

  const histroy = useHistory();

  useEffect(() => {
    const inner = async (page) => {
      const ans = await List(page);
      setTableData(ans.data);
      setPages(ans.pages);
      return ans;
    };
    inner(currentPage);
  }, [currentPage]);

  console.log(tableData, pages);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h4>User Module</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <UserFilter />
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>
              <Button
                variant="primary"
                onClick={() => {
                  histroy.push("/user");
                }}
              >
                Add
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((ele) => {
            return (
              <tr>
                <td>
                  <Image src={ele.avatar} />
                </td>
                <td>{ele.first_name}</td>
                <td>{ele.last_name}</td>
                <td>{ele.email}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      histroy.push(`/user/${ele.id}`);
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => Delete(ele.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {pages && (
        <Pagination>
          {new Array(pages).fill().map((ele, i) => {
            console.log(i);
            return (
              <Pagination.Item onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </Pagination.Item>
            );
          })}
        </Pagination>
      )}
    </Container>
  );
};

export default Users;
