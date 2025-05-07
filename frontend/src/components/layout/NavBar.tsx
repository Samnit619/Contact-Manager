import { IoMdContacts } from "react-icons/io";
import { ModeToggle } from "../ui/mode-toggle";
import { IoIosSearch } from "react-icons/io";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaRegStar } from "react-icons/fa";
import { LuTags } from "react-icons/lu";
import { MdEventNote } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LuSettings } from "react-icons/lu";
import { useTheme } from "../ui/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Contacts } from "@/App";
import { useNavigate } from "react-router-dom";
import FetchUsername from "@/assets/FetchUsername";
import { AddContact } from "@/assets/exportFunction";
import { useState } from "react";
import { User } from "lucide-react";

const NavBar = ({
  contactData,
  IsSelected,
  setIsSelected,
  setSortedArray,
  sortedArray,
  FavContact,
  getInitials,
}: {
  contactData: Contacts[] | null;
  IsSelected: any;
  setIsSelected: any;
  sortedArray: Contacts[] | null;
  FavContact: Contacts[] | null;
  handleContact: any;
  setSortedArray: any;
  getInitials: any;
}) => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  //change of theme
  const { theme } = useTheme();
  const { UserName } = FetchUsername();

  //Input change
  const HandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (inputValue !== "") {
      const lowerInput = inputValue.toLowerCase();

      const filtered = contactData
        ?.filter((contact) => contact.name.toLowerCase().includes(lowerInput))
        .sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();

          const aStarts = nameA.startsWith(lowerInput);
          const bStarts = nameB.startsWith(lowerInput);

          if (aStarts && !bStarts) return -1;
          if (!aStarts && bStarts) return 1;
          return 0;
        });

      setSortedArray(filtered);
    } else {
      setSortedArray(contactData);
    }
  };
  const logout = () => {
    navigate("/login");
    localStorage.removeItem("jwtToken");
  };
  //For unique selection of options
  const handleClick = (button: any) => {
    setIsSelected(button);
  };

  return (
    <div className="md:w-[300px] h-screen border-r p-2 flex flex-col justify-between transition-colors duration-100">
      <div className="flex-col">
        <div className="flex gap-5">
          <div className="flex items-center px-1 py-3 md:px-3 md:py-5 md:w-[250px] gap-2 ">
            <div className="w-[35px]">
              {theme == "dark" || theme == "system" ? (
                <img src="../../../public/logo/darklogo1.png" />
              ) : (
                <img src="../../../public/logo/logo1.png" />
              )}
            </div>
            <div className=" ubuntu-bold text-xl">ContactHub</div>
          </div>
          <div className="md:py-5 md:px-2">
            <ModeToggle />
          </div>
        </div>
        <div className="relative md:px-4 items-center md:h-[40px]">
          <div className=" absolute md:bottom-2.5 text-xl ml-2">
            <IoIosSearch className=" dark:text-slate-400 text-slate-500 font-bold" />
          </div>
          <Input
            value={value}
            onChange={HandleInput}
            className="md:w-[250px] md:h-10 rounded-2xl dark:placeholder:text-slate-400 placeholder:text-slate-500 dark:bg-[#333333] bg-[#e3e3e3] px-8 placeholder:font-semibold border-2 dark:border-[#444444] border-slate-400 placeholder:text-base dark:hover:bg-[#3c3c3c] hover:bg-slate-200 hover:ease-in-out duration-200 text-base"
            placeholder="Search"
            type="text"
          />
        </div>
        <div className="dark:text-slate-300 text-slate-700 font-medium text-xs ubuntu-regular md:px-8 md:pt-6">
          ON THIS DEVICE
        </div>

        <div className="pb-3 mt-1 mx-4 w-[250px] h-[40px]">
          <Button
            onClick={() => handleClick("allPeople")}
            className={` ${
              IsSelected === "allPeople"
                ? "dark:bg-[#333333] bg-[#e3e3e3] hover:bg-[#e3e3e3] "
                : "bg-transparent dark:hover:bg-slate-800 hover:bg-slate-200 "
            } w-[250px] rounded-2xl dark:text-slate-300 text-slate-800 justify-start ubuntu-regular gap-2 text-base pr-1`}
          >
            <IoMdContacts className="text-xl" />
            All People
            <div
              className={`${
                IsSelected == "allPeople"
                  ? "bg-blue-500 dark:bg-blue-600 ease-in-out duration-150 text-slate-200"
                  : "dark:bg-[#333333] bg-[#e3e3e3] text-slate-800"
              } flex w-10 h-7  rounded-xl unbuntu-regular font-medium ml-[77px]  dark:text-slate-200 justify-center items-center`}
            >
              {contactData ? contactData.length : ""}
            </div>
          </Button>
        </div>
        <div className="pb-3 mt-1 px-4 w-[250px] h-[40px]">
          <Button
            onClick={() => handleClick("favourite")}
            className={`${
              IsSelected === "favourite"
                ? "dark:bg-[#333333] bg-[#e3e3e3] hover:bg-[#e3e3e3] "
                : "bg-transparent dark:hover:bg-slate-800 hover:bg-slate-200"
            } w-[250px] rounded-2xl  dark:text-slate-300 text-slate-800 justify-start ubuntu-regular gap-2 text-base pr-1`}
          >
            <FaRegStar className="text-xl" />
            Favourites
            <div
              className={`${
                IsSelected == "favourite"
                  ? "bg-blue-500 dark:bg-blue-600 ease-in-out duration-150 text-slate-200"
                  : "dark:bg-[#333333] bg-[#e3e3e3] text-slate-800"
              } flex w-10 h-7  rounded-xl unbuntu-regular font-medium ml-[77px]  dark:text-slate-200 justify-center items-center`}
            >
              {FavContact ? FavContact.length : ""}
            </div>
          </Button>
        </div>
        <div className="pb-3 mt-1 px-4 w-[250px] h-[40px]">
          <Button
            onClick={() => handleClick("tagged")}
            className={`${
              IsSelected === "tagged"
                ? "dark:bg-[#333333] bg-[#e3e3e3] hover:bg-[#e3e3e3]  "
                : "bg-transparent dark:hover:bg-slate-800 hover:bg-slate-200"
            } w-[250px] rounded-2xl  dark:text-slate-300 text-slate-800 justify-start ubuntu-regular gap-2 text-base `}
          >
            <LuTags className="text-xl" />
            Tagged
          </Button>
        </div>
        <div className="pb-3 mt-1 px-4 w-[250px] h-[40px]">
          <Button
            onClick={() => handleClick("events")}
            className={`${
              IsSelected === "events"
                ? "dark:bg-[#333333] bg-[#e3e3e3] hover:bg-[#e3e3e3] "
                : "bg-transparent dark:hover:bg-slate-800 hover:bg-slate-200"
            } w-[250px] rounded-2xl  dark:text-slate-300 text-slate-800 justify-start ubuntu-regular gap-2 text-base `}
          >
            <MdEventNote className="text-xl" />
            Events
          </Button>
        </div>
        <AddContact />
      </div>
      <div className="mx-3.5 flex items-center justify-between mb-2">
        <div className="flex gap-2 dark:text-slate-200 ubuntu-medium text-slate-800 items-center dark:hover:bg-slate-800 hover:bg-slate-200 rounded-xl px-2 py-1 cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>{getInitials(UserName)}</AvatarFallback>
              </Avatar>
              {UserName ? UserName : "Login"}
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" ubuntu-regular dark:bg-black rounded-xl">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()}>
                {UserName ? "Logout" : "Login"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button className="w-10 h-10 bg-transparent text-base rounded-full dark:hover:bg-slate-800 hover:bg-slate-200 p-1 border dark:border-slate-800 border-slate-200">
          <LuSettings className="dark:text-white text-black h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
