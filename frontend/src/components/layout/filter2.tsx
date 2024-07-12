import App, { Contacts } from "@/App";
import exportFunctions, { useFetchContacts } from "@/assets/exportFunctions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectScrollable({}: {}) {
  const { contactData, setContactData } = useFetchContacts();
  const { DisplayContacts } = exportFunctions();
  const AlphaContact = (value: string) => {
    const sortedArray = contactData?.filter((contact) => {
      var names = contact.name.split(" ");
      return names[0].substring(0, 1).toLowerCase() == value;
    });
    setContactData(sortedArray || []);

    <App contactData={contactData} />;
  };
  const Alphabets = [];
  for (let i = 65; i <= 90; i++) {
    Alphabets.push(String.fromCharCode(i));
  }
  return (
    <Select onValueChange={AlphaContact}>
      <SelectTrigger className=" h-7 dark:bg-[#333333] bg-[#e3e3e3] text-slate-500 flex justify-start font-medium dark:text-slate-300 pl-2 pr-1 gap-1">
        <SelectValue placeholder="A-Z" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all" onClick={() => AlphaContact}>
            All
          </SelectItem>
          {Alphabets.map((letter: string) => (
            <SelectItem key={letter} value={letter.toLowerCase()}>
              {letter.toUpperCase()}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
