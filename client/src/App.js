import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Container>
        <main className="py-3">
          <h1>Welcome to the eCommerce page</h1>
        </main>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
