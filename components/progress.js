import {Skeleton} from "@heroui/react";

export default function Progress() {
  return (
    <div className="max-w-[300px] w-full flex items-center gap-3">
      <div>
        <Skeleton className="flex rounded-full w-12 h-12 bg-gray-300" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg bg-gray-300" />
        <Skeleton className="h-3 w-4/5 rounded-lg bg-gray-300" />
      </div>
    </div>
  );
}
