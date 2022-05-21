import React from "react";
import DemoHttpReducer from "../hook-call-api/DemoHttpReducer";
import DemoHttp from "./../hook-call-api/DemoHttp";

function HookApi() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6 justify-content-center my-5">
          <h3>HTTP</h3>
          <DemoHttp />
        </div>
        <div className="col-6 justify-content-center my-5">
          <h3>HTTP Reducer</h3>
          <DemoHttpReducer />
        </div>
      </div>
    </div>
  );
}

export default HookApi;
