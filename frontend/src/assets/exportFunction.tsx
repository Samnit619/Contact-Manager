import { Contacts } from "@/App";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa6";


const DisplayContacts = ({sortedArray,setSortedArray,selContact,handleContact, getInitials, handleFavoriteClick,contactData}:{
    sortedArray:Contacts[] |null;
    setSortedArray:any;
    selContact:any;
    handleContact: any;
    getInitials:any;
    handleFavoriteClick:any;
    contactData:Contacts[] |null
}) => {
    useEffect(() => {
        setSortedArray(sortedArray);

    },[]);
  return (
    <div className="flex-col ">
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
  )
}

export const FavoriteContacts = ({sortedArray,setSortedArray,selContact,handleContact, getInitials, handleFavoriteClick,FavContact,setFavContact, contactData}:{
    sortedArray:Contacts[] |null;
    setSortedArray:any;
    selContact:any;
    handleContact: any;
    getInitials:any;
    handleFavoriteClick:any;
    FavContact:Contacts[] | null;
    setFavContact:any;
    contactData: Contacts[] | null;
  

}) => {
    useEffect(() => {
        const FavouriteContact = sortedArray?.filter((contact) => {
            return contact.fav == true});
            setFavContact(FavouriteContact);
           
            
    },[]);
   
  return (
    <div className="flex-col ">
        {FavContact &&
          FavContact?.map((contact: any) => (
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
  )
}

export default DisplayContacts;