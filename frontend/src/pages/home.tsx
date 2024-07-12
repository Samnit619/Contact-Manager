
import { Contacts } from "@/App";
import ContactList from "@/components/layout/ContactList";
import Manager from "@/components/layout/Manager";
import NavBar from "@/components/layout/NavBar";

const Home = ({contactData}:{contactData:Contacts[] | null}) => {
  
  return (
    <div>
      <div className="flex">
        <NavBar contactData={contactData}/>
        <ContactList
        contactData={contactData}
        />
        <Manager />
      </div>
    </div>
  );
};

export default Home;
