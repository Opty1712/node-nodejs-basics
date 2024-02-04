import { invalidInput } from "./errors.js";

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

  const isQuotationsWay =
    splittedByQuotation.length > 0 && onlyArguments !== splittedByQuotation[0];

  if (isQuotationsWay) {
    if (splittedByQuotation.length !== argsAmount) {
      throw invalidInput;
    }
    return splittedByQuotation;
  }

  if (splittedBySpaces.length !== argsAmount) {
    throw invalidInput;
  }
  return splittedBySpaces;
};
