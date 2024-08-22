export const timeParser = (date: string) => {
  const newDate = new Date(date);
  const hours = newDate.getUTCHours();
  const minutes = newDate.getUTCMinutes();
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};
