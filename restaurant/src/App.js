import './App.css';
import AppHeader from './Components/AppHeader';
import SideMenu from "./Components/SideMenu/SideMenu";
import { useEffect, useState } from "react";
import { Route, Routes, useParams } from 'react-router-dom';
import axios from "axios";
import AppRoutes from './Components/AppRoutes/AppRoutes';
//import PageContent from './Components/PageContent/PageContent';

function App() {
  return (
    <Routes>
      <Route path="/:id/*" element={<RestaurantPage />} />
    </Routes>
  );
}

function RestaurantPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8800/restPage/${id}`)
      .then((res) => {
        if (res.data.length > 0) {
          setUser(res.data[0]);
          console.log(res.data)
        } else {
          console.log('No restaurant found');
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  return (
    <>
      <AppHeader id={id} />
      <div className="SideMenuAndPageContent">
        <SideMenu id={id} />
        <div className="PageContent">
          <AppRoutes id={id} />
        </div>
      </div>
    </>
  );
}

export default App;
