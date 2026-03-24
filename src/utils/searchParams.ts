export const PARAMS = ["careers", "text", "time"] as const;

type Params = (typeof PARAMS)[number];

export function updateSearchParams(updates: Partial<Record<Params, string | null>>): string {
  const url = new URL(window.location.href);

  for (const [key, value] of Object.entries(updates)) {
    if (value === null || value === "") {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value as string);
    }
  }

  return url.search;
}
