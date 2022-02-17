import React from "react";
import { useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import OrderListScreen from "../../Screens/OrderListScreen";
import PrivateRoute from "../Routing/PrivateRoute";
import AdminNav from "../Admin/AdminNav";

const AdminOrderListRoutes = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  return (
    <>
      {userInfo && userInfo.isAdmin && <AdminNav />}
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
