import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectScrollable() {
  return (
    <Select>
      <SelectTrigger className=" h-7 dark:bg-[#333333] bg-[#e3e3e3] text-slate-500 flex justify-start font-medium dark:text-slate-300 pl-2 pr-1 gap-1">
        <SelectValue placeholder="A-Z" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="a">A</SelectItem>
          <SelectItem value="b">B</SelectItem>
          <SelectItem value="c">C</SelectItem>
          <SelectItem value="d">D</SelectItem>
          <SelectItem value="e">E</SelectItem>
          <SelectItem value="f">F</SelectItem>
          <SelectItem value="g">G</SelectItem>
          <SelectItem value="h">H</SelectItem>
          <SelectItem value="i">I</SelectItem>
          <SelectItem value="j">J</SelectItem>
          <SelectItem value="k">K</SelectItem>
          <SelectItem value="l">L</SelectItem>
          <SelectItem value="m">M</SelectItem>
          <SelectItem value="n">N</SelectItem>
          <SelectItem value="o">O</SelectItem>
          <SelectItem value="p">P</SelectItem>
          <SelectItem value="q">Q</SelectItem>
          <SelectItem value="r">R</SelectItem>
          <SelectItem value="s">S</SelectItem>
          <SelectItem value="t">T</SelectItem>
          <SelectItem value="u">U</SelectItem>
          <SelectItem value="v">V</SelectItem>
          <SelectItem value="w">W</SelectItem>
          <SelectItem value="x">X</SelectItem>
          <SelectItem value="y">Y</SelectItem>
          <SelectItem value="z">Z</SelectItem>
          
          
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
