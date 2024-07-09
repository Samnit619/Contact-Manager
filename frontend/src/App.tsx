import { ThemeProvider} from "./components/ui/theme-provider";
import NavBar from "./components/layout/NavBar";
import ContactList from "./components/layout/ContactList";
import { useState } from "react";
import Manager from "./components/layout/Manager";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { Login } from './pages/login';
import Home from "./pages/home";

export interface Contacts {
  
  user_id: string;
  _id: string;
  name: string;
  email: string;
  phone: number;
  fav: boolean

} 
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
