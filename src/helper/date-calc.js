import { format, formatDistance } from "date-fns";

export const dateCalculator = (dateObj) => {
  const today = format(new Date(), "yyyy-MM-dd");
  if (today === dateObj) return "Today";
  const timeBefore = formatDistance(new Date(dateObj), new Date(), { addSuffix: true });
  if (!["2 days ago", "1 day ago"].includes(timeBefore)) return format(new Date(dateObj), 'Mo MMM, yyyy');
  return timeBefore;
};
