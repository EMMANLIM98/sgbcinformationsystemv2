import { Spinner } from "@heroui/react";
import React from "react";

export default function Loading({ label }: { label?: string }) {
  return (
    <div className="flex justify-center items-center vertical-center">
      <div className="flex flex-col items-center gap-3">
        <Spinner
          color="success"
          labelColor="success"
          size="lg"
          classNames={{
            circle1: "border-b-emerald-600",
            circle2: "border-b-emerald-600",
            wrapper: "text-emerald-600",
          }}
        />
        <span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
          {label || "Loading..."}
        </span>
      </div>
    </div>
  );
}
