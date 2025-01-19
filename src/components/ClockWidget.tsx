import { useEffect, useState } from "react";

export default function ClockWidget() {
    const [time, setTime] = useState(new Date());
  
    useEffect(() => {
      const interval = setInterval(() => setTime(new Date()), 1000);
      return () => clearInterval(interval);
    }, []);
  
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
  
    return (
      <div className="flex items-center space-x-2 px-3 py-1 text-sm text-gray-700 dark:text-gray-300">
        <div className="font-semibold">
            {time.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" })}
        </div>
        <div className="font-medium">
            {time.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", hour12: true })}
        </div>
      </div>
    );
  }