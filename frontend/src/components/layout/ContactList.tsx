import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Contacts } from "@/App";
import { SelectScrollable } from "./filter2";
import DisplayContacts, { FavoriteContacts } from "@/assets/exportFunction";
import { axiosInstance } from "@/pages/Login/axiosInstance";

const ContactList = ({
  contactData,
  setContactData,
  sortedArray,
  setSortedArray,
  IsSelected,
  setFavContact,
  FavContact,
}: {
  contactData: Contacts[] | null;
  setContactData: any;
  sortedArray: Contacts[] | null;
  setSortedArray: any;
  IsSelected: any;
  setFavContact: any;
  FavContact: Contacts[] | null;
}) => {
  const [selContact, setSelContact] = useState<string | null>(null);

  // Handle contact selection
  const handleContact = (contactId: string) => {
    setSelContact(contactId);
  };
  //fetch contacts
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axiosInstance.get<Contacts[]>("/contacts");
        const AlphaContacts = res.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        const FavContacts = res.data.filter((contact) => {
          return contact.fav == true;
        });
        setFavContact(FavContacts);

        console.log(FavContacts);

        setContactData(AlphaContacts);
        setSortedArray(AlphaContacts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchContact();
  }, []);
  //filtering favourite contacts

  console.log(sortedArray);

  // Handle favorite contact click
  const handleFavoriteClick = async (contact: Contacts) => {
    try {
      const updatedContact = { ...contact, fav: !contact.fav };
      await Axios.put(
        `http://localhost:5001/api/contacts/${contact._id}`,
        updatedContact
      );
      setSortedArray(
        (prevContactData: any) =>
          prevContactData?.map((c: any) =>
            c._id === contact._id ? updatedContact : c
          ) || null
      );
      setFavContact(
        (prevContactData: any) =>
          prevContactData?.map((c: any) =>
            c._id === contact._id ? updatedContact : c
          ) || null
      );
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  //random colors array
  //const colors = ["#e75d7c","#b16cef","#53cca4","#efc84d","#628ef0","#184b73","#883e7f","#ed048b",];

  //function to get initials of name
  var getInitials = function (string: string) {
    var names = string.split(" "),
      initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  return (
    <div className="md:w-[600px] h-screen p-2 transition-colors duration-200">
      <div className="text-sm ubuntu-regular dark:text-slate-400 text-slate-700 mx-5 mt-7">
        {IsSelected == "allPeople"
          ? `${sortedArray?.length} TOTAL`
          : IsSelected == "favourite"
          ? `${FavContact?.length} TOTAL`
          : "Loading..."}
      </div>
      <div className="text-2xl ubuntu-medium text mx-5 py-1">Contacts</div>
      <div className="flex gap-2 py-3">
        <Select>
          <SelectTrigger className="w-[90px] h-7 ml-5 dark:bg-[#333333] bg-[#e3e3e3] flex justify-between font-medium text-slate-500 dark:text-slate-300 px-2 gap-1">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <div>
          {
            <SelectScrollable
              contactData={contactData}
              setSortedArray={setSortedArray}
            />
          }
        </div>
      </div>
      {IsSelected == "allPeople" ? (
        <DisplayContacts
          selContact={selContact}
          setSortedArray={setSortedArray}
          getInitials={getInitials}
          handleFavoriteClick={handleFavoriteClick}
          handleContact={handleContact}
          sortedArray={sortedArray}
          contactData={contactData}
        />
      ) : IsSelected == "favourite" ? (
        <FavoriteContacts
          selContact={selContact}
          setSortedArray={setSortedArray}
          getInitials={getInitials}
          handleFavoriteClick={handleFavoriteClick}
          handleContact={handleContact}
          sortedArray={sortedArray}
          FavContact={FavContact}
          setFavContact={setFavContact}
          contactData={contactData}
        />
      ) : (
        <div className="mx-5 my-2">No Contacts</div>
      )}
    </div>
  );
};

export default ContactList;
