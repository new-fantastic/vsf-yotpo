export default (url: string, queries: object) => {
  let base = url + "?";
  let values = [];
  for (const [key, value] of Object.entries(queries)) {
    values.push(`${key}=${value}`);
  }
  base += values.join("&");
  return base;
};
