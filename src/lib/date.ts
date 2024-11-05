import { format } from "date-fns";

export const formatDate = (
  date: Date | undefined,
  formatStr = "yyyy-MM-dd",
) => {
  return date ? format(date, formatStr) : null;
};
