import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../Routing/PrivateRoute";
import Reports from "../Admin/Reports";

const AdminReportRoutes = () => {
  return (
    <Switch>
      <PrivateRoute path="/admin/reports" component={Reports} exact />
    </Switch>
  );
};

export default AdminReportRoutes;
