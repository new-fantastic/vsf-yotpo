export default (url: string, queries: object) => {
  if (JSON.stringify(queries) === JSON.stringify({})) {
    return url
  }
  let base = url + "?";
  let values = [];
  for (const [key, value] of Object.entries(queries)) {
    values.push(`${key}=${value}`);
  }
  base += values.join("&");
  return base;
};
