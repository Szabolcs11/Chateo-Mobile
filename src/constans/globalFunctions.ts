export function formatDate(num: Date | number) {
  return num.toString().padStart(2, '0');
}

export function YYYYMMDDDate(date: Date | string) {
  if (typeof date == 'object') {
    return (
      new Date(date).getFullYear() +
      '-' +
      formatDate(new Date(date).getMonth()) +
      '-' +
      formatDate(new Date(date).getDate())
    );
  }
  return date;
}

export function generateRandomString(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
