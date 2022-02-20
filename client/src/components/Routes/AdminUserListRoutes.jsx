import React from "react";
import { Switch } from "react-router-dom";
import UserEditScreen from "../../Screens/Admin/UserEditScreen";
import UserListScreen from "../../Screens/Admin/UserListScreen";
import PrivateRoute from "../Routing/PrivateRoute";

const AdminUserListRoutes = () => {
  return (
    <Switch>
      <PrivateRoute
        path="/admin/userlist/search/:keyword/page/:pageNumber"
        component={UserListScreen}
        exact
      />
      <PrivateRoute
        path="/admin/userlist/:pageNumber"
        component={UserListScreen}
        exact
      />
      <PrivateRoute path="/admin/user/:id/edit" component={UserEditScreen} />
      <PrivateRoute path="/admin/userlist" component={UserListScreen} exact />
    </Switch>
  );
};

export default AdminUserListRoutes;
