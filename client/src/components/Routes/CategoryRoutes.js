import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminScreen from "../../Screens/Admin/AdminScreen";
import CategoriesList from "../../Screens/Admin/CategoriesList";
import CategoryScreen from "../../Screens/Category/CategoryScreen";
import CategoryEdit from "../Forms/CategoryEdit";
import PrivateRoute from "../Routing/PrivateRoute";

const CategoryRoutes = ({ match }) => {
  return (
    <>
      <Switch>
        {/* 
          Take special care to layer the routes that it wont always go to 
          /admin/orderlist, if that route is at the top, itll match to that route, and will
          only ever route there, leaving you unable to get the necessary params 
      */}

        {/* For Admin Stuff */}
        <PrivateRoute
          path={match.url + "/:view/keyword/:keyword"}
          component={AdminScreen}
          exact
        />
        <PrivateRoute
          path={match.url + "/view/category/:id"}
          component={AdminScreen}
        />
      </Switch>
    </>
  );
};

export default CategoryRoutes;
