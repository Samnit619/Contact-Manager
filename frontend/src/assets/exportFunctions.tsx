import { useEffect, useState } from "react";
import Axios from "axios";
import { Contacts } from "@/App";
import { FaStar } from "react-icons/fa";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const useFetchContacts = () => {
  const [contactData, setContactData] = useState<Contacts[] | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await Axios.get<Contacts[]>(
          "http://localhost:5001/api/contacts/"
        );
        const AlphaContacts = res.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        console.log(AlphaContacts);
        setContactData(AlphaContacts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchContact();
  }, []);

  return { contactData, setContactData };
};


