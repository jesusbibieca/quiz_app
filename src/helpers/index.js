import constants from '../constants';
function parseApiResponse(data) {
  const filteredData = data.filter(Boolean).slice(0, 100);
  const names = [];

  const parsedData = filteredData.map((user) => {
    const name = `${user.name.first} ${user.name.last}`;
    names.push(name);
    return {
      name,
      imageUrl: user.picture.large
    };
  });

  return {
    names,
    userData: generateRandomIndexes().map((index) => parsedData[index])
  };
}

function generateRandomIndexes(amount = constants.TOTAL_QUESTIONS) {
  const indexes = [];

  for (let current = 0; indexes.length < amount; current++) {
    const index = Math.floor(Math.random() * 100);
    if (!indexes.includes(index)) {
      indexes.push(index);
    }
  }
  return indexes;
}

export default {
  parseApiResponse
};
