import { ModeToggle } from "./components/ui/mode-toggle";

const NavBar = () => {
  return (
    <div className="md:w-[300px] border-r">
<div className="flex gap-5">
    <div className="flex items-center md:px-5 md:py-7 md:w-[250px] gap-2 ">
      <div className=" w-[35px] "><img src="../../public/logo/logo1.png" alt=""  /></div>
      <div className=" ubuntu-bold text-xl">ContactHub</div>
    </div>
    <div className="md:py-7 md:px-4">
      <ModeToggle/>
    </div>

</div>

    </div>

  );
};

export default NavBar;
