import Home from "./Home";
import {Route , Routes} from 'react-router-dom';
import React from 'react';
import Cousine from "./Cousine";
import Searched from "./Searched";

function Pages() {
  return (
 
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cousine/:type" element={<Cousine />} />
        <Route path="/searched/:search" element={<Searched />} />
    </Routes>

  )
}

export default Pages