import React from "react";
import { Switch } from "react-router-dom";
import AdminScreen from "../../Screens/Admin/AdminScreen";
import UserEditScreen from "../../Screens/Admin/UserEditScreen";
import UserListScreen from "../../Screens/Admin/UserListScreen";
import UserListTable from "../Admin/UserListTable";
import PrivateRoute from "../Routing/PrivateRoute";

const AdminUserListRoutes = ({ match }) => {
  return (
    <>
      <PrivateRoute
        path={match.url + "/:view/userlist/search/:keyword/page/:pageNumber"}
        component={AdminScreen}
        exact
      />
      <PrivateRoute
        path={match.url + "/:view/userlist/:pageNumber"}
        component={AdminScreen}
        exact
      />
      <PrivateRoute
        path={match.url + "/:view/userlist"}
        component={AdminScreen}
        exact
      />
      <PrivateRoute path="/user/:id/edit" component={UserEditScreen} />
    </>
  );
};

export default AdminUserListRoutes;
