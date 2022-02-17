import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Navbar/Header";
import Footer from "./components/Footer";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/Product/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";
import Reset from "./Screens/Reset";
import ResetPassword from "./Screens/ResetPassword";
import Support from "./components/Forms/Support";
import Alert from "./components/Alert";
import { useSelector } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/Routing/PrivateRoute";
import AdminOrderListRoutes from "./components/Routes/AdminOrderListRoutes";
import AdminUserListRoutes from "./components/Routes/AdminUserListRoutes";
import AdminProductListRoutes from "./components/Routes/AdminProductListRoutes";

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
          <Route component={AdminOrderListRoutes} />
          <Route component={AdminUserListRoutes} />
          <Route component={AdminProductListRoutes} />
          <PrivateRoute path="/order/:id" component={OrderScreen} />
          <PrivateRoute path="/shipping" component={ShippingScreen} />
          <PrivateRoute path="/payment" component={PaymentScreen} />
          <PrivateRoute path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <PrivateRoute path="/profile" component={ProfileScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />

          <Route path="/resetpassword" component={Reset} />
          <Route path="/support" component={Support} />
          <Route
            path="/auth/resetpassword/:resettoken"
            component={ResetPassword}
          />

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
