import React from "react";
import { Switch } from "react-router-dom";
import ProductListScreen from "../../Screens/Admin/ProductListScreen";
import ProductEditScreen from "../../Screens/Admin/ProductEditScreen";
import PrivateRoute from "../Routing/PrivateRoute";

const AdminProductListRoutes = () => {
  return (
    <Switch>
      <PrivateRoute
        path="/admin/productlist/search/:keyword/page/:pageNumber"
        component={ProductListScreen}
        exact
      />
      <PrivateRoute
        path="/admin/productlist/:pageNumber"
        component={ProductListScreen}
        exact
      />
      <PrivateRoute
        path="/admin/product/:id/edit"
        component={ProductEditScreen}
      />
      <PrivateRoute
        path="/admin/productlist"
        component={ProductListScreen}
        exact
      />
    </Switch>
  );
};

export default AdminProductListRoutes;
