export const removeHTMLTags = (value: string = "") =>
  value !== undefined && value !== null ? value.replace(/<[^>]*>?/gm, "") : "";
