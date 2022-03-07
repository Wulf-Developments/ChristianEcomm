import React from "react";
import { Switch } from "react-router-dom";
import AdminScreen from "../../Screens/Admin/AdminScreen";
import PrivateRoute from "../Routing/PrivateRoute";

const AdminOrderListRoutes = ({ match }) => {
  return (
    <>
      <Switch>
        {/* 
            Take special care to layer the routes that it wont always go to 
            /admin/orderlist, if that route is at the top, itll match to that route, and will
            only ever route there, leaving you unable to get the necessary params 
        */}
        <PrivateRoute
          path={
            match.url + "/:view/orderlist/keyword/:keyword/page/:pageNumber"
          }
          component={AdminScreen}
          exact
        />
        <PrivateRoute
          path={match.url + "/:view/orderlist/keyword/:keyword"}
          component={AdminScreen}
          exact
        />
        <PrivateRoute
          path={match.url + "/:view/orderlist/:pageNumber"}
          component={AdminScreen}
          exact
        />
        <PrivateRoute
          path={match.url + "/:view/orderlist"}
          component={AdminScreen}
          exact
        />
      </Switch>
    </>
  );
};

export default AdminOrderListRoutes;
