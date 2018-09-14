const RegisterRequest = (email, password) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  };
};

module.exports = RegisterRequest;
