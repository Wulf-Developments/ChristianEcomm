import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Pagination,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
  activate,
  deleteUser,
  inactive,
  listUsers,
} from "../../actions/userActions";
import Loader from "../Loader";
import Meta from "../Meta";

const UserListTable = ({ keyword, pageNumber, history }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState(keyword);

  const { loading, users, pages, page } = useSelector(
    (state) => state.userList
  );
  const { userInfo, loading: userLoading } = useSelector(
    (state) => state.userLogin
  );
  const { success: successDelete } = useSelector((state) => state.userDelete);
  const { success } = useSelector((state) => state.userUpdate);

  useEffect(() => {
    if (userInfo || userInfo.isAdmin) {
      dispatch(listUsers(keyword, pageNumber));
    } else {
      history.push("/login");
    }
  }, [
    dispatch,
    userInfo,
    successDelete,
    history,
    pageNumber,
    keyword,
    success,
    userLoading,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      history.push(
        `/admin/admin-panel/users/userlist/search/${search}/page/${pageNumber}`
      );
    } else {
      history.push("/admin/admin-panel/users/userlist");
    }
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure? This action cannot be undone!")) {
      dispatch(deleteUser(id));
    }
  };
  const inactiveHandler = (id, isAdmin) => {
    if (window.confirm("Are you sure you?")) {
      dispatch(inactive(id, isAdmin));
    }
  };
  const activeHandler = (id) => {
    if (window.confirm(`Are you sure youd like to re-activate this user?`)) {
      dispatch(activate(id));
    }
  };
  return (
    <div style={{ display: "inline" }}>
      <Meta title={`Users | Page ${pageNumber}`} />
      <Form onSubmit={submitHandler} style={{ padding: "2%" }}>
        <InputGroup>
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Users"
            className="mr-sm-2 ml-sm-5"
          ></Form.Control>
          <Button type="submit" variant="outline-success" className="p-2">
            Search
          </Button>
        </InputGroup>
        <Form.Text style={{ textAlign: "center" }}>
          Currently you can only search based off a users Name, If needed make
          sure to verify the users email
        </Form.Text>
      </Form>
      <Table
        striped
        bordered
        hover
        responsive
        className="table-sm"
        style={{ padding: "5%" }}
      >
        {loading ? (
          <div style={{ justifyContent: "center" }}>
            <Loader />
          </div>
        ) : (
          <>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Inactive/Active</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {user.isAdmin ? (
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {user.isActive ? (
                        <Button
                          onClick={() =>
                            inactiveHandler(user._id, userInfo.isAdmin)
                          }
                          variant="light"
                          className="btn-sm"
                          disabled={userInfo._id === user._id}
                        >
                          <i
                            className="fas fa-check"
                            style={{ color: "green" }}
                          ></i>
                        </Button>
                      ) : (
                        <Button
                          onClick={() => activeHandler(user._id)}
                          variant="light"
                          className="btn-sm"
                          disabled={userInfo._id === user._id}
                        >
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        </Button>
                      )}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(user._id)}
                        disabled={userInfo._id === user._id}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </>
        )}
      </Table>
      <Container>
        {userInfo && pages > 1 && (
          <Pagination style={{ justifyContent: "center", fontSize: ".8rem" }}>
            {[...Array(pages).keys()].map((x) => (
              <LinkContainer
                key={x + 1}
                to={
                  userInfo.isAdmin
                    ? search
                      ? `/admin/admin-panel/users/userlist/search/${search}/page/${
                          x + 1
                        }`
                      : `/admin/admin-panel/users/userlist/${x + 1}`
                    : `/admin/admin-panel/users/userlist/${x + 1}`
                }
              >
                <Pagination.Item
                  active={x + 1 === page}
                  style={{ padding: "0" }}
                >
                  {x + 1}
                </Pagination.Item>
              </LinkContainer>
            ))}
          </Pagination>
        )}
      </Container>
    </div>
  );
};

export default UserListTable;
