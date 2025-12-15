// utils/date.ts
export const getDayStart = (date: Date = new Date()) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};
