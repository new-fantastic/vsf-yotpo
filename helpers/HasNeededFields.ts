export default (object, fields: string[]) => {
  const keys = Object.keys(object);
  for (let field of fields) {
    if (!keys.includes(field)) {
      return false;
    }
  }
  return true;
};
