import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Container>
          <main className="py-3">
            <Route path="/" component={Home} exact />
            <Route path="/product/:id" component={ProductScreen} />
          </main>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
