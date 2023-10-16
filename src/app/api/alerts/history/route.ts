import { NextResponse } from "next/server";

export const GET = async () => {
  const alarms = await fetch(
    "https://www.oref.org.il//Shared/Ajax/GetAlarmsHistory.aspx?lang=en&mode=1",
    {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Referrer: "https://www.oref.org.il/",
      },
      cache: "no-cache",
    }
  );

  return NextResponse.json(await alarms.json());
};
