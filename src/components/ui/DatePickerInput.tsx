"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, isValid, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

interface DatePickerInputProps {
  value?: Date;
  onChange: (date?: Date) => void;
  placeholder?: string;
  disabled?: boolean;
}

const DATE_FORMATS = [
  "d M yyyy",
  "dd MM yyyy",
  "d MM yyyy",
  "d MMM yyyy",
  "dd MMM yyyy",
  "d MMMM yyyy",
  "dd MMMM yyyy",
];

const parseSearchDate = (input: string): Date | null => {
  for (const fmt of DATE_FORMATS) {
    const parsed = parse(input.trim(), fmt, new Date());
    if (isValid(parsed)) return parsed;
  }
  return null;
};

const DatePickerInput = ({
  value,
  onChange,
  placeholder = "Select date",
  disabled = false,
}: DatePickerInputProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [calendarMonth, setCalendarMonth] = useState<Date | undefined>(value);

  const handleSearchChange = (v: string) => {
    setSearch(v);

    const parsed = parseSearchDate(v);
    if (parsed) {
      setCalendarMonth(parsed);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
          onClick={() => {
            setSearch("");
            setCalendarMonth(value);
            setOpen(true);
          }}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "dd-MM-yyyy") : placeholder}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-3 space-y-2" align="start">
        {/* SEARCH INPUT */}
        <Input
          autoFocus
          placeholder="Search date (e.g. 19 Dec 2003)"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />

        {/* CALENDAR */}
        <Calendar
          mode="single"
          selected={value}
          month={calendarMonth}
          onMonthChange={setCalendarMonth}
          onSelect={(date) => {
            onChange(date);
            setOpen(false);
            setSearch("");
          }}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerInput;
