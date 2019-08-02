export default (
  url: string,
  variables: object = {},
  absentThrow: boolean = false
) => {
  let returnable = url;
  const keys = Object.keys(variables);

  if (keys.length > 0) {
    for (let key of keys) {
      returnable = returnable.replace(`<${key}>`, variables[key]);
    }
  }
  return returnable;
};
