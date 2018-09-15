const SimpleQueryStringBody = (userId, q) => {
  return {
    query: {
      bool: {
        must: [
          {
            simple_query_string: {
              query: q
            }
          }
        ],
        filter: [
          {
            term: {
              userId
            }
          }
        ]
      }
    }
  };
};

module.exports = SimpleQueryStringBody;
