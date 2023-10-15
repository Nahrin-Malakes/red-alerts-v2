"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";

export function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center flex-row-reverse">
      {
        <p className="text-xl text-red-400">
          {format(currentTime, "HH:mm:ss")}
        </p>
      }
      <p className="pr-2">{format(currentTime, "dd/MM/yyyy", {})}</p>
    </div>
  );
}
