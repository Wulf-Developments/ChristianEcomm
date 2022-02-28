import React from "react";
import { Route, Switch } from "react-router-dom";
import CategoriesList from "../../Screens/Admin/CategoriesList";
import CategoryScreen from "../../Screens/Category/CategoryScreen";
import CategoryEdit from "../Forms/CategoryEdit";
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
          component={CategoryScreen}
        />
        <Route
          path="/category/:slug/keyword/:keyword"
          component={CategoryScreen}
        />
        <Route
          path="/category/:slug/page/:pageNumber"
          component={CategoryScreen}
        />
        <Route path="/category/:slug" component={CategoryScreen} />

        {/* For Admin Stuff */}
        <PrivateRoute
          path="/admin/categories/keyword/:keyword"
          component={CategoriesList}
        />
        <PrivateRoute path="/admin/categories" component={CategoriesList} />
        <PrivateRoute path="/admin/category/:id" component={CategoryEdit} />
      </Switch>
    </>
  );
};

export default CategoryRoutes;
