import { ThemeProvider } from "./components/ui/theme-provider";
import NavBar from "./NavBar";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NavBar />
    </ThemeProvider>
  );
}

export default App;
