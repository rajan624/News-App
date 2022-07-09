import './App.css';
import Cookies from 'universal-cookie';
import NavBar from './components/NavBar';
import News from './components/News';
import {
  Routes,
  Route,
} from "react-router-dom";
import About from './components/About';

import Login from './components/Login';
import { useEffect, useState } from 'react';
import PersonalNews from './components/PersonalNews';
import UpdatePersonalNews from './components/UpdatePersonalNews';
import AdminComponent from './components/AdminComponent';
function App() {
  let PageSize= 9;
 const [type , settype] = useState("");
  useEffect(()=>{
    const cookies = new Cookies();
    cookies.set('One', '', { path: '/' });
    const Id = cookies.get('One');
    settype(Id);
  },[])

  return (
    <>
    <Routes>
    <Route path="/"  element={<Login/>} />
          <Route path="/home"  element={<News pageSize={PageSize} country="in" category="general"/>} />
          <Route path="/about"  element={<About/>} />
          <Route path="/LocalNews"  element={<PersonalNews/>} />
          <Route path="/updateNews"  element={<UpdatePersonalNews/>} />
          <Route path="/AdminComponents"  element={<AdminComponent/>} />

          {/* catagory */}
          <Route exact path="/general" element={<News key="general"  pageSize={PageSize} country="in" category="general"/>} />
          <Route exact path="/business" element={<News key="business" pageSize={PageSize} country="in" category="business"/>} />
          <Route exact path="/entertainment" element={<News   key="entertainment" pageSize={PageSize} country="in" category="entertainment"/>} />
          <Route exact path="/health" element={<News key="health" pageSize={PageSize} country="in" category="health"/>} />
          <Route exact path="/science"element={<News key="scince" pageSize={PageSize} country="in" category="science"/>} />
          <Route exact path="/sports" element={<News key="sports" pageSize={PageSize} country="in" category="sports"/>} />
          <Route exact path="/technology" element={<News key="technology" pageSize={PageSize} country="in" category="technology"/>} />
          

      </Routes> 
          
    
    
    </>
  );
}

export default App;
