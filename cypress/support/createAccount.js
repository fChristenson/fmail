module.exports = (cy, email, password) => {
  cy.visit("https://localhost:3000/register");

  cy.get("input[name=email]").type(email);

  cy.get("input[name=password]").type(password);

  cy.get("input[name=confirmation]").type(password);

  cy.get("button[type=submit]").click();

  cy.location("pathname").should("eq", "/inbox");

  cy.getCookie("session").should("exist");
};
