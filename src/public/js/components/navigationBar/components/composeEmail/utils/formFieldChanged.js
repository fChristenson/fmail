function formFieldChanged(originalForm, currentForm) {
  const keys = Object.keys(originalForm);
  return keys.some(key => {
    return originalForm[key] !== currentForm[key];
  });
}

module.exports = formFieldChanged;
