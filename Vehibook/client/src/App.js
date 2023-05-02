import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
// import 'antd/dist/antd.css';
import UserBookings from './pages/UserBookings';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';
import { useParams } from 'react-router-dom';
import 'antd/dist/reset.css';
function App() {
  const { id } = useParams();
  return (
    
    <div className="App">
      {/* <h1>VehiBook</h1> */}
      
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/Login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/booking/:id" element={<BookingCar />} exact></Route>
      <Route path="/userbookings" element={<UserBookings />}></Route>
      <Route path="/addcar" element={<AddCar />}></Route>
      <Route path="/editcar/:id" element={<EditCar />}></Route>
      <Route path="/admin" element={<AdminHome />}></Route>

    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
//  export function ProtectedRoute(props){
//   if(localStorage.getItem('user')){
//     return <Route {...props}/>
//   }
//   else{
//     return <Navigate to='/login'/>
//   }
//  }