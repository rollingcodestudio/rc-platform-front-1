import React from "react";
import "./RCSpinner.css";

 const LoadingScreen = () => {
    return (
      <div className="positionspinner">
        <div className="centerspinner">
          <div className="spinner"></div>
          <div className="d-flex">
          <span class="strong rclogo-center mr-2">{"<"}</span>
          <span class="strong rclogo-center">{">"}</span>
          </div>
        </div>
      </div>
    );
}

export default LoadingScreen

