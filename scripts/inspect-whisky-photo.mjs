const url = process.argv[2] || "https://dailyshot.co/m/item/3238";
const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
const html = await response.text();
console.log("HTTP", response.status, "bytes", html.length);
const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
if (!match) throw new Error("No public product JSON");
const queries = JSON.parse(match[1]).props.pageProps.dehydratedState.queries;
const product = queries.find((query) => query.queryKey[1] === "getItemDetailsByTopProducts")?.state.data;
console.log(JSON.stringify({ keys: Object.keys(product || {}), ...Object.fromEntries(Object.entries(product || {}).filter(([key]) => /image|name|information/.test(key))) }, null, 2));
