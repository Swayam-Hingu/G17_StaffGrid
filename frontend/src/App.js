import { Route, Routes } from 'react-router-dom';
import './App.css'; 
import Login from './components/Login';
import Nav from './components/Nav'
import RegisterEmp from './components/RegisterEmp';


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
