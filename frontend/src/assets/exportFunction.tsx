import { Contacts } from "@/App";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scrollArea";

import { Refreshed } from "@/pages/home";
import { axiosInstance } from "@/pages/Login/axiosInstance";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";

const DisplayContacts = ({
  sortedArray,
  setSortedArray,
  selContact,
  handleContact,
  getInitials,
  handleFavoriteClick,
}: {
  sortedArray: Contacts[] | null;
  setSortedArray: any;
  selContact: any;
  handleContact: any;
  getInitials: any;
  handleFavoriteClick: any;
  contactData: Contacts[] | null;
}) => {
  useEffect(() => {
    setSortedArray(sortedArray);
    console.log("Refreshed Contacts");
  }, [sortedArray]);
  return (
    <ScrollArea className="flex-col h-[700px]   ">
      {sortedArray &&
        sortedArray?.map((contact: any) => (
          <div
            key={contact._id}
            onClick={() => handleContact(contact._id)}
            className={`${
              selContact === contact._id
                ? "bg-blue-500 dark:bg-blue-600 text-slate-200"
                : "bg-transparent dark:hover:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200"
            } group min-w-[300px] h-[55px] rounded-full flex items-center justify-between px-1.5 mx-5 mb-1 gap-2 ubuntu-regular transition-colors ease-in-out duration-150`}
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-11 w-11 rounded-full">
                <AvatarImage src="" />
                <AvatarFallback
                  className={`dark:bg-[#333333] bg-[#e3e3e3] text-slate-800 dark:text-slate-200`}
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
                  : "dark:border-slate-300 border-slate-400 "
              } h-11 w-11 border rounded-full items-center justify-center group-hover:flex group-hover:cursor-pointer`}
            >
              <FaStar
                className={`${
                  selContact === contact._id ? "text-slate-200" : ""
                } dark:text-slate-200 text-slate-600 cursor-pointer `}
              />
            </div>
          </div>
        ))}
    </ScrollArea>
  );
};

export const FavoriteContacts = ({
  sortedArray,

  selContact,
  handleContact,
  getInitials,
  handleFavoriteClick,
  FavContact,
  setFavContact,
}: {
  sortedArray: Contacts[] | null;
  setSortedArray: any;
  selContact: any;
  handleContact: any;
  getInitials: any;
  handleFavoriteClick: any;
  FavContact: Contacts[] | null;
  setFavContact: any;
  contactData: Contacts[] | null;
}) => {
  useEffect(() => {
    const FavouriteContact = sortedArray?.filter((contact) => {
      return contact.fav == true;
    });
    setFavContact(FavouriteContact);
  }, [sortedArray]);

  return (
    <ScrollArea className="flex-col">
      {FavContact &&
        FavContact?.map((contact: any) => (
          <div
            key={contact._id}
            onClick={() => handleContact(contact._id)}
            className={`${
              selContact === contact._id
                ? "bg-blue-500 dark:bg-blue-600 text-slate-200"
                : "bg-transparent dark:hover:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200"
            } group min-w-[300px] h-[55px] rounded-full flex items-center justify-between px-1.5 mx-5 mb-1 gap-2 ubuntu-regular transition-colors ease-in-out duration-150`}
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
                } dark:text-slate-200 cursor-pointer`}
              />
            </div>
          </div>
        ))}
    </ScrollArea>
  );
};

export const AddContact = () => {
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const { setRefreshed } = Refreshed();

  const isFormValid: boolean = phone.trim().length >= 10 && Fname.trim() !== "";
  const Alert = () => {
    setAlertVisible(!alertVisible);
    Alert();
  };
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    try {
      if (!isFormValid) {
        console.error("Please fill all required fields correctly.");
        return;
      }

      const NewContact = await axiosInstance.post("/contacts/", {
        name: `${Fname} ${Lname}`,
        email: email.trim().toLowerCase() || "",
        phone: phone,
        fav: false,
        relation: relation.trim() || "Add relation",
        description: description.trim() || "Add description",
        tags: tags ? tags.split(",") : [],
      });
      if (NewContact.status == 201) {
        console.log("New contact created successfully", NewContact.data);
        setRefreshed((prev) => !prev);

        setEmail("");
        setFname("");
        setLname("");
        setPhone("");
        setRelation("");
        setTags("");
        setDescription("");
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 7000);
      }
      console.log(NewContact);
    } catch (error: any) {
      console.error("Error creating new contact", error.response?.data);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button className=" h-3 w-[250px] py-5 hover:bg-blue-400 bg-blue-500 dark:bg-blue-600 rounded-2xl flex justify-center mx-5 my-3 text-white ubuntu-regular text-base gap-1">
          Add Contact
          <div className="flex text-2xl h-10 items-center pb-2 pt-1.5">+</div>
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-[#101010] bg-[#FAFAFA] border-2 border-[#666666]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add new contact</DialogTitle>
          <DialogDescription>
            Add contact details here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex-col">
            <div className="flex gap-10 items-center">
              <Label htmlFor="name" className="text-xl w-[70px]">
                Name
              </Label>
              <div className="flex gap-2.5">
                <Input
                  placeholder="First Name"
                  id="Fname"
                  value={Fname}
                  onChange={(e) => setFname(e.target.value)}
                  className="w-[120px] dark:bg-[#000000] bg-[#FAFAFA] border-2 border-[#424242] placeholder:text-[#424242] font-medium"
                  required
                />
                <Input
                  placeholder="Last Name"
                  id="Lname"
                  value={Lname}
                  onChange={(e) => setLname(e.target.value)}
                  className="w-[120px]  dark:bg-[#000000] bg-[#FAFAFA] border-2 border-[#424242] placeholder:text-[#424242] font-medium"
                  required
                />
              </div>
            </div>

            <div className="flex gap-10 items-center mt-3">
              <Label htmlFor="phone" className="text-xl w-[70px]">
                Phone
              </Label>
              <Input
                placeholder="Add phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-[250px] dark:bg-[#000000] bg-[#FAFAFA] border-2 border-[#424242] placeholder:text-[#424242] font-medium"
                required
              />
            </div>

            <hr className="mt-4 bg-slate-400" />
            <div className="text-[#8e8e8e] flex justify-center">Optional</div>

            <div className="flex gap-10 items-center mt-3">
              <Label htmlFor="email" className="text-xl w-[70px]">
                Email
              </Label>
              <Input
                placeholder="Add Email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[250px] dark:bg-[#000000] bg-[#FAFAFA] border-2 border-[#424242] placeholder:text-[#424242] font-medium"
              />
            </div>

            <div className="flex gap-10 items-center mt-3">
              <Label htmlFor="relation" className="text-xl w-[70px]">
                Relation
              </Label>
              <Input
                placeholder="Eg: Family, Friend"
                id="relation"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-[250px] dark:bg-[#000000] bg-[#FAFAFA] border-2 border-[#424242] placeholder:text-[#424242] font-medium"
              />
            </div>

            <div className="flex gap-10 items-center mt-3">
              <Label htmlFor="tags" className="text-xl w-[70px]">
                Tags
              </Label>
              <Input
                placeholder="Eg: Work, Bestie"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-[250px] dark:bg-[#000000] bg-[#FAFAFA] border-2 border-[#424242] placeholder:text-[#424242] font-medium"
              />
            </div>

            <div className="flex gap-10 items-center mt-3">
              <Label htmlFor="description" className="text-xl w-[70px]">
                Description
              </Label>
              <Input
                placeholder="Add a description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-[250px] dark:bg-[#000000] bg-[#FAFAFA] border-2 border-[#424242] placeholder:text-[#424242] font-medium"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="default"
              type="submit"
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`px-4 py-2 rounded-md ${
                isFormValid
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              <DialogClose>Save</DialogClose>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DisplayContacts;
