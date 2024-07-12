import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FaStar } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Contacts } from "@/App";
import { SelectScrollable } from "./filter2";



const ContactList = ({
 contactData,setContactData,sortedArray,setSortedArray
}: {
 contactData:Contacts[] | null,
 setContactData:any,
 sortedArray:Contacts[]|null,
 setSortedArray:any
}) => {
  
  const [selContact, setSelContact] = useState<string | null>(null);
  
  console.log(sortedArray);
  // Handle contact selection
  const handleContact = (contactId: string) => {
    setSelContact(contactId);
  };
  //fetch contacts
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await Axios.get<Contacts[]>(
          "http://localhost:5001/api/contacts/"
        );
        const AlphaContacts = res.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        console.log(AlphaContacts);
        setContactData(AlphaContacts);
        setSortedArray(AlphaContacts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchContact();
    
  }, []);
  // Handle favorite contact click
  const handleFavoriteClick = async (contact: Contacts) => {
    try {
      const updatedContact = { ...contact, fav: !contact.fav };
      await Axios.put(
        `http://localhost:5001/api/contacts/${contact._id}`,
        updatedContact
      );
      setContactData(
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
        {sortedArray ? `${sortedArray.length} TOTAL` : "Loading..."}
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
            
             setSortedArray={setSortedArray}
            />
          }
        </div>
      </div>
      <div className="flex-col">
      {sortedArray &&
        sortedArray?.map((contact: any) => (
          <div
            key={contact._id}
            onClick={() => handleContact(contact._id)}
            className={`${
              selContact === contact._id
                ? "bg-blue-600 text-slate-200"
                : "bg-transparent dark:hover:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200"
            } group w-[500px] h-[55px] rounded-full flex items-center justify-between px-1.5 mx-5 mb-1 gap-2 ubuntu-regular transition-colors ease-in-out duration-150`}
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-11 w-11 rounded-full">
                <AvatarImage src="" />
                <AvatarFallback
                  className={`dark:bg-[#333333] bg-[#e3e3e3] text-slate-700 dark:text-slate-200`}
                >
                  {getInitials(contact.name)}
                </AvatarFallback>
              </Avatar>
              {contact.name}
            </div>

            <div
              onClick={() => handleFavoriteClick(contact)}
              className={`${contact.fav ? "flex" : "hidden"} ${
                selContact === contact._id
                  ? "border-slate-200"
                  : "dark:border-slate-300 border-slate-500"
              } h-11 w-11 border rounded-full items-center justify-center group-hover:flex`}
            >
              <FaStar
                className={`${
                  selContact === contact._id ? "text-slate-200" : ""
                } dark:text-slate-200 `}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
