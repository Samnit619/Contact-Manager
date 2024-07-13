import { Contacts } from "@/App";

import ContactList from "@/components/layout/ContactList";
import Manager from "@/components/layout/Manager";
import NavBar from "@/components/layout/NavBar";

import { useState } from "react";

const Home = () => {
  //Initial fetching of data
  const [contactData, setContactData] = useState<Contacts[] | null>(null);
  //Contact Data after sorting
  const [sortedArray, setSortedArray] = useState<Contacts[] | null>(
    contactData
  );

  return (
    <div>
      <div className="flex">
        <NavBar contactData={sortedArray} />
        <ContactList
        contactData={contactData}
          setContactData={setContactData}
          sortedArray={sortedArray}
          setSortedArray={setSortedArray}
        />
        <Manager />
      </div>
    </div>
  );
};

export default Home;
