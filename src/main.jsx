import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { LanguageProviderWrapper } from "./context/language.context.jsx";
import { AuthProviderWrapper } from "./context/auth.context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <LanguageProviderWrapper>
        <AuthProviderWrapper>
          <App />
        </AuthProviderWrapper>
      </LanguageProviderWrapper>
    </Router>
  </React.StrictMode>
);
