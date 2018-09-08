function recipientsStringToRecipientsArray(recipientsString) {
  const regex = /(\s|,|;|\t)/;
  return recipientsString
    .split(regex)
    .filter(str => str.trim())
    .filter(str => regex.test(str) === false);
}

module.exports = recipientsStringToRecipientsArray;
