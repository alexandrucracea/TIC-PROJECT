const chance = require('../../lib/chance');

module.exports = async () => {
  return [
    {
      name: chance.string(),
      price: chance.floating(),
      date: chance.date(),
      period: chance.string(),
      description: chance.string(),
      condition: chance.string(),
      colors: [chance.color(), chance.color(), chance.color()],
      available: true
    },
    {
      name: chance.string(),
      price: chance.floating(),
      date: chance.date(),
      period: chance.string(),
      description: chance.string(),
      condition: chance.string(),
      colors: [chance.color(), chance.color(), chance.color()],
      available: true

    },
    {
      name: chance.string(),
      price: chance.floating(),
      date: chance.date(),
      period: chance.string(),
      description: chance.string(),
      condition: chance.string(),
      colors: [chance.color(), chance.color(), chance.color()],
      available: true
    },
  ];
};
