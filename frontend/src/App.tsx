import { ThemeProvider } from "./components/ui/theme-provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login";
import Home from "./pages/home";

export interface Contacts {
  user_id: string;
  _id: string;
  name: string;
  email: string;
  phone: number;
  fav: boolean;
}
function App({contactData}:{contactData: Contacts[] | null}) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home contactData={contactData} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
