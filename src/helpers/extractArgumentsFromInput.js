export const extractArgumentsFromInput = (command, data, argsAmount) => {
  const onlyArguments = data.replace(command, "").trim();

  const splittedByQuotation = onlyArguments
    .split(/['"]/)
    .map((value) => value.trim())
    .filter(Boolean);

  const splittedBySpaces = onlyArguments
    .split(" ")
    .map((value) => value.trim())
    .filter(Boolean);

  if (splittedByQuotation.length > 0) {
    if (splittedByQuotation.length !== argsAmount) {
      throw "Invalid input";
    }

    return splittedByQuotation;
  }

  if (splittedBySpaces.length !== argsAmount) {
    throw "Invalid input";
  }

  return splittedBySpaces;
};
