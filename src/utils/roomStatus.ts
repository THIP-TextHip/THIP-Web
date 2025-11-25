export const isRoomCompleted = (progressEndDate: string): boolean => {
  if (!progressEndDate) return false;

  const normalizedDate = progressEndDate.replace(/\./g, '-');

  const endDate = new Date(normalizedDate);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  return today > endDate;
};
