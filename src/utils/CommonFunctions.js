export function findById(array, id) {
  return findByField(array, "id", parseInt(id));
}

export function findByField(array, fieldName, targetValue) {
  return array.find((object) => object[fieldName] === targetValue);
}

const CommonFunctions = { findById, findByField };
export default CommonFunctions;
