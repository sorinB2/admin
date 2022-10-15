const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, '0');
};

export const formatDate = (date: Date) => {
  return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('.');
};

export const formatEventDate = (date: Date) => {
  return [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-');
};
