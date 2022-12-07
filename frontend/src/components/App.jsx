import React, {useState} from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Background from "./Background";
import TakeAddress from "./TakeAddress";

const App = () => {
    return (
        <>
            <Background />
            <Navbar />
            <TakeAddress />
            <Footer />
        </>
    ); 
  };
  
  export default App;