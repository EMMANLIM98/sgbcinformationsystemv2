import {
  Button,
  Select,
  SelectItem,
  Slider,
  Spinner,
  Switch,
} from "@heroui/react";
import React from "react";
import { useFilters } from "@/hooks/useFilters";

export default function Filters() {
  const {
    orderbyList,
    genderList,
    selectAge,
    selectGender,
    selectOrder,
    filters,
    isPending,
    totalCount,
    selectWithPhoto,
  } = useFilters();

  return (
    <div className="shadow-md py-3 px-3 md:px-0 filters-mobile bg-white dark:bg-slate-800 dark:text-neutral-100">
      <div className="flex flex-col md:flex-row md:justify-around md:items-center gap-4">
        <div className="flex gap-2 items-center justify-start md:justify-center w-full md:w-auto">
          <div className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm md:text-xl result-count">
            Results:{" "}
            {isPending ? (
              <Spinner
                size="sm"
                color="success"
                classNames={{
                  circle1: "border-b-emerald-600",
                  circle2: "border-b-emerald-600",
                }}
              />
            ) : (
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent font-bold">
                {totalCount}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2 items-center w-full md:w-auto">
          <div className="text-sm md:text-base mr-1 font-medium">Gender:</div>
          <div className="flex gap-2 items-center">
            {genderList.map(({ icon: Icon, label }) => (
              <Button
                key={label}
                size="sm"
                isIconOnly
                radius="lg"
                className={
                  filters.gender.includes(label)
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
                    : "hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border border-gray-200 dark:border-gray-600"
                }
                onPress={() => selectGender(label)}
              >
                <Icon size={20} />
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-1/4 slider-wrapper">
          <div className="hidden md:block text-sm font-medium">Age Range</div>
          <Slider
            aria-label="Slider for age selection"
            label="Age Range"
            color="success"
            size="sm"
            minValue={1}
            maxValue={100}
            defaultValue={filters.ageRange}
            onChangeEnd={(value) => selectAge(value as number[])}
            classNames={{
              base: "max-w-md",
              track: "bg-emerald-100 dark:bg-emerald-900/30",
              filler: "bg-gradient-to-r from-emerald-500 to-emerald-600",
              thumb: "bg-emerald-600 border-emerald-600 shadow-lg",
            }}
          />
        </div>

        <div className="flex flex-col items-center w-full md:w-auto">
          <p className="text-sm md:text-base font-medium mb-1">With Photo</p>
          <Switch
            color="success"
            defaultSelected
            size="sm"
            onChange={selectWithPhoto}
            classNames={{
              wrapper: "group-data-[selected=true]:bg-emerald-600 shadow-sm",
              thumb: "group-data-[selected=true]:bg-white shadow-md",
            }}
          />
        </div>

        <div className="w-full md:w-1/4">
          <Select
            size="sm"
            fullWidth
            label="Order By"
            variant="bordered"
            radius="lg"
            aria-label="Order by selector"
            selectedKeys={new Set([filters.orderBy])}
            onSelectionChange={selectOrder}
            classNames={{
              trigger:
                "border-2 border-emerald-200 data-[hover=true]:border-emerald-400 data-[focus=true]:border-emerald-600 shadow-sm",
              value: "text-emerald-700 dark:text-emerald-300 font-medium",
              listbox: "bg-white dark:bg-slate-800",
            }}
          >
            {orderbyList.map((item) => (
              <SelectItem
                key={item.value}
                className="text-gray-700 dark:text-gray-300"
              >
                {item.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}
