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

const ContactList = ({contactData,setContactData}: {contactData:Contacts[]|null, setContactData:any} ) => {
  const [selContact, setSelContact] = useState<string | null>(null);

  const handleContact = (contactId: string) => {
    setSelContact(contactId);
  };

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await Axios.get<Contacts[]>(
          "http://localhost:5001/api/contacts/"
        );
        console.log(res.data);
        setContactData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchContact();
  }, []);

  return (
    <div className="md:w-[600px] h-screen p-2 transition-colors duration-200">
      <div className="text-sm ubuntu-regular text-slate-400 mx-5 mt-7">
        {contactData ? `${contactData.length} TOTAL` : "Loading..."}
      </div>
      <div className="text-2xl ubuntu-medium text mx-5 py-1">Contacts</div>
      <div className="flex gap-2 py-3">
        <Select>
          <SelectTrigger className="w-[90px] h-7 ml-5 dark:bg-[#333333] flex justify-between font-medium text-slate-300 px-2 gap-1">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[60px] h-7 dark:bg-[#333333] flex justify-start font-medium text-slate-300 pl-2 pr-1 gap-1">
            <SelectValue placeholder="A-Z" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-col justify-normal">
      {contactData &&
        contactData.map((contact:any) => (
          <div
            key={contact._id}
            onClick={() => handleContact(contact._id)}
            className={`${
              selContact === contact._id ? "bg-blue-600" : "bg-transparent hover:bg-slate-800"
            } group w-[500px] h-[55px] rounded-full flex items-center justify-between px-1.5 mx-5 gap-2 ubuntu-regular transition-colors ease-in-out duration-150`}
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-11 w-11 rounded-full">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {contact.name}
            </div>
            <div className={`h-11 w-11 border border-slate-300 rounded-full items-center justify-center hidden group-hover:flex `}>
              <FaStar className="text-slate-200" />
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ContactList;
