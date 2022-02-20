import React from "react";
import { Switch } from "react-router-dom";
import OrderListScreen from "../../Screens/Admin/OrderListScreen";
import PrivateRoute from "../Routing/PrivateRoute";

const AdminOrderListRoutes = () => {
  return (
    <>
      <Switch>
        {/* 
            Take special care to layer the routes that it wont always go to 
            /admin/orderlist, if that route is at the top, itll match to that route, and will
            only ever route there, leaving you unable to get the necessary params 
        */}
        <PrivateRoute
          path="/admin/orderlist/keyword/:keyword/page/:pageNumber"
          component={OrderListScreen}
        />
        <PrivateRoute
          path="/admin/orderlist/keyword/:keyword"
          component={OrderListScreen}
        />
        <PrivateRoute
          path="/admin/orderlist/:pageNumber"
          component={OrderListScreen}
        />
        <PrivateRoute path="/admin/orderlist" component={OrderListScreen} />
      </Switch>
    </>
  );
};

export default AdminOrderListRoutes;
