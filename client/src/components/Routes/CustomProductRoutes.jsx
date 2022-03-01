import React from "react";
import { Route, Switch } from "react-router-dom";
import CustomProducts from "../CustomProduct/CustomProducts";

const CustomProductRoutes = () => {
  return (
    <Switch>
      <Route path="/custom-products" component={CustomProducts} />
    </Switch>
  );
};

export default CustomProductRoutes;
