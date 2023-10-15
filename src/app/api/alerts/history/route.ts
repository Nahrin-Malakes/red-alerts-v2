export const GET = async () => {
  const alarms = await fetch(
    "https://www.oref.org.il//Shared/Ajax/GetAlarmsHistory.aspx?lang=he",
    {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Referrer: "https://www.oref.org.il/",
      },
    }
  );

  return alarms;
};
