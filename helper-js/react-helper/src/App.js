import { Routes, Route, Link } from "react-router-dom";
import HookApi from "./pages/HookApi";
import HomePage from "./pages/HomePage";
import InfiniteScroll from "./pages/InfiniteScroll";
import Placeholder from "./pages/Placeholder";

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li key="scroll" className="nav-item">
              <Link className="nav-link" to="/scroll">
                Infinite Scroll
              </Link>
            </li>
            <li key="place" className="nav-item">
              <Link className="nav-link" to="/place">
                Placeholder
              </Link>
            </li>
            <li key="hook-api" className="nav-item">
              <Link className="nav-link" to="/hook-api">
                Hook API
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scroll" element={<InfiniteScroll />} />
        <Route path="/place" element={<Placeholder />} />
        <Route path="/hook-api" element={<HookApi />} />
      </Routes>
    </div>
  );
}

export default App;
