const assertAlert = require("../support/assertAlert");
const createAccount = require("../support/createAccount");

context("/login", () => {
  let email = "";
  const password = "123";

  beforeEach(() => {
    const username = `foo+${Math.random()}`;
    email = `${username}@fmail.se`;
    createAccount(cy, username, password);
    cy.get("[data-test=header__logout]").click();
  });

  it("has a login page", () => {
    cy.get("[data-test=login]").should("be.visible");
  });

  it("should require a email", () => {
    cy
      .get("input[name=email]")
      .should("be.visible")
      .and("have.attr", "name", "email")
      .and("have.attr", "type", "text")
      .and("have.attr", "required");
  });

  it("should require a password", () => {
    cy
      .get("input[name=password]")
      .should("be.visible")
      .and("have.attr", "name", "password")
      .and("have.attr", "type", "password")
      .and("have.attr", "required");
  });

  it("should submit form", () => {
    cy.get("input[name=email]").type(email);

    cy.get("input[name=password]").type(password);

    cy.get("button[type=submit]").click();

    cy.location("pathname").should("eq", "/inbox");
    cy.getCookie("session").should("exist");
  });

  it("should fail to login if the password is incorrect", () => {
    cy.get("input[name=email]").type(email);

    cy.get("input[name=password]").type("fail");

    cy.get("button[type=submit]").click();

    const title = "Error";
    const text = "Invalid username or password";
    assertAlert(cy, title, text);
  });

  it("should link to /register", () => {
    cy.get("[data-test=login__register]").click();

    cy.location("pathname").should("eq", "/register");
  });
});
