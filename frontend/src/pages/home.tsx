import { Contacts } from "@/App";
import ContactList from "@/components/layout/ContactList";
import Manager from "@/components/layout/Manager";
import NavBar from "@/components/layout/NavBar";
import { axiosInstance } from "@/pages/Login/axiosInstance";
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

const Home = () => {
  const { refreshed } = Refreshed();
  const navigate = useNavigate();
  const [contactData, setContactData] = useState<Contacts[] | null>(null);
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

  //fetch contacts
  useEffect(() => {
    const fetchContact = async () => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        console.log("token found");
        try {
          const res = await axiosInstance.get<Contacts[]>("/contacts");
          const AlphaContacts = res.data.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setContactData(AlphaContacts);
          setSortedArray(AlphaContacts);
          const FavContacts = res.data.filter((contact) => {
            return contact.fav == true;
          });
          setFavContact(FavContacts);

          console.log(FavContacts);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchContact();
  }, [refreshed]);

  //function to get initials of name
  const getInitials = function (string: string) {
    const names = string.split(" ");
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };
  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <div className="flex">
        <NavBar
          contactData={contactData}
          sortedArray={sortedArray}
          IsSelected={IsSelected}
          setIsSelected={setIsSelected}
          FavContact={FavContact}
          handleContact={handleContact}
          setSortedArray={setSortedArray}
          getInitials={getInitials}
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
          getInitials={getInitials}
        />
        <Manager
          selContact={selContact}
          sortedArray={sortedArray}
          setSelContact={setSelContact}
          setSortedArray={setSortedArray}
          getInitials={getInitials}
        />
      </div>
    </div>
  );
};

export default Home;
