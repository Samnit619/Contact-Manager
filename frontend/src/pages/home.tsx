import { Contacts } from "@/App";

import ContactList from "@/components/layout/ContactList";
import Manager from "@/components/layout/Manager";
import NavBar from "@/components/layout/NavBar";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    if(!localStorage.getItem('jwtToken')){
      navigate('/login');
    }
  },[])
  return (
    <div>
      <div className="flex">
        <NavBar
          contactData={contactData}
          sortedArray={sortedArray}
          IsSelected={IsSelected}
          setIsSelected={setIsSelected}
          FavContact={FavContact}
        />
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
