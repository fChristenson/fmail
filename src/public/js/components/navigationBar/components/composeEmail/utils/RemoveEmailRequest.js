function RemoveEmailRequest() {
  const request = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  };

  return request;
}

module.exports = RemoveEmailRequest;
