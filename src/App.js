import './App.css';
import {Routes,Route, Navigate} from "react-router-dom";
import LoginPage from './LoginPage';
import Forgot from './Forgot';
import Signup from './Signup';
import PageNotFound from './PageNotFound';
import Dashbord from './Dashbord/Dashbord';
import Profile from './Profile/Profile';
import ChangePassword from './ChangePassword/ChangePassword';
function App() {
  return (

  <Routes>  
    <Route path="/" element={<Navigate to="/login"/>} />
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/forgot' element={<Forgot/>}/> 
    <Route path='/signup' element={<Signup/>}/> 
    <Route path='/dashbord' element={<Dashbord/>}/> 
    <Route path='/profile' element={<Profile/>}/> 
    <Route path='/change-password' element={<ChangePassword/>}/> 
    <Route path='*' element={<PageNotFound/>}/> 
  </Routes>
  );
  
}

export default App;
