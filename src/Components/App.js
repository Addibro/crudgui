import React, { Component } from "react";
// import injectTapEventPlugin from "react-tap-event-plugin";
import Login from "./Login";
import "./App.css";
import "typeface-roboto";
import Footer from "./Layouts/Footer";
import Header from "./Layouts/Header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Login />
        <Footer />
      </div>
    );
  }
}

export default App;
