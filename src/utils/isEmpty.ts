export type IsEmptyParamTypes = {
  value: unknown;
};

// Checks if a value is empty.
const isEmpty = ({ value }: IsEmptyParamTypes) =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0) ||
  (Object.entries(value).length === 0 && value.constructor === Object);

export default isEmpty;
