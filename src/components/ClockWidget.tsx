import { useEffect, useState } from "react";

export default function ClockWidget() {
    const [time, setTime] = useState(new Date());
  
    useEffect(() => {
      const interval = setInterval(() => setTime(new Date()), 1000);
      return () => clearInterval(interval);
    }, []);

    const formatTime = (date: Date) => {
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'pm' : 'am';
      
      hours = hours % 12;
      hours = hours ? hours : 12;
      
      const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
      
      return `${hours}:${minutesStr}${ampm}`;
    };
  
    return (
      <div className="flex items-center space-x-2 px-3 py-1 text-sm text-gray-700 dark:text-gray-300">
        <div className="font-semibold">
            {new Intl.DateTimeFormat('en-US', { 
              weekday: "short", 
              day: "numeric", 
              month: "short"
            }).format(time)}
        </div>
        <div className="font-medium">
            {formatTime(time)}
        </div>
      </div>
    );
}