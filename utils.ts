export function splitURLAndParams(
  url: string | URL,
): [string, URLSearchParams] {
  if (typeof url === "string") {
    url = new URL(url);
  }

  const { origin, pathname, searchParams } = url;
  return [origin + pathname, searchParams];
}

export function getCurrentDate(): `${number}-${number}-${number}` {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

export function parseDate(date: string): Date {
  const [year, month, day] = date.split("-").map((item) => parseInt(item));
  return new Date(year, month - 1, day);
}
