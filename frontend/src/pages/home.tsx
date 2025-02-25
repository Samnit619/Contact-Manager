import { Contacts } from "@/App";
import ContactList from "@/components/layout/ContactList";
import Manager from "@/components/layout/Manager";
import NavBar from "@/components/layout/NavBar";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

// context for refreshing contact data
const Refresh = createContext<refreshProviderState | null>(null);

interface refreshProviderProps {
  children: ReactNode;
}
interface refreshProviderState {
  refreshed: boolean;
  setRefreshed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RefreshProvider: React.FC<refreshProviderProps> = ({
  children,
}) => {
  const [refreshed, setRefreshed] = useState(false);
  return (
    <Refresh.Provider value={{ refreshed, setRefreshed }}>
      {children}
    </Refresh.Provider>
  );
};

export const Refreshed = () => {
  const refreshedContext = useContext(Refresh);
  if (!refreshedContext) {
    throw new Error("Refreshed must be under ContextProvider");
  }
  return refreshedContext;
};

const Home = ({
  contactData,
  setContactData,
}: {
  contactData: Contacts[] | null;
  setContactData: any;
}) => {
  const navigate = useNavigate();

  //Contact Data after sorting
  const [sortedArray, setSortedArray] = useState<Contacts[] | null>(
    contactData
  );
  //Navbar button selection
  const [IsSelected, setIsSelected] = useState("allPeople");
  //Navbar Fav Contact
  const [FavContact, setFavContact] = useState<Contacts[] | null>(null);
  //for contact selection through contact ID
  const [selContact, setSelContact] = useState<string | null>("");
  console.log(sortedArray);
  // Handle contact selection
  const handleContact = (contactId: string) => {
    setSelContact(contactId);
  };
  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) {
      navigate("/login");
    }
  }, []);
  return (
    <RefreshProvider>
      <div>
        <div className="flex">
          <NavBar
            contactData={contactData}
            sortedArray={sortedArray}
            IsSelected={IsSelected}
            setIsSelected={setIsSelected}
            FavContact={FavContact}
            handleContact={handleContact}
          />
          <ContactList
            setFavContact={setFavContact}
            contactData={contactData}
            setContactData={setContactData}
            sortedArray={sortedArray}
            setSortedArray={setSortedArray}
            IsSelected={IsSelected}
            FavContact={FavContact}
            selContact={selContact}
            setSelContact={setContactData}
            handleContact={handleContact}
          />
          <Manager
            selContact={selContact}
            sortedArray={sortedArray}
            setSelContact={setSelContact}
            setSortedArray={setSortedArray}
          />
        </div>
      </div>
    </RefreshProvider>
  );
};

export default Home;
