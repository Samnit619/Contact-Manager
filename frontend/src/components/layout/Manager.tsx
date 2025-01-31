import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { SlOptions } from "react-icons/sl";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { LuMail } from "react-icons/lu";
import { LuPhoneCall } from "react-icons/lu";
import { FaPlus } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { GrHomeRounded } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";
import { PiCake } from "react-icons/pi";
import { MdCallMade } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Contacts } from "@/App";
import { useEffect, useState } from "react";
import axios from "axios";
import { axiosInstance } from "@/pages/Login/axiosInstance";

const Manager = ({
  selContact,
  sortedArray,
}: {
  selContact: string | null;
  sortedArray: Contacts[] | null;
}) => {
  const [contactDetails, setContactDetails] = useState<Contacts | null>(null);
  const [tagBtn, setTagBtn] = useState(false);

  useEffect(() => {
    const details = async () => {
      try {
        const res = await axiosInstance.get<Contacts[]>("/contacts");
        const Contact =
          res.data.find((contact) => contact._id === selContact) || null;
        setContactDetails(Contact);
      } catch (error) {
        console.error("error fetching the contact", error);
      }
    };
    details();
  }, [selContact]);

  console.log(contactDetails);
  return selContact == "" ? (
    <div className="w-[725px] h-screen py-4 pr-4 ">
      <div className="bg-gradient-to-b from-blue-950 to-[#121212] rounded-xl h-[calc(100vh-70px)] flex justify-center items-center">
        <div className="text-2xl ubuntu-regular ">
          Select a contact to view details
        </div>
      </div>
    </div>
  ) : (
    <div className="w-[725px] h-screen py-4 pr-4">
      <div className=" bg-gradient-to-b rounded-tr-xl rounded-t-xl from-blue-950  to-[#121212]">
        <div className="flex justify-end px-3 pt-3 ">
          <Button className="rounded-lg py-0 px-2 h-[35px] w-[35px] dark:bg-[#333333]">
            <SlOptions className="w-4 text-[#e3e3e3]" />
          </Button>
        </div>
        <div className="h-[220px] pr-4 pl-10 flex justify-center gap-4 ">
          <Avatar className=" rounded-full w-[175px] h-[175px] ">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="w-[220px]">
            <div className="text-2xl ubuntu-bold">{contactDetails?.name}</div>
            <div className="pb-4">{contactDetails?.relation}</div>
            <div className="flex gap-2">
              <div className=" flex justify-center items-center w-[35px] h-[35px] bg-[#333333] rounded-lg ">
                <LuPhoneCall className=" text-lg font-bold" />
              </div>
              <div className=" flex justify-center items-center w-[35px] h-[35px] bg-[#333333] rounded-lg ">
                <HiOutlineVideoCamera className=" text-xl" />
              </div>
              <div className=" flex justify-center items-center w-[35px] h-[35px] bg-[#333333] rounded-lg ">
                <LuMail className=" text-xl" />
              </div>
            </div>
            <div>
              <div className="mt-4 flex gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger className={` flex items-center gap-2`}>
                    <FaPlus
                      className={`text-2xl rounded-full bg-[#333333] p-1.5 `}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=" ubuntu-regular bg-black rounded-xl">
                    <DropdownMenuItem>Family</DropdownMenuItem>
                    <DropdownMenuItem>Friend</DropdownMenuItem>
                    <DropdownMenuItem>Work</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex gap-1 ">
                  {contactDetails?.tags?.map((tag, index) => (
                    <div
                      key={index}
                      className="bg-[#333333] rounded-full px-2 text-sm items-center flex text-[#e3e3e3] "
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-[#e3e3e3] text-sm mt-1">
                {contactDetails?.description}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 py-7 dark:bg-[#333333]/40 bg-[#e3e3e3] rounded-2xl h-[calc(100vh-310px)] ">
        <div className=" grid-cols-2 grid gap-2 ">
          <div className="bg-[#121212] p-4 max-w-[334px] h-[60px] rounded-xl items-center flex gap-4 ubuntu-medium">
            <LuPhoneCall className="text-xl" /> {contactDetails?.phone}
          </div>
          <div className="bg-[#121212] p-4 max-w-[334px] h-[60px] rounded-xl  items-center flex gap-4 ubuntu-medium">
            <LuMail className="text-xl" /> {contactDetails?.email}
          </div>
          <div className="bg-[#121212] p-4 max-w-[334px] h-[60px] rounded-xl  items-center flex gap-4 ubuntu-medium">
            <GrLocation className="text-xl" /> Location
          </div>
          <div className="bg-[#121212] p-4 max-w-[334px] h-[60px] rounded-xl  items-center flex gap-4 ubuntu-medium">
            <GrHomeRounded className="text-lg" /> Home Address
          </div>
          <div className="bg-[#121212] p-4 max-w-[334px] h-[60px] rounded-xl  items-center flex gap-4 ubuntu-medium">
            <PiCake className="text-[22px]" />{" "}
            {contactDetails?.birthday
              ? contactDetails?.birthday.toString()
              : "No Date added"}
          </div>
          <div className="bg-[#121212] p-4 max-w-[334px] h-[60px] rounded-xl  items-center flex gap-4 ubuntu-medium">
            <FaRegHeart className="text-lg" /> {contactDetails?.relation}
          </div>
        </div>
        <div className="ubuntu-medium mx-2 mt-7">History</div>
        <div className="max-w-[669px] h-[60px] bg-[#121212] rounded-xl py-3 px-6 flex items-center gap-2 ubuntu-regular">
          <MdCallMade className="text-xl" />
          <div>Outgoing at</div>
        </div>
      </div>
    </div>
  );
};

export default Manager;
