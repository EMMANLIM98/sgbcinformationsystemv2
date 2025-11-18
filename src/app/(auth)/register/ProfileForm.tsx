import {
  Input,
  Select,
  SelectItem,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@heroui/react";
import { format, subYears, parse, isValid } from "date-fns";
import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function ProfileForm() {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();

  const [displayDate, setDisplayDate] = useState("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const dateValue = watch("dateOfBirth");

  // Format date for display
  useEffect(() => {
    if (dateValue) {
      try {
        const date = new Date(dateValue);
        if (isValid(date)) {
          const formatted = format(date, "yyyy-MMM-dd");
          setDisplayDate(formatted);
        } else {
          setDisplayDate("");
        }
      } catch (error) {
        setDisplayDate("");
      }
    } else {
      setDisplayDate("");
    }
  }, [dateValue]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue("dateOfBirth", value);
    setIsDatePickerOpen(false);
  };

  const genderList = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  return (
    <div className="w-full mx-auto">
      {/* Form Content - Optimized for Card Layout */}
      <div className="space-y-4 sm:space-y-6">
        {/* Personal Details Section */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
              <svg
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600 dark:text-emerald-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            Personal Details
          </h3>

          {/* First Name and Last Name - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Input
              defaultValue={getValues("firstName")}
              label="First Name"
              variant="bordered"
              size="md"
              radius="lg"
              {...register("firstName")}
              isInvalid={!!errors.firstName}
              errorMessage={errors.firstName?.message as string}
              placeholder="Your first name"
              classNames={{
                input: "text-sm",
                inputWrapper:
                  "border-2 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200 min-h-[44px]",
              }}
              startContent={
                <div className="text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              }
            />

            <Input
              defaultValue={getValues("lastName")}
              label="Last Name"
              variant="bordered"
              size="md"
              radius="lg"
              {...register("lastName")}
              isInvalid={!!errors.lastName}
              errorMessage={errors.lastName?.message as string}
              placeholder="Your last name"
              classNames={{
                input: "text-sm",
                inputWrapper:
                  "border-2 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200 min-h-[44px]",
              }}
              startContent={
                <div className="text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              }
            />
          </div>

          {/* Gender and Date of Birth - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Select
              defaultSelectedKeys={getValues("gender")}
              label="Gender"
              aria-label="Select Gender"
              variant="bordered"
              size="md"
              radius="lg"
              {...register("gender")}
              isInvalid={!!errors.gender}
              errorMessage={errors.gender?.message as string}
              onChange={(e) => setValue("gender", e.target.value)}
              classNames={{
                trigger:
                  "border-2 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200 min-h-[44px]",
                value: "text-sm",
              }}
              startContent={
                <div className="text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              }
            >
              {genderList.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>

            {/* Custom Date Picker with 1990-Aug-24 Format */}
            <Popover
              isOpen={isDatePickerOpen}
              onOpenChange={setIsDatePickerOpen}
              placement="bottom"
            >
              <PopoverTrigger>
                <div>
                  <Input
                    value={displayDate}
                    label="Date of Birth"
                    variant="bordered"
                    size="md"
                    radius="lg"
                    placeholder="1990-Aug-24"
                    readOnly
                    isInvalid={!!errors.dateOfBirth}
                    errorMessage={errors.dateOfBirth?.message as string}
                    classNames={{
                      input: "text-sm cursor-pointer",
                      inputWrapper:
                        "border-2 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200 min-h-[44px] cursor-pointer",
                    }}
                    startContent={
                      <div className="text-gray-400">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    }
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Select Date of Birth
                  </p>
                  <input
                    type="date"
                    max={format(subYears(new Date(), 18), "yyyy-MM-dd")}
                    defaultValue={getValues("dateOfBirth")}
                    onChange={handleDateChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Rest of your form... */}
          {/* Description - Full Width */}
          <div>
            <Textarea
              defaultValue={getValues("description")}
              label="About Me"
              variant="bordered"
              radius="lg"
              {...register("description")}
              isInvalid={!!errors.description}
              errorMessage={errors.description?.message as string}
              minRows={2}
              maxRows={4}
              placeholder="Pastor, Deacon, Member, Usher..."
              classNames={{
                input: "text-sm resize-none",
                inputWrapper:
                  "border-2 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200",
              }}
            />
          </div>
        </div>

        {/* Location Section */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <svg
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600 dark:text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            Location
          </h3>

          {/* City and Country - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Input
              defaultValue={getValues("city")}
              label="City"
              variant="bordered"
              size="md"
              radius="lg"
              {...register("city")}
              isInvalid={!!errors.city}
              errorMessage={errors.city?.message as string}
              placeholder="Your city"
              classNames={{
                input: "text-sm",
                inputWrapper:
                  "border-2 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200 min-h-[44px]",
              }}
              startContent={
                <div className="text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              }
            />

            <Input
              defaultValue={getValues("country") || "Philippines"}
              label="Country"
              variant="bordered"
              size="md"
              radius="lg"
              {...register("country")}
              isInvalid={!!errors.country}
              errorMessage={errors.country?.message as string}
              placeholder="Philippines"
              classNames={{
                input: "text-sm",
                inputWrapper:
                  "border-2 hover:border-emerald-400 group-data-[focus=true]:border-emerald-600 shadow-sm transition-all duration-200 min-h-[44px]",
              }}
              startContent={
                <div className="text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              }
            />
          </div>
        </div>

        {/* Privacy Note */}
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 mt-0.5">
              <svg
                className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-medium text-emerald-800 dark:text-emerald-200 mb-1">
                Privacy & Security
              </h4>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
                Your information is secure and only visible to verified members.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
