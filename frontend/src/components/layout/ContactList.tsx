/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Contacts } from "@/App";
import { SelectScrollable } from "./filter2";
import DisplayContacts, { FavoriteContacts } from "@/assets/exportFunction";
import { axiosInstance } from "@/pages/Login/axiosInstance";
import { Refreshed } from "@/pages/home";

const ContactList = ({
  contactData,
  getInitials,
  sortedArray,
  setSortedArray,
  IsSelected,
  setFavContact,
  FavContact,
  handleContact,
  selContact,
}: {
  contactData: Contacts[] | null;
  setContactData: any;
  sortedArray: Contacts[] | null;
  setSortedArray: any;
  IsSelected: any;
  setFavContact: any;
  FavContact: Contacts[] | null;
  handleContact: any;
  selContact: string | null;
  setSelContact: any;
  getInitials: any;
}) => {
  const { refreshed, setRefreshed } = Refreshed();
  const refreshing = () => {
    setRefreshed(!refreshed);
    refreshing();
  };
  // Handle favorite contact click
  const handleFavoriteClick = async (contact: Contacts) => {
    try {
      const updatedContact = { ...contact, fav: !contact.fav };
      await axiosInstance.put(
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
      setRefreshed((prev) => !prev);
      console.log("handle fav click running");
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  //filtering favourite contacts

  console.log(sortedArray);

  //random colors array
  //const colors = ["#e75d7c","#b16cef","#53cca4","#efc84d","#628ef0","#184b73","#883e7f","#ed048b",];

  return (
    <div className="w-full max-w-[600px] h-screen py-2 px-3 transition-colors duration-200 overflow-hidden">
      <div className="text-sm ubuntu-regular dark:text-slate-400 text-slate-700 mx-5 mt-5 sm:mt-7">
        {IsSelected == "allPeople"
          ? `${sortedArray?.length} TOTAL`
          : IsSelected == "favourite"
          ? `${FavContact?.length} TOTAL`
          : "Loading..."}
      </div>

      <div className="text-xl sm:text-2xl ubuntu-medium text mx-5 py-1">
        Contacts
      </div>

      <div className="flex flex-wrap gap-2 py-3 items-center">
        <Select>
          <SelectTrigger className="w-full sm:w-[90px] h-7 ml-5 dark:bg-[#333333] bg-[#e3e3e3] flex justify-between font-medium text-slate-500 dark:text-slate-300 px-2 gap-1">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date Created</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
        <div className="w-full sm:w-auto">
          <SelectScrollable
            contactData={contactData}
            setSortedArray={setSortedArray}
          />
        </div>
      </div>

      <div className="w-full overflow-hidden">
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
          <div className="mx-5 my-2 text-center text-lg">No Contacts</div>
        )}
      </div>
    </div>
  );
};

export default ContactList;
