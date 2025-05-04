import React from "react";
import './styles/App.css'
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className="main-container">
        <AppRouter/>
      </div>
    </BrowserRouter>
  );
}

export default App;
