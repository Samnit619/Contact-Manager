import React from "react";
import { ModeToggle } from "./components/ui/mode-toggle";
import { IoIosSearch } from "react-icons/io";
import { Input } from "./components/ui/input";

const NavBar = () => {
  return (
    <div className="md:w-[300px] md:h-screen border-r">
      <div className="flex gap-5">
        <div className="flex items-center px-3 py-5 md:px-5 md:py-7 md:w-[250px] gap-2 ">
          <div className=" w-[35px] ">
            <img src="../../public/logo/darklogo1.png" alt="" />
          </div>
          <div className=" ubuntu-bold text-xl">ContactHub</div>
        </div>
        <div className="md:py-7 md:px-4">
          <ModeToggle />
        </div>
      </div>
      <div className="relative md:px-6 items-center md:h-[36px]">
        <div className=" absolute md:bottom-2 text-xl ml-2">

        <IoIosSearch className="right-2 text-slate-500 font-bold"/>
        </div>
        <Input className="md:w-[250px] md:h-9 rounded-lg placeholder:text-slate-500 bg-gray-900 px-8 placeholder:font-semibold border-2 border-slate-800 placeholder:text-base"
        placeholder="Search"/>
      </div>
    </div>
  );
};

export default NavBar;
