export async function onRequestGet({ params }) {
  const { routeId, routeSeq, stopSeq } = params;
  const parts = [routeId, routeSeq, stopSeq];

  if (!parts.every((part) => typeof part === "string" && /^\d+$/.test(part))) {
    return json({ error: "Expected /api/gmb/eta/route-stop/{route_id}/{route_seq}/{stop_seq}" }, 400);
  }

  const upstream = `https://data.etagmb.gov.hk/eta/route-stop/${parts.join("/")}`;
  const response = await fetch(upstream, {
    headers: {
      accept: "application/json",
    },
  });

  const body = await response.text();
  return new Response(body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") || "application/json; charset=utf-8",
      "cache-control": "no-store",
      "access-control-allow-origin": "*",
    },
  });
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "access-control-allow-origin": "*",
    },
  });
}
