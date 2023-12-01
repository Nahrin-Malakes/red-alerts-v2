"use client";
import dynamic from "next/dynamic";

import { Separator } from "@/components/ui/separator";

const Clock = dynamic(() => import("../components/clock"), { ssr: false });
import { AlarmsHistory } from "@/components/alarms-history";
import { Map } from "@/components/map";
import { useEffect, useState } from "react";

function areArraysIdentical(array1: string[] | null, array2: string[] | null) {
  if (!array1 || !array2) return false;
  // Check if the arrays have the same length
  if (array1.length !== array2.length) {
    return false;
  }

  // Iterate through the arrays and compare each element
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  // If all elements are equal, return true
  return true;
}

export default function Home() {
  const [alerts, setAlerts] = useState<string[] | null>(null);

  const getCurrentAlerts = async () => {
    const alarms = await fetch("/api/alerts/current");
    const res: string[] | null = await alarms.json();

    if (res !== null) {
      if (!areArraysIdentical(res, alerts)) {
        setAlerts(res);
      } else {
        setAlerts(null);
      }
    }
  };

  useEffect(() => {
    getCurrentAlerts();
    const timer = setInterval(() => {
      getCurrentAlerts();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col relative">
      <Map locations={alerts && alerts.length > 0 ? alerts : null} />
      <div className="flex p-8 z-10">
        <div className="border h-[90vh] w-80 rounded-lg fixed bg-stone-900">
          <div className="flex p-4">
            <Clock />
          </div>
          <div className="px-2">
            <div className="border rounded-md h-[82vh]">
              <div>
                <div className="flex p-2">
                  <p className="font-semibold">Alerts in the last 24 hours</p>
                </div>
              </div>
              <Separator className="w-full" />
              <div className="py-2 px-4">
                <AlarmsHistory />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
