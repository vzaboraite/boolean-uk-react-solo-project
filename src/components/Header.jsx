import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/collections">Collections</Link>
          </li>
          {/* <li>
            <Link to="/exercises">Exercises</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}
