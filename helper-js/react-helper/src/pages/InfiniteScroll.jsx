import React from "react";
import List from "../infinite-scroll/List";
import List2 from "../infinite-scroll/List2";

function InfiniteScroll() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center mt-5">
          <h1>React Hooks Infinite Scroller</h1>
          <h3 className="text-muted">
            An <u>infinite scroll</u> component, built using React and custom
            React Hooks.
            <br />
            <small>Scroll down to see it in action</small>
          </h3>
        </div>
      </div>
      <div className="row">
        <div className="col-6 justify-content-center my-5">
          <List />
        </div>
        <div className="col-6 justify-content-center my-5">
          <List2 />
        </div>
      </div>
    </div>
  );
}

export default InfiniteScroll;
