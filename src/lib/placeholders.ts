/**
 * Placeholder detection.
 * Any string that STARTS with "[" is treated as "not provided yet"
 * (e.g. "[ADD LINKEDIN URL]"). Components hide these instead of
 * rendering a broken link.
 */
export const isPlaceholder = (value?: string | null): boolean => !value || /^\s*\[/.test(value);

/** Filter a list down to real (non-placeholder) entries. */
export const realList = (values?: string[]): string[] => (values ?? []).filter((v) => !isPlaceholder(v));
