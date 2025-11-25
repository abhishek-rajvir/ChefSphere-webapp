// import { useState } from 'react'

import MyHeader from './components/MyHeader';
import MyFooter from './components/MyFooter';
import MainNavBar from './components/MainNavBar';
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.css";
import { Navigate, Route, Routes } from 'react-router-dom';
import CreatorList from './pages/CreatorList';
import CreatorPostList from './pages/CreatorPostList';
import HomePageComp from './pages/HomePageComp';

import { useEffect, useState } from "react";
import FoodieService from './service/FoodieService';

function App() {
  // // const [foodies, setFoodies] = useState([]);

  // // initalisation lc method
  // useEffect(() => {
  //   FoodieService()
  //     .then(data => {setFoodies(data); console.log(data);})
  //     .catch(err => console.error(err));
  // }, []);

  return(
    <>
      {/* <div>
      <h2>Foodies List</h2>
      <ul>
        {foodies.map((item, index) => (
          <li key={item.f_id}>{item.firstName+item.lastName}</li>
        ))}
      </ul>
    </div> */}
    <MyHeader/>
    <br></br>
    {/* <h5><small>Welcome to ChefSphere frontend!!</small></h5>  */}
    <MainNavBar/>
    <Routes>
      <Route path='/' element={<Navigate replace to="/home"></Navigate>}></Route>
      <Route path='/home' element={<HomePageComp/>}></Route>
      <Route path='/creators' element={<CreatorList/>}>
        <Route path=':id/view/posts' element={CreatorPostList}></Route>
      </Route>
    </Routes>
    <MyFooter/>
    </>
  )
}

export default App
