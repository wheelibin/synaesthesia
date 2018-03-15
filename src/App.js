import React, { Component } from "react";
import "./App.css";
import * as synth from "./synth";

class App extends Component {
  render() {
    synth.play();

    return <div className="App" />;
  }
}

export default App;
