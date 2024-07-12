import { useEffect, useState } from "react";
import Axios from "axios";
import { Contacts } from "@/App";
import { FaStar } from "react-icons/fa";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const useFetchContacts = () => {
  const [contactData, setContactData] = useState<Contacts[] | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await Axios.get<Contacts[]>(
          "http://localhost:5001/api/contacts/"
        );
        const AlphaContacts = res.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setContactData(AlphaContacts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchContact();
  }, []);

  return { contactData, setContactData };
};

const exportFunctions = () => {
  const { contactData, setContactData } = useFetchContacts();

  const [selContact, setSelContact] = useState<string | null>(null);

  // Handle contact selection
  const handleContact = (contactId: string) => {
    setSelContact(contactId);
  };

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

  // Function to get initials of name
  const getInitials = (string: string) => {
    const names = string.split(" ");
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  const DisplayContacts = ({contactData}:{contactData:Contacts[] | null}) => {
    return (
      <div>
        {contactData &&
          contactData?.map((contact: any) => (
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
    );
  };

  return {
    contactData,
    setContactData,
    DisplayContacts,
  };
};

export default exportFunctions;
