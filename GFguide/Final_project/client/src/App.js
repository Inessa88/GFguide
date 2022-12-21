import {useState,createContext} from 'react';
import LoginRegisterForm from './components/LoginRegisterForm';
import Home from './components/Home';
import Nav from './components/Nav';
import Products from './components/Products';
import AddProductForm from './components/AddProductForm';
import Information from './components/Information';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import {Auth} from './auth/Auth';



export const AppContext = createContext(null);


function App() {
  const [token, setToken] = useState('')
  return (
    <BrowserRouter>
    <AppContext.Provider value={{token,setToken}}>
    <div className="App">
        <Nav/>
        <Routes>
        <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<LoginRegisterForm title='Login'/>}/>
          <Route path='/register' element={<LoginRegisterForm title='Register'/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/upload' element={<AddProductForm/>}/>
          <Route path='/info' element={<Auth><Information/></Auth>}/>
        </Routes>
    
      
    </div>
    </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
