import { format } from "date-fns";
import { ko } from "date-fns/locale";

export const formatDate = (date: Date | undefined, formatStr = "PPP p") => {
  return date ? format(date, formatStr, { locale: ko }) : null;
};
