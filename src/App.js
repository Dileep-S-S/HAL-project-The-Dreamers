import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './Components/Header';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Registration from './Components/Registration';
import { useEffect, useState } from 'react';
import { Usercontext } from './UserContext';
import View from './Components/View';
import Rmain from './Components/Rmain';
import AboutUs from './Components/AboutUs';
import ViewUsers from './Components/ViewUsers';
import Landregestration from './Components/LandRegistration';
import Vehicleregis from './Components/Vehicleregis';
import ViewVehicle from './Components/ViewVehicle';
import ViewLand from './Components/ViewLand';
import Profile from './Components/Profile';
import GroupWork from "./Components/Group.jsx"
function App() {
  // const { user, setuser } = useContext(Usercontext);
  const [user, setuser] = useState(()=>{
    
    try{
      const item =window.localStorage.getItem('user');
      return item ? JSON.parse(item) :{}
    }catch(error){
      console.log(error);
      return {}
    }
  });

  useEffect(() => {
    localStorage.setItem('user',JSON.stringify(user))
  },[user]);
  return (
    <>
    <Usercontext.Provider value={{user,setuser}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />} >
        <Route index element={<Dashboard/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/registeruser" element={<Registration />}/>
        <Route path='/about' element={<AboutUs />}/>
        <Route path='/view' element={<View/>}/>
        <Route path='/rmain' element={<Rmain />}/>
        <Route path='/viewusers' element={<ViewUsers />}/>
        <Route path='/viewvehicle' element={<ViewVehicle />}/>
        <Route path='/viewland' element={<ViewLand/>}/>
        <Route path="/landregis" element={<Landregestration/>}/>
        <Route path='/vehiclregis' element={<Vehicleregis/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/Group' element={<GroupWork/>}/>
        <Route path="*" element={() => <h1>Page not found</h1>} /> 
        </Route>
      </Routes>
    </BrowserRouter>
    </Usercontext.Provider>
    </>
  );
}

export default App;
