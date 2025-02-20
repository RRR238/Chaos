// src/App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes"; // Import AppRoutes

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes /> {/* This is where all routes are handled */}
    </Router>
  );
};

export default App;
