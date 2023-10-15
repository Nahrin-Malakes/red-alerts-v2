export const GET = async () => {
  const res = await fetch(
    "https://www.oref.org.il/WarningMessages/alert/alerts.json",
    {
      headers: {
        Referer: "https://www.oref.org.il/11226-he/pakar.aspx",
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
      },
      credentials: "omit",
      method: "GET",
      body: null,
      cache: "no-cache",
    }
  );
  const decoder = new TextDecoder("utf-8");
  const responseText = decoder.decode(await res.arrayBuffer()).trim();

  if (responseText.length > 0) {
    const data = JSON.parse(responseText);
    return Response.json(data.data);
  } else {
    return Response.json(null);
  }
};
