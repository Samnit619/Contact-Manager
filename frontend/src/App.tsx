import { ThemeProvider} from "./components/ui/theme-provider";
import NavBar from "./components/layout/NavBar";
import ContactList from "./components/layout/ContactList";
import { useState } from "react";
import Manager from "./components/layout/Manager";

export interface Contacts {
  
  user_id: string;
  _id: string;
  name: string;
  email: string;
  phone: number;
  fav: boolean

} 
function App() {
  const [contactData, setContactData] = useState<Contacts[] | null>(null);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
      <div className="flex">

      <NavBar contactData={contactData} />
      <ContactList setContactData={setContactData} contactData={contactData}/>
      <Manager/>
      </div>
    </ThemeProvider>
  );
}

export default App;
