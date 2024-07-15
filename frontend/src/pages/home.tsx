import { Contacts } from "@/App";

import ContactList from "@/components/layout/ContactList";
import Manager from "@/components/layout/Manager";
import NavBar from "@/components/layout/NavBar";

import { useState } from "react";

const Home = ({contactData, setContactData}:{contactData:Contacts[] | null, setContactData:any}) => {

  //Contact Data after sorting
  const [sortedArray, setSortedArray] = useState<Contacts[] | null>(
    contactData
  );
  //Navbar button selection
  const [IsSelected, setIsSelected] = useState("allPeople");
  //Navbar Fav Contact
  const [FavContact, setFavContact] = useState<Contacts[] | null>(null)
  return (
    <div>
      <div className="flex">
        <NavBar contactData={contactData} sortedArray={sortedArray} IsSelected={IsSelected} setIsSelected={setIsSelected} FavContact={FavContact} />
        <ContactList
        setFavContact={setFavContact}
        contactData={contactData}
          setContactData={setContactData}
          sortedArray={sortedArray}
          setSortedArray={setSortedArray}
          IsSelected={IsSelected}
          FavContact={FavContact}
        />
        <Manager />
      </div>
    </div>
  );
};

export default Home;
