const timestampSort = (email1, email2) => {
  if (email2.timestamp > email1.timestamp) {
    return 1;
  } else if (email2.timestamp < email1.timestamp) {
    return -1;
  } else {
    return 0;
  }
};

module.exports = timestampSort;
