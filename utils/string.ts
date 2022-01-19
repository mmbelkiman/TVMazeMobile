export const removeHTMLTags = (value: string) =>
  value.replace(/<[^>]*>?/gm, "");
