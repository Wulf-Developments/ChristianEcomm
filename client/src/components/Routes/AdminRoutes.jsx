import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../Routing/PrivateRoute";
import Reports from "../Admin/Reports";
import AdminScreen from "../../Screens/Admin/AdminScreen";
import AdminUserListRoutes from "./AdminUserListRoutes";
import LogoEdit from "../Forms/LogoEdit";

const AdminRoutes = ({ match }) => {
  return (
    <Switch>
      <PrivateRoute path={match.url + "/admin/reports"} component={Reports} />

      <PrivateRoute
        path={match.url + "/admin-panel"}
        component={AdminScreen}
        exact
      />
      <PrivateRoute
        path={match.url + "/admin-panel/:view"}
        component={AdminScreen}
        exact
      />
      <PrivateRoute
        path={match.url + "/admin-panel"}
        component={AdminUserListRoutes}
      />
    </Switch>
  );
};

export default AdminRoutes;
