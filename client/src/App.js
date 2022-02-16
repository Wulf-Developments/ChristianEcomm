import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Navbar/Header";
import Footer from "./components/Footer";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";
import UserListScreen from "./Screens/UserListScreen";
import UserEditScreen from "./Screens/UserEditScreen";
import ProductListScreen from "./Screens/ProductListScreen";
import ProductEditScreen from "./Screens/ProductEditScreen";
import OrderListScreen from "./Screens/OrderListScreen";
import Reset from "./Screens/Reset";
import ResetPassword from "./Screens/ResetPassword";
import Support from "./components/Forms/Support";
import Alert from "./components/Alert";
import { useSelector } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/Routing/PrivateRoute";

const App = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  if (userInfo) {
    setAuthToken(userInfo.token);
  }
  return (
    <Router>
      <Alert />
      <Header />
      <main className="py-3">
        <Container>
          <PrivateRoute path="/order/:id" component={OrderScreen} />
          <PrivateRoute path="/shipping" component={ShippingScreen} />
          <PrivateRoute path="/payment" component={PaymentScreen} />
          <PrivateRoute path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <PrivateRoute path="/profile" component={ProfileScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <PrivateRoute path="/admin/userlist" component={UserListScreen} />
          <PrivateRoute
            path="/admin/user/:id/edit"
            component={UserEditScreen}
          />
          <Route path="/resetpassword" component={Reset} />
          <Route path="/support" component={Support} />
          <Route
            path="/auth/resetpassword/:resettoken"
            component={ResetPassword}
          />
          <PrivateRoute
            path="/admin/productlist"
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
          <PrivateRoute path="/admin/orderlist" component={OrderListScreen} />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
            exact
          />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
