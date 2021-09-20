import { Link } from "react-router-dom";
import logo from "../assets/logo/logo.png";

export default function Header() {
  return (
    <header>
      <div className="brand">
        <img src={logo} alt="chess-tactics-logo" />
        <span className="app-name">Chess Tactics</span>
      </div>
      <nav className="nav-list">
        <ul className="navigation">
          <li>
            <Link to="/collections">Home</Link>
          </li>
          <li>
            <Link to="/exercises">Exercises</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
