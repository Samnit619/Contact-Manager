import { ThemeProvider} from "./components/ui/theme-provider";
import NavBar from "./components/layout/NavBar";
import ContactList from "./components/layout/ContactList";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
      <div className="flex">

      <NavBar />
      <ContactList/>
      </div>
    </ThemeProvider>
  );
}

export default App;
