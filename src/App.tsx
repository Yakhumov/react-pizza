import React from "react";
import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./Pages/Home";
import Notfound from "./Pages/Notfound";
import { Route, Routes } from "react-router-dom";
import Cart from "./Pages/Cart";
import FullPizza from "./components/FullPizza"; 
import { useState } from "react";

export const SearchContext = React.createContext();  
function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>    
        <Header />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="pizza/:id" element={<FullPizza />} />         
          <Route path="*" element={<Notfound />} />
        </Routes>
      </SearchContext.Provider>   
    </div>
  );
}

export default App      
