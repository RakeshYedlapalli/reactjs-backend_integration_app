import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import UserDetailsForm from './UserDetailsForm';
import LoginForm from './LoginForm';
import BasicTable from './Showdata';
var hashHistory = require('react-router-redux')



function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div>
      
    <Router>
      <Routes history={hashHistory}>
        <Route exact path="/"  element={<UserDetailsForm/>} />
        <Route exact path="/login" element={<LoginForm/>} />
        <Route exact path="/home" element={<BasicTable/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
