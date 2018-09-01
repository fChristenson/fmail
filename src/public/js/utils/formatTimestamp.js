const formatTimestamp = timestamp => {
  const isoString = new Date(timestamp).toISOString();
  const array = isoString.split("T");
  const date = array[0];
  const time = array[1].substring(0, array[1].length - 8);

  return `${date} ${time}`;
};

module.exports = formatTimestamp;
