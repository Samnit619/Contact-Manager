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
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Contacts } from "@/App";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/pages/Login/axiosInstance";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { CalendarIcon, Terminal } from "lucide-react";
import { Refreshed } from "@/pages/home";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

const Manager = ({
  selContact,
  sortedArray,
  setSelContact,
  setSortedArray,
}: {
  selContact: string | null;
  sortedArray: Contacts[] | null;
  setSelContact: any;
  setSortedArray: any;
}) => {
  //storing selected contact details
  const [contactDetails, setContactDetails] = useState<Contacts | null>(null);
  //edit contact state
  const [editContact, setEditContact] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [openEdit, setOpenEdit] = useState<{ [key: string]: boolean }>({
    phone: false,
    email: false,
    location: false,
    home: false,
    birthday: false,
  });

  //Edit contact details
  const [FormData, setFormData] = useState({
    phone: "",
    email: "",
    location: "",
    home: "",
    birthday: "",
  });

  const { setRefreshed } = Refreshed();

  //fetching contact details after each selection
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
  }, [selContact, sortedArray]);

  console.log(contactDetails);

  //function to delete contacts
  const DeleteContact = async () => {
    try {
      await axiosInstance.delete(`/contacts/${contactDetails?._id}`);
      console.log(`${contactDetails?.name} has been deleted.`);
      setSelContact("");
      setDeleteAlert(true);
      setTimeout(() => setDeleteAlert(false), 7000);
      setRefreshed((prev) => !prev);
    } catch (error) {
      console.error("Error deleting contact", error);
    }
  };

  //add tag function
  const handleTags = async (contact: Contacts, newTag: string) => {
    const updatedContact = { ...contact, tags: [...contact.tags, newTag] };
    await axiosInstance.put(`/contacts/${contact?._id}`, updatedContact);
    setSortedArray(
      (prevContactData: any) =>
        prevContactData?.map((c: any) =>
          c._id === contact._id ? updatedContact : c
        ) || null
    );
  };

  //edit contact function
  const EditContact = () => {
    setEditContact(!editContact);
    setFormData({
      phone: "",
      email: "",
      birthday: "",
      location: "",
      home: "",
    });
    setOpenEdit((prev) =>
      Object.fromEntries(Object.keys(prev).map((key) => [key, false]))
    );
  };

  //handle cross
  const HandleCross = (value: string) => {
    setFormData({ ...FormData, [value]: "" });
    setOpenEdit((prev) => ({ ...prev, [value]: false }));
  };
  //handle input change
  const HandleInput = (e: any) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  //handle edit function
  const HandleEdit = async () => {
    const updatedContact = { ...contactDetails };
    if (FormData.phone !== "") {
      updatedContact.phone = Number(FormData.phone);
    }
    if (FormData.email !== "") {
      updatedContact.email = FormData.email;
    }
    if (FormData.location !== "") {
      updatedContact.location = FormData.location;
    }
    if (FormData.home !== "") {
      updatedContact.home = FormData.home;
    }
    if (FormData.birthday !== "") {
      updatedContact.birthday = FormData.birthday.split("T")[0];
    }
    if (
      FormData.phone !== "" ||
      FormData.email !== "" ||
      FormData.location !== "" ||
      FormData.home !== "" ||
      FormData.birthday !== ""
    ) {
      await axiosInstance.put(
        `/contacts/${contactDetails?._id}`,
        updatedContact
      );
      setSortedArray(
        (prevContactData: any) =>
          prevContactData?.map((c: any) =>
            c._id === contactDetails?._id ? updatedContact : c
          ) || null
      );
    }
    setEditContact(!editContact);
    setOpenEdit((prev) =>
      Object.fromEntries(Object.keys(prev).map((key) => [key, false]))
    );
    setFormData({
      phone: "",
      email: "",
      birthday: "",
      location: "",
      home: "",
    });
  };

  return selContact == "" ? (
    <div className="w-[725px] h-screen py-4 pr-4 ">
      <div className="bg-gradient-to-b from-blue-950 to-[#121212] rounded-xl h-[calc(100vh-70px)] flex justify-center items-center">
        <div className="text-2xl ubuntu-regular ">
          Select a contact to view details
        </div>
        {deleteAlert == true ? (
          <Alert className=" absolute right-4 bottom-3 w-[400px]">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              {contactDetails?.name}The contact is successfully deleted.
            </AlertDescription>
          </Alert>
        ) : (
          ""
        )}
      </div>
    </div>
  ) : (
    <div className="w-[725px] h-screen py-4 pr-4">
      <div className=" bg-gradient-to-b rounded-tr-xl rounded-t-xl from-blue-950  to-[#121212]">
        <div className="flex justify-end px-3 pt-3 gap-2 ">
          <div
            onClick={HandleEdit}
            className={` ${
              editContact ? "flex" : "hidden"
            } h-[35px] w-[80px] rounded-lg bg-blue-700 hover:bg-blue-600 transition-colors duration-200 py-1 px-2.5 justify-center items-center gap-1 cursor-pointer  `}
          >
            <IoMdCheckmark className="" />
            <div className="ubuntu-regular text-base">Done</div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2">
              <Button className="rounded-lg py-0 px-2 h-[35px] w-[35px] dark:bg-[#333333]">
                <SlOptions className="w-4 text-[#e3e3e3]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" ubuntu-regular bg-black rounded-xl">
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => DeleteContact()}>
                Delete Contact
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => EditContact()}>
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
                    <DropdownMenuItem
                      onClick={() =>
                        contactDetails && handleTags(contactDetails, "Family")
                      }
                    >
                      Family
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        contactDetails && handleTags(contactDetails, "Friend")
                      }
                    >
                      Friend
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        contactDetails && handleTags(contactDetails, "Work")
                      }
                    >
                      Work
                    </DropdownMenuItem>
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
          <div className="bg-[#121212] p-4 max-w-[334px] h-[60px] rounded-xl items-center flex justify-between ubuntu-medium">
            <div className="flex gap-4 items-center" /* phone number*/>
              <LuPhoneCall className="text-xl" />
              {!openEdit.phone ? (
                contactDetails?.phone
              ) : (
                <input
                  onChange={HandleInput}
                  name="phone"
                  type="tel"
                  value={FormData.phone}
                  maxLength={10}
                  placeholder="Add phone"
                  className="bg-[#121212] placeholder:text-slate-50 w-[230px] ubuntu-medium border p-1 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
            {!openEdit.phone ? (
              <MdOutlineEdit
                onClick={() =>
                  setOpenEdit((prev) => ({ ...prev, phone: true }))
                }
                className={` ${
                  editContact ? "flex" : "hidden"
                } border-b-2 text-3xl border-slate-100 rounded-sm p-1 cursor-pointer ml-1 `}
              />
            ) : (
              <RxCross2
                onClick={() => HandleCross("phone")}
                className=" cursor-pointer"
              />
            )}
          </div>
          <div className="bg-[#121212] p-4 max-w-[334px] h-[60px] rounded-xl items-center flex justify-between ubuntu-medium">
            <div
              className="flex gap-4 justify-center items-center" /*Email address*/
            >
              <LuMail className="text-xl" />
              {!openEdit.email ? (
                contactDetails?.email
              ) : (
                <input
                  onChange={HandleInput}
                  name="email"
                  type="email"
                  value={FormData.email}
                  placeholder="Add email"
                  className="bg-[#121212] placeholder:text-slate-50 w-[230px] ubuntu-medium border p-1 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
            {!openEdit.email ? (
              <MdOutlineEdit
                onClick={() =>
                  setOpenEdit((prev) => ({ ...prev, email: true }))
                }
                className={` ${
                  editContact ? "flex" : "hidden"
                } border-b-2 text-3xl border-slate-100 rounded-sm p-1 cursor-pointer ml-1 `}
              />
            ) : (
              <RxCross2
                onClick={() => HandleCross("email")}
                className=" cursor-pointer"
              />
            )}
          </div>
          <div className="bg-[#121212] p-4 max-w-[334px] h-[60px] rounded-xl  items-center flex justify-between ubuntu-medium">
            <div
              className="flex gap-4 justify-center items-center" /*Location*/
            >
              <GrLocation className="text-xl" />
              {!openEdit.location ? (
                contactDetails?.location || "Location"
              ) : (
                <input
                  onChange={HandleInput}
                  name="location"
                  type="text"
                  value={FormData.location}
                  placeholder="Add location"
                  className="bg-[#121212] placeholder:text-slate-50 w-[230px] ubuntu-medium border p-1 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
            {!openEdit.location ? (
              <MdOutlineEdit
                onClick={() =>
                  setOpenEdit((prev) => ({ ...prev, location: true }))
                }
                className={` ${
                  editContact ? "flex" : "hidden"
                } border-b-2 text-3xl border-slate-100 rounded-sm p-1 cursor-pointer ml-1 `}
              />
            ) : (
              <RxCross2
                onClick={() => HandleCross("location")}
                className=" cursor-pointer"
              />
            )}
          </div>
          <div className="bg-[#121212] p-4 max-w-[334px] h-[60px] rounded-xl items-center flex justify-between ubuntu-medium">
            <div
              className="flex gap-4 justify-center items-center" /*Home address*/
            >
              <GrHomeRounded className="text-lg" />
              {!openEdit.home ? (
                contactDetails?.home || "Home address"
              ) : (
                <input
                  onChange={HandleInput}
                  name="home"
                  type="text"
                  value={FormData.home}
                  placeholder="Add Address"
                  className="bg-[#121212] placeholder:text-slate-50 w-[230px] ubuntu-medium border p-1 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
            {!openEdit.home ? (
              <MdOutlineEdit
                onClick={() => setOpenEdit((prev) => ({ ...prev, home: true }))}
                className={` ${
                  editContact ? "flex" : "hidden"
                } border-b-2 text-3xl border-slate-100 rounded-sm p-1 cursor-pointer ml-1 `}
              />
            ) : (
              <RxCross2
                onClick={() => HandleCross("home")}
                className=" cursor-pointer"
              />
            )}
          </div>
          <div className="bg-[#121212] p-4 max-w-[334px] h-[60px] rounded-xl  items-center flex justify-between ubuntu-medium">
            <div
              className="flex gap-4 justify-center items-center" /*Birthday*/
            >
              <PiCake className="text-[22px]" />
              {!openEdit.birthday ? (
                contactDetails?.birthday || "No Date"
              ) : (
                <DatePicker
                  className=" bg-[#121212] placeholder:text-slate-50 w-[230px] ubuntu-medium border p-1 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  selected={
                    FormData.birthday ? new Date(FormData.birthday) : null
                  }
                  onChange={(date: Date | null) =>
                    setFormData((prev) => ({
                      ...prev,
                      birthday: date ? date.toISOString() : "",
                    }))
                  }
                  showYearDropdown
                  yearDropdownItemNumber={100}
                  scrollableYearDropdown
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select Date"
                  minDate={new Date(1900, 0, 1)}
                  maxDate={new Date()}
                />
              )}
            </div>
            {!openEdit.birthday ? (
              <MdOutlineEdit
                onClick={() =>
                  setOpenEdit((prev) => ({ ...prev, birthday: true }))
                }
                className={` ${
                  editContact ? "flex" : "hidden"
                } border-b-2 text-3xl border-slate-100 rounded-sm p-1 cursor-pointer ml-1 `}
              />
            ) : (
              <RxCross2
                onClick={() => HandleCross("birthday")}
                className=" cursor-pointer"
              />
            )}
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
