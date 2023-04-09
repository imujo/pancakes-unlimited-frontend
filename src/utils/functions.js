const formatDateItem = (number, length) => {
  if (isNaN(number)) {
    return "Nan";
  }
  let str = number.toString();
  if (str.length > length) {
    console.log(str);
    throw new Error(
      "Lenght is larger than number length in function formatDateItem"
    );
  }

  for (let i = 0; i < length - str.length; i++) {
    str = "0".concat(str);
  }

  return str;
};

export function formatDate(date) {
  if (date instanceof Date === false) {
    throw new Error(
      "Invalid argument passed in function format date. The function requires a Date type."
    );
  }
  const dayOfMonth = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getUTCFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${formatDateItem(dayOfMonth, 2)}.${formatDateItem(
    month,
    2
  )}.${year} - ${formatDateItem(hours, 2)}:${formatDateItem(minutes, 2)}`;
}
