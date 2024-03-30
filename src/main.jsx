import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./index.responsive-styles.css";
import "./index.themes.css";
import { BrowserRouter as Router } from "react-router-dom";
import { LanguageProviderWrapper } from "./context/language.context.jsx";
import { AuthProviderWrapper } from "./context/auth.context";
import { ThemeProviderWrapper } from "./context/theme.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <LanguageProviderWrapper>
        <AuthProviderWrapper>
          <ThemeProviderWrapper>
            <App />
          </ThemeProviderWrapper>
        </AuthProviderWrapper>
      </LanguageProviderWrapper>
    </Router>
  </React.StrictMode>
);
