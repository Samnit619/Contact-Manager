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
import exportFunctions, { useFetchContacts } from "@/assets/exportFunctions";

const ContactList = ({
 contactData
}: {
 contactData:Contacts[] | null
}) => {
  //contact selection
  
  const { DisplayContacts } = exportFunctions();

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
        {contactData ? `${contactData.length} TOTAL` : "Loading..."}
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
             
            />
          }
        </div>
      </div>
      <div className="flex-col">
        {DisplayContacts({contactData})}
      </div>
    </div>
  );
};

export default ContactList;
