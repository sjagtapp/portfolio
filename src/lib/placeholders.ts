/**
 * Placeholder detection.
 * Any string that STARTS with "[" is treated as "not provided yet"
 * (e.g. "[ADD GITHUB LINK]" or "[ADD SCREENSHOT] /images/…hint").
 * UI components use this to render a designed placeholder state
 * instead of a broken link or an empty box.
 */
export const isPlaceholder = (value?: string | null): boolean => !value || /^\s*\[/.test(value);

/** Returns the value, or undefined when it is a placeholder. */
export const real = (value?: string | null): string | undefined =>
  isPlaceholder(value) ? undefined : (value as string);

/** Strip the brackets for display: "[ADD BIO HERE]" → "Add bio here". */
export const humanize = (value: string): string => {
  const inner = value.match(/^\s*\[([^\]]*)\]/)?.[1] ?? value;
  const lower = inner.trim().toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

/** Filter a list down to real (non-placeholder) entries. */
export const realList = (values?: string[]): string[] => (values ?? []).filter((v) => !isPlaceholder(v));
