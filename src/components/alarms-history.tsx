"use client";

import { useEffect, useState } from "react";

import { Alarm } from "@/types/alarm";

export function AlarmsHistory() {
  const [alerts, setAlerts] = useState<Alarm[]>();

  const getAlarmsHistory = async () => {
    const alarms = await fetch("/api/alerts/history");
    const res: Alarm[] = await alarms.json();
    setAlerts(res);
  };

  useEffect(() => {
    getAlarmsHistory();

    const timer = setInterval(() => {
      getAlarmsHistory();
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="max-h-[75vh] overflow-auto">
      {alerts &&
        alerts.map((alert) => (
          <div
            key={alert.rid}
            className="p-2 border flex rounded-md mr-2 bg-red-700"
          >
            <div className="flex flex-col">
              <p className="flex ">{alert.data}</p>

              <p className="flex ">
                {alert.date} - {alert.time}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
