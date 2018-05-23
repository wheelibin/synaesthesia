import React from "react";
import * as synth from "../../../synth/synth";

class Drone extends React.Component {
  componentDidMount() {
    const randomSeed = new Date().getTime().toString();
    synth.play(2, randomSeed);
  }
  render() {
    return null;
  }
}

export default Drone;
