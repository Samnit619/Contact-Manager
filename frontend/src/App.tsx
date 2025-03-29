import { ThemeProvider } from "./components/ui/theme-provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login/login";
import Home, { RefreshProvider } from "./pages/home";
import { useEffect, useState } from "react";
import { axiosInstance } from "./pages/Login/axiosInstance";
import Register from "./pages/Register";
import { CurrentUser } from "./assets/FetchUsername";

export interface Contacts {
  user_id: string;
  _id: string;
  name: string;
  email: string;
  phone: number;
  fav: boolean;
  relation: string;
  tags: [string];
  description: string;
  birthday: string;
  location: string;
  home: string;
}
function App() {
  //const [userId, setUserId] = useState("");

  /*  useEffect(() => {
    const fetchUserId = async () => {
      const res = await axiosInstance.get<CurrentUser>("/users/current");
      setUserId(res.data.id);
      console.log(userId);
    };
    fetchUserId();
  }, []);*/

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RefreshProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path={`/`} element={<Home />} />
          </Routes>
        </Router>
      </RefreshProvider>
    </ThemeProvider>
  );
}

export default App;
