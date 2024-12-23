import { createContext, useState, useEffect, useCallback } from "react";
// implemented React hook `useCallback` to memoize functions and improve code
import authService from "../services/auth.service";

const AuthContext = createContext();

function AuthProviderWrapper({ children }) {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    isLoading: true,
    user: null,
  });
  // Combined `isLoggedIn`, `isLoading`, `user` into
  // a single state object to reduce number of `useState`
  // calls and ensure related state values are updated together.


  const storeToken = useCallback((token) => {
    localStorage.setItem("authToken", token);
  }, []);

  const authenticateUser = useCallback(async () => {
    const storedToken = localStorage.getItem("authToken")

    if (storedToken) {
      try {
        const { data : user } = await authService.verifyToken();
        setAuthState({ isLoggedIn: true, isLoading: false, user });
      }
      catch (error) {
        console.log("Authentication failed", error);
        setAuthState({ isLoggedIn: false, isLoading: false, user: null});
      }
    }
    else {
      setAuthState({ isLoggedIn: false, isLoading: false, user: null});
    }
  }, []);

  const removeToken = useCallback(() => {
    localStorage.removeItem("authToken");
  }, []);

  const logOutUser = useCallback(() => {
    removeToken();
    authenticateUser();
  }, [removeToken, authenticateUser]);

  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  return (
      <AuthContext.Provider
        value={{
          ...authState, //Spread `authState` directly into the `AuthContext.Provider`'s `value` prop
          storeToken,
          authenticateUser,
          logOutUser,
        }}
      >
        {children}
      </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
