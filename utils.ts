export function splitURLAndParams(
  url: string | URL,
): [string, URLSearchParams] {
  if (typeof url === "string") {
    url = new URL(url);
  }

  const { origin, pathname, searchParams } = url;
  return [origin + pathname, searchParams];
}
