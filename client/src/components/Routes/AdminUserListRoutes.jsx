import React from "react";
import { Switch } from "react-router-dom";
import AdminScreen from "../../Screens/Admin/AdminScreen";
import UserEditScreen from "../../Screens/Admin/UserEditScreen";
import PrivateRoute from "../Routing/PrivateRoute";

const AdminUserListRoutes = ({ match }) => {
  return (
    <Switch>
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
    </Switch>
  );
};

export default AdminUserListRoutes;
