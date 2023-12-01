import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const GET = async () => {
  const alarms = await fetch(
    "https://www.oref.org.il//Shared/Ajax/GetAlarmsHistory.aspx?lang=en&mode=1",
    {
      cache: "no-cache",
    }
  );

  return NextResponse.json(await alarms.json());
};
