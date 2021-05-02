import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Screens/HomeScreen";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Container>
        <main className="py-3">
          <Home />
        </main>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
