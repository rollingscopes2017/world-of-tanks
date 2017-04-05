const last = function last(array) {
  return array.length > 0 ? array[array.length - 1] : undefined;
};

const remove = function remove(array, item) {
  const index = array.indexOf(item);
  if (index >= 0) {
    array.splice(index, 1);
  }
};

const random = function random(array) {
  return array[Math.floor(Math.random() * array.length)];
};

export { last, remove, random };
