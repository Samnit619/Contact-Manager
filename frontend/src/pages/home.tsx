import { Contacts } from "@/App";
import ContactList from "@/components/layout/ContactList";
import Manager from "@/components/layout/Manager";
import NavBar from "@/components/layout/NavBar";
import { useState } from "react";

const Home = () => {
  const [contactData, setContactData] = useState<Contacts[] | null>(null);
  return (
    <div>
      <div className="flex">
        <NavBar contactData={contactData} />
        <ContactList
          setContactData={setContactData}
          contactData={contactData}
        />
        <Manager />
      </div>
    </div>
  );
};

export default Home;
