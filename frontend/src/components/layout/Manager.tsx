import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { SlOptions } from "react-icons/sl";
import { IoCallOutline } from "react-icons/io5";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { LuMail } from "react-icons/lu";
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
      <div className="dark:bg-[#333333]/40 bg-[#e3e3e3] rounded-2xl h-[calc(100vh-28px)]">
        <div className="flex justify-end px-3 pt-3 ">
          <Button className="rounded-lg py-0 px-2 h-[35px] w-[35px] dark:bg-[#333333]">
            <SlOptions className="w-4 text-[#e3e3e3]" />
          </Button>
        </div>
        <div className="h-[250px] px-4 pb-4 flex justify-center gap-4">
          <Avatar className=" rounded-full w-[175px] h-[175px] ">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-2xl ubuntu-bold">Display name</div>
            <div className="pb-4">Single</div>
            <div className="flex gap-2">
              <div className=" flex justify-center items-center w-[35px] h-[35px] bg-[#333333] rounded-lg ">
                <IoCallOutline className=" text-xl font-bold" />
              </div>
              <div className=" flex justify-center items-center w-[35px] h-[35px] bg-[#333333] rounded-lg ">
                <HiOutlineVideoCamera className=" text-xl" />
              </div>
              <div className=" flex justify-center items-center w-[35px] h-[35px] bg-[#333333] rounded-lg ">
                <LuMail className=" text-xl" />
              </div>
            </div>
            <div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2"></DropdownMenuTrigger>
                  <DropdownMenuContent className=" ubuntu-regular bg-black rounded-xl">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      
                    ></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manager;
