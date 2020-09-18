import React, { Component } from "react";
import "./RCSpinner.css";

export default class LoadingScreen extends Component {
  render() {
    return (
      <div className="positionspinner">
        <div className="centerspinner">
          <div class="spinner"></div>
          <p class="m-0 p-0 strong rclogo-center">{"< >"}</p>
        </div>
      </div>
    );
  }
}
