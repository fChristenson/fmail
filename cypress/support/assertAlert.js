module.exports = (cy, title, text) => {
  cy.get("[data-test=alert__title]").should("be.visible").contains(title);

  cy.get("[data-test=alert__text]").should("be.visible").contains(text);

  cy.get("[data-test=alert__button]").should("be.visible").click();

  cy.get("[data-test=alert]").should("not.be.visible");
};
