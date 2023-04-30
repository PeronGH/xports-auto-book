import {
  crypto,
  toHashString,
} from "https://deno.land/std@0.184.0/crypto/mod.ts";

export function MD5(data: string): string {
  const hash = crypto.subtle.digestSync("MD5", new TextEncoder().encode(data));
  return toHashString(hash);
}

export function signURL(url: string | URL): URL {
  if (typeof url === "string") {
    url = new URL(url);
  }

  const { pathname, searchParams } = url;

  searchParams.delete("sign");
  searchParams.set("channelId", "11");
  searchParams.set("centerId", "32050000");
  searchParams.set("venueId", "3205000001");
  searchParams.set("apiKey", "78d0f9e05a9e0605");
  searchParams.set("timestamp", Date.now().toString());
  searchParams.sort();

  const signString = pathname +
    [...searchParams]
      .reduce((s, [key, value]) => s + key + "=" + value, "") +
    "4be27b84242e710d";

  const encodedString = encodeURIComponent(signString);
  const signedString = MD5(encodedString);

  searchParams.set("sign", signedString);
  return url;
}
