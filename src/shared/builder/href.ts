// Hrefs often carry Kommo variables ({{profile.phone}}?utm…), so only script URLs are rejected.
export const isSafeHref = (href: string) =>
  !/^\s*(javascript|vbscript|data):/i.test(href);
