import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      <Link to="/signup">
        <button>Sign Up</button>
      </Link>

      <Link to="/login">
        <button>Log In</button>
      </Link>

      <Link to="/profile">
        <button>Profile</button>
      </Link>

      <Link to="/games">
        <button>Games</button>
      </Link>
    </nav>
  );
}

export default Navbar;
