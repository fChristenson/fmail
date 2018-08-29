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
    const expected = "/api/v1/inbox-emails";
    fetchEmails(mockFetch)("/inbox");
    expect(mockFetch).toBeCalledWith(expected);
  });

  it("returns the correct url for /important", () => {
    const mockFetch = jest.fn();
    const expected = "/api/v1/important-emails";
    fetchEmails(mockFetch)("/important");
    expect(mockFetch).toBeCalledWith(expected);
  });

  it("returns the correct url for /inbox", () => {
    const mockFetch = jest.fn();
    const expected = "/api/v1/inbox-emails";
    fetchEmails(mockFetch)("/inbox");
    expect(mockFetch).toBeCalledWith(expected);
  });

  it("returns the correct url for /sent-mail", () => {
    const mockFetch = jest.fn();
    const expected = "/api/v1/sent-emails";
    fetchEmails(mockFetch)("/sent-mail");
    expect(mockFetch).toBeCalledWith(expected);
  });

  it("returns the correct url for /drafts", () => {
    const mockFetch = jest.fn();
    const expected = "/api/v1/draft-emails";
    fetchEmails(mockFetch)("/drafts");
    expect(mockFetch).toBeCalledWith(expected);
  });

  it("returns the correct url for /spam", () => {
    const mockFetch = jest.fn();
    const expected = "/api/v1/spam-emails";
    fetchEmails(mockFetch)("/spam");
    expect(mockFetch).toBeCalledWith(expected);
  });
});
