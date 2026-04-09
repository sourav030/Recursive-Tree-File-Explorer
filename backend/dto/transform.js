const transform = (data, id1, id2) => {
  const index1 = data.findIndex(item => item.id === id1);
  const index2 = data.findIndex(item => item.id === id2);

  if (index1 === -1 || index2 === -1) {
    return data; // ids not found
  }

  // Swap positions
  const temp = data[index1];
  data[index1] = data[index2];
  data[index2] = temp;

  return data;
};

module.exports = transform;