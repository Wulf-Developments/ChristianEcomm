import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Table,
  Button,
  Container,
  Pagination,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import {
  activate,
  deleteUser,
  inactive,
  listUsers,
} from "../../actions/userActions";
import Meta from "../../components/Meta";

const UserListScreen = ({ history, match, location }) => {
  // pulls the pageNumber and Keyword search params
  const keyword = match.params.keyword || "";
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

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
      history.push(`/admin/userlist/search/${search}/page/${pageNumber || 1}`);
    } else {
      history.push("/admin/userlist");
    }
  };

  return (
    <>
      <Meta title={`Users | Page ${pageNumber}`} />
      <Container style={{ fontFamily: "sans-serif" }}>
        <h1>Users</h1>
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
        {/* {loading ? <Loader /> : <UserListTable users={users} />} */}
        <Container>
          {userInfo && pages > 1 && (
            <Pagination style={{ justifyContent: "center", fontSize: ".8rem" }}>
              {[...Array(pages).keys()].map((x) => (
                <LinkContainer
                  key={x + 1}
                  to={
                    userInfo.isAdmin
                      ? search
                        ? `/admin/userlist/search/${search}/page/${x + 1}`
                        : `/admin/userlist/${x + 1}`
                      : `/admin/userlist/${x + 1}`
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
      </Container>
    </>
  );
};

export default UserListScreen;
