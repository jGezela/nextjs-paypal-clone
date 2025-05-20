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
        vhidden: "hidden",
        caption_dropdowns: "flex gap-2 justify-center items-center my-2",
        month: "flex flex-col gap-2",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100"
        ),
        ...classNames,
      }}
      components={{
        Dropdown: ({ value, onChange, children, name }: DropdownProps) => {
          const options = React.Children.toArray(children) as React.ReactElement<React.HTMLProps<HTMLOptionElement>>[];
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
                {options.map((optionNode) => {
                  const optionVal = optionNode.props.value;
                  const itemValue = String(Array.isArray(optionVal) ? optionVal[0] : optionVal);

                  return (
                    <SelectItem key={itemValue} value={itemValue}>
                      {optionNode.props.children}
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