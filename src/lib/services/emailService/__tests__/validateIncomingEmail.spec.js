const validateIncomingEmail = require("../validateIncomingEmail");

describe("validateIncomingEmail", () => {
  it("has a module", () => {
    expect(validateIncomingEmail).toBeDefined();
    const expected = "function";
    const actual = typeof validateIncomingEmail;
    expect(expected).toEqual(actual);
  });

  it("calls next with an error if recipients is missing", () => {
    const req = {
      body: {}
    };
    const res = {};
    const next = jest.fn();
    validateIncomingEmail(req, res, next);
    expect(next).toBeCalledWith(
      new Error(
        'ValidationError: child "recipients" fails because ["recipients" is required]'
      )
    );
  });

  it("calls next with an error if recipients is not an array", () => {
    const req = {
      body: {
        recipients: "fail"
      }
    };
    const res = {};
    const next = jest.fn();
    validateIncomingEmail(req, res, next);
    expect(next).toBeCalledWith(
      new Error(
        'ValidationError: child "recipients" fails because ["recipients" must be an array]'
      )
    );
  });

  it("calls next with an error if recipients has a invalid email string", () => {
    const req = {
      body: {
        recipients: ["fail", "foo@bar.se"]
      }
    };
    const res = {};
    const next = jest.fn();
    validateIncomingEmail(req, res, next);
    expect(next).toBeCalledWith(
      new Error(
        'ValidationError: child "recipients" fails because ["recipients" at position 0 fails because ["0" must be a valid email]]'
      )
    );
  });

  it("calls next with an error if subject is missing", () => {
    const req = {
      body: {
        recipients: ["foo@bar.se"]
      }
    };
    const res = {};
    const next = jest.fn();
    validateIncomingEmail(req, res, next);
    expect(next).toBeCalledWith(
      new Error(
        'ValidationError: child "subject" fails because ["subject" is required]'
      )
    );
  });

  it("calls next with an error if subject is not a string", () => {
    const req = {
      body: {
        recipients: ["foo@bar.se"],
        subject: 1
      }
    };
    const res = {};
    const next = jest.fn();
    validateIncomingEmail(req, res, next);
    expect(next).toBeCalledWith(
      new Error(
        'ValidationError: child "subject" fails because ["subject" must be a string]'
      )
    );
  });

  it("calls next with an error if subject is a string with a length less than 1", () => {
    const req = {
      body: {
        recipients: ["foo@bar.se"],
        subject: ""
      }
    };
    const res = {};
    const next = jest.fn();
    validateIncomingEmail(req, res, next);
    expect(next).toBeCalledWith(
      new Error(
        'ValidationError: child "subject" fails because ["subject" is not allowed to be empty]'
      )
    );
  });

  it("calls next with an error if subject is a string with a length greater than 255", () => {
    let subject = "";
    for (let i = 0; i < 256; i++) {
      subject += 1;
    }

    const req = {
      body: {
        recipients: ["foo@bar.se"],
        subject
      }
    };
    const res = {};
    const next = jest.fn();
    validateIncomingEmail(req, res, next);
    expect(next).toBeCalledWith(
      new Error(
        'ValidationError: child "subject" fails because ["subject" length must be less than or equal to 255 characters long]'
      )
    );
  });

  it("calls next with an error if message is missing", () => {
    const req = {
      body: {
        recipients: ["foo@bar.se"],
        subject: "foobar"
      }
    };
    const res = {};
    const next = jest.fn();
    validateIncomingEmail(req, res, next);
    expect(next).toBeCalledWith(
      new Error(
        'ValidationError: child "message" fails because ["message" is required]'
      )
    );
  });

  it("calls next with an error if message is not a string", () => {
    const req = {
      body: {
        recipients: ["foo@bar.se"],
        subject: "foobar",
        message: 1
      }
    };
    const res = {};
    const next = jest.fn();
    validateIncomingEmail(req, res, next);
    expect(next).toBeCalledWith(
      new Error(
        'ValidationError: child "message" fails because ["message" must be a string]'
      )
    );
  });

  it("calls next with an error if message is a string with a length less than 1", () => {
    const req = {
      body: {
        recipients: ["foo@bar.se"],
        subject: "foobar",
        message: ""
      }
    };
    const res = {};
    const next = jest.fn();
    validateIncomingEmail(req, res, next);
    expect(next).toBeCalledWith(
      new Error(
        'ValidationError: child "message" fails because ["message" is not allowed to be empty]'
      )
    );
  });

  it("calls next with an error if message is a string with a length greater than 1000", () => {
    let message = "";
    for (let i = 0; i < 1001; i++) {
      message += 1;
    }

    const req = {
      body: {
        recipients: ["foo@bar.se"],
        subject: "foobar",
        message
      }
    };
    const res = {};
    const next = jest.fn();
    validateIncomingEmail(req, res, next);
    expect(next).toBeCalledWith(
      new Error(
        'ValidationError: child "message" fails because ["message" length must be less than or equal to 1000 characters long]'
      )
    );
  });

  it("calls next if everything is ok", () => {
    const req = {
      body: {
        recipients: ["foo@bar.se"],
        subject: "foobar",
        message: "foo"
      }
    };
    const res = {};
    const next = jest.fn();
    validateIncomingEmail(req, res, next);
    expect(next).toBeCalledWith();
  });
});
