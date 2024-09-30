import { Route, Routes } from 'react-router-dom';
import './App.css'; 
import Login from './controller/Login';
import Nav from './controller/Nav'
import RegisterEmp from './controller/RegisterEmp';


function App() {
  return (
    <>  
    <Nav/>
    <Routes>
      <Route path='/api/login'element = {<Login/>}/>
      <Route path='/api/registration'element = {<RegisterEmp/>}/>
    </Routes>
    </>
  );
}

export default App;
