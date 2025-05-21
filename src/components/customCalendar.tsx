"use client"

import * as React from "react";
import { DayPicker, DropdownProps } from "react-day-picker";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

function CustomCalendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        nav: "hidden",
        weekdays: "hidden",
        dropdowns: "mb-3 flex justify-center gap-2",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100"
        ),
        ...classNames,
      }}
      components={{
        Dropdown: ({ value, onChange, options, name }: DropdownProps) => {
          const resolvedOptions = options || [];
          const selectValue = value !== undefined ? String(value) : undefined;

          const handleValueChange = (newValue: string) => {
            if (onChange) {
              const simulatedEvent = {
                target: { value: newValue, name: name },
                currentTarget: { value: newValue, name: name },
              } as unknown as React.ChangeEvent<HTMLSelectElement>;
              onChange(simulatedEvent);
            }
          };

          return (
            <Select
              value={selectValue}
              onValueChange={handleValueChange}
            >
              <SelectTrigger>
                <SelectValue placeholder={name === 'months' ? 'Month' : 'Year'} />
              </SelectTrigger>
              <SelectContent>
                {resolvedOptions.map((option) => {
                  const itemValue = String(Array.isArray(option.value) ? option.value[0] : option.value);

                  return (
                    <SelectItem key={itemValue} value={itemValue}>
                      {option.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          );
        },
      }}
      {...props}
    />
  );
}

export { CustomCalendar };