const assertAlert = require("../support/assertAlert");
const createAccount = require("../support/createAccount");

context("ComposeEmail", () => {
  let email = "";
  const password = "123";

  beforeEach(() => {
    email = `foo+${Math.random()}`;
    createAccount(cy, email, password);
  });

  it("can send a email", () => {
    cy.get("[data-test=navigation-bar__compose]").click();

    cy.get("[data-test=compose-email]").should("be.visible");

    cy.get("input[name=recipients]").type("foo@bar.se");
    cy.get("input[name=subject]").type("foo");
    cy.get("textarea[name=message]").type("foo");
    cy.get("[data-test=compose-email__send]").click();

    cy.get("[data-test=compose-email]").should("not.be.visible");

    const title = "Email sent";
    const message = "Email was sent successfully";
    assertAlert(cy, title, message);
  });

  it("can cancel a email", () => {
    cy.get("[data-test=navigation-bar__compose]").click();
    cy.get("[data-test=compose-email]").should("be.visible");
    cy.get("[data-test=compose-email__cancel]").click();

    cy.get("[data-test=compose-email]").should("not.be.visible");
  });
});
