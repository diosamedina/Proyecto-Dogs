import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from './views/landing/landing';
import Home from './views/home/home';
import Detail from './views/detail/detail';
import Form from './views/form/form';
// import './App.css';

function App() {
  return (
    <div className="App">
      <Routes> 
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
