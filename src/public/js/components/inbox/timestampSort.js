const timestampSort = (email1, email2) => {
  return email2.timestamp - email1.timestamp;
};

module.exports = timestampSort;
