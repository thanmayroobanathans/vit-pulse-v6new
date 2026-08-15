// OPTIONAL AGGREGATION ENDPOINT
// Deploy as a Cloudflare Worker only after reviewing privacy/retention requirements.
// Bind a KV namespace named VIT_STATS if you want simple aggregate counters.
// This worker stores only counts by archetype and model version.

export default {
  async fetch(request, env) {
    if (request.method !== "POST") return new Response("Method Not Allowed", {status:405});
    try {
      const body = await request.json();
      const allowed = typeof body.archetype==="string" && typeof body.version==="string";
      if (!allowed || body.archetype.length>80 || body.version.length>20)
        return new Response("Bad Request",{status:400});

      // Example: store only aggregate counts. No raw answers are retained.
      const key = `count:${body.version}:${body.archetype}`;
      const old = Number(await env.VIT_STATS.get(key) || "0");
      await env.VIT_STATS.put(key, String(old+1));

      return new Response(JSON.stringify({ok:true}), {
        headers: {"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}
      });
    } catch {
      return new Response("Bad Request",{status:400});
    }
  }
}
