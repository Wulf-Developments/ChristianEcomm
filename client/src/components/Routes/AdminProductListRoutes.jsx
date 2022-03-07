import React from "react";
import { Switch } from "react-router-dom";
import ProductEditScreen from "../../Screens/Admin/ProductEditScreen";
import PrivateRoute from "../Routing/PrivateRoute";
import AdminScreen from "../../Screens/Admin/AdminScreen";

const AdminProductListRoutes = ({ match }) => {
  return (
    <Switch>
      <PrivateRoute
        path={match.url + "/:view/productlist/search/:keyword/page/:pageNumber"}
        component={AdminScreen}
        exact
      />
      <PrivateRoute
        path={match.url + "/:view/productlist/:pageNumber"}
        component={AdminScreen}
        exact
      />
      <PrivateRoute
        path={match.url + "/:view/productlist/product/:id/edit"}
        component={ProductEditScreen}
        exact
      />
      <PrivateRoute
        path={match.url + "/:view/productlist"}
        component={AdminScreen}
        exact
      />
    </Switch>
  );
};

export default AdminProductListRoutes;
