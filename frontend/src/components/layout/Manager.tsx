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

const Manager = () => {
  return (
    <div className="w-[725px] h-screen py-4 pr-4">
      <div className="">
        <div className="flex justify-end px-3 pt-3 ">
          <Button className="rounded-lg py-0 px-2 h-[35px] w-[35px] dark:bg-[#333333]">
            <SlOptions className="w-4 text-[#e3e3e3]" />
          </Button>
        </div>
        <div className="h-[220px] px-4 flex justify-center gap-4">
          <Avatar className=" rounded-full w-[175px] h-[175px] ">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-2xl ubuntu-bold">Display name</div>
            <div className="pb-4">Single</div>
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
              <div className="mt-4">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2">
                    <FaPlus className="text-2xl rounded-full bg-[#333333] p-1.5 hover:rotate-45 transition-transform " />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=" ubuntu-regular bg-black rounded-xl">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="text-[#e3e3e3]">works in Google</div>
            </div>
          </div>
        </div>
        <div className="px-5 py-7 dark:bg-[#333333]/40 bg-[#e3e3e3] rounded-2xl h-[calc(100vh-310px)] ">
          <div className=" grid-cols-2 grid gap-2 ">
            <div className="bg-[#121212] p-4 max-w-[334px] h-[60px] rounded-xl items-center flex gap-4 ubuntu-medium">
              <LuPhoneCall className="text-xl" /> Phone Number
            </div>
            <div className="bg-[#121212] p-4 max-w-[334px] h-[60px] rounded-xl  items-center flex gap-4 ubuntu-medium">
              <LuMail className="text-xl" /> Email
            </div>
            <div className="bg-[#121212] p-4 max-w-[334px] h-[60px] rounded-xl  items-center flex gap-4 ubuntu-medium">
              <GrLocation className="text-xl" /> Location
            </div>
            <div className="bg-[#121212] p-4 max-w-[334px] h-[60px] rounded-xl  items-center flex gap-4 ubuntu-medium">
              <GrHomeRounded className="text-lg" /> Home Address
            </div>
            <div className="bg-[#121212] p-4 max-w-[334px] h-[60px] rounded-xl  items-center flex gap-4 ubuntu-medium">
              <PiCake className="text-[22px]" /> Birthday date
            </div>
            <div className="bg-[#121212] p-4 max-w-[334px] h-[60px] rounded-xl  items-center flex gap-4 ubuntu-medium">
              <FaRegHeart className="text-lg" /> Status
            </div>
          </div>
          <div className="ubuntu-medium mx-2 mt-7">History</div>
          <div className="max-w-[669px] h-[60px] bg-[#121212] rounded-xl py-3 px-6 flex items-center gap-2 ubuntu-regular">
            <MdCallMade className="text-xl" />
            <div>Outgoing at</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manager;
