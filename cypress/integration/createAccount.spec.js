const assertAlert = require("../support/assertAlert");

context("/register", () => {
  beforeEach(() => {
    cy.visit("https://localhost:3000/register");
  });

  it("has a register page", () => {
    cy.get("[data-test=register]").should("be.visible");
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

  it("should require a password confirmation", () => {
    cy
      .get("input[name=confirmation]")
      .should("be.visible")
      .and("have.attr", "name", "confirmation")
      .and("have.attr", "type", "password")
      .and("have.attr", "required");
  });

  it("should submit form", () => {
    const email = `foo+${Math.random()}`;
    cy.get("input[name=email]").type(email);

    cy.get("input[name=password]").type("123");

    cy.get("input[name=confirmation]").type("123");

    cy.get("button[type=submit]").click();

    cy.location("pathname").should("eq", "/inbox");
  });

  it("should fail to submit if the confirmation does not match the password", () => {
    const email = `foo+${Math.random()}`;
    cy.get("input[name=email]").type(email);

    cy.get("input[name=password]").type("123");

    cy.get("input[name=confirmation]").type("1234");

    cy.get("button[type=submit]").click();

    const title = "Invalid password";
    const text = "Password does not match confirmation";
    assertAlert(cy, title, text);
  });

  it("should fail to register the same email twice", () => {
    const email = `foo+${Math.random()}`;
    cy.get("input[name=email]").type(email);

    cy.get("input[name=password]").type("123");

    cy.get("input[name=confirmation]").type("123");

    cy.get("button[type=submit]").click();

    cy.location("pathname").should("eq", "/inbox");

    cy.visit("https://localhost:3000/register");

    cy.get("input[name=email]").type(email);

    cy.get("input[name=password]").type("123");

    cy.get("input[name=confirmation]").type("123");

    cy.get("button[type=submit]").click();

    cy.location("pathname").should("eq", "/register");

    const title = "Error";
    const text = "There is already a user with that email";
    assertAlert(cy, title, text);
  });
});
