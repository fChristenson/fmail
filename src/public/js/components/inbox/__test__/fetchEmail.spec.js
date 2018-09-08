const fetchEmails = require("../utils/fetchEmails");

describe("fetchEmails", () => {
  it("has a module", () => {
    expect(fetchEmails).toBeDefined();
    const expected = "function";
    const actual = typeof fetchEmails;
    expect(expected).toEqual(actual);
  });

  it("returns the correct url for /inbox", () => {
    const mockFetch = jest.fn();
    const pathname = "/fail";
    try {
      fetchEmails(mockFetch)(pathname);
      jest.fail("did not throw error");
    } catch (error) {
      expect(error.message).toEqual(`${pathname} is not a valid path`);
    }
  });

  it("returns the correct url for /inbox", () => {
    const mockFetch = jest.fn();
    const expected = "/api/v1/inbox-emails?offset=0&limit=0";
    const offset = 0;
    const limit = 0;
    fetchEmails(mockFetch)("/inbox", offset, limit);
    expect(mockFetch).toBeCalledWith(expected);
  });

  it("returns the correct url for /important", () => {
    const mockFetch = jest.fn();
    const expected = "/api/v1/important-emails?offset=0&limit=0";
    const offset = 0;
    const limit = 0;
    fetchEmails(mockFetch)("/important", offset, limit);
    expect(mockFetch).toBeCalledWith(expected);
  });

  it("returns the correct url for /inbox", () => {
    const mockFetch = jest.fn();
    const expected = "/api/v1/inbox-emails?offset=0&limit=0";
    const offset = 0;
    const limit = 0;
    fetchEmails(mockFetch)("/inbox", offset, limit);
    expect(mockFetch).toBeCalledWith(expected);
  });

  it("returns the correct url for /sent-mail", () => {
    const mockFetch = jest.fn();
    const expected = "/api/v1/sent-emails?offset=0&limit=0";
    const offset = 0;
    const limit = 0;
    fetchEmails(mockFetch)("/sent-mail", offset, limit);
    expect(mockFetch).toBeCalledWith(expected);
  });

  it("returns the correct url for /drafts", () => {
    const mockFetch = jest.fn();
    const expected = "/api/v1/draft-emails?offset=0&limit=0";
    const offset = 0;
    const limit = 0;
    fetchEmails(mockFetch)("/drafts", offset, limit);
    expect(mockFetch).toBeCalledWith(expected);
  });

  it("returns the correct url for /spam", () => {
    const mockFetch = jest.fn();
    const expected = "/api/v1/spam-emails?offset=0&limit=0";
    const offset = 0;
    const limit = 0;
    fetchEmails(mockFetch)("/spam", offset, limit);
    expect(mockFetch).toBeCalledWith(expected);
  });
});
