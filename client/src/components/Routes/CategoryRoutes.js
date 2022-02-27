import React from "react";
import { Route, Switch } from "react-router-dom";
import CategoriesList from "../../Screens/Admin/CategoriesList";
import HomeScreen from "../../Screens/Home/HomeScreen";
import PrivateRoute from "../Routing/PrivateRoute";

const CategoryRoutes = () => {
  return (
    <>
      <Switch>
        {/* 
          Take special care to layer the routes that it wont always go to 
          /admin/orderlist, if that route is at the top, itll match to that route, and will
          only ever route there, leaving you unable to get the necessary params 
      */}
        <Route
          path="/category/:slug/keyword/:keyword/page/:pageNumber"
          component={HomeScreen}
        />
        <Route path="/category/:slug/keyword/:keyword" component={HomeScreen} />
        <Route path="/category/:slug/:pageNumber" component={HomeScreen} />
        <Route path="/category/:slug" component={HomeScreen} />

        {/* For Admin Stuff */}
        <PrivateRoute path="/admin/categories" component={CategoriesList} />
      </Switch>
    </>
  );
};

export default CategoryRoutes;
