import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function HomePage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  return (
    <div>
      <h1 className="header">Welcome to Gameodex</h1>

      {isLoggedIn && (
        <>
          <h3 className="greeting">Welcome back, <span>{user.username}</span></h3>
        </>
      )}
    </div>
  );
}

export default HomePage;
